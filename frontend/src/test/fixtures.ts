import type { ClinicBranding, ReportData, TemplateConfig } from "@/types";

export const mockReportData: ReportData = {
  clinicName: "Sunrise Clinic",
  patient: { name: "Jane Doe", sex: "Female", age: 42 },
  preparedBy: {
    doctorName: "Dr. Smith",
    clinicName: "Sunrise Clinic",
  },
  dates: { assessment: "Jan 15, 2026", generated: "Jan 20, 2026" },
  healthStatus: {
    quote: "Your metabolic markers are improving steadily.",
    author: "Dr. Smith",
  },
  story: [],
  goals: [],
  plan: { intro: "", groups: [] },
  timeline: { subtitle: "", phases: [] },
  coach: { subtitle: "", guides: [] },
  deepDive: { categories: [] },
  orders: { labs: [], referrals: [], imaging: [] },
};

export const mockClinicBranding: ClinicBranding = {
  name: "Sunrise Clinic",
  logoUrl: "/logos/sunrise.svg",
  accentColor: "#0d9488",
  headingColor: null,
  textColor: null,
  backgroundColor: null,
  headingFont: null,
  bodyFont: null,
  density: null,
  address: "123 Main St",
  phone: "555-0100",
  email: "info@sunrise.com",
  website: "https://sunrise.com",
  footerDisclaimer: "Not medical advice",
};

export const mockTemplateConfig: TemplateConfig = {
  configVersion: 2,
  theme: {
    inheritClinicBranding: true,
    colors: { primary: "#0d9488" },
    fonts: { heading: "inter", body: "inter" },
    density: "comfortable",
  },
  blocks: [
    {
      id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
      type: "header",
      visible: true,
      settings: { layout: "classic", showLogo: true },
    },
    {
      id: "bbbbbbbb-bbbb-4ccc-8ddd-eeeeeeeeeeee",
      type: "summary",
      visible: true,
      settings: { title: "Your Health Status" },
    },
  ],
};
