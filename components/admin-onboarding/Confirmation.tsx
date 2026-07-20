"use client";

import Image from "next/image";
import { useEstateStore } from "@/store/estateStore";

type EditTarget = "estate" | "generator" | "billing" | "committee" | "residents";

type Props = {
  onDashboard: () => void;
  onEdit: (target: EditTarget) => void;
};

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatTime(t: { hour: string; minute: string; period: "AM" | "PM" } | null): string {
  if (!t) return "—";
  return `${t.hour}:${t.minute} ${t.period}`;
}

function CheckBadge() {
  return (
    <div
      className="relative shrink-0 w-8 h-8 rounded-[6px] flex items-center justify-center border-2 border-[rgba(255,255,255,0.12)]"
      style={{
        backgroundColor: "#17a248",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M5.5 8l1.75 1.75 3.25-3.5" />
      </svg>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M4.167 10H15.833M15.833 10l-5-5M15.833 10l-5 5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.917 1.75a1.237 1.237 0 011.75 1.75L4.083 11.083 1.167 11.75l.667-2.917L9.917 1.75z" />
    </svg>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex gap-3 items-start w-full text-left rounded-[8px] px-2 py-1.5 -mx-2 transition-colors hover:bg-[#fbfbf9] active:bg-[#f3f3ee] group"
      aria-label={`Edit ${label}`}
    >
      <span className="text-base text-[#7c7c67] shrink-0 min-w-[92px] leading-6">{label}</span>
      <span className="flex-1 min-w-0 text-base font-medium text-[#474739] leading-6">{value}</span>
      <span className="shrink-0 mt-1.5 text-[#c8c8b4] group-hover:text-[#7c7c67] transition-colors">
        <EditIcon />
      </span>
    </button>
  );
}

export default function Confirmation({ onDashboard, onEdit }: Props) {
  const { estate, structure, generator, billing, residents, committee } = useEstateStore();

  /* ── Derived summary strings ────────────────────────────────── */

  const estateName = estate?.estateName ?? "Your Estate";

  const totalUnits = structure?.aptCounts.reduce((a, b) => a + b, 0) ?? 0;
  const blockCount = structure?.buildingNames.length ?? 0;
  const aptNaming = structure?.aptNaming ?? "Unit";
  const estateValue = `${estateName}, ${totalUnits} ${aptNaming.toLowerCase()}${totalUnits !== 1 ? "s" : ""} across ${blockCount} building${blockCount !== 1 ? "s" : ""}`;

  const generatorValue = generator
    ? `${formatTime(generator.startTime)} – ${formatTime(generator.endTime)} daily · ${generator.generatorType}`
    : "—";

  const gracePeriodLabel = billing?.gracePeriod === "0"
    ? "no grace period"
    : `${billing?.gracePeriod ?? "—"}-day grace period`;
  const billingValue = billing
    ? `Monthly · Due ${ordinal(billing.dueDate)} · ${gracePeriodLabel}`
    : "—";

  const filledResidents = residents.filter((r) => r.name.trim() !== "");
  const vacantCount = totalUnits - filledResidents.length;
  const residentsValue = `${filledResidents.length} invited${vacantCount > 0 ? `, ${vacantCount} vacant` : ""}`;

  const committeeValue = committee.length > 0
    ? `${committee.length} member${committee.length !== 1 ? "s" : ""} invited`
    : "None added yet";

  const dueOrdinal = billing ? ordinal(billing.dueDate) : "—";

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">

      {/* ── Left — content ──────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[440px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <CheckBadge />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              {estateName} is set up!
            </p>
            <p className="text-base text-[#525252] leading-6">
              Here&apos;s a summary of what was configured
            </p>
          </div>

          {/* Summary card */}
          <div className="flex flex-col gap-4 bg-white border border-[#d8d8d0] rounded-[12px] p-4">
            <SummaryRow label="Estate:"    value={estateValue}    onEdit={() => onEdit("estate")} />
            <SummaryRow label="Generator:" value={generatorValue} onEdit={() => onEdit("generator")} />
            <SummaryRow label="Billing:"   value={billingValue}   onEdit={() => onEdit("billing")} />
            <SummaryRow label="Committee:" value={committeeValue} onEdit={() => onEdit("committee")} />
            <SummaryRow label="Residents:" value={residentsValue} onEdit={() => onEdit("residents")} />
          </div>

          {/* What's next note */}
          <p className="text-sm text-[#525252] leading-5">
            Resident invite texts are on their way. Your first billing cycle opens on the {dueOrdinal} — you&apos;ll be prompted to confirm the fuel cost before bills go out.
          </p>

          {/* CTA */}
          <button
            onClick={onDashboard}
            className="w-full flex items-center justify-center gap-1.5 py-[13px] px-4 rounded-[10px] text-base font-semibold text-white"
            style={{
              backgroundColor: "#17a248",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            Go to Dashboard
            <ArrowRightIcon />
          </button>

        </div>
      </div>

      {/* ── Right — generator image ──────────────────────────── */}
      <div className="flex-1 p-3">
        <div className="relative h-full w-full rounded-[20px] overflow-hidden">
          <Image
            src="/Images/Generator img for admin side.avif"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

    </div>
  );
}
