import { ClinicLogo } from "../ClinicLogo";
import type { BlockComponentProps } from "../ReportRenderer";

function normalizeUrl(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

export function FooterBlock({ settings, clinicBranding }: BlockComponentProps) {
  const showLogo = settings.showLogo !== false;
  const showContact = settings.showContact !== false;
  const disclaimer = settings.customText ?? clinicBranding?.footerDisclaimer ?? null;
  const clinicName = clinicBranding?.name;
  const logoUrl = clinicBranding?.logoUrl;

  if (!clinicName && !disclaimer && !showContact) return null;

  return (
    <footer className="border-t pt-6" style={{ borderColor: "var(--accent)" }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {showLogo && clinicName && (
          <ClinicLogo src={logoUrl ?? ""} alt={`${clinicName} logo`} name={clinicName} className="h-8 w-auto" />
        )}
        {showContact && clinicBranding && (
          <div className="text-sm" style={{ color: "var(--body-text)" }}>
            {clinicBranding.address && <p>{clinicBranding.address}</p>}
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {clinicBranding.phone && (
                <a href={`tel:${clinicBranding.phone.replace(/\D/g, "")}`} className="hover:underline">
                  {clinicBranding.phone}
                </a>
              )}
              {clinicBranding.email && (
                <a href={`mailto:${clinicBranding.email}`} className="hover:underline">
                  {clinicBranding.email}
                </a>
              )}
            </p>
            {clinicBranding.website && (
              <p className="mt-1">
                <a
                  href={normalizeUrl(clinicBranding.website)}
                  className="hover:underline"
                  style={{ color: "var(--accent)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {clinicBranding.website}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
      {disclaimer && <p className="mt-4 text-slate-500 text-xs leading-relaxed">{disclaimer}</p>}
    </footer>
  );
}
