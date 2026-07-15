import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/cn";

interface BlockCheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function BlockCheckboxField({ label, checked, onChange, className }: BlockCheckboxFieldProps) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2.5 text-sm", className)}>
      <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}
