import type { BlockComponentProps } from "../ReportRenderer";

export function TextBlock({ settings }: BlockComponentProps) {
  if (!settings.title && !settings.customText) return null;

  return (
    <section>
      {settings.title && (
        <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
          {settings.title}
        </h2>
      )}
      {settings.customText && (
        <p className={`leading-relaxed ${settings.title ? "mt-3" : ""}`} style={{ color: "var(--body-text)" }}>
          {settings.customText}
        </p>
      )}
    </section>
  );
}
