"use client";

import { ClinicLogo } from "@/components/report/ClinicLogo";
import { getFontCssVar } from "@/lib/fonts";
import {
  resolvedThemeToCssVars,
  resolveTheme,
  THEME_COLOR_DEFAULTS,
  THEME_DENSITY_DEFAULT,
  THEME_FONT_DEFAULTS,
} from "@/lib/theme";
import type { ClinicBranding, FontId } from "@/types";

export interface BrandingPreviewValues {
  name: string;
  logoUrl: string;
  accentColor: string;
  headingColor: string;
  textColor: string;
  backgroundColor: string;
  headingFont: FontId | "";
  bodyFont: FontId | "";
  density: "comfortable" | "compact" | "";
  address: string;
  phone: string;
  email: string;
  website: string;
  footerDisclaimer: string;
}

interface BrandingPreviewProps {
  values: BrandingPreviewValues;
  className?: string;
}

export function BrandingPreview({ values, className }: BrandingPreviewProps) {
  const clinicBranding: ClinicBranding = {
    name: values.name || "Your Clinic",
    logoUrl: values.logoUrl || null,
    accentColor: values.accentColor || "#001125",
    headingColor: values.headingColor || null,
    textColor: values.textColor || null,
    backgroundColor: values.backgroundColor || null,
    headingFont: values.headingFont || null,
    bodyFont: values.bodyFont || null,
    density: values.density || null,
    address: values.address || null,
    phone: values.phone || null,
    email: values.email || null,
    website: values.website || null,
    footerDisclaimer: values.footerDisclaimer || null,
  };

  const resolved = resolveTheme(
    {
      inheritClinicBranding: true,
      colors: {
        primary: THEME_COLOR_DEFAULTS.heading,
        heading: THEME_COLOR_DEFAULTS.heading,
        text: THEME_COLOR_DEFAULTS.text,
        background: THEME_COLOR_DEFAULTS.background,
      },
      fonts: {
        heading: THEME_FONT_DEFAULTS.heading,
        body: THEME_FONT_DEFAULTS.body,
      },
      density: THEME_DENSITY_DEFAULT,
    },
    clinicBranding,
  );

  const cssVars = resolvedThemeToCssVars(resolved);
  const isCompact = resolved.density === "compact";
  const hasContact = values.address || values.phone || values.email || values.website;

  function normalizeUrl(url: string): string {
    return url.startsWith("http") ? url : `https://${url}`;
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-app-border bg-app-bg/60 p-4">
        <p className="mb-3 font-medium text-[11px] text-app-text uppercase tracking-[0.12em]">Live preview</p>
        <div
          className="overflow-hidden rounded-lg border border-app-border shadow-[0_1px_2px_rgb(0_17_37/0.04)]"
          style={cssVars}
        >
          <div
            className="px-4 py-3"
            style={{
              backgroundColor: resolved.primary,
              color: resolved.bannerText,
              fontFamily: getFontCssVar(resolved.fonts.heading),
            }}
          >
            <div className="flex items-center gap-3">
              <ClinicLogo
                src={values.logoUrl}
                alt={`${values.name || "Clinic"} logo`}
                name={values.name || "Clinic"}
                className="h-8 w-auto max-w-[120px]"
              />
              <span className="font-semibold text-sm">{values.name || "Your Clinic"}</span>
            </div>
          </div>

          <div className={isCompact ? "space-y-3 p-4" : "space-y-4 p-5"} style={{ color: resolved.text }}>
            <div>
              <h3
                className={isCompact ? "font-semibold text-base" : "font-semibold text-lg"}
                style={{
                  color: resolved.heading,
                  fontFamily: getFontCssVar(resolved.fonts.heading),
                }}
              >
                Patient Health Report
              </h3>
              <p className={isCompact ? "mt-1 text-xs" : "mt-2 text-sm"}>
                This sample shows how your clinic branding appears on reports that inherit clinic settings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex rounded-full px-2.5 py-0.5 font-medium text-xs"
                style={{
                  backgroundColor: resolved.accentSoft,
                  color: resolved.primary,
                }}
              >
                Primary accent
              </span>
              <button
                type="button"
                className="rounded-md px-3 py-1 font-medium text-xs"
                style={{
                  backgroundColor: resolved.primary,
                  color: resolved.bannerText,
                }}
              >
                Action button
              </button>
            </div>

            <div
              className="rounded-md border px-3 py-2 text-xs"
              style={{
                borderColor: resolved.accentSoft,
                backgroundColor: resolved.background,
                color: resolved.text,
              }}
            >
              <p className="font-medium" style={{ color: resolved.heading }}>
                Body text sample
              </p>
              <p className="mt-1">
                Headings use{" "}
                <span style={{ fontFamily: getFontCssVar(resolved.fonts.heading) }}>{resolved.fonts.heading}</span> body
                copy uses <span style={{ fontFamily: getFontCssVar(resolved.fonts.body) }}>{resolved.fonts.body}</span>.
              </p>
            </div>
          </div>

          <div
            className="border-t px-4 py-3 text-xs"
            style={{
              borderColor: resolved.accentSoft,
              color: resolved.text,
              fontFamily: getFontCssVar(resolved.fonts.body),
            }}
          >
            {values.footerDisclaimer ? (
              <p>{values.footerDisclaimer}</p>
            ) : (
              <p className="text-app-text/50">Footer disclaimer will appear here.</p>
            )}
            {hasContact && (
              <div className="mt-3">
                {values.address && <p>{values.address}</p>}
                {(values.phone || values.email) && (
                  <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    {values.phone && (
                      <a
                        href={`tel:${values.phone.replace(/\D/g, "")}`}
                        className="hover:underline"
                        style={{ color: resolved.heading }}
                      >
                        {values.phone}
                      </a>
                    )}
                    {values.email && (
                      <a
                        href={`mailto:${values.email}`}
                        className="hover:underline"
                        style={{ color: resolved.heading }}
                      >
                        {values.email}
                      </a>
                    )}
                  </p>
                )}
                {values.website && (
                  <p className="mt-1">
                    <a
                      href={normalizeUrl(values.website)}
                      className="hover:underline"
                      style={{ color: resolved.primary }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {values.website}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
