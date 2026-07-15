import { BlockCheckboxField } from "@/components/editor/settings/BlockCheckboxField";
import { Radio } from "@/components/ui/Radio";
import { cn } from "@/lib/cn";
import type { HeaderLayout, TemplateBlock } from "@/types";

interface HeaderBlockSettingsProps {
  block: TemplateBlock;
  onUpdateBlock: (patch: Partial<TemplateBlock>) => void;
}

const HEADER_LAYOUTS = [
  ["classic", "Classic"],
  ["banner", "Banner"],
  ["centered", "Centered"],
] as const;

export function HeaderBlockSettings({ block, onUpdateBlock }: HeaderBlockSettingsProps) {
  const updateSettings = (patch: Partial<TemplateBlock["settings"]>) => {
    onUpdateBlock({ settings: { ...block.settings, ...patch } });
  };

  return (
    <>
      <fieldset className="text-sm">
        <legend className="text-app-text">Header layout</legend>
        <div className="mt-2 space-y-1">
          {HEADER_LAYOUTS.map(([value, label]) => {
            const selected = (block.settings.layout ?? "classic") === value;
            return (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors",
                  selected ? "bg-app-accent-soft font-medium text-app-heading" : "text-app-heading hover:bg-app-bg",
                )}
              >
                <Radio
                  name="header-layout"
                  checked={selected}
                  onChange={() => updateSettings({ layout: value as HeaderLayout })}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <BlockCheckboxField
        label="Show logo"
        checked={block.settings.showLogo !== false}
        onChange={(checked) => updateSettings({ showLogo: checked })}
      />
    </>
  );
}
