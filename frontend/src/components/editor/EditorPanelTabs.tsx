"use client";

import { cn } from "@/lib/cn";

export interface EditorPanelTab<T extends string> {
  id: T;
  label: string;
}

interface EditorPanelTabsProps<T extends string> {
  tabs: EditorPanelTab<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
}

export function EditorPanelTabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  "aria-label": ariaLabel = "Panel sections",
}: EditorPanelTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex gap-1 rounded-lg border border-app-border bg-app-bg p-1", className)}
    >
      {tabs.map((tab) => {
        const selected = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex-1 cursor-pointer rounded-md px-2 py-1.5 font-medium text-xs transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-1",
              selected ? "bg-app-surface text-app-heading shadow-sm" : "text-app-text hover:text-app-heading",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
