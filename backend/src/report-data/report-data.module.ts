import { Module } from "@nestjs/common";
import { ClinicsModule } from "../clinics/clinics.module";
import { TemplatesModule } from "../templates/templates.module";
import { ReportDataController } from "./report-data.controller";
import { ReportDataService } from "./report-data.service";

@Module({
  imports: [ClinicsModule, TemplatesModule],
  controllers: [ReportDataController],
  providers: [ReportDataService],
})
export class ReportDataModule {}
