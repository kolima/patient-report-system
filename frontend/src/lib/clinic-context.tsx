"use client";

import { useEffect, useMemo } from "react";
import { useClinicStore } from "@/lib/clinic-store";
import { useClinicsQuery, useUpdateClinicMutation } from "@/lib/queries";
import type { Clinic } from "@/types";

export function ClinicInitializer() {
  const { data: clinics = [] } = useClinicsQuery();
  const hasHydrated = useClinicStore((state) => state.hasHydrated);
  const setHasHydrated = useClinicStore((state) => state.setHasHydrated);
  const syncWithClinics = useClinicStore((state) => state.syncWithClinics);

  // Zustand persist rehydration is async; mark ready via the official hooks so
  // we never stay stuck on `hasHydrated: false` (infinite loading skeletons).
  useEffect(() => {
    const markHydrated = () => setHasHydrated(true);

    if (useClinicStore.persist.hasHydrated()) {
      markHydrated();
    }

    return useClinicStore.persist.onFinishHydration(markHydrated);
  }, [setHasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    syncWithClinics(clinics);
  }, [clinics, hasHydrated, syncWithClinics]);

  return null;
}

export function useClinic() {
  const clinicId = useClinicStore((state) => state.clinicId);
  const hasHydrated = useClinicStore((state) => state.hasHydrated);
  const setClinicId = useClinicStore((state) => state.setClinicId);

  const { data: clinics = [], isLoading, error, refetch } = useClinicsQuery();
  const updateClinicMutation = useUpdateClinicMutation();

  const clinic = useMemo(() => clinics.find((c) => c.id === clinicId) ?? null, [clinics, clinicId]);

  const errorMessage = error instanceof Error ? error.message : error ? "Failed to load clinics" : null;

  const updateClinic = async (id: string, body: Partial<Omit<Clinic, "id">>) => {
    return updateClinicMutation.mutateAsync({ id, body });
  };

  return {
    clinics,
    clinic,
    clinicId,
    setClinicId,
    loading: isLoading || !hasHydrated,
    error: errorMessage,
    refreshClinics: refetch,
    updateClinic,
  };
}
