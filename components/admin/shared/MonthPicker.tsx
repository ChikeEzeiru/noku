"use client";

import { useState, useRef, useEffect } from "react";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MIN     = { year: 2026, month: 5 };
const MAX     = { year: 2026, month: 6 };
const CURRENT = { year: 2026, month: 6 };

function isAvailable(year: number, month: number) {
  const key = year * 100 + month;
  return key >= MIN.year * 100 + MIN.month && key <= MAX.year * 100 + MAX.month;
}

export type MonthValue = { year: number; month: number };

export function formatMonth({ year, month }: MonthValue) {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function MonthPicker({
  selected,
  onSelect,
  onClose,
}: {
  selected: MonthValue;
  onSelect: (v: MonthValue) => void;
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

  const canPrev = pickerYear > MIN.year;
  const canNext = pickerYear < MAX.year;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 z-50 bg-white border border-[#e5e5e5] rounded-xl w-[220px] p-4 flex flex-col gap-3"
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
    >
      {/* Year nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => canPrev && setPickerYear((y) => y - 1)}
          className={`p-1 rounded transition-colors ${canPrev ? "text-[#474739] hover:bg-[#f4f4f0]" : "text-[#d4d4d4] cursor-not-allowed"}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-[#474739]">{pickerYear}</span>
        <button
          onClick={() => canNext && setPickerYear((y) => y + 1)}
          className={`p-1 rounded transition-colors ${canNext ? "text-[#474739] hover:bg-[#f4f4f0]" : "text-[#d4d4d4] cursor-not-allowed"}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 12l4-4-4-4" />
          </svg>
        </button>
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-3 gap-1">
        {MONTH_NAMES.map((name, i) => {
          const month = i + 1;
          const available = isAvailable(pickerYear, month);
          const isSelected = pickerYear === selected.year && month === selected.month;
          const isCurrent  = pickerYear === CURRENT.year && month === CURRENT.month;
          return (
            <button
              key={name}
              disabled={!available}
              onClick={() => { onSelect({ year: pickerYear, month }); onClose(); }}
              className={`py-[7px] rounded-lg text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-[#1d1d16] text-white"
                  : available
                  ? "text-[#474739] hover:bg-[#f4f4f0]"
                  : "text-[#d4d4d4] cursor-not-allowed"
              }`}
            >
              <span className="flex flex-col items-center gap-[3px]">
                <span>{name}</span>
                <span className={`w-1 h-1 rounded-full ${
                  isCurrent
                    ? isSelected ? "bg-white opacity-70" : "bg-[#474739]"
                    : "invisible"
                }`} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
