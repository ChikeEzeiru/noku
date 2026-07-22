import Link from "next/link";

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

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.917 7h8.166M7.583 4.083L10.5 7l-2.917 2.917" />
    </svg>
  );
}

const rows = [
  {
    icon: <CreditCardCheck />,
    label: "22 units paid current month levy",
    pct: "92%",
    amount: "₦2,280,000",
  },
  {
    icon: <CreditCardSearch />,
    label: "2 units yet to pay current month levy",
    pct: "4%",
    amount: "₦190,000",
  },
  {
    icon: <CreditCardX />,
    label: "2 units overdue for current payment",
    pct: "4%",
    amount: "₦190,000",
  },
];

export default function CollectionDataCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5 ${className}`} style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <p className="text-base font-semibold text-noku-text-mid">Collection Data</p>

      {/* Headline count */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#525252]">
          <span className="text-[28px] font-bold text-noku-heading leading-none">22</span>{" "}
          of 24 units paid
        </p>

        {/* Segmented progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden flex">
          <div className="bg-[#16a34a] h-full" style={{ width: "91.67%" }} />
          <div className="bg-[#eab308] h-full" style={{ width: "4.17%" }} />
          <div className="bg-[#ef4444] h-full" style={{ width: "4.17%" }} />
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

      {/* Footer */}
      <div className="flex justify-end">
        <Link href="/admin/payments" className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739]" style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}>
          View Details
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
}
