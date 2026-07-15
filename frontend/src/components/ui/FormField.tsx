import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, description, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("block text-sm", className)}>
      <label htmlFor={htmlFor} className="font-medium text-app-heading">
        {label}
      </label>
      {description && <p className="mt-0.5 text-app-text text-xs">{description}</p>}
      <div className="mt-1">{children}</div>
      {error && (
        <p className="mt-1 text-red-600 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section
      className={cn(
        "space-y-4 rounded-xl border border-app-border bg-app-surface p-6 shadow-[0_1px_2px_rgb(0_17_37/0.04)]",
        className,
      )}
    >
      <div>
        <h2 className="font-semibold text-app-heading text-base tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-app-text text-sm">{description}</p>}
      </div>
      {children}
    </section>
  );
}
