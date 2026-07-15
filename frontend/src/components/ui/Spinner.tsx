import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <div className={cn("flex items-center gap-2 text-app-text text-sm", className)} role="status">
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-app-border border-t-app-accent"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
