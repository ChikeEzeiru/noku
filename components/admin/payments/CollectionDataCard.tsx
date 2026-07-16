function PaidIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" opacity="0.8" stroke="#474739" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 11.25L11.25 12.5L13.75 10M13.75 6.25H1.25M13.75 7.5V5.125C13.75 4.42494 13.75 4.0749 13.6138 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54993 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42493 1.25 5.125V9.875C1.25 10.5751 1.25 10.9251 1.38624 11.1925C1.50608 11.4277 1.69731 11.6189 1.93251 11.7388C2.1999 11.875 2.54993 11.875 3.25 11.875H7.5" />
    </svg>
  );
}

function UnpaidIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" opacity="0.8" stroke="#EAB308" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.75 13.75L12.8125 12.8125M13.75 6.25H1.25M13.75 7.5V5.125C13.75 4.42494 13.75 4.0749 13.6138 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54993 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42493 1.25 5.125V9.875C1.25 10.5751 1.25 10.9251 1.38624 11.1925C1.50608 11.4277 1.69731 11.6189 1.93251 11.7388C2.1999 11.875 2.54993 11.875 3.25 11.875H6.5625M13.4375 11.25C13.4375 12.4581 12.4581 13.4375 11.25 13.4375C10.0419 13.4375 9.0625 12.4581 9.0625 11.25C9.0625 10.0419 10.0419 9.0625 11.25 9.0625C12.4581 9.0625 13.4375 10.0419 13.4375 11.25Z" />
    </svg>
  );
}

function OverdueIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" opacity="0.8" stroke="#EF4444" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3125 10L13.4375 13.125M13.4375 10L10.3125 13.125M13.75 6.25H1.25M13.75 7.5V5.125C13.75 4.42494 13.75 4.0749 13.6138 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54993 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42493 1.25 5.125V9.875C1.25 10.5751 1.25 10.9251 1.38624 11.1925C1.50608 11.4277 1.69731 11.6189 1.93251 11.7388C2.1999 11.875 2.54993 11.875 3.25 11.875H7.5" />
    </svg>
  );
}

const rows = [
  { icon: <PaidIcon />,    label: "22 units paid current month levy",          pct: "92%", amount: "₦2,280,000" },
  { icon: <UnpaidIcon />,  label: "2 units yet to pay current month levy",     pct: "4%",  amount: "₦190,000" },
  { icon: <OverdueIcon />, label: "2 units overdue for current payment",       pct: "4%",  amount: "₦190,000" },
];

export default function CollectionDataCard() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <p className="text-base font-semibold text-noku-heading">Collection Data</p>

      {/* Summary + progress */}
      <div className="flex flex-col gap-3">
        <p className="text-[#171717]">
          <span className="text-[2rem] font-bold leading-none tracking-tight">22</span>
          <span className="text-sm text-[#525252]"> of 24 units paid</span>
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div className="h-full bg-noku-green rounded-full" style={{ width: "92%" }} />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-noku-green shrink-0" />
            Units paid
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] shrink-0" />
            Units unpaid
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />
            Units overdue
          </span>
        </div>
      </div>

      {/* Breakdown rows */}
      <div className="flex flex-col divide-y divide-[#e5e5e5]">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <span className="shrink-0">{row.icon}</span>
            <span className="flex-1 text-sm text-[#404040]">{row.label}</span>
            <span className="text-sm text-[#737373] shrink-0">{row.pct}</span>
            <span className="text-sm font-semibold text-noku-heading shrink-0">{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
