import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

const STATUS_STYLES = {
  "AT RISK": "bg-amber-100 text-amber-800",
  "IN RANGE": "bg-emerald-100 text-emerald-800",
  OPTIMAL: "bg-sky-100 text-sky-800",
} as const;

const ROW_BORDER = {
  abnormal: "border-l-amber-400",
  inRange: "border-l-slate-300",
  optimal: "border-l-emerald-400",
} as const;

export function DeepDiveBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("deepDive", settings);
  const showRelevancy = settings.showRelevancy !== false;
  const showOptimalRange = settings.showOptimalRange !== false;

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <div className="mt-6 space-y-8">
        {reportData.deepDive.categories.map((category) => (
          <div key={category.name} className="overflow-hidden rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <h3
                className="font-semibold text-lg"
                style={{
                  color: "var(--heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {category.name}
              </h3>
              <span className={`rounded-full px-2.5 py-0.5 font-semibold text-xs ${STATUS_STYLES[category.status]}`}>
                {category.status}
              </span>
            </div>
            <div className="border-slate-100 border-t px-5 py-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--body-text)" }}>
                {category.narrative}
              </p>
              <p className="mt-3 text-slate-500 text-xs">
                Abnormal ({category.counts.abnormal}) · In Range ({category.counts.inRange}) · Optimal Range (
                {category.counts.optimal})
              </p>
            </div>
            <div className="overflow-x-auto border-slate-100 border-t">
              <table className="min-w-full text-sm">
                <thead
                  className="text-left text-xs uppercase tracking-wide"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--heading)",
                  }}
                >
                  <tr>
                    {showRelevancy && <th className="px-5 py-3">Relevancy</th>}
                    <th className="px-5 py-3">Biomarker</th>
                    <th className="px-5 py-3">Value</th>
                    <th className="px-5 py-3">Reference range</th>
                    {showOptimalRange && <th className="px-5 py-3">Optimal range</th>}
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {category.biomarkers.map((marker) => (
                    <tr
                      key={`${marker.name}-${marker.date}`}
                      className={`border-slate-100 border-t border-l-4 ${ROW_BORDER[marker.status]}`}
                    >
                      {showRelevancy && (
                        <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                          {marker.relevancy}
                        </td>
                      )}
                      <td className="px-5 py-3 font-medium" style={{ color: "var(--heading)" }}>
                        {marker.name}
                      </td>
                      <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                        {marker.value}
                      </td>
                      <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                        {marker.referenceRange}
                      </td>
                      {showOptimalRange && (
                        <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                          {marker.optimalRange}
                        </td>
                      )}
                      <td className="px-5 py-3" style={{ color: "var(--body-text)" }}>
                        {marker.date}
                      </td>
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
