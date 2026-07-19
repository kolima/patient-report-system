import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { Clinic } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createBaseTemplateConfig } from "../common/template-config";
import type { PrismaService } from "../prisma/prisma.service";
import { TemplatesService } from "./templates.service";

const clinicId = "11111111-1111-4111-8111-111111111111";
const templateId = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

const clinic = {
  id: clinicId,
  name: "Doron",
  accentColor: "#001125",
};

const template = {
  id: templateId,
  clinicId,
  name: "Default",
  config: createBaseTemplateConfig("#001125"),
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function createPrismaMock() {
  return {
    clinic: {
      findUnique: vi.fn(),
    },
    template: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      delete: vi.fn(),
    },
    // biome-ignore lint/style/useNamingConvention: Prisma client API
    $transaction: vi.fn(),
  };
}

describe("TemplatesService", () => {
  let prisma: ReturnType<typeof createPrismaMock>;
  let service: TemplatesService;

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new TemplatesService(prisma as unknown as PrismaService);
  });

  it("findAllForClinic returns migrated templates", async () => {
    prisma.template.findMany.mockResolvedValue([template]);

    const result = await service.findAllForClinic(clinicId);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(templateId);
  });

  it("findOneForClinic throws when template is missing", async () => {
    prisma.template.findFirst.mockResolvedValue(null);

    await expect(service.findOneForClinic(clinicId, templateId)).rejects.toBeInstanceOf(NotFoundException);
  });

  it("create marks the first template as default", async () => {
    prisma.template.count.mockResolvedValue(0);
    prisma.template.create.mockImplementation(({ data }) => Promise.resolve({ ...template, ...data }));

    const result = await service.create(clinic as Clinic, {
      name: "New Template",
      from: "base",
    });

    expect(prisma.template.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          clinicId,
          name: "New Template",
          isDefault: true,
        }),
      }),
    );
    expect(result.isDefault).toBe(true);
  });

  it("remove rejects deleting the last template", async () => {
    prisma.template.findFirst.mockResolvedValue(template);
    prisma.template.count.mockResolvedValue(1);

    await expect(service.remove(clinicId, templateId)).rejects.toBeInstanceOf(ConflictException);
  });

  it("remove rejects deleting the default template", async () => {
    prisma.template.findFirst.mockResolvedValue(template);
    prisma.template.count.mockResolvedValue(2);

    await expect(service.remove(clinicId, templateId)).rejects.toBeInstanceOf(ConflictException);
  });

  it("update rejects invalid config payloads", async () => {
    prisma.template.findFirst.mockResolvedValue(template);

    await expect(
      service.update(clinicId, templateId, {
        config: { invalid: true } as never,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("setDefault clears other defaults and marks the target", async () => {
    prisma.template.findFirst.mockResolvedValue(template);
    prisma.$transaction.mockResolvedValue([]);
    prisma.template.findFirst.mockResolvedValueOnce(template).mockResolvedValueOnce({
      ...template,
      isDefault: true,
    });

    const result = await service.setDefault(clinicId, templateId);

    expect(prisma.$transaction).toHaveBeenCalled();
    expect(result.isDefault).toBe(true);
  });
});
