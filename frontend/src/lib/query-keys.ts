export const queryKeys = {
  clinics: {
    all: ["clinics"] as const,
  },
  templates: {
    list: (clinicId: string) => ["clinics", clinicId, "templates"] as const,
    detail: (clinicId: string, templateId: string) => ["clinics", clinicId, "templates", templateId] as const,
  },
  reportData: (clinicId: string) => ["clinics", clinicId, "report-data"] as const,
  renderedReport: (clinicId: string, templateId?: string | null) =>
    ["clinics", clinicId, "rendered-report", templateId ?? "default"] as const,
  renderedReportPrefix: (clinicId: string) => ["clinics", clinicId, "rendered-report"] as const,
};
