import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { Clinic, Template, TemplateConfig } from "@/types";

export function useClinicsQuery() {
  return useQuery({
    queryKey: queryKeys.clinics.all,
    queryFn: api.getClinics,
  });
}

export function useUpdateClinicMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Omit<Clinic, "id">> }) => api.updateClinic(id, body),
    onSuccess: (updated) => {
      queryClient.setQueryData<Clinic[]>(queryKeys.clinics.all, (prev) =>
        prev?.map((clinic) => (clinic.id === updated.id ? updated : clinic)),
      );
    },
  });
}

export function useTemplatesQuery(clinicId: string | null) {
  return useQuery({
    queryKey: queryKeys.templates.list(clinicId ?? ""),
    queryFn: () => {
      if (!clinicId) throw new Error("clinicId is required");
      return api.getTemplates(clinicId);
    },
    enabled: !!clinicId,
  });
}

export function useTemplateQuery(clinicId: string, templateId: string) {
  return useQuery({
    queryKey: queryKeys.templates.detail(clinicId, templateId),
    queryFn: () => api.getTemplate(clinicId, templateId),
  });
}

export function useReportDataQuery(clinicId: string) {
  return useQuery({
    queryKey: queryKeys.reportData(clinicId),
    queryFn: () => api.getReportData(clinicId),
  });
}

export function useRenderedReportQuery(clinicId: string | null, templateId?: string | null) {
  return useQuery({
    queryKey: queryKeys.renderedReport(clinicId ?? "", templateId),
    queryFn: () => {
      if (!clinicId) throw new Error("clinicId is required");
      return api.getRenderedReport(clinicId, templateId ?? undefined);
    },
    enabled: !!clinicId,
  });
}

export function useCreateTemplateMutation(clinicId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { name: string; from: "base" | "blank" }) => api.createTemplate(clinicId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.list(clinicId),
      });
    },
  });
}

export function useUpdateTemplateMutation(clinicId: string, templateId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { name?: string; config?: TemplateConfig }) => api.updateTemplate(clinicId, templateId, body),
    onSuccess: (updated) => {
      queryClient.setQueryData<Template>(queryKeys.templates.detail(clinicId, templateId), updated);
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.list(clinicId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.renderedReportPrefix(clinicId),
      });
    },
  });
}

export function useDeleteTemplateMutation(clinicId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => api.deleteTemplate(clinicId, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.list(clinicId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.renderedReportPrefix(clinicId),
      });
    },
  });
}

export function useSetDefaultTemplateMutation(clinicId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => api.setDefaultTemplate(clinicId, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.list(clinicId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.renderedReportPrefix(clinicId),
      });
    },
  });
}
