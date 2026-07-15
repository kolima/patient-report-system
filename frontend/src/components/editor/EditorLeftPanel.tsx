"use client";

import { BlockOutline } from "@/components/editor/BlockOutline";
import { BlockPalette } from "@/components/editor/BlockPalette";
import { type EditorPanelTab, EditorPanelTabs } from "@/components/editor/EditorPanelTabs";
import { cn } from "@/lib/cn";
import type { BlockType, TemplateBlock } from "@/types";

export type LeftPanelTab = "blocks" | "outline";

const LEFT_PANEL_TABS: EditorPanelTab<LeftPanelTab>[] = [
  { id: "blocks", label: "Blocks" },
  { id: "outline", label: "Outline" },
];

interface EditorLeftPanelProps {
  tab: LeftPanelTab;
  onTabChange: (tab: LeftPanelTab) => void;
  blocks: TemplateBlock[];
  selectedBlockId: string | null;
  usedSingletonTypes: Set<BlockType>;
  onAddBlock: (type: BlockType) => void;
  onSelectBlock: (id: string) => void;
  className?: string;
}

export function EditorLeftPanel({
  tab,
  onTabChange,
  blocks,
  selectedBlockId,
  usedSingletonTypes,
  onAddBlock,
  onSelectBlock,
  className,
}: EditorLeftPanelProps) {
  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 flex-col overflow-hidden border-app-border border-r bg-app-surface lg:flex",
        className,
      )}
    >
      <div className="shrink-0 border-app-border border-b p-3">
        <EditorPanelTabs tabs={LEFT_PANEL_TABS} value={tab} onChange={onTabChange} aria-label="Add panel sections" />
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "blocks" ? (
          <BlockPalette usedSingletonTypes={usedSingletonTypes} onAddBlock={onAddBlock} />
        ) : (
          <div className="p-4">
            <BlockOutline blocks={blocks} selectedBlockId={selectedBlockId} onSelectBlock={onSelectBlock} />
          </div>
        )}
      </div>
    </aside>
  );
}

export function EditorLeftPanelContent({
  tab,
  onTabChange,
  blocks,
  selectedBlockId,
  usedSingletonTypes,
  onAddBlock,
  onSelectBlock,
}: Omit<EditorLeftPanelProps, "className">) {
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-app-border border-b p-3">
        <EditorPanelTabs tabs={LEFT_PANEL_TABS} value={tab} onChange={onTabChange} aria-label="Add panel sections" />
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "blocks" ? (
          <BlockPalette usedSingletonTypes={usedSingletonTypes} onAddBlock={onAddBlock} />
        ) : (
          <div className="p-4">
            <BlockOutline blocks={blocks} selectedBlockId={selectedBlockId} onSelectBlock={onSelectBlock} />
          </div>
        )}
      </div>
    </div>
  );
}
