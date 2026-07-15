"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/Input";
import { isValidHexColor, normalizeHexInput } from "@/lib/clinic-form-validation";
import { cn } from "@/lib/cn";

interface ColorFieldProps {
  label: string;
  value: string;
  fallbackColor?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  nullable?: boolean;
  onClear?: () => void;
  className?: string;
}

export function ColorField({
  label,
  value,
  fallbackColor = "#000000",
  onChange,
  onBlur,
  error,
  nullable = false,
  onClear,
  className,
}: ColorFieldProps) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const displayValue = value || fallbackColor;
  const hexInputValue = draft ?? value;
  const hexInvalid = hexInputValue.length > 0 && !isValidHexColor(hexInputValue);

  const handlePickerChange = (next: string) => {
    setDraft(null);
    onChange(next);
  };

  const handleHexChange = (next: string) => {
    const normalized = normalizeHexInput(next);
    setDraft(normalized);

    if (!normalized) {
      if (nullable) onChange("");
      return;
    }

    if (isValidHexColor(normalized)) {
      setDraft(null);
      onChange(normalized);
    }
  };

  const handleHexBlur = () => {
    if (draft !== null) {
      if (draft && isValidHexColor(draft)) {
        onChange(draft);
      }
      setDraft(null);
    }
    onBlur?.();
  };

  return (
    <div className={cn("space-y-1", className)}>
      <label htmlFor={id} className="block text-app-text text-sm">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id={id}
          type="color"
          value={displayValue}
          onChange={(e) => handlePickerChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            "h-10 w-14 cursor-pointer rounded border border-app-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent",
            (error || hexInvalid) && "border-red-500",
          )}
          aria-label={`${label} picker`}
        />
        <Input
          type="text"
          value={hexInputValue}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={handleHexBlur}
          placeholder="#RRGGBB"
          className="w-28 font-mono text-xs"
          invalid={!!error || hexInvalid}
          aria-label={`${label} hex value`}
          spellCheck={false}
        />
        {nullable &&
          (value ? (
            <button
              type="button"
              className="cursor-pointer text-app-text text-xs hover:text-app-heading"
              onClick={onClear}
            >
              Use default
            </button>
          ) : (
            <span className="text-app-text text-xs">Using template default</span>
          ))}
      </div>
      {(error || hexInvalid) && (
        <p className="text-red-600 text-xs" role="alert">
          {error || "Enter a valid hex color (#RRGGBB)"}
        </p>
      )}
    </div>
  );
}
