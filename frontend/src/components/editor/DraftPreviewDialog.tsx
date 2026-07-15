"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";
import { ReportRenderer } from "@/components/report/ReportRenderer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ClinicBranding, ReportData, TemplateConfig } from "@/types";

interface DraftPreviewDialogProps {
  open: boolean;
  templateId: string;
  templateName: string;
  config: TemplateConfig;
  reportData: ReportData;
  clinicBranding?: ClinicBranding | null;
  onClose: () => void;
}

export function DraftPreviewDialog({
  open,
  templateId,
  templateName,
  config,
  reportData,
  clinicBranding,
  onClose,
}: DraftPreviewDialogProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-app-primary/40" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-4 z-50 flex flex-col overflow-hidden rounded-xl border border-app-border bg-app-bg shadow-xl sm:inset-6 lg:inset-10",
          )}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-app-border border-b bg-app-surface px-4 py-3">
            <div className="min-w-0">
              <DialogPrimitive.Title className="truncate font-semibold text-app-heading text-sm">
                Preview: {templateName}
              </DialogPrimitive.Title>
              <p className="mt-0.5 text-app-text text-xs">Shows your current draft, including unsaved changes.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/report?templateId=${templateId}`}
                className="text-app-accent text-xs hover:underline"
                title="Opens the saved version on the full report page"
              >
                Open full page
              </Link>
              <DialogPrimitive.Close asChild>
                <Button variant="secondary" className="py-1.5">
                  Close
                </Button>
              </DialogPrimitive.Close>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="mx-auto max-w-4xl">
              <ReportRenderer config={config} reportData={reportData} clinicBranding={clinicBranding} />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
