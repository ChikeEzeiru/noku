"use client";

type RegistrationConfirmationProps = {
  name: string;
  occupants: number;
  apartmentType: string;
  onContinue: () => void;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 items-start">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#17a248" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
        <circle cx="9" cy="9" r="7.5" />
        <path d="M9 8.25V11.25M9 6h.008" />
      </svg>
      <p className="text-base text-[#7c7c67] whitespace-nowrap shrink-0">{label}</p>
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
    <div className="min-h-[calc(100vh-44px)] bg-noku-bg flex flex-col justify-between pt-6 pb-10">
      <div className="flex flex-col gap-12 px-6">

        {/* Illustration */}
        <div className="flex items-center justify-center">
          <img
            src="https://www.figma.com/api/mcp/asset/fb7a5bf6-5e3f-40d2-8966-0e061dcef8b2"
            alt=""
            className="w-[200px] h-[200px] object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
              You're all set,{" "}
              <span className="text-noku-text-dim">{firstName}</span>
            </p>
            <p className="text-base text-[#5b5b4b] leading-6">
              Here's a summary of your details:
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <InfoRow label="Your unit:" value="Building B, Unit 4 (First Floor)" />
            <InfoRow label="Occupants:" value={String(occupants)} />
            <InfoRow label="Apartment type:" value={apartmentType} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{
            backgroundColor: "#17a248",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)",
          }}
        >
          Continue to Home
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
