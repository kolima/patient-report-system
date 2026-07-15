"use client";

import { BLOCK_DESCRIPTIONS } from "@/components/editor/BlockPalette";
import { cn } from "@/lib/cn";
import { BLOCK_LABELS, type BlockType } from "@/types";

const QUICK_START_BLOCKS: BlockType[] = ["header", "summary", "footer"];

interface EditorEmptyStateProps {
  onAddBlock: (type: BlockType) => void;
  isDesktop: boolean;
  className?: string;
}

export function EditorEmptyState({ onAddBlock, isDesktop, className }: EditorEmptyStateProps) {
  return (
    <div className={cn("rounded-lg border-2 border-app-border border-dashed bg-app-surface p-6 sm:p-8", className)}>
      <div className="text-center">
        <p className="font-semibold text-app-heading text-lg">Start building your report</p>
        <p className="mx-auto mt-2 max-w-md text-app-text text-sm">
          Add a few key sections to get started, or browse the full block library in the{" "}
          {isDesktop ? "left panel" : "Add drawer"}.
        </p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {QUICK_START_BLOCKS.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onAddBlock(type)}
            className={cn(
              "rounded-lg border border-app-border bg-app-bg px-4 py-3 text-left transition",
              "hover:border-app-accent/40 hover:bg-app-accent-soft",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
            )}
          >
            <span className="block font-medium text-app-heading text-sm">{BLOCK_LABELS[type]}</span>
            <span className="mt-1 block text-app-text text-xs">{BLOCK_DESCRIPTIONS[type]}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-app-text text-xs">
        Or browse all blocks in the {isDesktop ? "Blocks tab" : "Add drawer"}.
      </p>
    </div>
  );
}
