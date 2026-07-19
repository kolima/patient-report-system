import { Injectable, PipeTransform } from "@nestjs/common";
import type { Clinic } from "@prisma/client";
import { ClinicsService } from "./clinics.service";

@Injectable()
export class ParseClinicPipe implements PipeTransform<string, Promise<Clinic>> {
  constructor(private readonly clinicsService: ClinicsService) {}

  transform(clinicId: string): Promise<Clinic> {
    return this.clinicsService.findOne(clinicId);
  }
}
