import { FONT_DISPLAY_NAMES, FONT_IDS } from "@patient-report/shared";
import type { FontId } from "@/types";

const FONT_CSS_VARS: Record<FontId, string> = {
  inter: "var(--font-inter)",
  nunito: "var(--font-nunito)",
  "ibm-plex-sans": "var(--font-ibm-plex-sans)",
  lora: "var(--font-lora)",
  "source-serif-4": "var(--font-source-serif-4)",
  merriweather: "var(--font-merriweather)",
};

export const FONT_OPTIONS = FONT_IDS.map((id) => ({
  id,
  label: FONT_DISPLAY_NAMES[id],
  cssVar: FONT_CSS_VARS[id],
}));

export function getFontCssVar(fontId: FontId): string {
  return FONT_CSS_VARS[fontId] ?? FONT_CSS_VARS.inter;
}
