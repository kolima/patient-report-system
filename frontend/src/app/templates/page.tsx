"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageHeaderSkeleton, TemplateListSkeleton } from "@/components/ui/Skeleton";
import { useClinic } from "@/lib/clinic-context";
import { cn } from "@/lib/cn";
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useSetDefaultTemplateMutation,
  useTemplatesQuery,
} from "@/lib/queries";
import { showError, showSuccess } from "@/lib/toast";
import type { Template } from "@/types";

const iconActionClass = cn(
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-app-border bg-app-surface text-app-heading",
  "hover:border-app-accent/40 hover:bg-app-accent-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
);

const iconGhostClass = cn(
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-app-text",
  "hover:bg-app-bg hover:text-app-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.5 2.5a1.5 1.5 0 0 1 2.12 2.12L5.5 12.74 2 13.5l.76-3.5L11.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PreviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.75 9.76 5.8l4.44.4-3.36 2.92.98 4.35L8 11.4l-3.82 2.07.98-4.35L1.8 6.2l4.44-.4L8 1.75Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 4.5h9M6 4.5V3.25A.75.75 0 0 1 6.75 2.5h2.5a.75.75 0 0 1 .75.75V4.5M12.25 4.5l-.6 8.1a1 1 0 0 1-1 .9H5.35a1 1 0 0 1-1-.9l-.6-8.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TemplatesPage() {
  const { clinicId } = useClinic();
  const { data: templates = [], isLoading, error: queryError, refetch } = useTemplatesQuery(clinicId);
  const createTemplate = useCreateTemplateMutation(clinicId ?? "");
  const deleteTemplate = useDeleteTemplateMutation(clinicId ?? "");
  const setDefaultTemplate = useSetDefaultTemplateMutation(clinicId ?? "");

  const [deleteTarget, setDeleteTarget] = useState<Template | null>(null);

  const loadError = queryError instanceof Error ? queryError.message : queryError ? "Failed to load templates" : null;

  const handleCreate = async (from: "base" | "blank") => {
    if (!clinicId) return;
    try {
      const name = from === "base" ? "New Standard Report" : "New Blank Report";
      const template = await createTemplate.mutateAsync({ name, from });
      window.location.href = `/templates/${template.id}/edit`;
    } catch (e) {
      showError(e instanceof Error ? e.message : "Failed to create template");
    }
  };

  const handleDelete = async () => {
    if (!clinicId || !deleteTarget) return;
    try {
      await deleteTemplate.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      showSuccess("Template deleted.");
    } catch (e) {
      showError(e instanceof Error ? e.message : "Failed to delete template");
      setDeleteTarget(null);
    }
  };

  const handleSetDefault = async (templateId: string) => {
    if (!clinicId) return;
    try {
      await setDefaultTemplate.mutateAsync(templateId);
      showSuccess("Default template updated.");
    } catch (e) {
      showError(e instanceof Error ? e.message : "Failed to set default");
    }
  };

  if (!clinicId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <PageHeaderSkeleton withActions />
        <TemplateListSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader
        title="Templates"
        description="Manage report layouts for the selected clinic."
        actions={
          <>
            <Button variant="secondary" disabled={createTemplate.isPending} onClick={() => handleCreate("blank")}>
              From blank
            </Button>
            <Button disabled={createTemplate.isPending} onClick={() => handleCreate("base")}>
              {createTemplate.isPending ? "Creating..." : "From base template"}
            </Button>
          </>
        }
      />

      {loadError && (
        <Alert variant="error" className="mt-4" onRetry={() => void refetch()}>
          {loadError}
        </Alert>
      )}

      {isLoading ? (
        <TemplateListSkeleton />
      ) : templates.length === 0 ? (
        <div className="mt-12 rounded-xl border border-app-border border-dashed bg-app-surface/80 p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-app-accent-soft text-app-accent text-xl">
            +
          </div>
          <h2 className="mt-4 font-semibold text-app-heading text-lg tracking-tight">No templates yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-app-text text-sm leading-relaxed">
            Create your first report template from a base layout or start from scratch.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="secondary" disabled={createTemplate.isPending} onClick={() => handleCreate("blank")}>
              From blank
            </Button>
            <Button disabled={createTemplate.isPending} onClick={() => handleCreate("base")}>
              From base template
            </Button>
          </div>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {templates.map((template) => (
            <li key={template.id}>
              <div
                className={cn(
                  "group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-app-border bg-app-surface p-4 transition-all",
                  "hover:border-app-accent/35 hover:shadow-[0_2px_12px_rgb(0_17_37/0.06)]",
                  "sm:flex-row sm:items-center sm:justify-between",
                )}
              >
                <div
                  className="absolute inset-y-0 left-0 w-0.5 bg-app-accent opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/templates/${template.id}/edit`}
                      className={cn(
                        "truncate font-medium text-app-heading tracking-tight",
                        "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
                      )}
                    >
                      {template.name}
                    </Link>
                    {template.isDefault ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-app-accent-soft px-2 py-0.5 font-medium text-app-heading text-xs">
                        <StarIcon filled />
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          "inline-flex shrink-0 cursor-pointer rounded p-0.5 text-app-text",
                          "hover:text-amber-500",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-1",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                        )}
                        onClick={() => handleSetDefault(template.id)}
                        disabled={setDefaultTemplate.isPending}
                        aria-label={`Set ${template.name} as default`}
                        title="Set as default"
                      >
                        <StarIcon />
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-app-text text-xs">Updated {new Date(template.updatedAt).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Link
                    href={`/templates/${template.id}/edit`}
                    className={iconActionClass}
                    aria-label={`Edit ${template.name}`}
                    title="Edit"
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    href={`/report?templateId=${template.id}`}
                    className={iconActionClass}
                    aria-label={`Preview ${template.name}`}
                    title="Preview"
                  >
                    <PreviewIcon />
                  </Link>
                  <button
                    type="button"
                    className={cn(iconGhostClass, "text-red-600 hover:bg-red-50 hover:text-red-700")}
                    onClick={() => setDeleteTarget(template)}
                    aria-label={`Delete ${template.name}`}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={!!deleteTarget}
        title="Delete template?"
        confirmLabel="Delete"
        confirmVariant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      >
        <p>
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
