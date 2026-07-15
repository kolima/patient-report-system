import { cn } from "@/lib/cn";
import { Button } from "./Button";

type AlertVariant = "error" | "success" | "info";

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const variantClasses: Record<AlertVariant, string> = {
  error: "bg-red-50 text-red-800 ring-red-200",
  success: "bg-green-50 text-green-800 ring-green-200",
  info: "bg-app-accent-soft text-app-heading ring-app-accent/30",
};

export function Alert({ variant = "info", children, className, onRetry, onDismiss }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start justify-between gap-3 rounded-md p-3 text-sm ring-1 ring-inset",
        variantClasses[variant],
        className,
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <div className="flex shrink-0 gap-2">
        {onRetry && (
          <Button variant="ghost" className="px-2 py-1 text-xs" onClick={onRetry}>
            Retry
          </Button>
        )}
        {onDismiss && (
          <Button variant="ghost" className="px-2 py-1 text-xs" onClick={onDismiss} aria-label="Dismiss">
            Dismiss
          </Button>
        )}
      </div>
    </div>
  );
}
