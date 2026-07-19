import { Param, ParseUUIDPipe } from "@nestjs/common";

export const TemplateIdParam = () => Param("templateId", ParseUUIDPipe);
