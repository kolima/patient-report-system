import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { parseUpdateClinicInput, type UpdateClinicInput } from "./dto/update-clinic.dto";

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.clinic.findMany({ orderBy: { name: "asc" } });
  }

  async findOne(id: string) {
    const clinic = await this.prisma.clinic.findUnique({ where: { id } });
    if (!clinic) throw new NotFoundException(`Clinic ${id} not found`);
    return clinic;
  }

  async update(id: string, raw: unknown) {
    await this.findOne(id);

    let data: UpdateClinicInput;
    try {
      data = parseUpdateClinicInput(raw);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid clinic data";
      throw new BadRequestException(message);
    }

    return this.prisma.clinic.update({ where: { id }, data });
  }
}
