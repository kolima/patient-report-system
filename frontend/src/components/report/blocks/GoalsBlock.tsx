import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

export function GoalsBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("goals", settings);
  const showCurrent = settings.showCurrent !== false;
  const showTarget = settings.showTarget !== false;
  const showTimeframe = settings.showTimeframe !== false;

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <div className="mt-6 space-y-8">
        {reportData.goals.map((goal) => (
          <div key={goal.number} className="overflow-hidden rounded-xl border border-slate-200">
            <div className="px-5 py-4" style={{ backgroundColor: "var(--accent-soft)" }}>
              <p className="font-medium text-slate-500 text-sm">Goal {goal.number}</p>
              <h3
                className="mt-1 font-semibold text-lg"
                style={{
                  color: "var(--heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {goal.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--body-text)" }}>
                To {goal.addresses}
              </p>
              <p className="mt-2 text-slate-500 text-xs">
                {goal.categories.join(" · ")} · {goal.durationWeeks} weeks
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead
                  className="text-left text-xs uppercase tracking-wide"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--heading)",
                  }}
                >
                  <tr>
                    <th className="px-5 py-3">What we&apos;re measuring</th>
                    {showCurrent && <th className="px-5 py-3">Where you are now</th>}
                    {showTarget && <th className="px-5 py-3">Where we&apos;re heading</th>}
                    {showTimeframe && <th className="px-5 py-3">Timeframe</th>}
                  </tr>
                </thead>
                <tbody>
                  {goal.metrics.map((metric) => (
                    <tr key={metric.name} className="border-slate-100 border-t">
                      <td className="px-5 py-3 font-medium" style={{ color: "var(--heading)" }}>
                        {metric.name}
                      </td>
                      {showCurrent && (
                        <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                          {metric.current}
                        </td>
                      )}
                      {showTarget && (
                        <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                          {metric.target}
                        </td>
                      )}
                      {showTimeframe && (
                        <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                          {metric.timeframe}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
