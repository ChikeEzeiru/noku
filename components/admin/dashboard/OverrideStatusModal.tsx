"use client";

import { useState } from "react";

function SwitchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 5.833h13.334M13.333 3.333l2.5 2.5-2.5 2.5M16.667 14.167H3.333M6.667 11.667l-2.5 2.5 2.5 2.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5L5 15M5 5L15 15" />
    </svg>
  );
}

function PowerOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3.333V10M6.464 5.631A6.667 6.667 0 1013.536 5.63" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.667 5a3.333 3.333 0 00-5.59 3.09L2.5 11.667a2.357 2.357 0 003.333 3.333l3.577-3.577A3.333 3.333 0 0011.667 5z" />
      <path d="M10.833 6.667l2.5 2.5" />
    </svg>
  );
}

type OverrideOption = "off" | "under_repair";

const OPTIONS: { value: OverrideOption; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: "off",
    label: "Generator is off",
    description: "Grid power is available or the generator has been manually switched off.",
    icon: <PowerOffIcon />,
  },
  {
    value: "under_repair",
    label: "Generator is under repair",
    description: "The generator is out of service and undergoing maintenance.",
    icon: <WrenchIcon />,
  },
];

type Props = {
  onConfirm: (value: OverrideOption) => void;
  onCancel: () => void;
};

export default function OverrideStatusModal({ onConfirm, onCancel }: Props) {
  const [selected, setSelected] = useState<OverrideOption | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onCancel} />
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[440px] flex flex-col"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 pt-6 px-6 pb-5">
          <div
            className="w-10 h-10 rounded-lg border border-[#e5e5e5] flex items-center justify-center text-[#404040] shrink-0"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <SwitchIcon />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-[#171717] leading-6">Override generator status</p>
            <p className="text-sm text-[#525252] leading-5">Select the current state of the generator.</p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-[8px] text-[#737373] hover:text-[#171717] hover:bg-[#f4f4f0] transition-colors"
        >
          <XIcon />
        </button>

        {/* Options */}
        <div className="px-6 pb-5 flex flex-col gap-3">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelected(opt.value)}
                className="w-full text-left flex items-start gap-3 rounded-[12px] border p-4 transition-colors"
                style={{
                  borderColor:     isSelected ? "#17a248" : "#e5e5e5",
                  backgroundColor: isSelected ? "#f0faf4" : "#fafaf9",
                  boxShadow:       isSelected ? "0 0 0 1px #17a248" : "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background:  isSelected ? "#dcfce7" : "#f4f4f0",
                    color:       isSelected ? "#15803d" : "#525252",
                  }}
                >
                  {opt.icon}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-semibold text-[#171717] leading-5">{opt.label}</p>
                  <p className="text-xs text-[#525252] leading-[18px]">{opt.description}</p>
                </div>
                <span
                  className="shrink-0 w-4 h-4 rounded-full border-2 mt-1 ml-auto transition-colors"
                  style={{
                    borderColor:     isSelected ? "#17a248" : "#d4d4d4",
                    backgroundColor: isSelected ? "#17a248" : "transparent",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div>
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center justify-end gap-3 px-6 py-5">
            <button
              onClick={onCancel}
              className="bg-white rounded-[8px] px-4 py-2.5 text-base font-semibold text-[#474739]"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Cancel
            </button>
            <button
              onClick={() => selected && onConfirm(selected)}
              disabled={!selected}
              className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ boxShadow: "inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Apply override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
