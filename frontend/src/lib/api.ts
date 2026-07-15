import type { Clinic, ReportData, Template, TemplateConfig } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    let message = text || `Request failed: ${res.status}`;
    try {
      const parsed = JSON.parse(text) as { message?: string };
      if (parsed.message) message = parsed.message;
    } catch {
      // use raw text
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getClinics: () => request<Clinic[]>("/clinics"),
  getClinic: (id: string) => request<Clinic>(`/clinics/${id}`),
  updateClinic: (id: string, body: Partial<Omit<Clinic, "id">>) =>
    request<Clinic>(`/clinics/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  getTemplates: (clinicId: string) => request<Template[]>(`/clinics/${clinicId}/templates`),
  getTemplate: (clinicId: string, templateId: string) =>
    request<Template>(`/clinics/${clinicId}/templates/${templateId}`),
  createTemplate: (clinicId: string, body: { name: string; from: "base" | "blank" }) =>
    request<Template>(`/clinics/${clinicId}/templates`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateTemplate: (clinicId: string, templateId: string, body: { name?: string; config?: TemplateConfig }) =>
    request<Template>(`/clinics/${clinicId}/templates/${templateId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteTemplate: (clinicId: string, templateId: string) =>
    request<{ deleted: boolean }>(`/clinics/${clinicId}/templates/${templateId}`, {
      method: "DELETE",
    }),
  setDefaultTemplate: (clinicId: string, templateId: string) =>
    request<Template>(`/clinics/${clinicId}/templates/${templateId}/set-default`, {
      method: "POST",
    }),
  getReportData: (clinicId: string) => request<ReportData>(`/clinics/${clinicId}/report-data`),
  getRenderedReport: (clinicId: string, templateId?: string) => {
    const query = templateId ? `?templateId=${encodeURIComponent(templateId)}` : "";
    return request<{ reportData: ReportData; template: Template }>(`/clinics/${clinicId}/rendered-report${query}`);
  },
};
