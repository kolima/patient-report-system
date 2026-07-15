import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-app-border/80", className)} aria-hidden="true" />;
}

export function PageHeaderSkeleton({ withActions = false }: { withActions?: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" aria-hidden="true">
      <div>
        <Skeleton className="mb-2 h-0.5 w-8" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>
      {withActions && (
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-36" />
        </div>
      )}
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div role="status" aria-busy="true" className="mx-auto max-w-2xl px-4 py-8" aria-label="Loading settings">
      <PageHeaderSkeleton />
      <div className="mt-8 space-y-6 rounded-xl border border-app-border bg-app-surface p-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1 h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export function TemplateListSkeleton() {
  return (
    <div role="status" aria-busy="true" className="mt-8 space-y-3" aria-label="Loading templates">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-app-border bg-app-surface p-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ReportSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto max-w-4xl space-y-6 rounded-xl border border-app-border bg-app-surface p-8"
      aria-label="Loading report"
    >
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export function EditorSkeleton() {
  return (
    <div role="status" aria-busy="true" className="flex h-[calc(100vh-57px)]" aria-label="Loading editor">
      <div className="hidden w-64 shrink-0 border-app-border border-r bg-app-surface p-4 lg:block">
        <Skeleton className="h-5 w-24" />
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-app-border border-b bg-app-surface px-4 py-3">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="flex-1 bg-app-bg p-6">
          <Skeleton className="mx-auto h-96 max-w-4xl" />
        </div>
      </div>
      <div className="hidden w-72 shrink-0 border-app-border border-l bg-app-surface p-4 lg:block">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    </div>
  );
}
