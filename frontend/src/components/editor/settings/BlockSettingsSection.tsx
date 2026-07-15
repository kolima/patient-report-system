import { BlockCheckboxField } from "@/components/editor/settings/BlockCheckboxField";
import { BlockCheckboxGroup } from "@/components/editor/settings/BlockCheckboxGroup";
import { FooterBlockSettings } from "@/components/editor/settings/FooterBlockSettings";
import { HeaderBlockSettings } from "@/components/editor/settings/HeaderBlockSettings";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import {
  BLOCK_LABELS,
  DEFAULT_TEXT_BLOCK_BODY_PLACEHOLDER,
  getBlockTitlePlaceholder,
  type TemplateBlock,
} from "@/types";

interface BlockSettingsSectionProps {
  block: TemplateBlock;
  onUpdateBlock: (patch: Partial<TemplateBlock>) => void;
  className?: string;
}

export function BlockSettingsSection({ block, onUpdateBlock, className }: BlockSettingsSectionProps) {
  const updateSettings = (patch: Partial<TemplateBlock["settings"]>) => {
    onUpdateBlock({ settings: { ...block.settings, ...patch } });
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <p className="font-medium text-app-heading text-sm">Block settings</p>
        <p className="mt-0.5 text-app-text text-xs">{BLOCK_LABELS[block.type]}</p>
      </div>

      {block.type === "header" && <HeaderBlockSettings block={block} onUpdateBlock={onUpdateBlock} />}

      {block.type === "footer" && <FooterBlockSettings block={block} onUpdateBlock={onUpdateBlock} />}

      {block.type !== "header" && block.type !== "divider" && block.type !== "footer" && (
        <label className="block text-sm">
          <span className="text-app-text">Section title</span>
          <Input
            type="text"
            value={block.settings.title ?? ""}
            placeholder={getBlockTitlePlaceholder(block.type)}
            onChange={(e) => updateSettings({ title: e.target.value || undefined })}
            className="mt-1"
          />
        </label>
      )}

      {block.type === "textBlock" && (
        <label className="block text-sm">
          <span className="text-app-text">Custom text</span>
          <Textarea
            value={block.settings.customText ?? ""}
            placeholder={DEFAULT_TEXT_BLOCK_BODY_PLACEHOLDER}
            onChange={(e) => updateSettings({ customText: e.target.value })}
            rows={5}
            className="mt-1"
          />
        </label>
      )}

      {block.type === "goals" && (
        <BlockCheckboxGroup
          title="Table columns"
          options={[
            ["showCurrent", "Show current values"],
            ["showTarget", "Show target values"],
            ["showTimeframe", "Show timeframe"],
          ]}
          settings={block.settings}
          onUpdateSettings={updateSettings}
        />
      )}

      {block.type === "timeline" && (
        <BlockCheckboxField
          label="Show plan check-ins"
          checked={block.settings.showPlanCheckIns !== false}
          onChange={(checked) => updateSettings({ showPlanCheckIns: checked })}
        />
      )}

      {block.type === "coach" && (
        <BlockCheckboxGroup
          options={[
            ["showCommonQuestions", "Show common questions"],
            ["showTips", "Show tips"],
          ]}
          settings={block.settings}
          onUpdateSettings={updateSettings}
        />
      )}

      {block.type === "deepDive" && (
        <BlockCheckboxGroup
          title="Table columns"
          options={[
            ["showRelevancy", "Show relevancy"],
            ["showOptimalRange", "Show optimal range"],
          ]}
          settings={block.settings}
          onUpdateSettings={updateSettings}
        />
      )}

      <BlockCheckboxField
        label="Visible in report"
        checked={block.visible}
        onChange={(checked) => onUpdateBlock({ visible: checked })}
      />
    </div>
  );
}
