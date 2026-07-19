import { Param, ParseUUIDPipe } from "@nestjs/common";
import { ParseClinicPipe } from "./parse-clinic.pipe";

export const ClinicParam = () => Param("clinicId", ParseUUIDPipe, ParseClinicPipe);
