import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

export function PlanBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("plan", settings);

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <p className="mt-3 leading-relaxed" style={{ color: "var(--body-text)" }}>
        {reportData.plan.intro}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {reportData.plan.groups.map((group) => (
          <div key={group.category} className="rounded-lg border border-slate-200 p-4">
            <h3
              className="font-semibold"
              style={{
                color: "var(--heading)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {group.category} <span className="font-normal text-slate-500 text-sm">({group.items.length})</span>
            </h3>
            {group.items.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--body-text)" }}>
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span style={{ color: "var(--accent)" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-slate-400 text-sm">None prescribed</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
