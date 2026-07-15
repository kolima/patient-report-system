import { describe, expect, it } from "vitest";
import {
  CONFIG_VERSION,
  createBaseTemplateConfig,
  createBlankTemplateConfig,
  MAX_CONFIG_BYTES,
  migrateTemplateConfig,
  parseTemplateConfig,
  validateConfigPayloadSize,
} from "./template-config";

const validBlock = (type: string, id = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee") => ({
  id,
  type,
  visible: true,
  settings: {},
});

describe("parseTemplateConfig", () => {
  it("parses a minimal valid config", () => {
    const raw = {
      theme: {
        colors: { primary: "#2563eb" },
        fonts: { heading: "inter", body: "inter" },
        density: "comfortable",
      },
      blocks: [validBlock("header")],
    };

    const config = parseTemplateConfig(raw);

    expect(config.theme.colors.primary).toBe("#2563eb");
    expect(config.theme.inheritClinicBranding).toBe(false);
    expect(config.blocks).toHaveLength(1);
  });

  it("rejects invalid hex colors", () => {
    const raw = {
      theme: { colors: { primary: "blue" } },
      blocks: [validBlock("header")],
    };

    expect(() => parseTemplateConfig(raw)).toThrow();
  });

  it("rejects unknown block types", () => {
    const raw = {
      theme: { colors: { primary: "#2563eb" } },
      blocks: [validBlock("unknown")],
    };

    expect(() => parseTemplateConfig(raw)).toThrow();
  });
});

describe("validateConfigPayloadSize", () => {
  it("allows payloads under the limit", () => {
    expect(() => validateConfigPayloadSize('{"ok":true}')).not.toThrow();
  });

  it("rejects payloads over 100KB", () => {
    const oversized = JSON.stringify({ data: "x".repeat(MAX_CONFIG_BYTES) });
    expect(() => validateConfigPayloadSize(oversized)).toThrow("Template config exceeds maximum size of 100KB");
  });
});

describe("migrateTemplateConfig", () => {
  it("returns v2 configs unchanged", () => {
    const config = createBaseTemplateConfig();
    const migrated = migrateTemplateConfig(config);

    expect(migrated.configVersion).toBe(CONFIG_VERSION);
    expect(migrated.blocks.map((b) => b.type)).toEqual(config.blocks.map((b) => b.type));
  });

  it("inserts v2 blocks into legacy v1 configs before orders", () => {
    const v1 = {
      configVersion: 1,
      theme: {
        inheritClinicBranding: true,
        colors: { primary: "#2563eb" },
        fonts: { heading: "inter", body: "inter" },
        density: "comfortable",
      },
      blocks: [
        validBlock("header", "11111111-1111-4111-8111-111111111111"),
        validBlock("summary", "22222222-2222-4222-8222-222222222222"),
        validBlock("orders", "33333333-3333-4333-8333-333333333333"),
        validBlock("footer", "44444444-4444-4444-8444-444444444444"),
      ],
    };

    const migrated = migrateTemplateConfig(v1);
    const types = migrated.blocks.map((b) => b.type);

    expect(migrated.configVersion).toBe(CONFIG_VERSION);
    expect(types).toEqual(["header", "summary", "timeline", "coach", "deepDive", "orders", "footer"]);
  });
});

describe("createBaseTemplateConfig", () => {
  it("uses the clinic accent color in the theme", () => {
    const config = createBaseTemplateConfig("#aa0000");

    expect(config.theme.colors.primary).toBe("#aa0000");
    expect(config.theme.inheritClinicBranding).toBe(true);
  });

  it("includes all standard singleton blocks", () => {
    const config = createBaseTemplateConfig();
    const types = config.blocks.map((b) => b.type);

    expect(types).toContain("header");
    expect(types).toContain("summary");
    expect(types).toContain("timeline");
    expect(types).toContain("footer");
  });
});

describe("createBlankTemplateConfig", () => {
  it("creates a config with only a header block", () => {
    const config = createBlankTemplateConfig("#112233");

    expect(config.blocks).toHaveLength(1);
    expect(config.blocks[0]?.type).toBe("header");
    expect(config.theme.colors.primary).toBe("#112233");
  });
});
