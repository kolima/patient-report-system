"use client";

import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/cn";
import { BLOCK_LABELS, type BlockType, SINGLETON_BLOCKS } from "@/types";

interface BlockPaletteProps {
  usedSingletonTypes: Set<BlockType>;
  onAddBlock: (type: BlockType) => void;
  className?: string;
}

export const BLOCK_DESCRIPTIONS: Record<BlockType, string> = {
  header: "Patient intro and clinic logo",
  summary: "Overall health status",
  story: "Narrative health journey",
  goals: "Targets and progress",
  plan: "Recommended care plan",
  timeline: "Follow-up schedule and milestones",
  coach: "Guidance and coaching tips",
  deepDive: "Detailed biomarker breakdown",
  orders: "Lab and supplement orders",
  textBlock: "Free-form custom section",
  divider: "Visual section break",
  footer: "Contact info",
};

export const PALETTE_GROUPS: {
  title: string;
  description: string;
  blocks: BlockType[];
}[] = [
  {
    title: "Structure",
    description: "Frame the report layout",
    blocks: ["header", "footer", "divider"],
  },
  {
    title: "Content",
    description: "Patient data and narrative sections",
    blocks: ["summary", "story", "goals", "plan", "timeline", "coach", "deepDive", "orders"],
  },
  {
    title: "Custom",
    description: "Add your own content",
    blocks: ["textBlock"],
  },
];

function PaletteItem({ type, disabled, onAdd }: { type: BlockType; disabled: boolean; onAdd: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { paletteType: type, type },
    disabled,
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      disabled={disabled}
      onClick={onAdd}
      className={cn(
        "flex w-full items-start justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed border-app-border/50 bg-app-bg text-app-text/50"
          : "cursor-pointer border-app-border bg-app-surface text-app-heading hover:border-app-accent/40 hover:bg-app-accent-soft active:cursor-grabbing",
        isDragging && "opacity-50",
      )}
      {...listeners}
      {...attributes}
    >
      <span className="min-w-0">
        <span className="block font-medium">{BLOCK_LABELS[type]}</span>
        <span className={cn("mt-0.5 block text-xs", disabled ? "text-app-text/40" : "text-app-text")}>
          {BLOCK_DESCRIPTIONS[type]}
        </span>
      </span>
      {disabled ? (
        <span className="shrink-0 text-xs">In use</span>
      ) : (
        <span className="shrink-0 text-app-accent text-xs">+ Add</span>
      )}
    </button>
  );
}

export function BlockPalette({ usedSingletonTypes, onAddBlock, className }: BlockPaletteProps) {
  return (
    <div className={cn("p-4", className)}>
      <h2 className="font-semibold text-app-heading text-sm">Report blocks</h2>
      <p className="mt-1 text-app-text text-xs">
        Click or drag to add. With a block selected, new blocks insert below it.
      </p>
      <div className="mt-4 space-y-5">
        {PALETTE_GROUPS.map((group) => (
          <section key={group.title}>
            <h3 className="font-semibold text-app-heading text-xs uppercase tracking-wide">{group.title}</h3>
            <p className="mt-0.5 text-app-text text-xs">{group.description}</p>
            <div className="mt-2 space-y-2">
              {group.blocks.map((type) => {
                const disabled = SINGLETON_BLOCKS.includes(type) && usedSingletonTypes.has(type);
                return (
                  <PaletteItem key={type} type={type} disabled={disabled} onAdd={() => !disabled && onAddBlock(type)} />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
