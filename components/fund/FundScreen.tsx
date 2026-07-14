"use client";

import { useState, useRef, useEffect } from "react";
import BottomNav, { NavTab } from "@/components/shared/BottomNav";

function ArrowNarrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8h9.334M9.333 5.333 12 8l-2.667 2.667" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 12 6 8l4-4" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

function SpentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M11.2744 6.95987C10.7974 7.29995 10.2136 7.49999 9.58317 7.49999C7.97234 7.49999 6.6665 6.19415 6.6665 4.58332C6.6665 2.97249 7.97234 1.66666 9.58317 1.66666C10.6273 1.66666 11.5433 2.21534 12.0586 3.04011M4.99984 16.7393H7.17508C7.45869 16.7393 7.74057 16.773 8.01551 16.8405L10.3139 17.3991C10.8126 17.5205 11.3322 17.5324 11.8361 17.4345L14.3773 16.9401C15.0486 16.8093 15.6662 16.4879 16.1501 16.0171L17.9481 14.2681C18.4615 13.7695 18.4615 12.9603 17.9481 12.4609C17.4858 12.0112 16.7538 11.9606 16.2308 12.3419L14.1353 13.8707C13.8352 14.0901 13.4701 14.2082 13.0945 14.2082H11.0711L12.3591 14.2081C13.085 14.2081 13.6731 13.6361 13.6731 12.9299V12.6743C13.6731 12.0879 13.2628 11.5766 12.6782 11.4349L10.6903 10.9514C10.3668 10.873 10.0355 10.8333 9.70245 10.8333C8.89845 10.8333 7.44308 11.499 7.44308 11.499L4.99984 12.5207M16.6665 5.41666C16.6665 7.02749 15.3607 8.33332 13.7498 8.33332C12.139 8.33332 10.8332 7.02749 10.8332 5.41666C10.8332 3.80583 12.139 2.49999 13.7498 2.49999C15.3607 2.49999 16.6665 3.80583 16.6665 5.41666ZM1.6665 12.1667L1.6665 17C1.6665 17.4667 1.6665 17.7001 1.75733 17.8783C1.83723 18.0351 1.96471 18.1626 2.12151 18.2425C2.29977 18.3333 2.53313 18.3333 2.99984 18.3333H3.6665C4.13321 18.3333 4.36657 18.3333 4.54483 18.2425C4.70163 18.1626 4.82911 18.0351 4.90901 17.8783C4.99984 17.7001 4.99984 17.4667 4.99984 17V12.1667C4.99984 11.6999 4.99984 11.4666 4.90901 11.2883C4.82911 11.1315 4.70163 11.004 4.54483 10.9242C4.36657 10.8333 4.13321 10.8333 3.6665 10.8333L2.99984 10.8333C2.53313 10.8333 2.29977 10.8333 2.12151 10.9242C1.96471 11.004 1.83723 11.1315 1.75733 11.2883C1.6665 11.4666 1.6665 11.6999 1.6665 12.1667Z" stroke="#474739" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

function BalanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M18.3332 7.08334H1.6665M1.6665 10.4167H4.62207C5.07223 10.4167 5.29731 10.4167 5.51495 10.4555C5.70813 10.4899 5.89659 10.547 6.07643 10.6255C6.27904 10.7139 6.46631 10.8388 6.84087 11.0885L7.32547 11.4115C7.70003 11.6612 7.8873 11.7861 8.08991 11.8745C8.26975 11.9531 8.45821 12.0101 8.65139 12.0445C8.86904 12.0833 9.09411 12.0833 9.54427 12.0833H10.4554C10.9056 12.0833 11.1306 12.0833 11.3483 12.0445C11.5415 12.0101 11.7299 11.9531 11.9098 11.8745C12.1124 11.7861 12.2996 11.6612 12.6742 11.4115L13.1588 11.0885C13.5334 10.8388 13.7206 10.7139 13.9232 10.6255C14.1031 10.547 14.2915 10.4899 14.4847 10.4555C14.7024 10.4167 14.9274 10.4167 15.3776 10.4167H18.3332M1.6665 6.00001L1.6665 14C1.6665 14.9334 1.6665 15.4001 1.84816 15.7567C2.00795 16.0703 2.26292 16.3252 2.57652 16.485C2.93304 16.6667 3.39975 16.6667 4.33317 16.6667L15.6665 16.6667C16.5999 16.6667 17.0666 16.6667 17.4232 16.485C17.7368 16.3252 17.9917 16.0703 18.1515 15.7567C18.3332 15.4001 18.3332 14.9334 18.3332 14V6.00001C18.3332 5.06659 18.3332 4.59988 18.1515 4.24336C17.9917 3.92976 17.7368 3.67479 17.4232 3.515C17.0666 3.33334 16.5999 3.33334 15.6665 3.33334L4.33317 3.33334C3.39975 3.33334 2.93304 3.33334 2.57652 3.515C2.26292 3.67479 2.00795 3.92976 1.84816 4.24336C1.6665 4.59988 1.6665 5.06659 1.6665 6.00001Z" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

function DaysIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M17.5 8.33332H2.5M13.3333 1.66666V4.99999M6.66667 1.66666V4.99999M8.75 11.6667L10 10.8333V15M8.95833 15H11.0417M6.5 18.3333H13.5C14.9001 18.3333 15.6002 18.3333 16.135 18.0608C16.6054 17.8212 16.9878 17.4387 17.2275 16.9683C17.5 16.4335 17.5 15.7335 17.5 14.3333V7.33332C17.5 5.93319 17.5 5.23313 17.2275 4.69835C16.9878 4.22794 16.6054 3.84549 16.135 3.60581C15.6002 3.33332 14.9001 3.33332 13.5 3.33332H6.5C5.09987 3.33332 4.3998 3.33332 3.86502 3.60581C3.39462 3.84549 3.01217 4.22794 2.77248 4.69835C2.5 5.23313 2.5 5.93319 2.5 7.33332V14.3333C2.5 15.7335 2.5 16.4335 2.77248 16.9683C3.01217 17.4387 3.39462 17.8212 3.86502 18.0608C4.3998 18.3333 5.09987 18.3333 6.5 18.3333Z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

type Expenditure = {
  icon: "receipt" | "tool";
  vendor: string;
  amount: string;
  desc: string;
  rate: string;
};

type ChartBar = { label: string; pct: number; current: boolean };

type MonthData = {
  label: string;
  spent: string;
  balance: string;
  balanceColor: string;
  daysLeft: string | null;
  daysColor: string;
  expenditures: Expenditure[];
  chartBars: ChartBar[];
};

const MONTHS_DATA: Record<string, MonthData> = {
  "2026-6": {
    label: "Jun 2026",
    spent: "₦2,240,000",
    balance: "₦40,000",
    balanceColor: "#ca8a04",
    daysLeft: "3 days",
    daysColor: "#dc2626",
    expenditures: [
      { icon: "receipt", vendor: "ABC Fuel Services",     amount: "₦394,560", desc: "320 litres · Jun 26",           rate: "₦1233/ltr" },
      { icon: "tool",    vendor: "Perkins Power Company", amount: "₦103,840", desc: "Maintenance & repair · Jun 20", rate: "" },
      { icon: "receipt", vendor: "ABC Fuel Services",     amount: "₦420,800", desc: "320 litres · Jun 14",           rate: "₦1315/ltr" },
      { icon: "receipt", vendor: "ABC Fuel Services",     amount: "₦420,800", desc: "320 litres · Jun 2",            rate: "₦1315/ltr" },
      { icon: "receipt", vendor: "Power Holding Company", amount: "₦900,000", desc: "Jun 2",                         rate: "₦69/Kwh" },
    ],
    chartBars: [
      { label: "Dec", pct: 55, current: false },
      { label: "Jan", pct: 54, current: false },
      { label: "Feb", pct: 52, current: false },
      { label: "Mar", pct: 55, current: false },
      { label: "Apr", pct: 67, current: false },
      { label: "May", pct: 75, current: false },
      { label: "Jun", pct: 90, current: true },
    ],
  },
  "2026-5": {
    label: "May 2026",
    spent: "₦1,980,000",
    balance: "₦180,000",
    balanceColor: "#ca8a04",
    daysLeft: null,
    daysColor: "",
    expenditures: [
      { icon: "receipt", vendor: "ABC Fuel Services",     amount: "₦394,560", desc: "320 litres · May 25",           rate: "₦1233/ltr" },
      { icon: "tool",    vendor: "Perkins Power Company", amount: "₦98,500",  desc: "Maintenance & repair · May 18", rate: "" },
      { icon: "receipt", vendor: "ABC Fuel Services",     amount: "₦420,800", desc: "320 litres · May 12",           rate: "₦1315/ltr" },
      { icon: "receipt", vendor: "ABC Fuel Services",     amount: "₦394,560", desc: "320 litres · May 3",            rate: "₦1233/ltr" },
      { icon: "receipt", vendor: "Power Holding Company", amount: "₦671,580", desc: "May 1",                         rate: "₦69/Kwh" },
    ],
    chartBars: [
      { label: "Nov", pct: 50, current: false },
      { label: "Dec", pct: 55, current: false },
      { label: "Jan", pct: 54, current: false },
      { label: "Feb", pct: 52, current: false },
      { label: "Mar", pct: 55, current: false },
      { label: "Apr", pct: 67, current: false },
      { label: "May", pct: 75, current: true },
    ],
  },
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MIN = { year: 2026, month: 5 };
const MAX = { year: 2026, month: 6 };
const yLabels = ["₦2.2m", "₦1.9m", "₦1.6m", "₦1.3m", "₦1m", "0"];

function isMonthAvailable(year: number, month: number) {
  const key = year * 100 + month;
  return key >= MIN.year * 100 + MIN.month && key <= MAX.year * 100 + MAX.month;
}

// ─── Month picker ─────────────────────────────────────────────────────────────

function MonthPicker({
  selected,
  onSelect,
  onClose,
}: {
  selected: { year: number; month: number };
  onSelect: (y: number, m: number) => void;
  onClose: () => void;
}) {
  const [pickerYear, setPickerYear] = useState(selected.year);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const canGoPrev = pickerYear > MIN.year;
  const canGoNext = pickerYear < MAX.year;

  return (
    <div
      ref={ref}
      className="absolute right-6 top-[56px] z-50 bg-white border border-[#e8e8e3] rounded-[14px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-[220px] p-4 flex flex-col gap-3"
    >
      {/* Year nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => canGoPrev && setPickerYear((y) => y - 1)}
          className={`p-1 rounded-[6px] transition-colors ${canGoPrev ? "text-[#474739] hover:bg-[#f4f4f0]" : "text-[#d4d4d4] cursor-not-allowed"}`}
        >
          <ChevronLeftIcon />
        </button>
        <span className="text-sm font-semibold leading-5 text-[#474739]">{pickerYear}</span>
        <button
          onClick={() => canGoNext && setPickerYear((y) => y + 1)}
          className={`p-1 rounded-[6px] transition-colors ${canGoNext ? "text-[#474739] hover:bg-[#f4f4f0]" : "text-[#d4d4d4] cursor-not-allowed"}`}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-3 gap-1">
        {MONTH_NAMES.map((name, i) => {
          const month = i + 1;
          const available = isMonthAvailable(pickerYear, month);
          const isSelected = pickerYear === selected.year && month === selected.month;
          return (
            <button
              key={name}
              disabled={!available}
              onClick={() => { onSelect(pickerYear, month); onClose(); }}
              className={`
                py-[7px] rounded-[8px] text-sm font-medium leading-5 transition-colors
                ${isSelected
                  ? "bg-[#17a248] text-white"
                  : available
                  ? "text-[#474739] hover:bg-[#f0fdf4]"
                  : "text-[#d4d4d4] cursor-not-allowed"}
              `}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

type FundScreenProps = {
  onNavigate: (tab: NavTab) => void;
  onSeeAll: () => void;
};

export default function FundScreen({ onNavigate, onSeeAll }: FundScreenProps) {
  const [selected, setSelected] = useState({ year: 2026, month: 6 });
  const [showPicker, setShowPicker] = useState(false);

  const data = MONTHS_DATA[`${selected.year}-${selected.month}`];

  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="px-6 pt-6 flex flex-col gap-8">
          <div className="relative flex items-center justify-between">
            <p className="text-base font-medium leading-6 text-noku-text-dim">Power Fund</p>
            <button
              onClick={() => setShowPicker((v) => !v)}
              className="flex items-center gap-2 bg-white border border-[#a6a6a6] rounded-[8px] px-2 py-1.5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            >
              <span className="text-sm font-normal leading-5 text-[#171717]">{data.label}</span>
              <span className="text-[#171717]"><ChevronDownIcon /></span>
            </button>

            {showPicker && (
              <MonthPicker
                selected={selected}
                onSelect={(y, m) => setSelected({ year: y, month: m })}
                onClose={() => setShowPicker(false)}
              />
            )}
          </div>

          {/* Stat cards */}
          <div className="flex gap-2">
            <div className="bg-white border border-[#d8d8d0] rounded-[8px] p-2 flex-1 flex flex-col items-center gap-2">
              <SpentIcon />
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium leading-5 text-[#474739]">{data.spent}</p>
                <p className="text-[10px] font-normal leading-4 text-[#7c7c67] text-center">Spent this month</p>
              </div>
            </div>
            <div className="bg-white border border-[#d8d8d0] rounded-[8px] p-2 flex-1 flex flex-col items-center gap-2">
              <BalanceIcon />
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium leading-5" style={{ color: data.balanceColor }}>{data.balance}</p>
                <p className="text-[10px] font-normal leading-4 text-[#7c7c67] text-center">Fund Balance</p>
              </div>
            </div>
            {data.daysLeft !== null && (
              <div className="bg-white border border-[#d8d8d0] rounded-[8px] p-2 flex-1 flex flex-col items-center gap-2">
                <DaysIcon />
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-medium leading-5" style={{ color: data.daysColor }}>{data.daysLeft}</p>
                  <p className="text-[10px] font-normal leading-4 text-[#7c7c67] text-center">Est Power left</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Spending trend chart */}
        <div className="px-6 py-3">
          <div className="h-[240px] relative">
            <p className="text-sm font-normal leading-5 text-[#474739]">Spending trend</p>
            <div className="absolute inset-0 top-8 bottom-[30px] flex gap-2">
              <div className="w-10 shrink-0 flex flex-col justify-between items-end">
                {yLabels.map((l) => (
                  <span key={l} className="text-xs font-normal leading-[18px] text-[#525252]">{l}</span>
                ))}
              </div>
              <div className="flex-1 relative flex flex-col justify-between">
                {yLabels.map((l) => (
                  <div key={l} className="h-px bg-[#e8e8e3] w-full" />
                ))}
                <div className="absolute inset-0 flex items-end justify-between px-3">
                  {data.chartBars.map(({ label, pct, current }) => (
                    <div key={label} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div
                        className="w-4 rounded-t-[4px]"
                        style={{
                          height: `${pct}%`,
                          backgroundColor: current ? "#dcfce7" : "#f4f4f0",
                          border: current ? "1px solid #23c45c" : "1px solid #abab9c",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between pl-12 pr-3">
              {data.chartBars.map(({ label }) => (
                <span key={label} className="text-xs font-normal leading-[18px] text-[#525252] w-4 text-center">{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Fund expenditure log */}
        <div className="px-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal leading-5 text-[#474739]">Fund expenditure log</p>
            <button onClick={onSeeAll} className="flex items-center gap-1 text-sm font-medium leading-5 text-[#16803c]">
              See All <ArrowNarrowRightIcon />
            </button>
          </div>

          <div className="bg-white border border-[#e8e8e3] rounded-[12px] overflow-hidden">
            {data.expenditures.map((item, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-[#e8e8e3]" />}
                <div className="w-full p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="shrink-0 w-8 h-8 rounded-[6px] relative overflow-hidden"
                      style={{
                        border: "1px solid #d4d4d4",
                        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="absolute inset-0 bg-noku-bg rounded-[6px]" />
                      {item.icon === "tool" ? (
                        <img src="/icons/RepairIcon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
                      ) : (
                        <img src="/icons/ReceiptIcon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
                      )}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <p className="text-[10px] font-normal leading-4 text-noku-text-subtle">{item.vendor}</p>
                      <p className="text-sm font-medium leading-5 text-[#474739]">{item.amount}</p>
                      <p className="text-xs font-normal leading-[18px] text-noku-text-dim">{item.desc}</p>
                    </div>
                  </div>
                  {item.rate && (
                    <p className="text-xs font-normal leading-[18px] text-noku-text-dim shrink-0">{item.rate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <BottomNav activeTab="fund" onNavigate={onNavigate} />
    </div>
  );
}
