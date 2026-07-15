import { describe, expect, it } from "vitest";
import { clinicFormValidation, isValidHexColor, normalizeHexInput } from "./clinic-form-validation";

describe("isValidHexColor", () => {
  it("accepts valid 6-digit hex colors", () => {
    expect(isValidHexColor("#2563eb")).toBe(true);
    expect(isValidHexColor("#AaBbCc")).toBe(true);
  });

  it("rejects invalid values", () => {
    expect(isValidHexColor("2563eb")).toBe(false);
    expect(isValidHexColor("#fff")).toBe(false);
    expect(isValidHexColor("blue")).toBe(false);
  });
});

describe("normalizeHexInput", () => {
  it("trims whitespace and adds a leading hash", () => {
    expect(normalizeHexInput("  2563eb ")).toBe("#2563eb");
  });

  it("preserves an existing hash", () => {
    expect(normalizeHexInput("#112233")).toBe("#112233");
  });

  it("returns empty string for blank input", () => {
    expect(normalizeHexInput("   ")).toBe("");
  });
});

describe("clinicFormValidation.logoUrl", () => {
  const validate = clinicFormValidation.logoUrl.validate as (value: string) => true | string;

  it("allows empty values", () => {
    expect(validate("")).toBe(true);
  });

  it("accepts https URLs and relative paths", () => {
    expect(validate("https://example.com/logo.svg")).toBe(true);
    expect(validate("/logos/doron.svg")).toBe(true);
  });

  it("rejects invalid URLs", () => {
    expect(validate("ftp://example.com/logo.svg")).toBe("Enter a valid URL (https://…) or path (/logos/…)");
  });
});

describe("clinicFormValidation.email", () => {
  const validate = clinicFormValidation.email.validate as (value: string) => true | string;

  it("allows empty values", () => {
    expect(validate("")).toBe(true);
  });

  it("accepts valid emails", () => {
    expect(validate("hello@clinic.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validate("not-an-email")).toBe("Enter a valid email address");
  });
});

describe("clinicFormValidation.website", () => {
  const validate = clinicFormValidation.website.validate as (value: string) => true | string;

  it("requires http or https", () => {
    expect(validate("https://clinic.com")).toBe(true);
    expect(validate("www.clinic.com")).toBe("Enter a valid URL starting with http:// or https://");
  });
});
