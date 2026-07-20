"use client";

import { useEstateStore } from "@/store/estateStore";

function CreditCardCheck() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 15 15" fill="none" stroke="#474739" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 11.25L11.25 12.5L13.75 10M13.75 6.25H1.25M13.75 7.5V5.125C13.75 4.42494 13.75 4.0749 13.6138 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54993 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42493 1.25 5.125V9.875C1.25 10.5751 1.25 10.9251 1.38624 11.1925C1.50608 11.4277 1.69731 11.6189 1.93251 11.7388C2.1999 11.875 2.54993 11.875 3.25 11.875H7.5" />
    </svg>
  );
}

function CreditCardSearch() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 15 15" fill="none" stroke="#EAB308" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.75 13.75L12.8125 12.8125M13.75 6.25H1.25M13.75 7.5V5.125C13.75 4.42494 13.75 4.0749 13.6138 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54993 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42493 1.25 5.125V9.875C1.25 10.5751 1.25 10.9251 1.38624 11.1925C1.50608 11.4277 1.69731 11.6189 1.93251 11.7388C2.1999 11.875 2.54993 11.875 3.25 11.875H6.5625M13.4375 11.25C13.4375 12.4581 12.4581 13.4375 11.25 13.4375C10.0419 13.4375 9.0625 12.4581 9.0625 11.25C9.0625 10.0419 10.0419 9.0625 11.25 9.0625C12.4581 9.0625 13.4375 10.0419 13.4375 11.25Z" />
    </svg>
  );
}

function CreditCardX() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 15 15" fill="none" stroke="#EF4444" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3125 10L13.4375 13.125M13.4375 10L10.3125 13.125M13.75 6.25H1.25M13.75 7.5V5.125C13.75 4.42494 13.75 4.0749 13.6138 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54993 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42493 1.25 5.125V9.875C1.25 10.5751 1.25 10.9251 1.38624 11.1925C1.50608 11.4277 1.69731 11.6189 1.93251 11.7388C2.1999 11.875 2.54993 11.875 3.25 11.875H7.5" />
    </svg>
  );
}

const MONTH_DATA: Record<number, { overdueRate: number; unpaidRate: number; paidAmount: string; unpaidAmount: string; overdueAmount: string; monthLabel: string }> = {
  6: { overdueRate: 0.0417, unpaidRate: 0.0417, paidAmount: "₦2,280,000", unpaidAmount: "₦190,000", overdueAmount: "₦190,000", monthLabel: "current month" },
  5: { overdueRate: 0.125,  unpaidRate: 0.167,  paidAmount: "₦1,900,000", unpaidAmount: "₦330,000", overdueAmount: "₦250,000", monthLabel: "May levy" },
};

export default function CollectionDataCard({ className = "", month = 6 }: { className?: string; month?: number }) {
  const structure = useEstateStore((s) => s.structure);

  const totalUnits = structure
    ? structure.aptCounts.reduce((sum, c) => sum + c, 0)
    : 24;

  const data = MONTH_DATA[month] ?? MONTH_DATA[6];
  const overdue  = Math.max(1, Math.round(totalUnits * data.overdueRate));
  const unpaid   = Math.max(1, Math.round(totalUnits * data.unpaidRate));
  const paid     = Math.max(0, totalUnits - overdue - unpaid);

  const paidPct    = totalUnits > 0 ? `${Math.round((paid   / totalUnits) * 100)}%` : "0%";
  const unpaidPct  = totalUnits > 0 ? `${Math.round((unpaid / totalUnits) * 100)}%` : "0%";
  const overduePct = totalUnits > 0 ? `${Math.round((overdue / totalUnits) * 100)}%` : "0%";

  const rows = [
    { icon: <CreditCardCheck />,  label: `${paid} units paid ${data.monthLabel} levy`,         pct: paidPct,    amount: data.paidAmount    },
    { icon: <CreditCardSearch />, label: `${unpaid} units yet to pay ${data.monthLabel} levy`, pct: unpaidPct,  amount: data.unpaidAmount  },
    { icon: <CreditCardX />,      label: `${overdue} units overdue for ${data.monthLabel}`,    pct: overduePct, amount: data.overdueAmount },
  ];

  return (
    <div className={`bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5 h-full ${className}`} style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <p className="text-base font-semibold text-noku-text-mid">Collection Data</p>

      {/* Headline count */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#525252]">
          <span className="text-[28px] font-bold text-noku-heading leading-none">{paid}</span>{" "}
          of {totalUnits} units paid
        </p>

        {/* Segmented progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden flex">
          <div className="bg-[#16a34a] h-full" style={{ width: `${(paid / totalUnits) * 100}%` }} />
          <div className="bg-[#eab308] h-full" style={{ width: `${(unpaid / totalUnits) * 100}%` }} />
          <div className="bg-[#ef4444] h-full" style={{ width: `${(overdue / totalUnits) * 100}%` }} />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />
            Units paid
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-[#eab308] shrink-0" />
            Units unpaid
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] shrink-0" />
            Units overdue
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <div className="shrink-0 border border-[#e8e8e3] rounded p-1.5">
              {row.icon}
            </div>
            <p className="flex-1 text-sm text-[#404040]">{row.label}</p>
            <p className="text-sm text-[#737373] shrink-0">{row.pct}</p>
            <p className="text-sm font-medium text-noku-heading shrink-0 w-28 text-right">{row.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
