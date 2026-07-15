"use client";

import { useState } from "react";
import { ThemeSummary } from "@/components/editor/settings/ThemeSummary";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select, SelectItem } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { FONT_OPTIONS } from "@/lib/fonts";
import { BRAND_PRESETS, getDisplayThemeValues } from "@/lib/theme";
import type { Clinic, FontId, TemplateConfig } from "@/types";

interface ThemeSettingsSectionProps {
  theme: TemplateConfig["theme"];
  clinic: Clinic | null;
  onUpdateTheme: (patch: Partial<TemplateConfig["theme"]>) => void;
  onApplyTheme: (theme: TemplateConfig["theme"]) => void;
  className?: string;
}

export function ThemeSettingsSection({
  theme,
  clinic,
  onUpdateTheme,
  onApplyTheme,
  className,
}: ThemeSettingsSectionProps) {
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);
  const inherit = theme.inheritClinicBranding;
  const display = getDisplayThemeValues(theme, clinic);

  const updateColors = (patch: Partial<TemplateConfig["theme"]["colors"]>) => {
    onUpdateTheme({ colors: { ...theme.colors, ...patch } });
  };

  const updateFonts = (patch: Partial<TemplateConfig["theme"]["fonts"]>) => {
    onUpdateTheme({ fonts: { ...theme.fonts, ...patch } });
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-medium text-app-heading text-sm">Report theme</p>
        <ThemeSummary theme={theme} clinic={clinic} />
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <Checkbox checked={inherit} onChange={(e) => onUpdateTheme({ inheritClinicBranding: e.target.checked })} />
        <span>Use clinic branding</span>
      </label>
      <p className="text-app-text text-xs">
        Inherits clinic branding when enabled. Edit colors, fonts, and density in Clinic Settings.
      </p>

      <label className="block text-sm">
        <span className="text-app-text">Primary color</span>
        <div className="mt-1 flex gap-2">
          <input
            type="color"
            value={display.primary}
            disabled={inherit}
            onChange={(e) => updateColors({ primary: e.target.value })}
            className="h-9 w-12 cursor-pointer rounded border border-app-border disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </label>

      <button
        type="button"
        className="cursor-pointer text-app-accent text-xs"
        onClick={() => setShowAdvancedColors((v) => !v)}
      >
        {showAdvancedColors ? "Hide advanced colors" : "Advanced colors"}
      </button>

      {showAdvancedColors && (
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              ["heading", "Heading", display.heading],
              ["text", "Body text", display.text],
              ["background", "Background", display.background],
            ] as const
          ).map(([key, label, colorValue]) => (
            <label key={key} className="flex flex-col items-center text-center text-sm">
              <span className="text-app-text">{label}</span>
              <input
                type="color"
                value={colorValue}
                disabled={inherit}
                onChange={(e) => updateColors({ [key]: e.target.value })}
                className="mt-1 h-9 w-12 cursor-pointer rounded border border-app-border disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
          ))}
        </div>
      )}

      <label className="block text-sm">
        <span className="text-app-text">Heading font</span>
        <Select
          className="mt-1 w-full"
          value={display.fonts.heading}
          disabled={inherit}
          onValueChange={(value) => updateFonts({ heading: value as FontId })}
        >
          {FONT_OPTIONS.map((font) => (
            <SelectItem key={font.id} value={font.id}>
              {font.label}
            </SelectItem>
          ))}
        </Select>
      </label>

      <label className="block text-sm">
        <span className="text-app-text">Body font</span>
        <Select
          className="mt-1 w-full"
          value={display.fonts.body}
          disabled={inherit}
          onValueChange={(value) => updateFonts({ body: value as FontId })}
        >
          {FONT_OPTIONS.map((font) => (
            <SelectItem key={font.id} value={font.id}>
              {font.label}
            </SelectItem>
          ))}
        </Select>
      </label>

      <label className="block text-sm">
        <span className="text-app-text">Density</span>
        <Select
          className="mt-1 w-full"
          value={display.density}
          disabled={inherit}
          onValueChange={(value) => onUpdateTheme({ density: value as "comfortable" | "compact" })}
        >
          <SelectItem value="comfortable">Comfortable</SelectItem>
          <SelectItem value="compact">Compact</SelectItem>
        </Select>
      </label>

      <div>
        <p className="text-app-text text-sm">Brand presets</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {BRAND_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => onApplyTheme(preset.theme)}
              className="rounded-full border border-app-border px-2.5 py-1 text-app-heading text-xs hover:border-app-accent/40 hover:bg-app-accent-soft"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
