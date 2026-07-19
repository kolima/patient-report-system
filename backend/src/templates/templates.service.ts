import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { Clinic } from "@prisma/client";
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
    const templates = await this.prisma.template.findMany({
      where: { clinicId },
      orderBy: { createdAt: "asc" },
    });
    return this.withMigratedConfigs(templates);
  }

  async findOneForClinic(clinicId: string, templateId: string) {
    const template = await this.assertTemplateForClinic(clinicId, templateId);
    return this.withMigratedConfig(template);
  }

  async create(clinic: Clinic, dto: CreateTemplateDto) {
    const config =
      dto.from === "base"
        ? createBaseTemplateConfig(clinic.accentColor)
        : createBlankTemplateConfig(clinic.accentColor);

    const existingCount = await this.prisma.template.count({
      where: { clinicId: clinic.id },
    });
    const isDefault = existingCount === 0;

    return this.prisma.template.create({
      data: {
        clinicId: clinic.id,
        name: dto.name,
        config: config as unknown as Prisma.InputJsonValue,
        isDefault,
      },
    });
  }

  async update(clinicId: string, templateId: string, dto: UpdateTemplateDto) {
    await this.assertTemplateForClinic(clinicId, templateId);

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

    if (Object.keys(data).length === 0) {
      throw new BadRequestException("At least one of name or config must be provided");
    }

    const updated = await this.prisma.template.update({
      where: { id: templateId },
      data,
    });

    return this.withMigratedConfig(updated);
  }

  async remove(clinicId: string, templateId: string) {
    const template = await this.assertTemplateForClinic(clinicId, templateId);
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
    await this.assertTemplateForClinic(clinicId, templateId);

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

  private async assertTemplateForClinic(clinicId: string, templateId: string) {
    const template = await this.prisma.template.findFirst({
      where: { id: templateId, clinicId },
    });
    if (!template) {
      throw new NotFoundException(`Template ${templateId} not found for clinic ${clinicId}`);
    }
    return template;
  }

  /**
   * Migrates config on read and persists when the shape changes so injected
   * block IDs stay stable across requests.
   */
  private async withMigratedConfig<T extends { id: string; config: unknown }>(template: T) {
    const [migrated] = await this.withMigratedConfigs([template]);
    return migrated;
  }

  private async withMigratedConfigs<T extends { id: string; config: unknown }>(templates: T[]) {
    const results = templates.map((template) => ({
      template,
      config: migrateTemplateConfig(template.config),
    }));

    const toPersist = results.filter(({ template, config }) => !configsEqual(template.config, config));

    if (toPersist.length > 0) {
      await this.prisma.$transaction(
        toPersist.map(({ template, config }) =>
          this.prisma.template.update({
            where: { id: template.id },
            data: { config: config as unknown as Prisma.InputJsonValue },
          }),
        ),
      );
    }

    return results.map(({ template, config }) => ({ ...template, config }));
  }
}

function configsEqual(a: unknown, b: TemplateConfig): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
