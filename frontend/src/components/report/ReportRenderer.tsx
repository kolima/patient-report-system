import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { resolvedThemeToCssVars, resolveTheme } from "@/lib/theme";
import type { BlockSettings, ClinicBranding, ReportData, TemplateBlock, TemplateConfig } from "@/types";
import { CoachBlock } from "./blocks/CoachBlock";
import { DeepDiveBlock } from "./blocks/DeepDiveBlock";
import { DividerBlock } from "./blocks/DividerBlock";
import { FooterBlock } from "./blocks/FooterBlock";
import { GoalsBlock } from "./blocks/GoalsBlock";
import { HeaderBlock } from "./blocks/HeaderBlock";
import { OrdersBlock } from "./blocks/OrdersBlock";
import { PlanBlock } from "./blocks/PlanBlock";
import { StoryBlock } from "./blocks/StoryBlock";
import { SummaryBlock } from "./blocks/SummaryBlock";
import { TextBlock } from "./blocks/TextBlock";
import { TimelineBlock } from "./blocks/TimelineBlock";

interface ReportRendererProps {
  config: TemplateConfig;
  reportData: ReportData;
  clinicBranding?: ClinicBranding | null;
  className?: string;
  editorMode?: boolean;
}

function renderBlock(block: TemplateBlock, reportData: ReportData, clinicBranding: ClinicBranding | null | undefined) {
  if (!block.visible) return null;

  const props = { reportData, settings: block.settings, clinicBranding };

  switch (block.type) {
    case "header":
      return <HeaderBlock key={block.id} {...props} />;
    case "summary":
      return <SummaryBlock key={block.id} {...props} />;
    case "story":
      return <StoryBlock key={block.id} {...props} />;
    case "goals":
      return <GoalsBlock key={block.id} {...props} />;
    case "plan":
      return <PlanBlock key={block.id} {...props} />;
    case "timeline":
      return <TimelineBlock key={block.id} {...props} />;
    case "coach":
      return <CoachBlock key={block.id} {...props} />;
    case "deepDive":
      return <DeepDiveBlock key={block.id} {...props} />;
    case "orders":
      return <OrdersBlock key={block.id} {...props} />;
    case "textBlock":
      return <TextBlock key={block.id} {...props} />;
    case "divider":
      return <DividerBlock key={block.id} />;
    case "footer":
      return <FooterBlock key={block.id} {...props} />;
    default:
      return null;
  }
}

export function ReportRenderer({
  config,
  reportData,
  clinicBranding,
  className = "",
  editorMode = false,
}: ReportRendererProps) {
  const resolved = resolveTheme(config.theme, clinicBranding);
  const densityClass = resolved.density === "compact" ? "space-y-6" : "space-y-10";
  const cssVars = resolvedThemeToCssVars(resolved) as CSSProperties;

  return (
    <article
      className={cn(
        "mx-auto max-w-4xl",
        editorMode ? "bg-white px-8 py-6" : "px-8 py-10 shadow-sm ring-1 ring-slate-200",
        densityClass,
        className,
      )}
      style={cssVars}
    >
      {config.blocks.map((block) => renderBlock(block, reportData, clinicBranding))}
    </article>
  );
}

export type BlockComponentProps = {
  reportData: ReportData;
  settings: BlockSettings;
  clinicBranding?: ClinicBranding | null;
};
