"use client";

import { BLOCK_DESCRIPTIONS } from "@/components/editor/BlockPalette";
import { cn } from "@/lib/cn";
import {
  BLOCK_LABELS,
  DEFAULT_TEXT_BLOCK_BODY_PLACEHOLDER,
  getBlockTitlePlaceholder,
  type TemplateBlock,
} from "@/types";

interface BlockOutlineProps {
  blocks: TemplateBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  className?: string;
}

export function BlockOutline({ blocks, selectedBlockId, onSelectBlock, className }: BlockOutlineProps) {
  if (blocks.length === 0) {
    return (
      <div className={cn("rounded-lg border border-app-border border-dashed bg-app-bg p-6 text-center", className)}>
        <p className="font-medium text-app-heading text-sm">No sections yet</p>
        <p className="mt-1 text-app-text text-xs">Add blocks from the Blocks tab to build your report.</p>
      </div>
    );
  }

  return (
    <ol className={cn("space-y-1", className)}>
      {blocks.map((block, index) => {
        const selected = selectedBlockId === block.id;
        const customTitle = block.settings.title?.trim();
        const placeholder = getBlockTitlePlaceholder(block.type);
        const displayTitle = customTitle || placeholder || BLOCK_LABELS[block.type];
        const isTitlePlaceholder = !customTitle && Boolean(placeholder);
        const customText = block.settings.customText?.trim();
        const displaySubtitle =
          block.type === "textBlock"
            ? customText || DEFAULT_TEXT_BLOCK_BODY_PLACEHOLDER
            : BLOCK_DESCRIPTIONS[block.type];
        const isSubtitlePlaceholder = block.type === "textBlock" && !customText;

        return (
          <li key={block.id}>
            <button
              type="button"
              onClick={() => onSelectBlock(block.id)}
              className={cn(
                "w-full rounded-md border px-3 py-2 text-left text-sm transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-1",
                selected
                  ? "border-app-accent/40 bg-app-accent-soft text-app-heading"
                  : "border-transparent bg-app-surface text-app-heading hover:border-app-border hover:bg-app-bg",
              )}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-2 gap-y-0.5">
                <span className="font-medium text-app-text text-xs tabular-nums">{index + 1}</span>
                <span className={cn("truncate font-medium", isTitlePlaceholder && "text-app-text")}>
                  {displayTitle}
                </span>
                <span
                  className={cn(
                    "col-start-2 truncate text-xs",
                    isSubtitlePlaceholder ? "text-app-text/60" : "text-app-text",
                  )}
                >
                  {displaySubtitle}
                  {!block.visible && <span className="ml-1.5 text-amber-700">· Hidden</span>}
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
