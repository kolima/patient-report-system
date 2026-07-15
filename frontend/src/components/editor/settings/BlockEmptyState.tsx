import { cn } from "@/lib/cn";

export function BlockEmptyState({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-app-border border-dashed bg-app-bg p-6 text-center", className)}>
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-app-surface text-app-text ring-1 ring-app-border">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 6h12M4 10h12M4 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="mt-3 font-medium text-app-heading text-sm">No block selected</p>
      <p className="mt-1 text-app-text text-xs">Click a block on the canvas or in the outline to edit its settings.</p>
    </div>
  );
}
