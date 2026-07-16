"use client";

import Image from "next/image";

type RegistrationConfirmationProps = {
  name: string;
  occupants: number;
  apartmentType: string;
  onContinue: () => void;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 items-start">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#17a248"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 mt-0.5"
      >
        <circle cx="9" cy="9" r="7.5" />
        <path d="M9 8.25V11.25M9 6h.008" />
      </svg>
      <p className="text-base text-noku-text-dim whitespace-nowrap shrink-0">
        {label}
      </p>
      <p className="text-base font-medium text-[#5b5b4b] flex-1">{value}</p>
    </div>
  );
}

export default function RegistrationConfirmation({
  name,
  occupants,
  apartmentType,
  onContinue,
}: RegistrationConfirmationProps) {
  const firstName = name.split(" ")[0] || "there";

  return (
    <div className="h-[calc(100vh-44px)] bg-noku-bg flex flex-col">
      <div className="flex-1 overflow-y-auto flex flex-col gap-12 px-6 pt-6">
        {/* Illustration */}
        <div className="flex items-center justify-center animate-[successPop_300ms_cubic-bezier(0.34,1.56,0.64,1)_100ms_both]">
          <Image
            src="/Images/Noku Logo Vector.svg"
            alt=""
            width={200}
            height={200}
            className="w-50 h-50 object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px] animate-[fadeSlideUp_200ms_cubic-bezier(0.23,1,0.32,1)_160ms_both]">
              You&apos;re all set,{" "}
              <span className="text-noku-text-dim">{firstName}</span>
            </p>
            <p className="text-base text-[#5b5b4b] leading-6">
              Here&apos;s a summary of your details:
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <InfoRow
              label="Your unit:"
              value="Building B, Unit 4 (First Floor)"
            />
            <InfoRow label="Occupants:" value={String(occupants)} />
            <InfoRow label="Apartment type:" value={apartmentType} />
            <InfoRow label="AC units" value="4" />
          </div>

          <p className="text-xs font-normal leading-[18px] text-noku-text-dim">
            Your contribution will be calculated based on these details
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-6 pb-10 pt-4 flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{
            backgroundColor: "#17a248",
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)",
          }}
        >
          Continue to Home
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
