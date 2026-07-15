import { ClinicLogo } from "../ClinicLogo";
import type { BlockComponentProps } from "../ReportRenderer";

function clinicDisplayName(
  reportData: BlockComponentProps["reportData"],
  clinicBranding?: BlockComponentProps["clinicBranding"],
) {
  return clinicBranding?.name ?? reportData.clinicName;
}

function ClassicHeader({
  clinicName,
  logoUrl,
  showLogo,
  reportData,
}: {
  clinicName: string;
  logoUrl: string | null | undefined;
  showLogo: boolean;
  reportData: BlockComponentProps["reportData"];
}) {
  return (
    <header className="border-b pb-6" style={{ borderColor: "var(--accent)" }}>
      {showLogo && logoUrl && (
        <ClinicLogo src={logoUrl} alt={`${clinicName} logo`} name={clinicName} className="mb-3 h-10 w-auto" />
      )}
      <p className="font-medium text-sm" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {clinicName}
      </p>
      <h1
        className="mt-2 font-semibold text-3xl"
        style={{ color: "var(--heading)", fontFamily: "var(--font-heading)" }}
      >
        {reportData.patient.name}&apos;s Health Report
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
        Assessment: {reportData.dates.assessment} · Generated: {reportData.dates.generated}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-xs uppercase tracking-wide opacity-70" style={{ color: "var(--body-text)" }}>
            Patient
          </p>
          <p className="mt-1 font-medium" style={{ color: "var(--heading)" }}>
            {reportData.patient.name}
          </p>
          <p className="text-sm" style={{ color: "var(--body-text)" }}>
            {reportData.patient.sex} · {reportData.patient.age} years
          </p>
        </div>
        <div>
          <p className="font-semibold text-xs uppercase tracking-wide opacity-70" style={{ color: "var(--body-text)" }}>
            Prepared by
          </p>
          <p className="mt-1 font-medium" style={{ color: "var(--heading)" }}>
            {reportData.preparedBy.doctorName}
          </p>
          <p className="text-sm" style={{ color: "var(--body-text)" }}>
            {reportData.preparedBy.clinicName}
          </p>
        </div>
      </div>
    </header>
  );
}

function BannerHeader({
  clinicName,
  logoUrl,
  showLogo,
  reportData,
}: {
  clinicName: string;
  logoUrl: string | null | undefined;
  showLogo: boolean;
  reportData: BlockComponentProps["reportData"];
}) {
  return (
    <header>
      <div
        className="-mx-8 -mt-10 mb-6 px-8 py-6"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--banner-text)",
        }}
      >
        <div className="flex items-center gap-4">
          {showLogo && logoUrl && (
            <ClinicLogo src={logoUrl} alt={`${clinicName} logo`} name={clinicName} className="h-10 w-auto" />
          )}
          <p className="font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
            {clinicName}
          </p>
        </div>
      </div>
      <h1 className="font-semibold text-3xl" style={{ color: "var(--heading)", fontFamily: "var(--font-heading)" }}>
        {reportData.patient.name}&apos;s Health Report
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
        Assessment: {reportData.dates.assessment} · Generated: {reportData.dates.generated}
      </p>
      <div className="mt-6 grid gap-6 border-b pb-6 sm:grid-cols-2" style={{ borderColor: "var(--accent)" }}>
        <div>
          <p className="font-semibold text-xs uppercase tracking-wide opacity-70" style={{ color: "var(--body-text)" }}>
            Patient
          </p>
          <p className="mt-1 font-medium" style={{ color: "var(--heading)" }}>
            {reportData.patient.name}
          </p>
          <p className="text-sm" style={{ color: "var(--body-text)" }}>
            {reportData.patient.sex} · {reportData.patient.age} years
          </p>
        </div>
        <div>
          <p className="font-semibold text-xs uppercase tracking-wide opacity-70" style={{ color: "var(--body-text)" }}>
            Prepared by
          </p>
          <p className="mt-1 font-medium" style={{ color: "var(--heading)" }}>
            {reportData.preparedBy.doctorName}
          </p>
          <p className="text-sm" style={{ color: "var(--body-text)" }}>
            {reportData.preparedBy.clinicName}
          </p>
        </div>
      </div>
    </header>
  );
}

function CenteredHeader({
  clinicName,
  logoUrl,
  showLogo,
  reportData,
}: {
  clinicName: string;
  logoUrl: string | null | undefined;
  showLogo: boolean;
  reportData: BlockComponentProps["reportData"];
}) {
  return (
    <header className="border-b pb-6 text-center" style={{ borderColor: "var(--accent)" }}>
      {showLogo && logoUrl && (
        <div className="mb-4 flex justify-center">
          <ClinicLogo src={logoUrl} alt={`${clinicName} logo`} name={clinicName} className="h-12 w-auto" />
        </div>
      )}
      <p className="font-medium text-sm" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
        {clinicName}
      </p>
      <h1
        className="mt-2 font-semibold text-3xl"
        style={{ color: "var(--heading)", fontFamily: "var(--font-heading)" }}
      >
        {reportData.patient.name}&apos;s Health Report
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
        Assessment: {reportData.dates.assessment} · Generated: {reportData.dates.generated}
      </p>
      <div className="mt-6 grid gap-6 text-left sm:grid-cols-2">
        <div>
          <p className="font-semibold text-xs uppercase tracking-wide opacity-70" style={{ color: "var(--body-text)" }}>
            Patient
          </p>
          <p className="mt-1 font-medium" style={{ color: "var(--heading)" }}>
            {reportData.patient.name}
          </p>
          <p className="text-sm" style={{ color: "var(--body-text)" }}>
            {reportData.patient.sex} · {reportData.patient.age} years
          </p>
        </div>
        <div>
          <p className="font-semibold text-xs uppercase tracking-wide opacity-70" style={{ color: "var(--body-text)" }}>
            Prepared by
          </p>
          <p className="mt-1 font-medium" style={{ color: "var(--heading)" }}>
            {reportData.preparedBy.doctorName}
          </p>
          <p className="text-sm" style={{ color: "var(--body-text)" }}>
            {reportData.preparedBy.clinicName}
          </p>
        </div>
      </div>
    </header>
  );
}

export function HeaderBlock({ reportData, settings, clinicBranding }: BlockComponentProps) {
  const layout = settings.layout ?? "classic";
  const showLogo = settings.showLogo !== false;
  const clinicName = clinicDisplayName(reportData, clinicBranding);
  const logoUrl = clinicBranding?.logoUrl;

  const props = { clinicName, logoUrl, showLogo, reportData };

  switch (layout) {
    case "banner":
      return <BannerHeader {...props} />;
    case "centered":
      return <CenteredHeader {...props} />;
    default:
      return <ClassicHeader {...props} />;
  }
}
