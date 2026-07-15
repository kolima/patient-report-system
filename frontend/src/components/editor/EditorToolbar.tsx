"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

interface EditorToolbarProps {
  templateName: string;
  isDirty: boolean;
  isSaving: boolean;
  isDesktop: boolean;
  onTemplateNameChange: (name: string) => void;
  onBack: () => void;
  onReset: () => void;
  onPreview: () => void;
  onSave: () => void;
  onOpenAdd?: () => void;
  onOpenInspector?: () => void;
  className?: string;
}

export function EditorToolbar({
  templateName,
  isDirty,
  isSaving,
  isDesktop,
  onTemplateNameChange,
  onBack,
  onReset,
  onPreview,
  onSave,
  onOpenAdd,
  onOpenInspector,
  className,
}: EditorToolbarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-app-border border-b bg-app-surface/95 px-4 py-3 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="text-app-text text-sm hover:text-app-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2"
          >
            ← Templates
          </button>
          {!isDesktop && onOpenAdd && onOpenInspector && (
            <>
              <Button variant="secondary" className="py-1.5" onClick={onOpenAdd}>
                Add
              </Button>
              <Button variant="secondary" className="py-1.5" onClick={onOpenInspector}>
                Inspector
              </Button>
            </>
          )}
        </div>
        <Input
          value={templateName}
          onChange={(e) => onTemplateNameChange(e.target.value)}
          className="min-w-0 max-w-xs flex-1 font-medium"
          aria-label="Template name"
        />
        {isDirty && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800 text-xs">
            Unsaved
          </span>
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <Button variant="secondary" className="py-1.5" onClick={onReset} disabled={!isDirty}>
          Reset
        </Button>
        <Button variant="secondary" className="py-1.5" onClick={onPreview}>
          Preview
        </Button>
        <Button className="py-1.5" onClick={onSave} disabled={isSaving || !isDirty}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
