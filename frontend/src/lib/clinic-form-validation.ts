import { CLINIC_FIELD_LIMITS, HEX_COLOR_PATTERN } from "@patient-report/shared";
import type { RegisterOptions } from "react-hook-form";

const HTTP_URL = /^https?:\/\/.+/;
const LOGO_URL = /^(https?:\/\/.+|\/[^/].*)$/;

export const clinicFormValidation = {
  name: {
    required: "Clinic name is required",
    maxLength: {
      value: CLINIC_FIELD_LIMITS.nameMax,
      message: "Name must be 120 characters or fewer",
    },
  } satisfies RegisterOptions,
  logoUrl: {
    validate: (value: string) => {
      if (!value) return true;
      return LOGO_URL.test(value) || "Enter a valid URL (https://…) or path (/logos/…)";
    },
  } satisfies RegisterOptions,
  accentColor: {
    required: "Primary color is required",
    pattern: {
      value: HEX_COLOR_PATTERN,
      message: "Enter a valid hex color (#RRGGBB)",
    },
  } satisfies RegisterOptions,
  headingColor: {
    validate: (value: string) => {
      if (!value) return true;
      return HEX_COLOR_PATTERN.test(value) || "Enter a valid hex color (#RRGGBB)";
    },
  } satisfies RegisterOptions,
  textColor: {
    validate: (value: string) => {
      if (!value) return true;
      return HEX_COLOR_PATTERN.test(value) || "Enter a valid hex color (#RRGGBB)";
    },
  } satisfies RegisterOptions,
  backgroundColor: {
    validate: (value: string) => {
      if (!value) return true;
      return HEX_COLOR_PATTERN.test(value) || "Enter a valid hex color (#RRGGBB)";
    },
  } satisfies RegisterOptions,
  address: {
    maxLength: {
      value: CLINIC_FIELD_LIMITS.addressMax,
      message: "Address must be 300 characters or fewer",
    },
  } satisfies RegisterOptions,
  phone: {
    maxLength: {
      value: CLINIC_FIELD_LIMITS.phoneMax,
      message: "Phone must be 40 characters or fewer",
    },
  } satisfies RegisterOptions,
  email: {
    validate: (value: string) => {
      if (!value) return true;
      if (value.length > CLINIC_FIELD_LIMITS.emailMax) {
        return "Email must be 120 characters or fewer";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value) || "Enter a valid email address";
    },
  } satisfies RegisterOptions,
  website: {
    validate: (value: string) => {
      if (!value) return true;
      return HTTP_URL.test(value) || "Enter a valid URL starting with http:// or https://";
    },
  } satisfies RegisterOptions,
  footerDisclaimer: {
    maxLength: {
      value: CLINIC_FIELD_LIMITS.footerDisclaimerMax,
      message: "Disclaimer must be 2000 characters or fewer",
    },
  } satisfies RegisterOptions,
};

export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value);
}

export function normalizeHexInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}
