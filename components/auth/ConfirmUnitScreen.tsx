"use client";

import { useState } from "react";

function StepDots({ step }: { step: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1">
      {([0, 1, 2, 3] as const).map((i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-200"
          style={{
            width: i === step ? 24 : 8,
            height: i === step ? 8 : 6,
            backgroundColor: i === step ? "#17a248" : "#e8e8e3",
          }}
        />
      ))}
    </div>
  );
}

type ConfirmUnitScreenProps = {
  onConfirm: () => void;
  onNotRight: () => void;
};

export default function ConfirmUnitScreen({ onConfirm, onNotRight }: ConfirmUnitScreenProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="min-h-[calc(100vh-44px)] bg-noku-bg flex flex-col justify-between pt-6 pb-10">
      <div className="flex flex-col gap-2 px-6">
        <StepDots step={1} />

        {/* Building illustration */}
        <div className="flex items-center justify-center mt-6">
          <img
            src="https://www.figma.com/api/mcp/asset/5019d39a-edfc-4251-a36d-f8e84770aa45"
            alt=""
            className="w-full max-w-[345px] object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 mt-6">
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
              Confirm your unit
            </p>
            <p className="text-base text-[#5b5b4b] leading-6">
              Please verify that the apartment details below are correct.
            </p>
          </div>

          {/* Unit display */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-noku-text-mid">You've been assigned:</p>
            <div
              className="flex bg-white border border-noku-nav-border rounded-lg overflow-hidden"
              style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
            >
              <div className="px-3 py-2 border-r border-noku-nav-border shrink-0">
                <p className="text-sm text-[#5b5b4b]">Building B</p>
              </div>
              <div className="flex-1 px-3 py-2 flex items-center justify-between">
                <p className="text-sm text-noku-heading">Unit 4 (First Floor)</p>
                <div className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                    onFocus={() => setTooltipVisible(true)}
                    onBlur={() => setTooltipVisible(false)}
                    className="flex items-center justify-center"
                    aria-label="Unit assignment info"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7c7c67" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 7.333V10M8 5.333h.007" />
                    </svg>
                  </button>
                  {tooltipVisible && (
                    <div className="absolute right-0 bottom-full mb-2 w-[220px] bg-noku-heading text-white text-xs rounded-lg px-3 py-2 leading-[1.5] z-10 pointer-events-none">
                      Your unit was assigned by the estate committee. Contact them if these details are wrong.
                      <div className="absolute right-2 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-noku-heading" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 flex items-center justify-end gap-4">
        <button
          onClick={onNotRight}
          className="text-sm font-semibold text-[#5b5b4b]"
        >
          This isn't right
        </button>
        <button
          onClick={onConfirm}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{
            backgroundColor: "#17a248",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)",
          }}
        >
          That's correct
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.667 8.667 6 12l7.333-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
