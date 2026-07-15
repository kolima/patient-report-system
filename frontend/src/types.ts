import type { BlockType, FontId, TemplateConfig, ThemeDensity } from "@patient-report/shared";

export type {
  BiomarkerRelevancy,
  BiomarkerStatus,
  BlockSettings,
  BlockType,
  DeepDiveCategoryStatus,
  FontId,
  HeaderLayout,
  PlanCategory,
  ReportData,
  TemplateBlock,
  TemplateConfig,
  TemplateTheme,
  ThemeDensity,
  UpdateClinicInput,
} from "@patient-report/shared";
export {
  BIOMARKER_RELEVANCY_LEVELS,
  BIOMARKER_STATUSES,
  BLOCK_TYPES,
  CLINIC_FIELD_LIMITS,
  DEEP_DIVE_CATEGORY_STATUSES,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_BLOCK_TITLES,
  DEFAULT_TEXT_BLOCK_BODY_PLACEHOLDER,
  DENSITY_VALUES,
  FONT_DISPLAY_NAMES,
  FONT_IDS,
  getBlockTitlePlaceholder,
  HEADER_LAYOUTS,
  HEX_COLOR_PATTERN,
  PLAN_CATEGORIES,
  parseTemplateConfig,
  resolveBlockTitle,
  SINGLETON_BLOCK_TYPES,
  SINGLETON_BLOCKS,
  THEME_COLOR_DEFAULTS,
  THEME_DENSITY_DEFAULT,
  THEME_FONT_DEFAULTS,
  templateConfigSchema,
} from "@patient-report/shared";

export interface Clinic {
  id: string;
  name: string;
  logoUrl: string | null;
  accentColor: string;
  headingColor: string | null;
  textColor: string | null;
  backgroundColor: string | null;
  headingFont: FontId | null;
  bodyFont: FontId | null;
  density: ThemeDensity | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  footerDisclaimer: string | null;
}

export type ClinicBranding = Pick<
  Clinic,
  | "name"
  | "logoUrl"
  | "accentColor"
  | "headingColor"
  | "textColor"
  | "backgroundColor"
  | "headingFont"
  | "bodyFont"
  | "density"
  | "address"
  | "phone"
  | "email"
  | "website"
  | "footerDisclaimer"
>;

export interface Template {
  id: string;
  clinicId: string;
  name: string;
  config: TemplateConfig;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const BLOCK_LABELS: Record<BlockType, string> = {
  header: "Report Header",
  summary: "Health Status Summary",
  story: "Your Story",
  goals: "Goals & Metrics",
  plan: "Your Plan",
  timeline: "Timeline & Follow-up",
  coach: "Your Coach",
  deepDive: "Health Deep Dive",
  orders: "Orders",
  textBlock: "Custom Text",
  divider: "Divider",
  footer: "Footer",
};
