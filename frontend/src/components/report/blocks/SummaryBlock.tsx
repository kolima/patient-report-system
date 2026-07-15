import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

export function SummaryBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("summary", settings);

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <blockquote
        className="mt-4 rounded-lg border-l-4 p-5"
        style={{
          borderColor: "var(--accent)",
          backgroundColor: "var(--accent-soft)",
          color: "var(--body-text)",
        }}
      >
        <p className="leading-relaxed">&ldquo;{reportData.healthStatus.quote}&rdquo;</p>
        <footer className="mt-4 font-medium text-sm" style={{ color: "var(--heading)" }}>
          — {reportData.healthStatus.author}
        </footer>
      </blockquote>
    </section>
  );
}
