"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useRef } from "react";
import { TemplateEditor } from "@/components/editor/TemplateEditor";
import { EditorSkeleton } from "@/components/ui/Skeleton";
import { useClinic } from "@/lib/clinic-context";

export default function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { clinicId } = useClinic();
  const router = useRouter();
  const prevClinicId = useRef<string | null>(null);

  useEffect(() => {
    if (prevClinicId.current !== null && clinicId && prevClinicId.current !== clinicId) {
      router.replace("/templates");
      return;
    }

    prevClinicId.current = clinicId;
  }, [clinicId, router]);

  if (!clinicId) {
    return <EditorSkeleton />;
  }

  return <TemplateEditor clinicId={clinicId} templateId={id} />;
}
