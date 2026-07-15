import { getDisplayThemeValues, getThemeSummaryLabel } from "@/lib/theme";
import type { Clinic, TemplateConfig } from "@/types";

export function ThemeSummary({ theme, clinic }: { theme: TemplateConfig["theme"]; clinic: Clinic | null }) {
  const display = getDisplayThemeValues(theme, clinic);
  const label = getThemeSummaryLabel(theme, clinic);

  return (
    <span className="inline-flex items-center gap-1.5 font-normal text-app-text text-xs normal-case tracking-normal">
      <span
        className="h-3 w-3 shrink-0 rounded-full ring-1 ring-app-border"
        style={{ backgroundColor: display.primary }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
