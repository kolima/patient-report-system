import {
  DEFAULT_ACCENT_COLOR,
  THEME_COLOR_DEFAULTS,
  THEME_DENSITY_DEFAULT,
  THEME_FONT_DEFAULTS,
} from "@patient-report/shared";
import type { CSSProperties } from "react";
import type { Clinic, ClinicBranding, FontId, TemplateConfig, TemplateTheme } from "@/types";
import { getFontCssVar } from "./fonts";

export { DEFAULT_ACCENT_COLOR, THEME_COLOR_DEFAULTS, THEME_DENSITY_DEFAULT, THEME_FONT_DEFAULTS };

/** Fields needed to resolve inherited theme values from a clinic. */
export type ThemeClinicSource = Pick<
  ClinicBranding,
  "accentColor" | "headingColor" | "textColor" | "backgroundColor" | "headingFont" | "bodyFont" | "density"
>;

export interface DisplayThemeValues {
  primary: string;
  heading: string;
  text: string;
  background: string;
  fonts: TemplateTheme["fonts"];
  density: TemplateTheme["density"];
}

export interface ResolvedTheme extends DisplayThemeValues {
  accentSoft: string;
  bannerText: string;
}

export function tintColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

export function getContrastTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? THEME_COLOR_DEFAULTS.heading : "#ffffff";
}

function resolvedThemeColor(
  inherit: boolean,
  clinicValue: string | null | undefined,
  templateValue: string | undefined,
  defaultValue: string,
): string {
  if (inherit) return clinicValue ?? templateValue ?? defaultValue;
  return templateValue ?? defaultValue;
}

function resolvedThemeFont(
  inherit: boolean,
  clinicValue: FontId | null | undefined,
  templateValue: FontId,
  defaultValue: FontId,
): FontId {
  if (inherit) return clinicValue ?? templateValue ?? defaultValue;
  return templateValue ?? defaultValue;
}

function resolvedThemeDensity(
  inherit: boolean,
  clinicValue: TemplateTheme["density"] | null | undefined,
  templateValue: TemplateTheme["density"],
): TemplateTheme["density"] {
  if (inherit) return clinicValue ?? templateValue ?? THEME_DENSITY_DEFAULT;
  return templateValue;
}

export function getDisplayThemeValues(
  theme: TemplateConfig["theme"],
  clinic: ThemeClinicSource | Clinic | null | undefined,
): DisplayThemeValues {
  const inherit = theme.inheritClinicBranding && !!clinic;

  return {
    primary: inherit ? (clinic?.accentColor ?? theme.colors.primary) : theme.colors.primary,
    heading: resolvedThemeColor(inherit, clinic?.headingColor, theme.colors.heading, THEME_COLOR_DEFAULTS.heading),
    text: resolvedThemeColor(inherit, clinic?.textColor, theme.colors.text, THEME_COLOR_DEFAULTS.text),
    background: resolvedThemeColor(
      inherit,
      clinic?.backgroundColor,
      theme.colors.background,
      THEME_COLOR_DEFAULTS.background,
    ),
    fonts: {
      heading: resolvedThemeFont(inherit, clinic?.headingFont, theme.fonts.heading, THEME_FONT_DEFAULTS.heading),
      body: resolvedThemeFont(inherit, clinic?.bodyFont, theme.fonts.body, THEME_FONT_DEFAULTS.body),
    },
    density: resolvedThemeDensity(inherit, clinic?.density, theme.density),
  };
}

export function getThemeSummaryLabel(
  theme: TemplateConfig["theme"],
  clinic: Clinic | null,
): "Clinic branding" | "Custom" {
  return theme.inheritClinicBranding && clinic ? "Clinic branding" : "Custom";
}

export function resolveTheme(theme: TemplateConfig["theme"], clinicBranding?: ThemeClinicSource | null): ResolvedTheme {
  const display = getDisplayThemeValues(theme, clinicBranding);
  return {
    ...display,
    accentSoft: tintColor(display.primary, 0.88),
    bannerText: getContrastTextColor(display.primary),
  };
}

export function resolvedThemeToCssVars(resolved: ResolvedTheme): CSSProperties {
  return {
    ["--accent" as string]: resolved.primary,
    ["--accent-soft" as string]: resolved.accentSoft,
    ["--heading" as string]: resolved.heading,
    ["--body-text" as string]: resolved.text,
    ["--report-bg" as string]: resolved.background,
    ["--font-heading" as string]: getFontCssVar(resolved.fonts.heading),
    ["--font-body" as string]: getFontCssVar(resolved.fonts.body),
    ["--banner-text" as string]: resolved.bannerText,
    backgroundColor: resolved.background,
    fontFamily: getFontCssVar(resolved.fonts.body),
  };
}

export function clinicToBranding(clinic: Clinic): ClinicBranding {
  return {
    name: clinic.name,
    logoUrl: clinic.logoUrl,
    accentColor: clinic.accentColor,
    headingColor: clinic.headingColor,
    textColor: clinic.textColor,
    backgroundColor: clinic.backgroundColor,
    headingFont: clinic.headingFont,
    bodyFont: clinic.bodyFont,
    density: clinic.density,
    address: clinic.address,
    phone: clinic.phone,
    email: clinic.email,
    website: clinic.website,
    footerDisclaimer: clinic.footerDisclaimer,
  };
}

export const BRAND_PRESETS: { name: string; theme: TemplateTheme }[] = [
  {
    name: "Longevitix",
    theme: {
      inheritClinicBranding: false,
      colors: { primary: "#001125", heading: "#001125", text: "#666666" },
      fonts: { heading: "inter", body: "inter" },
      density: "comfortable",
    },
  },
  {
    name: "Clinical Blue",
    theme: {
      inheritClinicBranding: false,
      colors: { primary: DEFAULT_ACCENT_COLOR },
      fonts: { heading: "inter", body: "inter" },
      density: "comfortable",
    },
  },
  {
    name: "Warm Serif",
    theme: {
      inheritClinicBranding: false,
      colors: { primary: "#b45309", heading: "#78350f" },
      fonts: { heading: "lora", body: "merriweather" },
      density: "comfortable",
    },
  },
  {
    name: "Modern Minimal",
    theme: {
      inheritClinicBranding: false,
      colors: { primary: "#18181b", heading: "#09090b", text: "#3f3f46" },
      fonts: { heading: "ibm-plex-sans", body: "inter" },
      density: "compact",
    },
  },
  {
    name: "Sunrise",
    theme: {
      inheritClinicBranding: false,
      colors: { primary: "#0d9488", heading: "#134e4a" },
      fonts: { heading: "lora", body: "source-serif-4" },
      density: "compact",
    },
  },
];
