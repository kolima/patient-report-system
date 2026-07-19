import { Controller, Get, Query } from "@nestjs/common";
import type { Clinic } from "@prisma/client";
import { ClinicParam } from "../clinics/clinic-param.decorator";
import { ReportDataService } from "./report-data.service";

@Controller("clinics/:clinicId")
export class ReportDataController {
  constructor(private readonly reportDataService: ReportDataService) {}

  @Get("report-data")
  getReportData(@ClinicParam() clinic: Clinic) {
    return this.reportDataService.getReportData(clinic.id);
  }

  @Get("rendered-report")
  getRenderedReport(@ClinicParam() clinic: Clinic, @Query("templateId") templateId?: string) {
    return this.reportDataService.getRenderedReport(clinic.id, templateId);
  }
}
