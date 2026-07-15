import { BadRequestException, NotFoundException } from "@nestjs/common";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PrismaService } from "../prisma/prisma.service";
import { ClinicsService } from "./clinics.service";

const clinic = {
  id: "11111111-1111-4111-8111-111111111111",
  name: "Doron",
  logoUrl: "/logos/doron.svg",
  accentColor: "#001125",
  headingColor: null,
  textColor: null,
  backgroundColor: null,
  headingFont: null,
  bodyFont: null,
  density: null,
  address: null,
  phone: null,
  email: null,
  website: null,
  footerDisclaimer: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function createPrismaMock() {
  return {
    clinic: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  };
}

describe("ClinicsService", () => {
  let prisma: ReturnType<typeof createPrismaMock>;
  let service: ClinicsService;

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new ClinicsService(prisma as unknown as PrismaService);
  });

  it("findAll returns clinics ordered by name", async () => {
    prisma.clinic.findMany.mockResolvedValue([clinic]);

    const result = await service.findAll();

    expect(prisma.clinic.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
    });
    expect(result).toEqual([clinic]);
  });

  it("findOne returns a clinic when it exists", async () => {
    prisma.clinic.findUnique.mockResolvedValue(clinic);

    const result = await service.findOne(clinic.id);

    expect(result).toEqual(clinic);
  });

  it("findOne throws NotFoundException when missing", async () => {
    prisma.clinic.findUnique.mockResolvedValue(null);

    await expect(service.findOne("missing-id")).rejects.toBeInstanceOf(NotFoundException);
  });

  it("update validates input and persists changes", async () => {
    const updated = { ...clinic, name: "Updated Clinic" };
    prisma.clinic.findUnique.mockResolvedValue(clinic);
    prisma.clinic.update.mockResolvedValue(updated);

    const result = await service.update(clinic.id, { name: "Updated Clinic" });

    expect(prisma.clinic.update).toHaveBeenCalledWith({
      where: { id: clinic.id },
      data: { name: "Updated Clinic" },
    });
    expect(result).toEqual(updated);
  });

  it("update throws BadRequestException for invalid data", async () => {
    prisma.clinic.findUnique.mockResolvedValue(clinic);

    await expect(service.update(clinic.id, { accentColor: "invalid" })).rejects.toBeInstanceOf(BadRequestException);
  });
});
