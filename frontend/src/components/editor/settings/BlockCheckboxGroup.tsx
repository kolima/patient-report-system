import { BlockCheckboxField } from "@/components/editor/settings/BlockCheckboxField";
import type { TemplateBlock } from "@/types";

interface BlockCheckboxGroupProps {
  title?: string;
  options: readonly (readonly [string, string])[];
  settings: TemplateBlock["settings"];
  onUpdateSettings: (patch: Partial<TemplateBlock["settings"]>) => void;
}

export function BlockCheckboxGroup({ title, options, settings, onUpdateSettings }: BlockCheckboxGroupProps) {
  return (
    <div className="space-y-2 text-sm">
      {title && <p className="text-app-text">{title}</p>}
      {options.map(([key, label]) => (
        <BlockCheckboxField
          key={key}
          label={label}
          checked={settings[key as keyof typeof settings] !== false}
          onChange={(checked) => onUpdateSettings({ [key]: checked })}
        />
      ))}
    </div>
  );
}
