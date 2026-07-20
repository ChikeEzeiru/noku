"use client";

import { useEstateStore } from "@/store/estateStore";

type BadgeVariant = "green" | "gray";

function PercentBadge({ value, variant = "gray" }: { value: string; variant?: BadgeVariant }) {
  const cls =
    variant === "green"
      ? "border-noku-green text-noku-green"
      : "border-[#d1d5db] text-[#525252]";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {value}
    </span>
  );
}

type ResidentStatCardProps = {
  title: string;
  value: string | number;
  suffix?: string;
  badge?: { label: string; variant?: BadgeVariant };
  valueClassName?: string;
};

function ResidentStatCard({ title, value, suffix, badge, valueClassName }: ResidentStatCardProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <p className="text-sm text-[#525252] leading-5">{title}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={`text-[28px] font-bold leading-tight tracking-tight ${valueClassName ?? "text-noku-heading"}`}>
            {value}
          </span>
          {suffix && <span className="text-sm text-[#737373]">{suffix}</span>}
          {badge && <PercentBadge value={badge.label} variant={badge.variant} />}
        </div>
      </div>
    </div>
  );
}

const FLAGGED_BY_MONTH: Record<number, number> = { 6: 4, 5: 6 };

export default function ResidentStatCards({ month = 6 }: { month?: number }) {
  const { structure, residents } = useEstateStore();

  const totalUnits = structure?.aptCounts.reduce((a, b) => a + b, 0) ?? 0;
  const invitedCount = residents.filter((r) => r.name.trim() !== "").length;
  const inactiveCount = Math.max(0, totalUnits - invitedCount);

  const occupiedPct = totalUnits > 0 ? Math.round((invitedCount / totalUnits) * 100) : 0;
  const inactivePct = totalUnits > 0 ? Math.round((inactiveCount / totalUnits) * 100) : 0;
  const flaggedCount = FLAGGED_BY_MONTH[month] ?? 4;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ResidentStatCard
        title={"Apartment\nUnits Occupied"}
        value={invitedCount}
        suffix={`of ${totalUnits}`}
      />
      <ResidentStatCard
        title={"Active &\nOnboarded Units"}
        value={invitedCount}
        suffix={`of ${totalUnits}`}
        badge={{ label: `${occupiedPct}%`, variant: "green" }}
      />
      <ResidentStatCard
        title={"Inactive\nUnits"}
        value={inactiveCount}
        suffix={`of ${totalUnits}`}
        badge={{ label: `${inactivePct}%`, variant: "gray" }}
      />
      <ResidentStatCard
        title={"Flagged/Reported\nIssues"}
        value={flaggedCount}
        valueClassName="text-[#EF4444]"
      />
    </div>
  );
}
