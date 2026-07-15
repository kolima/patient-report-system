import { Injectable, NotFoundException } from "@nestjs/common";
import { ClinicsService } from "../clinics/clinics.service";
import { TemplatesService } from "../templates/templates.service";
import { getReportDataForClinic } from "./report-data.fixture";

@Injectable()
export class ReportDataService {
  constructor(
    private readonly clinicsService: ClinicsService,
    private readonly templatesService: TemplatesService,
  ) {}

  async getReportData(clinicId: string) {
    await this.clinicsService.findOne(clinicId);
    const reportData = getReportDataForClinic(clinicId);
    if (!reportData) {
      throw new NotFoundException(`No report data configured for clinic ${clinicId}`);
    }
    return reportData;
  }

  async getRenderedReport(clinicId: string, templateId?: string) {
    const [reportData, template] = await Promise.all([
      this.getReportData(clinicId),
      templateId
        ? this.templatesService.findOneForClinic(clinicId, templateId)
        : this.templatesService.getDefaultForClinic(clinicId),
    ]);

    return {
      reportData,
      template,
    };
  }
}
