"use client";

import { useState } from "react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  tooltip?: string;
  valueClassName?: string;
};

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5.333v.007M8 7.333v3.334" />
    </svg>
  );
}

export default function StatCard({ title, value, subtitle, tooltip, valueClassName }: StatCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-6" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-[#525252] leading-5">{title}</p>
        {tooltip ? (
          <div className="relative shrink-0 mt-0.5">
            <button
              type="button"
              className="text-[#ABAB9C] hover:text-[#737373] transition-colors"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onClick={() => setOpen((v) => !v)}
              aria-label={tooltip}
            >
              <InfoIcon />
            </button>
            {open && (
              <div
                className="absolute right-0 bottom-full mb-2 w-52 bg-[#1d1d16] text-white text-xs leading-relaxed rounded-lg px-3 py-2.5 z-10 pointer-events-none"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                {tooltip}
                <div className="absolute right-2 top-full w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #1d1d16" }} />
              </div>
            )}
          </div>
        ) : (
          <span className="shrink-0 mt-0.5 text-[#ABAB9C]">
            <InfoIcon />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className={`text-[28px] font-bold leading-tight tracking-tight ${valueClassName ?? "text-noku-heading"}`}>{value}</p>
        <p className="text-xs text-[#737373]">{subtitle}</p>
      </div>
    </div>
  );
}
