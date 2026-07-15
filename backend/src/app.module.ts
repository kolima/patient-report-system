import { Module } from "@nestjs/common";
import { ClinicsModule } from "./clinics/clinics.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ReportDataModule } from "./report-data/report-data.module";
import { TemplatesModule } from "./templates/templates.module";

@Module({
  imports: [PrismaModule, ClinicsModule, TemplatesModule, ReportDataModule],
})
export class AppModule {}
