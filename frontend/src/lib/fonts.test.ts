import { describe, expect, it } from "vitest";
import { FONT_OPTIONS, getFontCssVar } from "./fonts";

describe("getFontCssVar", () => {
  it("returns the CSS variable for known fonts", () => {
    expect(getFontCssVar("lora")).toBe("var(--font-lora)");
    expect(getFontCssVar("inter")).toBe("var(--font-inter)");
  });

  it("falls back to inter for unknown font ids", () => {
    expect(getFontCssVar("unknown" as never)).toBe("var(--font-inter)");
  });
});

describe("FONT_OPTIONS", () => {
  it("includes every supported font id once", () => {
    const ids = FONT_OPTIONS.map((font) => font.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("merriweather");
  });
});
