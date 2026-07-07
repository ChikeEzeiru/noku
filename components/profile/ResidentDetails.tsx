"use client";


function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-noku-border-light last:border-0">
      <p className="text-sm text-noku-text-dim min-w-[132px] shrink-0">{label}</p>
      <p className="text-sm text-noku-text-mid font-medium">{value}</p>
    </div>
  );
}

type ResidentDetailsProps = {
  onBack: () => void;
};

export default function ResidentDetails({ onBack }: ResidentDetailsProps) {
  return (
    <div className="bg-noku-bg min-h-screen pb-10">
      {/* Back */}
      <div className="px-6 pt-6">
        <button
          onClick={onBack}
          className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
        >
          <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
          <span className="text-xs">Back</span>
        </button>
      </div>

      <div className="px-6 mt-6 flex flex-col gap-6">
        {/* Header */}
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          Resident Details
        </p>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-noku-brand-light border border-noku-brand-border flex items-center justify-center">
            <span className="text-lg font-semibold text-noku-brand-deep">CC</span>
          </div>
          <p className="text-sm font-medium text-noku-text-mid">Ciroma Chukwuma</p>
          <p className="text-xs text-noku-text-dim">Building B, Unit 4</p>
        </div>

        {/* Personal info */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em] mb-2">
            Personal
          </p>
          <div className="bg-white border border-noku-border-light rounded-xl px-4 py-1">
            <Row label="Full name"    value="Ciroma Chukwuma Adekunle" />
            <Row label="Phone"        value="+234 801 234 5678" />
            <Row label="Email"        value="ciroma@email.com" />
          </div>
        </div>

        {/* Apartment info */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em] mb-2">
            Apartment
          </p>
          <div className="bg-white border border-noku-border-light rounded-xl px-4 py-1">
            <Row label="Block"        value="Building B" />
            <Row label="Unit"         value="Unit 4" />
            <Row label="Occupants"    value="5" />
            <Row label="Bedrooms"     value="3" />
            <Row label="AC units"     value="4" />
            <Row label="Active issues" value="None" />
          </div>
        </div>
      </div>
    </div>
  );
}
