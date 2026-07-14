"use client";

import { useState } from "react";
import Image from "next/image";

function StepDots({ step }: { step: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1">
      {([0, 1, 2, 3] as const).map((i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-200"
          style={{
            width: i === step ? 24 : 8,
            height: i === step ? 8 : 6,
            backgroundColor: i === step ? "#17a248" : "#e8e8e3",
          }}
        />
      ))}
    </div>
  );
}

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div
      className="w-full bg-white border border-noku-nav-border rounded-lg flex items-center justify-between overflow-hidden"
      style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
    >
      <span className="px-3 py-2 text-sm text-noku-heading flex-1">
        {value}
      </span>
      <div className="flex flex-col border-l border-noku-nav-border shrink-0">
        <button
          onClick={() => onChange(value + 1)}
          className="px-3 py-1 text-noku-text-dim border-b border-noku-nav-border hover:bg-noku-warm-hover"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 8l4-4 4 4" />
          </svg>
        </button>
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="px-3 py-1 text-noku-text-dim hover:bg-noku-warm-hover"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

type SetupHouseholdScreenProps = {
  onComplete: (
    occupants: number,
    apartmentType: string,
    acUnits: number
  ) => void;
  onBack: () => void;
};

export default function SetupHouseholdScreen({
  onComplete,
  onBack,
}: SetupHouseholdScreenProps) {
  const [occupants, setOccupants] = useState(5);
  const [apartmentType, setApartmentType] = useState("3 bedroom apartment");
  const [acUnits, setAcUnits] = useState(4);

  return (
    <div className="min-h-[calc(100vh-44px)] bg-noku-bg flex flex-col justify-between pt-6 pb-10">
      <div className="flex flex-col gap-12 px-6">
        {/* Step indicator */}
        <StepDots step={3} />

        {/* Illustration */}
        <div className="flex items-center justify-center">
          <Image
            src="/Images/Apartment-illustration.svg"
            alt=""
            width={345}
            height={226}
            className="w-86.25 h-56.5 object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
              Setup your household
            </p>
            <p className="text-base text-[#5b5b4b] leading-6">
              This helps calculate your fair share of generator costs.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Occupants */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-noku-text-mid">
                How many occupants will be in your apartment?
              </label>
              <Stepper value={occupants} onChange={setOccupants} />
            </div>

            {/* Apartment type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-noku-text-mid">
                Your apartment is a:
              </label>
              <input
                type="text"
                value={apartmentType}
                readOnly
                disabled
                className="w-full bg-[#f4f4f0] border border-noku-nav-border rounded-lg px-3 py-2 text-sm text-noku-text-dim cursor-not-allowed"
                style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
              />
            </div>

            {/* AC units */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-noku-text-mid">
                How many AC units are in your apartment?
              </label>
              <Stepper value={acUnits} onChange={setAcUnits} />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 flex items-center justify-end gap-4">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#5b5b4b]"
        >
          Back
        </button>
        <button
          onClick={() => onComplete(occupants, apartmentType, acUnits)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{
            backgroundColor: "#17a248",
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)",
          }}
        >
          Complete registration
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.667 8.667 6 12l7.333-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
