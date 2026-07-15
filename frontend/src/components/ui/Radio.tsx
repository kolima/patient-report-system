import { forwardRef, type InputHTMLAttributes } from "react";
import {
  choiceBoxClasses,
  choiceInputClasses,
  choiceMarkClasses,
  choiceWrapperClasses,
} from "@/components/ui/choice-controls";
import { cn } from "@/lib/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

function RadioDot({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="4" fill="currentColor" />
    </svg>
  );
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ className, invalid, ...props }, ref) => (
  <span className={cn(choiceWrapperClasses, className)}>
    <input ref={ref} type="radio" aria-invalid={invalid || undefined} className={choiceInputClasses} {...props} />
    <span
      aria-hidden="true"
      className={cn(
        choiceBoxClasses,
        "rounded-full",
        invalid &&
          "border-red-400 group-has-[:checked]/choice:border-red-500 group-has-[:checked]/choice:bg-red-500 group-has-[:focus-visible]/choice:ring-red-500",
      )}
    >
      <RadioDot className={cn(choiceMarkClasses, "h-2 w-2")} />
    </span>
  </span>
));

Radio.displayName = "Radio";
