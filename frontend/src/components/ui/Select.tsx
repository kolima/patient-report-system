"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const SELECT_DEFAULT_VALUE = "__default__";

const triggerClasses =
  "inline-flex w-full items-center justify-between gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-sm text-app-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-app-bg disabled:opacity-50";

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  onOpenChange,
  onBlur,
  placeholder = "Select…",
  disabled,
  invalid,
  id,
  className,
  children,
}: SelectProps) {
  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    if (!open) onBlur?.();
  };

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onOpenChange={handleOpenChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={invalid || undefined}
        className={cn(triggerClasses, invalid && "border-red-500 focus-visible:ring-red-500", className)}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-app-text">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 max-h-60 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-app-border bg-app-surface shadow-lg",
          )}
        >
          <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-app-heading text-sm outline-none",
      "focus:bg-app-accent-soft data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[highlighted]:bg-app-accent-soft",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
