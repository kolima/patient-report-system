import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTemplateDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsIn(["base", "blank"])
  from!: "base" | "blank";
}

export class UpdateTemplateDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  config?: unknown;
}
