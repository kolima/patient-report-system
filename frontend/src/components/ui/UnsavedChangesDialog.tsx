"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";

interface UnsavedChangesDialogProps {
  open: boolean;
  isSaving?: boolean;
  onSave: () => void;
  onContinue: () => void;
  onCancel: () => void;
}

export function UnsavedChangesDialog({
  open,
  isSaving = false,
  onSave,
  onContinue,
  onCancel,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
        <AlertDialogDescription>
          You have unsaved changes. Save before leaving, or continue without saving?
        </AlertDialogDescription>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={isSaving}>
            Stay
          </Button>
          <Button variant="danger" onClick={onContinue} disabled={isSaving}>
            Continue without saving
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
