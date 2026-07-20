"use client";

import { useState } from "react";
import { useEstateStore } from "@/store/estateStore";

// Semicircle: 9 o'clock → 12 o'clock → 3 o'clock (clockwise on screen = sweep=1 in SVG)
// Center (cx=100, cy=110), radius=72, viewBox="0 0 200 125"
// 9 o'clock = (28, 110), 12 o'clock = (100, 38), 3 o'clock = (172, 110)
// Fill starts at 9 o'clock and spans (inReview / total * 180°) clockwise.
// End point: angle = (180 + fillDeg)° in SVG coords
//   endX = 100 + 72 * cos(angle_rad)
//   endY = 110 + 72 * sin(angle_rad)

function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative shrink-0 mt-0.5">
      <button
        type="button"
        className="text-[#ABAB9C] hover:text-[#737373] transition-colors"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-label={text}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 5.333v.007M8 7.333v3.334" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute right-0 bottom-full mb-2 w-56 bg-[#1d1d16] text-white text-xs leading-relaxed rounded-lg px-3 py-2.5 z-10 pointer-events-none"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
        >
          {text}
          <div className="absolute right-2 top-full w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #1d1d16" }} />
        </div>
      )}
    </div>
  );
}

function Gauge({ inReview, total }: { inReview: number; total: number }) {
  const cx = 100, cy = 110, r = 72;

  // Clamp just below 180° to avoid degenerate arc when inReview === total
  const fillDeg = total > 0 ? Math.min(179.99, (inReview / total) * 180) : 0;
  const endAngle = (180 + fillDeg) * (Math.PI / 180);
  const endX = cx + r * Math.cos(endAngle);
  const endY = cy + r * Math.sin(endAngle);

  const showFill = inReview > 0 && total > 0;

  return (
    <svg viewBox="0 0 200 125" width="200" height="125" aria-label={`${inReview} of ${total} apartments need review`}>
      {/* Grey track — split into two 90° arcs to avoid the ambiguous 180° endpoint */}
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx},${cy - r} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke="#e5e5e5"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* Green fill — clockwise from 9 o'clock, sweep=1 */}
      {showFill && (
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${endX.toFixed(2)},${endY.toFixed(2)}`}
          fill="none"
          stroke="#17a248"
          strokeWidth="16"
          strokeLinecap="round"
        />
      )}
      {/* Centre number */}
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fontSize="36"
        fontWeight="700"
        fill="#1d1d16"
        fontFamily="DM Sans, sans-serif"
      >
        {inReview}
      </text>
    </svg>
  );
}

export default function RecalculateCard() {
  const structure = useEstateStore((s) => s.structure);

  const totalUnits  = structure?.aptCounts.reduce((a, b) => a + b, 0) ?? 0;
  const pendingCount = 0; // No residents have updated data since onboarding

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5 h-full" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-semibold text-noku-heading">Recalculate power costs</p>
          <p className="text-xs text-[#737373]">last recalculated in April 2026</p>
        </div>
        <InfoTooltip text="Shows how many apartments have pending household data updates that need review before power costs can be recalculated." />
      </div>

      {/* Gauge */}
      <div className="flex justify-center">
        <Gauge inReview={pendingCount} total={totalUnits} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-noku-heading">All data is up to date</p>
        <p className="text-sm text-[#525252] leading-5">
          No residents have updated their household data since the last calculation. No recalculation is needed.
        </p>
      </div>

      {/* CTA — disabled when nothing to review */}
      <div className="flex justify-end">
        <button
          disabled
          className="bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#ABAB9C] cursor-not-allowed"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.12), inset 0px -2px 0px 0px rgba(0,0,0,0.03)" }}
        >
          Start Verification
        </button>
      </div>
    </div>
  );
}
