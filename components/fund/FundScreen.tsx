"use client";

import BottomNav, { NavTab } from "@/components/shared/BottomNav";


function ArrowNarrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.333 8h9.334M9.333 5.333 12 8l-2.667 2.667" />
    </svg>
  );
}


const expenditures = [
  {
    icon: "receipt",
    vendor: "ABC Fuel Services",
    amount: "₦394,560",
    desc: "320 litres · Jun 26",
    rate: "₦1233/ltr",
  },
  {
    icon: "tool",
    vendor: "Perkins Power Company",
    amount: "₦103,840",
    desc: "Maintenance & repair · Jun 20",
    rate: "₦1233/ltr",
  },
  {
    icon: "receipt",
    vendor: "ABC Fuel Services",
    amount: "₦420,800",
    desc: "320 litres · Jun 14",
    rate: "₦1315/ltr",
  },
  {
    icon: "receipt",
    vendor: "ABC Fuel Services",
    amount: "₦420,800",
    desc: "320 litres · Jun 2",
    rate: "₦1315/ltr",
  },
  {
    icon: "receipt",
    vendor: "Power Holding Company",
    amount: "₦900,000",
    desc: "Jun 2",
    rate: "₦69/Kwh",
  },
];

const chartData = [
  { label: "Dec", height: 63 },
  { label: "Jan", height: 61 },
  { label: "Feb", height: 60 },
  { label: "Mar", height: 63 },
  { label: "Apr", height: 72 },
  { label: "May", height: 79 },
  { label: "Jun", height: 91 },
];

const yLabels = ["₦2.2m", "₦1.9m", "₦1.6m", "₦1.3m", "₦1m", "0"];

type FundScreenProps = {
  onNavigate: (tab: NavTab) => void;
  onSeeAll: () => void;
};

export default function FundScreen({ onNavigate, onSeeAll }: FundScreenProps) {
  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">
      {/* Fund summary stats */}
      <div className="px-6 pt-6 flex flex-col gap-4">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          ESTATE POWER FUND SUMMARY
        </p>
        <div className="flex gap-2">
          {[
            {
              icon: <img src="/icons/SpentthisMthIcon.svg" alt="" className="w-5 h-5" />,
              value: "₦2,240,000",
              label: "Spent this month",
            },
            { icon: <img src="/icons/FundBalanceIcon.svg" alt="" className="w-5 h-5" />, value: "₦40,000", label: "Fund Balance" },
            {
              icon: <img src="/icons/DaysLeftIcon.svg" alt="" className="w-5 h-5" />,
              value: "3 days",
              label: "Est Power left",
            },
          ].map(({ icon, value, label }) => (
            <div
              key={label}
              className="bg-noku-warm-card border border-noku-border-warm rounded-xl p-2 flex-1 flex flex-col items-center gap-2"
            >
              <span className="text-noku-text-dim">{icon}</span>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-normal text-noku-text-mid">
                  {value}
                </p>
                <p className="text-[10px] text-noku-text-dim text-center leading-4">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending trend chart */}
      <div className="px-6 py-3 mt-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em] text-center">
            Spending Trend
          </p>
          <div className="flex gap-2 h-[200px]">
            {/* Y-axis */}
            <div className="flex flex-col justify-between items-end w-10 shrink-0 pb-5">
              {yLabels.map((l) => (
                <span
                  key={l}
                  className="text-[10px] text-noku-text-dim leading-none"
                >
                  {l}
                </span>
              ))}
            </div>
            {/* Chart area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                {/* Grid lines */}
                {yLabels.map((l) => (
                  <div
                    key={l}
                    className="absolute left-0 right-0 border-t border-noku-border-light"
                    style={{
                      top: `${
                        (yLabels.indexOf(l) / (yLabels.length - 1)) * 100
                      }%`,
                    }}
                  />
                ))}
                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-around px-2 pb-0">
                  {chartData.map(({ label, height }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 h-full justify-end"
                    >
                      <div
                        className="w-4 rounded-t-sm"
                        style={{
                          height: `${height}%`,
                          background:
                            label === "Jun"
                              ? "linear-gradient(180deg, #23c45c 0%, #dcfce7 100%)"
                              : "linear-gradient(180deg, #4bdd7e 0%, #dcfce7 100%)",
                          border: "1px solid #23c45c",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* X-axis labels */}
              <div className="flex justify-around px-2 mt-1 shrink-0">
                {chartData.map(({ label }) => (
                  <span
                    key={label}
                    className="text-[10px] text-noku-text-dim w-4 text-center"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund expenditure log */}
      <div className="px-6 mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Fund Expenditure Log
          </p>
          <button onClick={onSeeAll} className="flex items-center gap-1 text-noku-green text-sm font-medium">
            See All
            <ArrowNarrowRightIcon />
          </button>
        </div>
        <div className="bg-white border border-noku-border-light rounded-[8px] overflow-hidden">
          {expenditures.map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px" style={{ backgroundColor: "#e8e8e3" }} />}
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
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="fund" onNavigate={onNavigate} />
    </div>
  );
}
