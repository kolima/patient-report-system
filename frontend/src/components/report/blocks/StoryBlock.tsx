import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

export function StoryBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("story", settings);

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
        Patient-reported goals and concerns driving this assessment.
      </p>
      <ul className="mt-4 space-y-4">
        {reportData.story.map((item) => (
          <li key={item.title} className="rounded-lg border border-slate-200 p-4">
            <p className="font-medium" style={{ color: "var(--heading)" }}>
              {item.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--body-text)" }}>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
