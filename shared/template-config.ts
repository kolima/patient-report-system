/**
 * Canonical template config schema — shared between Nest and Next.
 * Source of truth: `shared/template-config.ts`
 * `pnpm run shared:build` copies this file into `backend/src/common/`.
 */
import { z } from 'zod';

export const BLOCK_TYPES = [
  'header',
  'summary',
  'story',
  'goals',
  'plan',
  'timeline',
  'coach',
  'deepDive',
  'orders',
  'textBlock',
  'divider',
  'footer',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const FONT_IDS = ['inter', 'nunito', 'ibm-plex-sans', 'lora', 'source-serif-4', 'merriweather'] as const;

export type FontId = (typeof FONT_IDS)[number];

export const FONT_DISPLAY_NAMES: Record<FontId, string> = {
  inter: 'Inter',
  nunito: 'Nunito',
  'ibm-plex-sans': 'IBM Plex Sans',
  lora: 'Lora',
  'source-serif-4': 'Source Serif 4',
  merriweather: 'Merriweather',
};

export const DENSITY_VALUES = ['comfortable', 'compact'] as const;
export type ThemeDensity = (typeof DENSITY_VALUES)[number];

export const HEADER_LAYOUTS = ['classic', 'banner', 'centered'] as const;
export type HeaderLayout = (typeof HEADER_LAYOUTS)[number];

export const SINGLETON_BLOCK_TYPES: BlockType[] = [
  'header',
  'summary',
  'story',
  'goals',
  'plan',
  'timeline',
  'coach',
  'deepDive',
  'orders',
  'footer',
];

/** Alias kept for existing frontend call sites */
export const SINGLETON_BLOCKS = SINGLETON_BLOCK_TYPES;

export const CONFIG_VERSION = 2;

export const DEFAULT_ACCENT_COLOR = '#2563eb';

export const THEME_DENSITY_DEFAULT = 'comfortable' as const;

const V2_BLOCK_INSERT_ORDER: BlockType[] = ['timeline', 'coach', 'deepDive'];

export const DEFAULT_BLOCK_TITLES: Partial<Record<BlockType, string>> = {
  summary: 'Your Health Status',
  story: 'Your Story',
  goals: 'Your Goals',
  plan: 'Your Plan',
  timeline: 'Timeline & Follow-up',
  coach: 'Your Coach',
  deepDive: 'Health Deep Dive',
  orders: 'Orders',
  textBlock: 'Custom Section',
};

export function getBlockTitlePlaceholder(type: BlockType): string | undefined {
  return DEFAULT_BLOCK_TITLES[type];
}

export function resolveBlockTitle(type: BlockType, settings: { title?: string }): string {
  const customTitle = settings.title?.trim();
  if (customTitle) {
    return customTitle;
  }
  return getBlockTitlePlaceholder(type) ?? '';
}

export const DEFAULT_TEXT_BLOCK_BODY_PLACEHOLDER = 'Add section content…';

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const blockSettingsSchema = z
  .object({
    title: z.string().max(200).optional(),
    customText: z.string().max(5000).optional(),
    showTimeframe: z.boolean().optional(),
    showTarget: z.boolean().optional(),
    showCurrent: z.boolean().optional(),
    showPlanCheckIns: z.boolean().optional(),
    showCommonQuestions: z.boolean().optional(),
    showTips: z.boolean().optional(),
    showRelevancy: z.boolean().optional(),
    showOptimalRange: z.boolean().optional(),
    layout: z.enum(HEADER_LAYOUTS).optional(),
    showLogo: z.boolean().optional(),
    showContact: z.boolean().optional(),
  })
  .strict();

const blockSchema = z
  .object({
    id: z.string().uuid(),
    type: z.enum(BLOCK_TYPES),
    visible: z.boolean(),
    settings: blockSettingsSchema.default({}),
  })
  .strict();

export const templateConfigSchema = z
  .object({
    configVersion: z.number().int().min(1).default(1),
    theme: z
      .object({
        inheritClinicBranding: z.boolean().default(false),
        colors: z
          .object({
            primary: hexColor,
            heading: hexColor.optional(),
            text: hexColor.optional(),
            background: hexColor.optional(),
          })
          .strict(),
        fonts: z
          .object({
            heading: z.enum(FONT_IDS).default('inter'),
            body: z.enum(FONT_IDS).default('inter'),
          })
          .strict(),
        density: z.enum(DENSITY_VALUES).default(THEME_DENSITY_DEFAULT),
      })
      .strict(),
    blocks: z.array(blockSchema).max(50),
  })
  .strict();

export type TemplateConfig = z.infer<typeof templateConfigSchema>;
export type TemplateBlock = z.infer<typeof blockSchema>;
export type BlockSettings = TemplateBlock['settings'];
export type TemplateTheme = TemplateConfig['theme'];

export const MAX_CONFIG_BYTES = 100 * 1024;

export function parseTemplateConfig(raw: unknown): TemplateConfig {
  return templateConfigSchema.parse(raw);
}

function utf8ByteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

export function validateConfigPayloadSize(json: string): void {
  if (utf8ByteLength(json) > MAX_CONFIG_BYTES) {
    throw new Error('Template config exceeds maximum size of 100KB');
  }
}

function makeBlock(type: BlockType, settings: TemplateBlock['settings'] = {}): TemplateBlock {
  return {
    id: crypto.randomUUID(),
    type,
    visible: true,
    settings,
  };
}

function insertV2Blocks(blocks: TemplateBlock[]): TemplateBlock[] {
  const existingTypes = new Set(blocks.map(b => b.type));
  const missing = V2_BLOCK_INSERT_ORDER.filter(t => !existingTypes.has(t));
  if (missing.length === 0) {
    return blocks;
  }

  const newBlocks = missing.map(type => makeBlock(type, { title: DEFAULT_BLOCK_TITLES[type] }));

  const ordersIndex = blocks.findIndex(b => b.type === 'orders');
  const insertAt = ordersIndex === -1 ? blocks.length : ordersIndex;

  return [...blocks.slice(0, insertAt), ...newBlocks, ...blocks.slice(insertAt)];
}

export function migrateTemplateConfig(raw: unknown): TemplateConfig {
  const config = parseTemplateConfig(raw);

  if ((config.configVersion ?? 1) >= CONFIG_VERSION) {
    return config;
  }

  return {
    ...config,
    configVersion: CONFIG_VERSION,
    blocks: insertV2Blocks(config.blocks),
  };
}

export function createTheme(primary: string, inheritClinicBranding = true): TemplateConfig['theme'] {
  return {
    inheritClinicBranding,
    colors: { primary },
    fonts: { heading: 'inter', body: 'inter' },
    density: THEME_DENSITY_DEFAULT,
  };
}

export function createBaseTemplateConfig(accentColor = DEFAULT_ACCENT_COLOR): TemplateConfig {
  return {
    configVersion: CONFIG_VERSION,
    theme: createTheme(accentColor, true),
    blocks: [
      makeBlock('header', { layout: 'classic', showLogo: true }),
      makeBlock('summary', { title: DEFAULT_BLOCK_TITLES.summary }),
      makeBlock('story', { title: DEFAULT_BLOCK_TITLES.story }),
      makeBlock('goals', { title: DEFAULT_BLOCK_TITLES.goals }),
      makeBlock('plan', { title: DEFAULT_BLOCK_TITLES.plan }),
      makeBlock('timeline', { title: DEFAULT_BLOCK_TITLES.timeline }),
      makeBlock('coach', { title: DEFAULT_BLOCK_TITLES.coach }),
      makeBlock('deepDive', { title: DEFAULT_BLOCK_TITLES.deepDive }),
      makeBlock('orders', { title: DEFAULT_BLOCK_TITLES.orders }),
      makeBlock('footer', { showLogo: true, showContact: true }),
    ],
  };
}

export function createBlankTemplateConfig(accentColor = DEFAULT_ACCENT_COLOR): TemplateConfig {
  return {
    configVersion: CONFIG_VERSION,
    theme: createTheme(accentColor, true),
    blocks: [
      {
        id: crypto.randomUUID(),
        type: 'header',
        visible: true,
        settings: { layout: 'classic', showLogo: true },
      },
    ],
  };
}
