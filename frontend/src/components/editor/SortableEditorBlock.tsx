"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ReportRenderer } from "@/components/report/ReportRenderer";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { BLOCK_LABELS, type ClinicBranding, type ReportData, type TemplateBlock, type TemplateConfig } from "@/types";

interface SortableEditorBlockProps {
  block: TemplateBlock;
  config: TemplateConfig;
  reportData: ReportData;
  clinicBranding?: ClinicBranding | null;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onToggleVisible: () => void;
}

function GripIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <circle cx="3" cy="2" r="1" />
      <circle cx="9" cy="2" r="1" />
      <circle cx="3" cy="6" r="1" />
      <circle cx="9" cy="6" r="1" />
      <circle cx="3" cy="10" r="1" />
      <circle cx="9" cy="10" r="1" />
    </svg>
  );
}

export function SortableEditorBlock({
  block,
  config,
  reportData,
  clinicBranding,
  selected,
  onSelect,
  onRemove,
  onToggleVisible,
}: SortableEditorBlockProps) {
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    data: { type: block.type },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const singleBlockConfig: TemplateConfig = {
    ...config,
    blocks: [block],
  };

  return (
    <div id={`editor-block-${block.id}`} ref={setNodeRef} style={style} className="group relative z-10 mb-1">
      <div
        className={cn(
          "relative z-30 mb-1 flex gap-1 transition",
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        <button
          type="button"
          className="flex cursor-grab items-center gap-1 rounded bg-app-surface px-2 py-1 text-app-heading text-xs shadow ring-1 ring-app-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag to reorder"
          aria-grabbed={isDragging}
          {...attributes}
          {...listeners}
        >
          <GripIcon />
          <span>Drag</span>
        </button>
        <button
          type="button"
          className="cursor-pointer rounded bg-app-surface px-2 py-1 text-app-heading text-xs shadow ring-1 ring-app-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisible();
          }}
          aria-label={block.visible ? "Hide block" : "Show block"}
        >
          {block.visible ? "Hide" : "Show"}
        </button>
        <button
          type="button"
          className="cursor-pointer rounded bg-app-surface px-2 py-1 text-red-600 text-xs shadow ring-1 ring-app-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmRemoveOpen(true);
          }}
          aria-label={`Remove ${BLOCK_LABELS[block.type]}`}
        >
          Remove
        </button>
      </div>
      <button
        type="button"
        className={cn(
          "relative block w-full cursor-pointer rounded-lg text-left ring-2 transition",
          selected ? "ring-app-accent ring-offset-1" : "ring-transparent hover:ring-app-accent/30",
          !block.visible && "opacity-60",
        )}
        onClick={onSelect}
      >
        <div className="pointer-events-none">
          <div
            className={cn(
              "absolute top-2 right-2 z-10 rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide",
              selected ? "bg-app-heading/80 text-white" : "bg-app-heading/40 text-white/90",
            )}
          >
            {BLOCK_LABELS[block.type]}
            {!block.visible && " · Hidden"}
          </div>
          <ReportRenderer
            config={singleBlockConfig}
            reportData={reportData}
            clinicBranding={clinicBranding}
            editorMode
            className="!shadow-none !ring-0"
          />
        </div>
      </button>

      <Modal
        open={confirmRemoveOpen}
        title="Remove this block?"
        confirmLabel="Remove"
        confirmVariant="danger"
        onConfirm={() => {
          setConfirmRemoveOpen(false);
          onRemove();
        }}
        onCancel={() => setConfirmRemoveOpen(false)}
      >
        <p className="text-app-text text-sm">
          Remove <strong>{BLOCK_LABELS[block.type]}</strong> from this template? You can add it again from the block
          palette.
        </p>
      </Modal>
    </div>
  );
}
