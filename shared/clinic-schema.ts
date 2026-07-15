import { z } from 'zod';
import { DENSITY_VALUES, FONT_IDS } from './template-config';

export const CLINIC_FIELD_LIMITS = {
  nameMax: 120,
  addressMax: 300,
  phoneMax: 40,
  emailMax: 120,
  footerDisclaimerMax: 2000,
} as const;

export const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

const hexColor = z.string().regex(HEX_COLOR_PATTERN);
const httpUrl = z
  .string()
  .url()
  .regex(/^https?:\/\//);
const logoUrlField = z.union([httpUrl, z.string().regex(/^\/.+/), z.literal(''), z.null()]);

export const updateClinicSchema = z
  .object({
    name: z.string().min(1).max(CLINIC_FIELD_LIMITS.nameMax).optional(),
    logoUrl: logoUrlField.optional(),
    accentColor: hexColor.optional(),
    headingColor: hexColor.nullable().optional(),
    textColor: hexColor.nullable().optional(),
    backgroundColor: hexColor.nullable().optional(),
    headingFont: z.enum(FONT_IDS).nullable().optional(),
    bodyFont: z.enum(FONT_IDS).nullable().optional(),
    density: z.enum(DENSITY_VALUES).nullable().optional(),
    address: z.string().max(CLINIC_FIELD_LIMITS.addressMax).nullable().optional(),
    phone: z.string().max(CLINIC_FIELD_LIMITS.phoneMax).nullable().optional(),
    email: z.string().email().max(CLINIC_FIELD_LIMITS.emailMax).nullable().optional(),
    website: z.union([httpUrl, z.literal(''), z.null()]).optional(),
    footerDisclaimer: z.string().max(CLINIC_FIELD_LIMITS.footerDisclaimerMax).nullable().optional(),
  })
  .strict();

export type UpdateClinicInput = z.infer<typeof updateClinicSchema>;

export function parseUpdateClinicInput(raw: unknown): UpdateClinicInput {
  const parsed = updateClinicSchema.parse(raw);
  const result: UpdateClinicInput = { ...parsed };

  if (parsed.logoUrl === '') {
    result.logoUrl = null;
  }
  if (parsed.website === '') {
    result.website = null;
  }

  return result;
}
