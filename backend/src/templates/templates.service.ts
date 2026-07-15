import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  createBaseTemplateConfig,
  createBlankTemplateConfig,
  migrateTemplateConfig,
  parseTemplateConfig,
  type TemplateConfig,
  validateConfigPayloadSize,
} from "../common/template-config";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTemplateDto, UpdateTemplateDto } from "./dto/template.dto";

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForClinic(clinicId: string) {
    await this.assertClinicExists(clinicId);
    const templates = await this.prisma.template.findMany({
      where: { clinicId },
      orderBy: { createdAt: "asc" },
    });
    return Promise.all(templates.map((t) => this.withMigratedConfig(t)));
  }

  async findOneForClinic(clinicId: string, templateId: string) {
    const template = await this.prisma.template.findFirst({
      where: { id: templateId, clinicId },
    });
    if (!template) {
      throw new NotFoundException(`Template ${templateId} not found for clinic ${clinicId}`);
    }
    return this.withMigratedConfig(template);
  }

  async create(clinicId: string, dto: CreateTemplateDto) {
    const clinic = await this.assertClinicExists(clinicId);
    const config =
      dto.from === "base"
        ? createBaseTemplateConfig(clinic.accentColor)
        : createBlankTemplateConfig(clinic.accentColor);

    const existingCount = await this.prisma.template.count({
      where: { clinicId },
    });
    const isDefault = existingCount === 0;

    return this.prisma.template.create({
      data: {
        clinicId,
        name: dto.name,
        config: config as unknown as Prisma.InputJsonValue,
        isDefault,
      },
    });
  }

  async update(clinicId: string, templateId: string, dto: UpdateTemplateDto) {
    await this.findOneForClinic(clinicId, templateId);

    const data: Prisma.TemplateUpdateInput = {};

    if (dto.name !== undefined) {
      data.name = dto.name;
    }

    if (dto.config !== undefined) {
      try {
        const serialized = JSON.stringify(dto.config);
        validateConfigPayloadSize(serialized);
        const parsed = parseTemplateConfig(JSON.parse(serialized));
        data.config = parsed as unknown as Prisma.InputJsonValue;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid template config";
        throw new BadRequestException(message);
      }
    }

    return this.prisma.template.update({
      where: { id: templateId },
      data,
    });
  }

  async remove(clinicId: string, templateId: string) {
    const template = await this.findOneForClinic(clinicId, templateId);
    const count = await this.prisma.template.count({ where: { clinicId } });

    if (count <= 1) {
      throw new ConflictException("Cannot delete the last template for a clinic");
    }

    if (template.isDefault) {
      throw new ConflictException("Cannot delete the default template. Set another template as default first.");
    }

    await this.prisma.template.delete({ where: { id: templateId } });
    return { deleted: true };
  }

  async setDefault(clinicId: string, templateId: string) {
    await this.findOneForClinic(clinicId, templateId);

    await this.prisma.$transaction([
      this.prisma.template.updateMany({
        where: { clinicId },
        data: { isDefault: false },
      }),
      this.prisma.template.update({
        where: { id: templateId },
        data: { isDefault: true },
      }),
    ]);

    return this.findOneForClinic(clinicId, templateId);
  }

  async getDefaultForClinic(clinicId: string) {
    const template = await this.prisma.template.findFirst({
      where: { clinicId, isDefault: true },
    });
    if (!template) {
      throw new NotFoundException(`No default template for clinic ${clinicId}`);
    }
    return this.withMigratedConfig(template);
  }

  /**
   * Migrates config on read and persists when the shape changes so injected
   * block IDs stay stable across requests.
   */
  private async withMigratedConfig<T extends { id: string; config: unknown }>(template: T) {
    const migrated = migrateTemplateConfig(template.config);
    if (!configsEqual(template.config, migrated)) {
      await this.prisma.template.update({
        where: { id: template.id },
        data: { config: migrated as unknown as Prisma.InputJsonValue },
      });
    }
    return { ...template, config: migrated };
  }

  private async assertClinicExists(clinicId: string) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id: clinicId },
    });
    if (!clinic) throw new NotFoundException(`Clinic ${clinicId} not found`);
    return clinic;
  }
}

function configsEqual(a: unknown, b: TemplateConfig): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
