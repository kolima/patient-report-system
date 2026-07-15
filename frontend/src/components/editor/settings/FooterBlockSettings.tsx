import { BlockCheckboxField } from "@/components/editor/settings/BlockCheckboxField";
import { Textarea } from "@/components/ui/Textarea";
import type { TemplateBlock } from "@/types";

interface FooterBlockSettingsProps {
  block: TemplateBlock;
  onUpdateBlock: (patch: Partial<TemplateBlock>) => void;
}

export function FooterBlockSettings({ block, onUpdateBlock }: FooterBlockSettingsProps) {
  const updateSettings = (patch: Partial<TemplateBlock["settings"]>) => {
    onUpdateBlock({ settings: { ...block.settings, ...patch } });
  };

  return (
    <>
      <BlockCheckboxField
        label="Show logo"
        checked={block.settings.showLogo !== false}
        onChange={(checked) => updateSettings({ showLogo: checked })}
      />
      <BlockCheckboxField
        label="Show contact info"
        checked={block.settings.showContact !== false}
        onChange={(checked) => updateSettings({ showContact: checked })}
      />
      <label className="block text-sm">
        <span className="text-app-text">Disclaimer override</span>
        <Textarea
          value={block.settings.customText ?? ""}
          onChange={(e) => updateSettings({ customText: e.target.value || undefined })}
          rows={4}
          className="mt-1"
          placeholder="Uses clinic disclaimer if empty"
        />
      </label>
    </>
  );
}
