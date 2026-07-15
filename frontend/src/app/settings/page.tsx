"use client";

import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ClinicLogo } from "@/components/report/ClinicLogo";
import { BrandingPreview } from "@/components/settings/BrandingPreview";
import { ColorField } from "@/components/settings/ColorField";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField, FormSection } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { SELECT_DEFAULT_VALUE, Select, SelectItem } from "@/components/ui/Select";
import { SettingsSkeleton } from "@/components/ui/Skeleton";
import { Textarea } from "@/components/ui/Textarea";
import { UnsavedChangesDialog } from "@/components/ui/UnsavedChangesDialog";
import { useClinic } from "@/lib/clinic-context";
import { clinicFormValidation } from "@/lib/clinic-form-validation";
import { FONT_OPTIONS } from "@/lib/fonts";
import { THEME_COLOR_DEFAULTS } from "@/lib/theme";
import { showSuccess } from "@/lib/toast";
import { useUnsavedChangesGuard } from "@/lib/use-unsaved-changes";
import type { Clinic, FontId } from "@/types";

type ClinicFormValues = {
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
};

function clinicToFormValues(clinic: Clinic): ClinicFormValues {
  return {
    name: clinic.name,
    logoUrl: clinic.logoUrl ?? "",
    accentColor: clinic.accentColor,
    headingColor: clinic.headingColor ?? "",
    textColor: clinic.textColor ?? "",
    backgroundColor: clinic.backgroundColor ?? "",
    headingFont: clinic.headingFont ?? "",
    bodyFont: clinic.bodyFont ?? "",
    density: clinic.density ?? "",
    address: clinic.address ?? "",
    phone: clinic.phone ?? "",
    email: clinic.email ?? "",
    website: clinic.website ?? "",
    footerDisclaimer: clinic.footerDisclaimer ?? "",
  };
}

const ADVANCED_COLOR_FIELDS = [
  {
    key: "headingColor" as const,
    label: "Heading",
    defaultColor: THEME_COLOR_DEFAULTS.heading,
  },
  {
    key: "textColor" as const,
    label: "Body text",
    defaultColor: THEME_COLOR_DEFAULTS.text,
  },
  {
    key: "backgroundColor" as const,
    label: "Background",
    defaultColor: THEME_COLOR_DEFAULTS.background,
  },
];

export default function SettingsPage() {
  const { clinic, clinicId, loading, updateClinic } = useClinic();

  if (loading || !clinicId || !clinic) {
    return <SettingsSkeleton />;
  }

  return <SettingsForm key={clinic.id} clinic={clinic} clinicId={clinicId} updateClinic={updateClinic} />;
}

interface SettingsFormProps {
  clinic: Clinic;
  clinicId: string;
  updateClinic: (id: string, body: Partial<Omit<Clinic, "id">>) => Promise<Clinic>;
}

function SettingsForm({ clinic, clinicId, updateClinic }: SettingsFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<ClinicFormValues>({
    defaultValues: clinicToFormValues(clinic),
    mode: "onBlur",
  });

  const formValues = watch();
  const { name, logoUrl } = formValues;

  const saveClinic = useCallback(
    async (data: ClinicFormValues): Promise<boolean> => {
      if (!clinicId) return false;

      setError(null);

      try {
        await updateClinic(clinicId, {
          name: data.name,
          logoUrl: data.logoUrl || null,
          accentColor: data.accentColor,
          headingColor: data.headingColor || null,
          textColor: data.textColor || null,
          backgroundColor: data.backgroundColor || null,
          headingFont: data.headingFont || null,
          bodyFont: data.bodyFont || null,
          density: data.density || null,
          address: data.address || null,
          phone: data.phone || null,
          email: data.email || null,
          website: data.website || null,
          footerDisclaimer: data.footerDisclaimer || null,
        });
        reset(data);
        showSuccess("Clinic settings saved. Templates with clinic branding enabled will reflect these changes.");
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save settings");
        return false;
      }
    },
    [clinicId, reset, updateClinic],
  );

  const handleSaveFromGuard = useCallback(async () => {
    return new Promise<boolean>((resolve) => {
      void handleSubmit(
        async (data) => {
          resolve(await saveClinic(data));
        },
        () => resolve(false),
      )();
    });
  }, [handleSubmit, saveClinic]);

  const {
    dialogOpen: leaveDialogOpen,
    isSaving: isLeavingAfterSave,
    handleSaveAndLeave,
    handleContinue: handleLeaveWithoutSaving,
    closeDialog: closeLeaveDialog,
  } = useUnsavedChangesGuard({ isDirty, onSave: handleSaveFromGuard });

  const onSubmit = async (data: ClinicFormValues) => {
    await saveClinic(data);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-24">
      <PageHeader
        title="Clinic Settings"
        description='Branding here applies to templates that use "Use clinic branding" in the editor — colors, fonts, and density.'
      />

      <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <form id="clinic-settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Identity" description="Your clinic name and logo appear in report headers.">
            <FormField label="Clinic name" error={errors.name?.message}>
              <Input type="text" invalid={!!errors.name} {...register("name", clinicFormValidation.name)} />
            </FormField>

            <FormField
              label="Logo URL"
              description="Use an https URL or a path like /logos/your-clinic.svg"
              error={errors.logoUrl?.message}
            >
              <Input
                type="text"
                placeholder="https://example.com/logo.svg or /logos/clinic.svg"
                invalid={!!errors.logoUrl}
                {...register("logoUrl", clinicFormValidation.logoUrl)}
              />
            </FormField>

            <div className="rounded-lg border border-app-border bg-app-bg/60 p-4">
              <p className="mb-2 text-app-text text-xs">Logo preview</p>
              {logoUrl ? (
                <ClinicLogo src={logoUrl} alt={`${name} logo`} name={name} className="h-10 w-auto" />
              ) : (
                <ClinicLogo src="" alt="" name={name} className="h-10 w-10" />
              )}
            </div>
          </FormSection>

          <div className="lg:hidden">
            <BrandingPreview values={formValues} />
          </div>

          <FormSection
            title="Brand colors"
            description="Primary color is always used. Advanced colors override template defaults when set."
          >
            <Controller
              name="accentColor"
              control={control}
              rules={clinicFormValidation.accentColor}
              render={({ field }) => (
                <ColorField
                  label="Primary color"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.accentColor?.message}
                />
              )}
            />

            <button
              type="button"
              className="cursor-pointer text-app-accent text-xs"
              onClick={() => setShowAdvancedColors((v) => !v)}
            >
              {showAdvancedColors ? "Hide advanced colors" : "Advanced colors"}
            </button>

            {showAdvancedColors && (
              <div className="space-y-4 border-app-border border-t pt-4">
                {ADVANCED_COLOR_FIELDS.map(({ key, label, defaultColor }) => (
                  <Controller
                    key={key}
                    name={key}
                    control={control}
                    rules={clinicFormValidation[key]}
                    render={({ field }) => (
                      <ColorField
                        label={label}
                        value={field.value}
                        fallbackColor={defaultColor}
                        nullable
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        onClear={() => field.onChange("")}
                        error={errors[key]?.message}
                      />
                    )}
                  />
                ))}
              </div>
            )}
          </FormSection>

          <FormSection
            title="Typography & layout"
            description="Leave fields on template default to inherit from each report template."
          >
            <FormField label="Heading font">
              <Controller
                name="headingFont"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    value={field.value || SELECT_DEFAULT_VALUE}
                    onValueChange={(v) => field.onChange(v === SELECT_DEFAULT_VALUE ? "" : v)}
                    onBlur={field.onBlur}
                  >
                    <SelectItem value={SELECT_DEFAULT_VALUE}>Template default</SelectItem>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font.id} value={font.id}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </FormField>

            <FormField label="Body font">
              <Controller
                name="bodyFont"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    value={field.value || SELECT_DEFAULT_VALUE}
                    onValueChange={(v) => field.onChange(v === SELECT_DEFAULT_VALUE ? "" : v)}
                    onBlur={field.onBlur}
                  >
                    <SelectItem value={SELECT_DEFAULT_VALUE}>Template default</SelectItem>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font.id} value={font.id}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </FormField>

            <FormField label="Density">
              <Controller
                name="density"
                control={control}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    value={field.value || SELECT_DEFAULT_VALUE}
                    onValueChange={(v) => field.onChange(v === SELECT_DEFAULT_VALUE ? "" : v)}
                    onBlur={field.onBlur}
                  >
                    <SelectItem value={SELECT_DEFAULT_VALUE}>Template default</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </Select>
                )}
              />
            </FormField>
          </FormSection>

          <FormSection title="Contact details" description="Shown in report footers when contact info is enabled.">
            <FormField label="Address" error={errors.address?.message}>
              <Input type="text" invalid={!!errors.address} {...register("address", clinicFormValidation.address)} />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Phone" error={errors.phone?.message}>
                <Input type="text" invalid={!!errors.phone} {...register("phone", clinicFormValidation.phone)} />
              </FormField>
              <FormField label="Email" error={errors.email?.message}>
                <Input type="email" invalid={!!errors.email} {...register("email", clinicFormValidation.email)} />
              </FormField>
            </div>

            <FormField label="Website" error={errors.website?.message}>
              <Input
                type="url"
                placeholder="https://example.com"
                invalid={!!errors.website}
                {...register("website", clinicFormValidation.website)}
              />
            </FormField>
          </FormSection>

          <FormSection
            title="Report footer"
            description="Legal or informational text displayed at the bottom of reports."
          >
            <FormField label="Footer disclaimer" error={errors.footerDisclaimer?.message}>
              <Textarea
                rows={4}
                invalid={!!errors.footerDisclaimer}
                {...register("footerDisclaimer", clinicFormValidation.footerDisclaimer)}
              />
            </FormField>
          </FormSection>

          {error && <Alert variant="error">{error}</Alert>}
        </form>

        <div className="hidden lg:block">
          <div className="sticky top-20 z-10 max-h-[calc(100dvh-5rem)] overflow-y-auto">
            <BrandingPreview values={formValues} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-app-border border-t bg-app-surface/95 px-4 py-3 backdrop-blur sm:static sm:mt-6 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {isDirty && <p className="text-amber-700 text-sm">You have unsaved changes.</p>}
          <Button
            type="submit"
            form="clinic-settings-form"
            disabled={isSubmitting || !isDirty}
            className="w-full sm:ml-auto sm:w-auto"
          >
            {isSubmitting ? "Saving..." : "Save settings"}
          </Button>
        </div>
      </div>

      <UnsavedChangesDialog
        open={leaveDialogOpen}
        isSaving={isLeavingAfterSave}
        onSave={() => void handleSaveAndLeave()}
        onContinue={handleLeaveWithoutSaving}
        onCancel={closeLeaveDialog}
      />
    </div>
  );
}
