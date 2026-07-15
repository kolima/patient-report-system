import type { FontId } from "./template-config";
import { DEFAULT_ACCENT_COLOR, DENSITY_VALUES, THEME_DENSITY_DEFAULT } from "./template-config";

export type { ThemeDensity } from "./template-config";
export { DEFAULT_ACCENT_COLOR, DENSITY_VALUES, THEME_DENSITY_DEFAULT };

export const THEME_COLOR_DEFAULTS = {
  heading: "#0f172a",
  text: "#334155",
  background: "#ffffff",
} as const;

export const THEME_FONT_DEFAULTS = {
  heading: "inter" as FontId,
  body: "inter" as FontId,
};
