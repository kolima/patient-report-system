import { describe, expect, it } from "vitest";
import type { TemplateConfig } from "@/types";
import {
  clinicToBranding,
  getContrastTextColor,
  getDisplayThemeValues,
  getThemeSummaryLabel,
  resolveTheme,
  THEME_COLOR_DEFAULTS,
  tintColor,
} from "./theme";

const templateTheme = {
  inheritClinicBranding: true,
  colors: {
    primary: "#111111",
    heading: "#222222",
    text: "#333333",
    background: "#f5f5f5",
  },
  fonts: {
    heading: "lora" as const,
    body: "merriweather" as const,
  },
  density: "compact" as const,
} satisfies TemplateConfig["theme"];

describe("getDisplayThemeValues inheritance", () => {
  it("falls back to template values when inherit is on and clinic fields are unset", () => {
    const clinic = {
      accentColor: "#aa0000",
      headingColor: null,
      textColor: null,
      backgroundColor: null,
      headingFont: null,
      bodyFont: null,
      density: null,
    };

    const values = getDisplayThemeValues(templateTheme, clinic);

    expect(values.primary).toBe("#aa0000");
    expect(values.heading).toBe("#222222");
    expect(values.text).toBe("#333333");
    expect(values.background).toBe("#f5f5f5");
    expect(values.fonts.heading).toBe("lora");
    expect(values.fonts.body).toBe("merriweather");
    expect(values.density).toBe("compact");
  });

  it("prefers set clinic fields over template when inherit is on", () => {
    const clinic = {
      accentColor: "#aa0000",
      headingColor: "#bb0000",
      textColor: "#cc0000",
      backgroundColor: "#dd0000",
      headingFont: "inter" as const,
      bodyFont: "ibm-plex-sans" as const,
      density: "comfortable" as const,
    };

    const values = getDisplayThemeValues(templateTheme, clinic);

    expect(values.heading).toBe("#bb0000");
    expect(values.text).toBe("#cc0000");
    expect(values.background).toBe("#dd0000");
    expect(values.fonts.heading).toBe("inter");
    expect(values.fonts.body).toBe("ibm-plex-sans");
    expect(values.density).toBe("comfortable");
  });

  it("uses system defaults when inherit is on and neither clinic nor template sets a color", () => {
    const theme = {
      ...templateTheme,
      colors: { primary: "#111111" },
    } satisfies TemplateConfig["theme"];

    const clinic = {
      accentColor: "#aa0000",
      headingColor: null,
      textColor: null,
      backgroundColor: null,
      headingFont: null,
      bodyFont: null,
      density: null,
    };

    const values = getDisplayThemeValues(theme, clinic);

    expect(values.heading).toBe(THEME_COLOR_DEFAULTS.heading);
    expect(values.text).toBe(THEME_COLOR_DEFAULTS.text);
    expect(values.background).toBe(THEME_COLOR_DEFAULTS.background);
  });

  it("ignores clinic fields when inheritClinicBranding is false", () => {
    const theme = {
      ...templateTheme,
      inheritClinicBranding: false,
    } satisfies TemplateConfig["theme"];

    const clinic = {
      accentColor: "#aa0000",
      headingColor: "#bb0000",
      textColor: "#cc0000",
      backgroundColor: "#dd0000",
      headingFont: "inter" as const,
      bodyFont: "ibm-plex-sans" as const,
      density: "comfortable" as const,
    };

    const values = getDisplayThemeValues(theme, clinic);

    expect(values.primary).toBe("#111111");
    expect(values.heading).toBe("#222222");
    expect(values.fonts.heading).toBe("lora");
    expect(values.density).toBe("compact");
  });
});

describe("tintColor", () => {
  it("lightens a hex color toward white", () => {
    expect(tintColor("#000000", 0.5)).toBe("#808080");
  });

  it("returns white when amount is 1", () => {
    expect(tintColor("#112233", 1)).toBe("#ffffff");
  });
});

describe("getContrastTextColor", () => {
  it("returns dark text on light backgrounds", () => {
    expect(getContrastTextColor("#ffffff")).toBe(THEME_COLOR_DEFAULTS.heading);
  });

  it("returns white text on dark backgrounds", () => {
    expect(getContrastTextColor("#000000")).toBe("#ffffff");
  });
});

describe("getThemeSummaryLabel", () => {
  it('returns "Clinic branding" when inheriting from a clinic', () => {
    const theme = { ...templateTheme, inheritClinicBranding: true };
    const clinic = { id: "1", name: "Clinic" } as never;

    expect(getThemeSummaryLabel(theme, clinic)).toBe("Clinic branding");
  });

  it('returns "Custom" when not inheriting', () => {
    const theme = { ...templateTheme, inheritClinicBranding: false };
    const clinic = { id: "1", name: "Clinic" } as never;

    expect(getThemeSummaryLabel(theme, clinic)).toBe("Custom");
  });
});

describe("resolveTheme", () => {
  it("derives accentSoft and bannerText from the primary color", () => {
    const theme = {
      inheritClinicBranding: false,
      colors: { primary: "#000000" },
      fonts: { heading: "inter" as const, body: "inter" as const },
      density: "comfortable" as const,
    };

    const resolved = resolveTheme(theme);

    expect(resolved.primary).toBe("#000000");
    expect(resolved.bannerText).toBe("#ffffff");
    expect(resolved.accentSoft).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("clinicToBranding", () => {
  it("maps clinic fields to branding shape", () => {
    const clinic = {
      id: "1",
      name: "Sunrise",
      logoUrl: "/logos/sunrise.svg",
      accentColor: "#0d9488",
      headingColor: null,
      textColor: null,
      backgroundColor: null,
      headingFont: null,
      bodyFont: null,
      density: null,
      address: "123 Main St",
      phone: "555-0100",
      email: "info@sunrise.com",
      website: "https://sunrise.com",
      footerDisclaimer: "Not medical advice",
      createdAt: "",
      updatedAt: "",
    };

    expect(clinicToBranding(clinic)).toEqual({
      name: "Sunrise",
      logoUrl: "/logos/sunrise.svg",
      accentColor: "#0d9488",
      headingColor: null,
      textColor: null,
      backgroundColor: null,
      headingFont: null,
      bodyFont: null,
      density: null,
      address: "123 Main St",
      phone: "555-0100",
      email: "info@sunrise.com",
      website: "https://sunrise.com",
      footerDisclaimer: "Not medical advice",
    });
  });
});
