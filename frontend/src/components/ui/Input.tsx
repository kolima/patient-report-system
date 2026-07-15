import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const fieldClasses =
  "w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-heading placeholder:text-app-text/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-app-bg disabled:opacity-50";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(fieldClasses, invalid && "border-red-500 focus-visible:ring-red-500", className)}
    {...props}
  />
));

Input.displayName = "Input";
