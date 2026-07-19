import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import type { Clinic } from "@prisma/client";
import { ClinicParam } from "../clinics/clinic-param.decorator";
import { CreateTemplateDto, UpdateTemplateDto } from "./dto/template.dto";
import { TemplateIdParam } from "./template-id-param.decorator";
import { TemplatesService } from "./templates.service";

@Controller("clinics/:clinicId/templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll(@ClinicParam() clinic: Clinic) {
    return this.templatesService.findAllForClinic(clinic.id);
  }

  @Get(":templateId")
  findOne(@ClinicParam() clinic: Clinic, @TemplateIdParam() templateId: string) {
    return this.templatesService.findOneForClinic(clinic.id, templateId);
  }

  @Post()
  create(@ClinicParam() clinic: Clinic, @Body() dto: CreateTemplateDto) {
    return this.templatesService.create(clinic, dto);
  }

  @Put(":templateId")
  update(@ClinicParam() clinic: Clinic, @TemplateIdParam() templateId: string, @Body() dto: UpdateTemplateDto) {
    return this.templatesService.update(clinic.id, templateId, dto);
  }

  @Delete(":templateId")
  remove(@ClinicParam() clinic: Clinic, @TemplateIdParam() templateId: string) {
    return this.templatesService.remove(clinic.id, templateId);
  }

  @Post(":templateId/set-default")
  setDefault(@ClinicParam() clinic: Clinic, @TemplateIdParam() templateId: string) {
    return this.templatesService.setDefault(clinic.id, templateId);
  }
}
