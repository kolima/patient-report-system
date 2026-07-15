"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ReportRenderer } from "@/components/report/ReportRenderer";
import { Alert } from "@/components/ui/Alert";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageHeaderSkeleton, ReportSkeleton } from "@/components/ui/Skeleton";
import { useClinic } from "@/lib/clinic-context";
import { useRenderedReportQuery } from "@/lib/queries";
import { clinicToBranding } from "@/lib/theme";
import { parseTemplateConfig } from "@/types";

function ReportPageContent() {
  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get("templateId");
  const { clinicId, clinic } = useClinic();
  const { data, isLoading, error: queryError, refetch } = useRenderedReportQuery(clinicId, templateIdParam);

  const reportData = data?.reportData ?? null;
  const template = data?.template ?? null;
  const error = queryError instanceof Error ? queryError.message : queryError ? "Failed to load report" : null;

  const isDraftPreview = Boolean(templateIdParam && template && !template.isDefault);
  const config = template ? parseTemplateConfig(template.config) : null;

  if (!clinicId || isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <PageHeaderSkeleton />
        <div className="mt-6">
          <ReportSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader
        title={reportData ? `Report: ${reportData.patient.name}` : "Patient Report"}
        description={
          <>
            Rendered with <strong>{template?.name ?? "..."}</strong> for <strong>{clinic?.name ?? "..."}</strong>
          </>
        }
        badge={
          <span className="rounded-md bg-app-accent-soft px-2 py-0.5 font-medium text-app-heading text-xs">
            {isDraftPreview ? "Previewing draft" : "Preview"}
          </span>
        }
      />

      {error && (
        <Alert variant="error" className="mt-6" onRetry={() => void refetch()}>
          {error}
        </Alert>
      )}

      {reportData && template && config && (
        <div className="mt-6">
          <ReportRenderer
            config={config}
            reportData={reportData}
            clinicBranding={clinic ? clinicToBranding(clinic) : null}
          />
        </div>
      )}
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-8">
          <PageHeaderSkeleton />
          <div className="mt-6">
            <ReportSkeleton />
          </div>
        </div>
      }
    >
      <ReportPageContent />
    </Suspense>
  );
}
