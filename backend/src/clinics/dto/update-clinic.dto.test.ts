import { describe, expect, it } from "vitest";
import { parseUpdateClinicInput } from "./update-clinic.dto";

describe("parseUpdateClinicInput", () => {
  it("parses valid partial updates", () => {
    const result = parseUpdateClinicInput({
      name: "Sunrise Clinic",
      accentColor: "#2563eb",
    });

    expect(result).toEqual({
      name: "Sunrise Clinic",
      accentColor: "#2563eb",
    });
  });

  it("normalizes empty logoUrl and website to null", () => {
    const result = parseUpdateClinicInput({
      logoUrl: "",
      website: "",
    });

    expect(result.logoUrl).toBeNull();
    expect(result.website).toBeNull();
  });

  it("accepts relative logo paths", () => {
    const result = parseUpdateClinicInput({
      logoUrl: "/logos/sunrise.svg",
    });

    expect(result.logoUrl).toBe("/logos/sunrise.svg");
  });

  it("accepts nullable theme overrides", () => {
    const result = parseUpdateClinicInput({
      headingColor: null,
      headingFont: "lora",
      density: "compact",
    });

    expect(result.headingColor).toBeNull();
    expect(result.headingFont).toBe("lora");
    expect(result.density).toBe("compact");
  });

  it("rejects invalid hex colors", () => {
    expect(() => parseUpdateClinicInput({ accentColor: "not-a-color" })).toThrow();
  });

  it("rejects unknown fields", () => {
    expect(() => parseUpdateClinicInput({ name: "Clinic", extraField: true })).toThrow();
  });
});
