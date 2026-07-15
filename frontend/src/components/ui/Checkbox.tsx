import { forwardRef, type InputHTMLAttributes } from "react";
import {
  choiceBoxClasses,
  choiceInputClasses,
  choiceMarkClasses,
  choiceWrapperClasses,
} from "@/components/ui/choice-controls";
import { cn } from "@/lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.25 6.25 4.75 8.75 9.75 3.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, invalid, ...props }, ref) => (
  <span className={cn(choiceWrapperClasses, className)}>
    <input ref={ref} type="checkbox" aria-invalid={invalid || undefined} className={choiceInputClasses} {...props} />
    <span
      aria-hidden="true"
      className={cn(
        choiceBoxClasses,
        "rounded-[0.25rem]",
        invalid &&
          "border-red-400 group-has-[:checked]/choice:border-red-500 group-has-[:checked]/choice:bg-red-500 group-has-[:focus-visible]/choice:ring-red-500",
      )}
    >
      <CheckIcon className={cn(choiceMarkClasses, "h-2.5 w-2.5")} />
    </span>
  </span>
));

Checkbox.displayName = "Checkbox";
