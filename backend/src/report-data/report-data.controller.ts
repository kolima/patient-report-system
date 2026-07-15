import { Controller, Get, Param, Query } from "@nestjs/common";
import { ReportDataService } from "./report-data.service";

@Controller("clinics/:clinicId")
export class ReportDataController {
  constructor(private readonly reportDataService: ReportDataService) {}

  @Get("report-data")
  getReportData(@Param("clinicId") clinicId: string) {
    return this.reportDataService.getReportData(clinicId);
  }

  @Get("rendered-report")
  getRenderedReport(@Param("clinicId") clinicId: string, @Query("templateId") templateId?: string) {
    return this.reportDataService.getRenderedReport(clinicId, templateId);
  }
}
