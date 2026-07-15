import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-app-primary text-white hover:bg-app-primary/90 disabled:hover:bg-app-primary",
  secondary:
    "border border-app-border bg-app-surface text-app-heading hover:border-app-accent/40 hover:bg-app-accent-soft/40 disabled:hover:bg-app-surface",
  danger: "border border-red-200 bg-app-surface text-red-600 hover:bg-red-50 disabled:hover:bg-app-surface",
  ghost: "text-app-text hover:bg-app-accent-soft/50 hover:text-app-heading disabled:hover:bg-transparent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg px-3.5 py-2 font-medium text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
