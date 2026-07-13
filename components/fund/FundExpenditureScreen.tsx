"use client";



type ExpenditureItem = {
  icon: "receipt" | "tool";
  vendor: string;
  amount: string;
  desc: string;
  rate: string;
  month: string;
};

const expenditures: ExpenditureItem[] = [
  { icon: "receipt", vendor: "ABC Fuel Services",    amount: "₦394,560", desc: "320 litres · Jun 26",         rate: "₦1,233/ltr", month: "June 2026" },
  { icon: "tool",    vendor: "Perkins Power Company", amount: "₦103,840", desc: "Maintenance & repair · Jun 20", rate: "—",          month: "June 2026" },
  { icon: "receipt", vendor: "ABC Fuel Services",    amount: "₦420,800", desc: "320 litres · Jun 14",         rate: "₦1,315/ltr", month: "June 2026" },
  { icon: "receipt", vendor: "ABC Fuel Services",    amount: "₦420,800", desc: "320 litres · Jun 2",          rate: "₦1,315/ltr", month: "June 2026" },
  { icon: "receipt", vendor: "Power Holding Company", amount: "₦900,000", desc: "NEPA supply · Jun 2",         rate: "₦69/kWh",    month: "June 2026" },
  { icon: "receipt", vendor: "ABC Fuel Services",    amount: "₦388,080", desc: "320 litres · May 27",         rate: "₦1,213/ltr", month: "May 2026" },
  { icon: "receipt", vendor: "ABC Fuel Services",    amount: "₦388,080", desc: "320 litres · May 13",         rate: "₦1,213/ltr", month: "May 2026" },
  { icon: "tool",    vendor: "Perkins Power Company", amount: "₦58,500",  desc: "Spark plug service · May 8",  rate: "—",          month: "May 2026" },
  { icon: "receipt", vendor: "ABC Fuel Services",    amount: "₦388,080", desc: "320 litres · May 1",          rate: "₦1,213/ltr", month: "May 2026" },
  { icon: "receipt", vendor: "Power Holding Company", amount: "₦900,000", desc: "NEPA supply · May 1",         rate: "₦69/kWh",    month: "May 2026" },
];

function ExpenditureRow({ item }: { item: ExpenditureItem }) {
  return (
    <div className="w-full p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 w-8 h-8 rounded-[6px] relative overflow-hidden"
          style={{ border: "1px solid #d4d4d4", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px rgba(0,0,0,0.05)" }}
        >
          <div className="absolute inset-0 bg-noku-bg rounded-[6px]" />
          {item.icon === "tool"
            ? <img src="/icons/RepairIcon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
            : <img src="/icons/ReceiptIcon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-normal leading-4 text-noku-text-subtle">{item.vendor}</p>
          <p className="text-sm font-medium leading-5" style={{ color: "#474739" }}>{item.amount}</p>
          <p className="text-xs font-normal leading-[18px] text-noku-text-dim">{item.desc}</p>
        </div>
      </div>
      <p className="text-xs font-normal leading-[18px] text-noku-text-dim shrink-0">{item.rate}</p>
    </div>
  );
}

type FundExpenditureScreenProps = {
  onBack: () => void;
};

export default function FundExpenditureScreen({ onBack }: FundExpenditureScreenProps) {
  const months = [...new Set(expenditures.map((e) => e.month))];

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

      {/* Header */}
      <div className="px-6 mt-6">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          Fund Expenditure Log
        </p>
      </div>

      {/* Grouped list */}
      <div className="px-6 mt-6 flex flex-col gap-6">
        {months.map((month) => {
          const items = expenditures.filter((e) => e.month === month);
          return (
            <div key={month} className="flex flex-col gap-3">
              <p className="text-xs font-medium text-noku-text-subtle uppercase tracking-[0.06em]">
                {month}
              </p>
              <div className="bg-white border border-noku-border-light rounded-[8px] overflow-hidden">
                {items.map((item, i) => (
                  <div key={i}>
                    {i > 0 && <div className="h-px" style={{ backgroundColor: "#e8e8e3" }} />}
                    <ExpenditureRow item={item} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
