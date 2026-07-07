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
    <div className="bg-white border border-noku-border-light rounded-xl p-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm text-noku-text-dim shrink-0">
          {item.icon === "tool"
            ? <img src="/icons/RepairIcon.svg" alt="" className="w-4 h-4" />
            : <img src="/icons/ReceiptIcon.svg" alt="" className="w-4 h-4" />}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] text-noku-text-subtle">{item.vendor}</p>
          <p className="text-sm font-medium text-noku-text-mid">{item.amount}</p>
          <p className="text-xs text-noku-text-dim">{item.desc}</p>
        </div>
      </div>
      <p className="text-xs text-noku-text-dim shrink-0">{item.rate}</p>
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
        {months.map((month) => (
          <div key={month} className="flex flex-col gap-3">
            <p className="text-xs font-medium text-noku-text-subtle uppercase tracking-[0.06em]">
              {month}
            </p>
            {expenditures
              .filter((e) => e.month === month)
              .map((item, i) => (
                <ExpenditureRow key={i} item={item} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
