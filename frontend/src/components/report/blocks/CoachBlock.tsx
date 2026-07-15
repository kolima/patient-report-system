import { resolveBlockTitle } from "@/types";
import type { BlockComponentProps } from "../ReportRenderer";

function GuideSection({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--accent)" }}>
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--body-text)" }}>
        {children}
      </p>
    </div>
  );
}

export function CoachBlock({ reportData, settings }: BlockComponentProps) {
  const title = resolveBlockTitle("coach", settings);
  const showCommonQuestions = settings.showCommonQuestions !== false;
  const showTips = settings.showTips !== false;
  const { subtitle, guides } = reportData.coach;

  return (
    <section>
      <h2 className="font-semibold text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
        {subtitle}
      </p>
      <div className="mt-6 space-y-6">
        {guides.map((guide) => (
          <div key={guide.title} className="overflow-hidden rounded-xl border border-slate-200">
            <div className="px-5 py-4" style={{ backgroundColor: "var(--accent-soft)" }}>
              <h3
                className="font-semibold text-lg"
                style={{
                  color: "var(--heading)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {guide.title}
              </h3>
              <p className="mt-1 text-slate-500 text-sm">{guide.subtitle}</p>
            </div>
            <div className="space-y-4 p-5">
              <GuideSection label="What to do">{guide.whatToDo}</GuideSection>
              <GuideSection label="Why it matters">{guide.whyItMatters}</GuideSection>
              {guide.howItWorks && <GuideSection label="How it works">{guide.howItWorks}</GuideSection>}
              <GuideSection label="Week 1 plan">{guide.week1Plan}</GuideSection>
              {guide.eatAvoid && <GuideSection label="What to eat / what to avoid">{guide.eatAvoid}</GuideSection>}
              {showCommonQuestions && guide.commonQuestions.length > 0 && (
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--accent)" }}>
                    Common questions
                  </p>
                  <dl className="mt-2 space-y-3">
                    {guide.commonQuestions.map((qa) => (
                      <div key={qa.question}>
                        <dt className="font-medium text-sm" style={{ color: "var(--heading)" }}>
                          {qa.question}
                        </dt>
                        <dd className="mt-0.5 text-sm" style={{ color: "var(--body-text)" }}>
                          {qa.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {showTips && guide.tip && (
                <div
                  className="rounded-lg border border-slate-200 px-4 py-3 text-sm"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--body-text)",
                  }}
                >
                  <span className="font-semibold" style={{ color: "var(--accent)" }}>
                    Tip:{" "}
                  </span>
                  {guide.tip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
