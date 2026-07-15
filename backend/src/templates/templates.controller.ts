import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTemplateDto, UpdateTemplateDto } from "./dto/template.dto";
import { TemplatesService } from "./templates.service";

@Controller("clinics/:clinicId/templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll(@Param("clinicId") clinicId: string) {
    return this.templatesService.findAllForClinic(clinicId);
  }

  @Get(":templateId")
  findOne(@Param("clinicId") clinicId: string, @Param("templateId") templateId: string) {
    return this.templatesService.findOneForClinic(clinicId, templateId);
  }

  @Post()
  create(@Param("clinicId") clinicId: string, @Body() dto: CreateTemplateDto) {
    return this.templatesService.create(clinicId, dto);
  }

  @Put(":templateId")
  update(@Param("clinicId") clinicId: string, @Param("templateId") templateId: string, @Body() dto: UpdateTemplateDto) {
    return this.templatesService.update(clinicId, templateId, dto);
  }

  @Delete(":templateId")
  remove(@Param("clinicId") clinicId: string, @Param("templateId") templateId: string) {
    return this.templatesService.remove(clinicId, templateId);
  }

  @Post(":templateId/set-default")
  setDefault(@Param("clinicId") clinicId: string, @Param("templateId") templateId: string) {
    return this.templatesService.setDefault(clinicId, templateId);
  }
}
