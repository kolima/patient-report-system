/** Stable demo clinic IDs — fixtures and seed share these so renames do not break report data. */
export const DEMO_CLINIC_IDS = {
  doron: "11111111-1111-4111-8111-111111111111",
  sunrise: "22222222-2222-4222-8222-222222222222",
} as const;

export type DemoClinicId = (typeof DEMO_CLINIC_IDS)[keyof typeof DEMO_CLINIC_IDS];
