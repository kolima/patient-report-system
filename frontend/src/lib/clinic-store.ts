import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Clinic } from "@/types";

interface ClinicStore {
  clinicId: string | null;
  hasHydrated: boolean;
  setClinicId: (id: string) => void;
  setHasHydrated: (value: boolean) => void;
  /** Validate persisted id against the clinics list; run only after rehydration. */
  syncWithClinics: (clinics: Clinic[]) => void;
}

export const useClinicStore = create<ClinicStore>()(
  persist(
    (set, get) => ({
      clinicId: null,
      hasHydrated: false,
      setClinicId: (id) => set({ clinicId: id }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
      syncWithClinics: (clinics) => {
        if (!get().hasHydrated || clinics.length === 0) return;

        const { clinicId } = get();
        const valid = clinicId ? clinics.some((c) => c.id === clinicId) : false;

        if (!valid) {
          set({ clinicId: clinics[0]?.id ?? null });
        }
      },
    }),
    {
      name: "selectedClinicId",
      partialize: (state) => ({ clinicId: state.clinicId }),
    },
  ),
);
