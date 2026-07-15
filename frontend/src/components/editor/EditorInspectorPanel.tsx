"use client";

import { BlockEmptyState, BlockSettingsSection, ThemeSettingsSection } from "@/components/editor/BlockSettingsPanel";
import { type EditorPanelTab, EditorPanelTabs } from "@/components/editor/EditorPanelTabs";
import { cn } from "@/lib/cn";
import type { Clinic, TemplateBlock, TemplateConfig } from "@/types";

export type InspectorTab = "block" | "theme";

const INSPECTOR_TABS: EditorPanelTab<InspectorTab>[] = [
  { id: "block", label: "Block" },
  { id: "theme", label: "Theme" },
];

interface EditorInspectorPanelProps {
  tab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  block: TemplateBlock | null;
  theme: TemplateConfig["theme"];
  clinic: Clinic | null;
  onUpdateBlock: (patch: Partial<TemplateBlock>) => void;
  onUpdateTheme: (patch: Partial<TemplateConfig["theme"]>) => void;
  onApplyTheme: (theme: TemplateConfig["theme"]) => void;
  className?: string;
}

export function EditorInspectorPanel({
  tab,
  onTabChange,
  block,
  theme,
  clinic,
  onUpdateBlock,
  onUpdateTheme,
  onApplyTheme,
  className,
}: EditorInspectorPanelProps) {
  return (
    <aside
      className={cn(
        "hidden w-72 shrink-0 flex-col overflow-hidden border-app-border border-l bg-app-surface lg:flex",
        className,
      )}
    >
      <div className="shrink-0 border-app-border border-b p-3">
        <EditorPanelTabs tabs={INSPECTOR_TABS} value={tab} onChange={onTabChange} aria-label="Inspector sections" />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "block" ? (
          block ? (
            <BlockSettingsSection block={block} onUpdateBlock={onUpdateBlock} />
          ) : (
            <BlockEmptyState />
          )
        ) : (
          <ThemeSettingsSection
            theme={theme}
            clinic={clinic}
            onUpdateTheme={onUpdateTheme}
            onApplyTheme={onApplyTheme}
          />
        )}
      </div>
    </aside>
  );
}

export function EditorInspectorPanelContent({
  tab,
  onTabChange,
  block,
  theme,
  clinic,
  onUpdateBlock,
  onUpdateTheme,
  onApplyTheme,
}: Omit<EditorInspectorPanelProps, "className">) {
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-app-border border-b p-3">
        <EditorPanelTabs tabs={INSPECTOR_TABS} value={tab} onChange={onTabChange} aria-label="Inspector sections" />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "block" ? (
          block ? (
            <BlockSettingsSection block={block} onUpdateBlock={onUpdateBlock} />
          ) : (
            <BlockEmptyState />
          )
        ) : (
          <ThemeSettingsSection
            theme={theme}
            clinic={clinic}
            onUpdateTheme={onUpdateTheme}
            onApplyTheme={onApplyTheme}
          />
        )}
      </div>
    </div>
  );
}
