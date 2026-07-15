import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

export function TimelineBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("timeline", settings);
  const showPlanCheckIns = settings.showPlanCheckIns !== false;
  const { subtitle, phases } = reportData.timeline;

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
        {subtitle}
      </p>
      <div className="mt-6 space-y-4">
        {phases.map((phase) => {
          const hasMilestones = phase.milestones.length > 0;
          const hasPlanCheckIns = showPlanCheckIns && phase.planCheckIns.length > 0;
          if (!hasMilestones && !hasPlanCheckIns) return null;

          return (
            <div key={phase.label} className="overflow-hidden rounded-xl border border-slate-200">
              <div className="px-5 py-3" style={{ backgroundColor: "var(--accent-soft)" }}>
                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {phase.label}
                </h3>
              </div>
              <div className={`grid gap-0 ${showPlanCheckIns ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                {hasMilestones && (
                  <div className="border-slate-100 border-b p-4 sm:border-r sm:border-b-0">
                    <p className="font-medium text-slate-500 text-xs uppercase tracking-wide">Milestones</p>
                    <ul className="mt-2 space-y-1.5 text-sm" style={{ color: "var(--body-text)" }}>
                      {phase.milestones.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span style={{ color: "var(--accent)" }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasPlanCheckIns && (
                  <div className="p-4">
                    <p className="font-medium text-slate-500 text-xs uppercase tracking-wide">Plan check-ins</p>
                    <ul className="mt-2 space-y-1.5 text-sm" style={{ color: "var(--body-text)" }}>
                      {phase.planCheckIns.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span style={{ color: "var(--accent)" }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
