import { Module } from "@nestjs/common";
import { ClinicsController } from "./clinics.controller";
import { ClinicsService } from "./clinics.service";
import { ParseClinicPipe } from "./parse-clinic.pipe";

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService, ParseClinicPipe],
  exports: [ClinicsService, ParseClinicPipe],
})
export class ClinicsModule {}
