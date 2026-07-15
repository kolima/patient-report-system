# Patient Report Template System

A multi-clinic patient health report builder. Each clinic manages its own report templates via a Wix-style editor and can preview patient reports rendered with their chosen layout and branding.

## Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, dnd-kit
- **Backend**: NestJS, Prisma, PostgreSQL
- **Shared**: `@patient-report/shared` — template config Zod schema + types
- **Database**: PostgreSQL 16 (Docker)

## Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)

## Quick start

From the repo root:

```bash
pnpm run setup:project  # installs deps, starts DB, migrates, seeds
pnpm run backend:dev    # terminal 1 — http://localhost:3001
pnpm run frontend:dev   # terminal 2 — http://localhost:3000
```

Or step by step:

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Install workspace deps + build shared package (from repo root)
pnpm install
pnpm run shared:build

# 3. Backend setup (reset DB if upgrading from the old theme shape)
cd backend
cp .env.example .env   # if .env doesn't exist
pnpm exec prisma migrate reset --force
pnpm run dev            # http://localhost:3001

# 4. Frontend (new terminal)
cd frontend
pnpm run dev            # http://localhost:3000
```

## Demo flow

1. Open **http://localhost:3000**
2. Use the **clinic switcher** in the header to toggle between:
   - **At Doron's #2** — full report with clinic branding inheritance
   - **Sunrise Longevity Clinic** — banner header, serif fonts, footer block
3. **Clinic Settings** — edit logo URL, brand color, contact info, disclaimer
4. **Templates** — list, create (from base or blank), edit, preview, delete, set default
5. **Edit template** — drag/reorder blocks (new blocks insert below the selected one), theme presets, inherit clinic branding, save
6. **Patient Report** — view mocked patient data through the clinic's default template, or preview any template via **Preview** / `/report?templateId=…`

## Design decisions (UI)

- **Usability over flexibility:** The editor targets non-technical clinic staff. Block-based layout with sensible defaults beats a complex document editor for v1.
- **Template setup once:** Clinics customize layout, branding, and static text. Patient data fills clinical blocks automatically — no per-patient editing in the template builder.
- **Desktop-first editor, responsive report:** The template editor uses a 3-column layout on large screens and slide-over drawers on tablet/mobile. The patient report view is responsive.
- **Shared UI primitives:** Lightweight `Button`, `Input`, `Alert`, `Modal`, and `Drawer` components keep the app chrome consistent without adding a component library.
- **Keyboard reorder:** Block drag-and-drop is pointer-based; keyboard reorder is not implemented (documented limitation).

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/clinics` | List clinics |
| GET | `/clinics/:id` | Get clinic |
| PATCH | `/clinics/:id` | Update clinic branding |
| GET | `/clinics/:id/templates` | List templates |
| POST | `/clinics/:id/templates` | Create template (`{ name, from: "base" \| "blank" }`) |
| GET | `/clinics/:id/templates/:templateId` | Get template |
| PUT | `/clinics/:id/templates/:templateId` | Update template |
| DELETE | `/clinics/:id/templates/:templateId` | Delete template |
| POST | `/clinics/:id/templates/:templateId/set-default` | Set default |
| GET | `/clinics/:id/report-data` | Mock patient report data |
| GET | `/clinics/:id/rendered-report` | Default template + report data |
| GET | `/clinics/:id/rendered-report?templateId=` | Specific template + report data (ownership-scoped) |

## Assumptions

- Patient report data is **mocked/hardcoded** in `backend/src/report-data/report-data.fixture.ts` — no PDF parsing or generation.
- **No authentication** — clinic selection via a header dropdown (localStorage).
- Template config is stored as **JSONB** in a single column per template.
- Reports render as **web views only** — no PDF export.
- Clinic logos are **URL references** (demo SVGs in `frontend/public/logos/`).
- Each data-bound block type (header, summary, goals, etc.) appears **once per template**; custom text blocks and dividers can repeat.

## Project structure

```
backend/          NestJS API + Prisma + mock data
frontend/         Next.js app + report renderer + template editor
docker-compose.yml
DECISIONS.md      Architecture tradeoffs
```
