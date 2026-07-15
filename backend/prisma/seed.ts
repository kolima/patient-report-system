import { PrismaClient } from "@prisma/client";
import {
  createBaseTemplateConfig,
  createBlankTemplateConfig,
  createTheme,
  type TemplateConfig,
} from "../src/common/template-config";
import { DEMO_CLINIC_IDS } from "../src/report-data/clinic-ids";

const prisma = new PrismaClient();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

function sunriseCustomConfig(): TemplateConfig {
  const config = createBaseTemplateConfig("#0d9488");
  const header = config.blocks.find((b) => b.type === "header")!;

  return {
    ...config,
    theme: {
      inheritClinicBranding: false,
      colors: { primary: "#0d9488", heading: "#134e4a" },
      fonts: { heading: "lora", body: "source-serif-4" },
      density: "compact",
    },
    blocks: [
      { ...header, settings: { layout: "banner", showLogo: true } },
      {
        id: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
        type: "textBlock",
        visible: true,
        settings: {
          title: "Welcome from Sunrise Longevity",
          customText:
            "This report summarizes your personalized longevity assessment. Our team is here to support your preventive health journey.",
        },
      },
      config.blocks.find((b) => b.type === "summary")!,
      config.blocks.find((b) => b.type === "goals")!,
      config.blocks.find((b) => b.type === "plan")!,
      config.blocks.find((b) => b.type === "timeline")!,
      config.blocks.find((b) => b.type === "coach")!,
      config.blocks.find((b) => b.type === "deepDive")!,
      config.blocks.find((b) => b.type === "orders")!,
      {
        id: "bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb",
        type: "footer",
        visible: true,
        settings: { showLogo: true, showContact: true },
      },
    ],
  };
}

function doronMinimalConfig(accentColor: string): TemplateConfig {
  const config = createBlankTemplateConfig(accentColor);
  return {
    ...config,
    theme: createTheme(accentColor, true),
  };
}

async function main() {
  await prisma.template.deleteMany();
  await prisma.clinic.deleteMany();

  const doronClinic = await prisma.clinic.create({
    data: {
      id: DEMO_CLINIC_IDS.doron,
      name: "At Doron's #2",
      logoUrl: `${FRONTEND_ORIGIN}/logos/doron.svg`,
      accentColor: "#2563eb",
      address: "123 Wellness Ave, Suite 200, Boston, MA 02108",
      phone: "(617) 555-0142",
      email: "care@atdorons.example.com",
      website: "https://atdorons.example.com",
      footerDisclaimer:
        "This report is for informational purposes only and does not constitute medical advice. Please consult your clinician with any questions.",
    },
  });

  const sunriseClinic = await prisma.clinic.create({
    data: {
      id: DEMO_CLINIC_IDS.sunrise,
      name: "Sunrise Longevity Clinic",
      logoUrl: `${FRONTEND_ORIGIN}/logos/sunrise.svg`,
      accentColor: "#0d9488",
      address: "456 Longevity Blvd, Palo Alto, CA 94301",
      phone: "(650) 555-0198",
      email: "hello@sunriselongevity.example.com",
      website: "https://sunriselongevity.example.com",
      footerDisclaimer:
        "Sunrise Longevity Clinic — personalized preventive care. This document summarizes your assessment and is not a substitute for professional medical judgment.",
    },
  });

  await prisma.template.create({
    data: {
      clinicId: doronClinic.id,
      name: "Standard Health Report",
      config: createBaseTemplateConfig("#2563eb") as object,
      isDefault: true,
    },
  });

  await prisma.template.create({
    data: {
      clinicId: doronClinic.id,
      name: "Minimal Report",
      config: doronMinimalConfig("#2563eb") as object,
      isDefault: false,
    },
  });

  await prisma.template.create({
    data: {
      clinicId: sunriseClinic.id,
      name: "Sunrise Preventive Report",
      config: sunriseCustomConfig() as object,
      isDefault: true,
    },
  });

  console.log("Seed complete.");
  console.log(`  Doron clinic id: ${doronClinic.id}`);
  console.log(`  Sunrise clinic id: ${sunriseClinic.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
