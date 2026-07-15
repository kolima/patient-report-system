# Architecture Decisions

## Template config: JSONB column vs normalized block rows

**Decision:** Store the full template layout as a JSONB `config` column on the `Template` table.

**Why:** The editor always loads and saves the entire template as one document. A single `UPDATE` is simpler than diffing/reordering rows in a `template_blocks` table. New block types and settings require no DB migration. Even a normalized design would still need JSON for per-block `settings` because each block type has different options.

**Tradeoff:** Cannot query "which templates use block X" without JSONB operators. Mitigated by zod validation on save and a `configVersion` field for future shape migrations. The config *schema contract* (allowed block types, settings keys, validation rules) lives in code — see [Shared template config](#shared-template-config) below; only per-clinic template *instances* are stored in JSONB.

## PostgreSQL + JSONB vs NoSQL (MongoDB)

**Decision:** PostgreSQL with JSONB for the config column.

**Why:** Only one column is document-shaped; `Clinic` → `Template` is a real relational model needing foreign keys and a partial unique index for one default template per clinic. JSONB gives schema-free storage for the config without a second database. Prisma's Postgres support is first-class.

**Tradeoff:** Not ideal if the entire domain were document-oriented or needed Mongo's sharding model — neither applies here.

## ORM: Prisma vs TypeORM

**Decision:** Prisma.

**Why:** Type-safe client generation, straightforward migrations, excellent PostgreSQL/JSONB support, less boilerplate than TypeORM for this scope.

## Editor UX: block flow vs free-form canvas

**Decision:** Vertical block flow with drag-to-reorder (not absolute positioning).

**Why:** Health reports are long-form documents; vertical flow stays readable and responsive. A Wix-style free-form canvas would add significant complexity (grid snapping, collision, print layout) with little benefit for this content type.

**Tradeoff:** Clinics cannot place elements at arbitrary x/y positions.

## Auth and multi-tenancy

**Decision:** No authentication. Clinic switcher in the UI header, selection persisted in localStorage.

**Why:** Per the exercise brief ("feel free to simplify auth"). Demonstrates template independence without login plumbing.

**Mitigation in demo:** All template mutations are scoped to `/clinics/:clinicId/templates/:id` with ownership verification in the service layer to prevent IDOR by template ID alone.

## Patient data location

**Decision:** Mock data in a TypeScript fixture file, keyed by stable clinic ID (not display name). Not stored in the database.

**Why:** PDF parsing is out of scope. Keeps the demo focused on template customization and rendering. Two clinics get different patients to prove independence. Keying by ID means renaming a clinic in Settings does not break `/report-data`.

## Shared template config

**Decision:** Split template configuration into two layers:

| What | Where | Why |
|------|-------|-----|
| Per-clinic template layout (blocks, visibility, settings values, theme) | `Template.config` JSONB in Postgres | User-editable; loaded and saved as one document per template |
| Config **contract** (allowed block types, settings keys, validation, migrations, factory defaults) | `shared/template-config.ts` | Must be identical in the frontend editor/renderer and backend API |

`TemplateConfig` types, the Zod schema, and migration helpers live in `shared/template-config.ts`. The frontend imports them via `@patient-report/shared`. `pnpm run shared:build` compiles the package and copies the source into `backend/src/common/template-config.ts` so Nest can compile it without workspace-runtime resolution issues.

**Why not store the schema in the database?**

- The schema is **application code**, not clinic data. Putting `BLOCK_TYPES`, Zod rules, or migration logic in Postgres would still require a deploy to teach the app how to render and validate new blocks — the database would not remove that coupling.
- FE and BE must share types at **compile time**. A shared TypeScript package gives both sides the same `BlockType`, `BlockSettings`, and parse helpers.
- Schema changes are **versioned in git**, reviewed in PRs, and covered by unit tests (`backend/src/common/template-config.test.ts`) — safer than mutating a "schema row" at runtime.
- Stored JSONB remains **opaque document data** validated against the current code schema on every write. Older documents are upgraded on read via `configVersion` + `migrateTemplateConfig`.

**What `shared:build` does:**

- `tsc` emits JS + `.d.ts` for the frontend workspace package.
- `cp template-config.ts ../backend/src/common/` keeps Nest's CommonJS build simple without maintaining a second copy by hand.

**What is not in `shared/`:** Clinic branding fields (`Clinic` table columns) are relational because they are first-class clinic settings, not part of the template document schema.

**Tradeoff:** Deploying a new block type requires a code release, not a SQL migration for config shape. Acceptable because rendering and editor UI are always code anyway.

## Extending blocks and settings

**Decision:** Use an **explicit registration** model — one shared schema plus a small, predictable set of touchpoints — rather than a dynamic plugin registry stored in the database.

**Design principles:**

1. **Settings are a typed optional bag.** `blockSettingsSchema` in `shared/template-config.ts` is one `.strict()` object with all known optional keys (`title`, `showLogo`, `layout`, etc.). New settings are **additive optional fields** — no DB migration; existing saved configs remain valid.
2. **New block types are additive.** Register in `BLOCK_TYPES`, bump `configVersion` if existing templates need auto-insertion, then implement editor UI and renderer.
3. **Migrations are code, triggered on read.** `migrateTemplateConfig` + `TemplatesService.withMigratedConfig` persist upgraded configs when the shape changes (v1→v2 inserted `timeline`, `coach`, and `deepDive` before `orders`).
4. **No DB migration for config shape.** Reinforces the JSONB decision above — only application deploys change what is valid.

**Checklist: adding a new block type**

1. Register type + defaults in `shared/template-config.ts`: `BLOCK_TYPES`, optional `SINGLETON_BLOCK_TYPES`, `DEFAULT_BLOCK_TITLES`, `createBaseTemplateConfig`.
2. Migration (if needed): bump `CONFIG_VERSION`, extend `migrateTemplateConfig` in the same file.
3. Rebuild: `pnpm run shared:build`.
4. Label: `frontend/src/types.ts` → `BLOCK_LABELS`.
5. Palette: `frontend/src/components/editor/BlockPalette.tsx` → `PALETTE_BLOCKS`.
6. Settings UI: `frontend/src/components/editor/BlockSettingsPanel.tsx` → conditional panel for the block.
7. Renderer: new `frontend/src/components/report/blocks/<Name>Block.tsx` + case in `ReportRenderer.tsx`.
8. Data (if needed): extend `ReportData` in `frontend/src/types.ts` + fixture in `backend/src/report-data/report-data.fixture.ts`.
9. Tests: shared schema tests + component test for the new block.

**Checklist: adding a new block setting** (lighter path)

1. Schema: add optional field to `blockSettingsSchema` in `shared/template-config.ts`.
2. Rebuild: `pnpm run shared:build`.
3. Editor: expose control in `BlockSettingsPanel.tsx` for the relevant block type(s).
4. Renderer: read `settings.<key>` in the block component.
5. Tests: schema parse test + component behavior test.

**How easy it should be:**

- **New optional setting:** ~4 files, no migration — minutes of work if the UI is a checkbox or text field.
- **New block type:** ~6–9 files, predictable but not automatic — intentional tradeoff to keep rendering type-safe and avoid runtime plugin complexity.

**Reference example:** v2 blocks (`timeline`, `coach`, `deepDive`) demonstrate the full pattern: schema registration, `CONFIG_VERSION = 2`, `insertV2Blocks`, renderer components, and settings toggles (`showPlanCheckIns`, `showCommonQuestions`, etc.).

**Explicit non-goals:** No admin UI to define block types at runtime; no per-block settings tables; no codegen yet (could be a future improvement).

## Template versioning

**Decision:** Last-write-wins. No version history.

**Why:** Out of scope for the exercise. A production system would add version rows or event sourcing.

## Security measures implemented

| Risk | Mitigation |
|------|------------|
| XSS via template text | React text nodes only; no `dangerouslySetInnerHTML` |
| Malformed config | Zod validation server-side; 100 KB size limit |
| IDOR on templates | Clinic-scoped routes + ownership check |
| SQL injection | Prisma parameterized queries |
| CORS | Restricted to `http://localhost:3000` |

## Clinic branding

**Decision:** Clinic-level branding (logo URL, colors, fonts, density, contact info, disclaimer) lives on the `Clinic` row. Templates opt in via `theme.inheritClinicBranding` to use clinic theme values at render time.

**Why:** Clinics update branding once and all inheriting templates reflect changes without re-editing each template. Optional clinic fields (`headingColor`, `textColor`, `backgroundColor`, `headingFont`, `bodyFont`, `density`) fall back to template values when unset.

**Inheritance:** When `inheritClinicBranding` is true, each clinic field wins if set; otherwise the template theme value is used (with system color defaults as a last resort). When false, the template theme controls everything.

**Tradeoff:** Logo is a URL field, not file upload — simpler for the demo; production would use object storage + signed URLs.

**Theme shape:** Replaced the original v1 theme (`accentColor`, `fontFamily: sans|serif`) with a richer shape (`colors.primary`, curated font IDs, optional color overrides). No migration layer — acceptable pre-production; reset DB with `prisma migrate reset`.

## UI polish

**Decision:** Thin app-owned wrappers around a small set of Radix primitives (`Select`, `Dialog`/`sheet`, `AlertDialog`) plus local components (`Button`, `Input`, `Alert`, etc.), not a full shadcn/ui install. Toasts use `react-toastify`.

**Why:** Radix covers accessible overlays and selects without adopting an entire design-system scaffold. Local wrappers keep styling and API consistent with Tailwind app chrome. The report renderer keeps its own CSS-variable theming system separate from that chrome.

**Editor responsive pattern:** Desktop uses a sticky toolbar plus three columns: left inspector (`Blocks` / `Outline` tabs), center canvas, right inspector (`Block` / `Theme` tabs). Below `lg`, the left and right inspectors open as `Add` and `Inspector` slide-over drawers with the same tabs. Canvas stays full-width between panels.

**Tradeoff:** No dark mode; pointer-only drag-and-drop without keyboard reorder. Inline `Alert` banners still handle page-level load/save errors alongside toasts for success feedback.

## Explicitly out of scope

- PDF parsing (input) and PDF generation (output)
- Real patient records / PHI / HIPAA compliance
- Authentication and authorization
- Template version history
- Concurrent edit conflict handling
- Logo/image file upload (URL only in this version)
- Rate limiting, audit logging, HTTPS
