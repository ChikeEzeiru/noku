import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EstateStructure } from "@/components/admin-onboarding/Step3";
import type { TimeValue } from "@/components/admin/shared/TimePicker";
import type { BillingSettings } from "@/components/admin-onboarding/Step6";
import type { Resident } from "@/components/admin-onboarding/Step7";
import type { CommitteeMember } from "@/components/admin-onboarding/Step8";

export type ExternalPayment = {
  status: "Paid";
  datePaid: string;
  channel: "External";
  amount: string;
};

export type AdminProfile = {
  fullName: string;
  phone: string;
  email: string;
  role: string;
};

export type EstateInfo = {
  estateName: string;
  address: string;
  city: string;
  state: string;
};

export type GeneratorSchedule = {
  startTime: TimeValue | null;
  endTime: TimeValue | null;
  weekendSchedule: boolean;
  weekendStart: TimeValue | null;
  weekendEnd: TimeValue | null;
  generatorType: string;
};

export type FormulaWeights = {
  occupants: number;
  bedrooms: number;
  acUnits: number;
};

type EstateState = {
  admin:     AdminProfile | null;
  estate:    EstateInfo | null;
  structure: EstateStructure | null;
  generator: GeneratorSchedule | null;
  formula:   FormulaWeights | null;
  billing:   BillingSettings | null;
  residents: Resident[];
  committee: CommitteeMember[];
  onboardingCompletedAt?: string;
  lastRecalculatedAt?:    string;
  paymentOverrides:       Record<string, ExternalPayment>;
  rationingActive:        boolean;
  rationingSchedule:      { startTime: TimeValue; endTime: TimeValue } | null;
  generatorOverride:      "off" | "under_repair" | null;

  setAdmin:                  (v: AdminProfile) => void;
  setEstate:                 (v: EstateInfo) => void;
  setStructure:              (v: EstateStructure) => void;
  setGenerator:              (v: GeneratorSchedule) => void;
  setFormula:                (v: FormulaWeights) => void;
  setBilling:                (v: BillingSettings) => void;
  setResidents:              (v: Resident[]) => void;
  setCommittee:              (v: CommitteeMember[]) => void;
  setOnboardingCompletedAt:  (v: string) => void;
  setLastRecalculatedAt:     (v: string) => void;
  logExternalPayment:        (unitLabel: string, data: ExternalPayment) => void;
  setRationingActive:        (v: boolean) => void;
  setRationingSchedule:      (v: { startTime: TimeValue; endTime: TimeValue } | null) => void;
  setGeneratorOverride:      (v: "off" | "under_repair" | null) => void;
};

export const useEstateStore = create<EstateState>()(
  persist(
    (set) => ({
      admin:            null,
      estate:           null,
      structure:        null,
      generator:        null,
      formula:          null,
      billing:          null,
      residents:        [],
      committee:        [],
      paymentOverrides: {},
      rationingActive:   false,
      rationingSchedule: null,
      generatorOverride: null,

      setAdmin:                 (v) => set({ admin: v }),
      setEstate:                (v) => set({ estate: v }),
      setStructure:             (v) => set({ structure: v }),
      setGenerator:             (v) => set({ generator: v }),
      setFormula:               (v) => set({ formula: v }),
      setBilling:               (v) => set({ billing: v }),
      setResidents:             (v) => set({ residents: v }),
      setCommittee:             (v) => set({ committee: v }),
      setOnboardingCompletedAt: (v) => set({ onboardingCompletedAt: v }),
      setLastRecalculatedAt:    (v) => set({ lastRecalculatedAt: v }),
      logExternalPayment:       (unitLabel, data) =>
        set((s) => ({ paymentOverrides: { ...s.paymentOverrides, [unitLabel]: data } })),
      setRationingActive:       (v) => set({ rationingActive: v }),
      setRationingSchedule:     (v) => set({ rationingSchedule: v }),
      setGeneratorOverride:     (v) => set({ generatorOverride: v }),
    }),
    { name: "noku-estate" }
  )
);
