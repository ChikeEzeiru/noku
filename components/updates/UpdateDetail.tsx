"use client";

import type { UpdateItem } from "@/types/update";


function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 12.5V3.333M6.667 6.667 10 3.333l3.333 3.334"/>
      <path d="M5 10H3.333A1.667 1.667 0 0 0 1.667 11.667v5A1.667 1.667 0 0 0 3.333 18.333h13.334a1.667 1.667 0 0 0 1.666-1.666v-5A1.667 1.667 0 0 0 16.667 10H15"/>
    </svg>
  );
}

const categoryStyles: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: "#f9f5ff", border: "#e9d7fe", text: "#6941c6" },
  pink:   { bg: "#fdf2f8", border: "#fbcfe8", text: "#be185d" },
  orange: { bg: "#fff7ed", border: "#fed7aa", text: "#c2410c" },
};

type UpdateDetailProps = {
  update: UpdateItem;
  onBack: () => void;
};

export default function UpdateDetail({ update, onBack }: UpdateDetailProps) {
  const catStyle = categoryStyles[update.categoryColor];

  return (
    <div className="bg-noku-bg min-h-screen flex flex-col pb-16">
      {/* Header */}
      <div className="px-6 pt-6 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
        >
          <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
          <span className="text-xs">Back</span>
        </button>
        <button className="p-1.5 text-noku-text-dim">
          <ShareIcon />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 flex flex-col gap-3 overflow-y-auto">
        {/* Hero image */}
        <div className="w-full h-40 rounded-lg overflow-hidden shrink-0">
          <img src={update.img} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Title + meta */}
        <div className="flex flex-col gap-2 pt-3">
          <h1 className="text-base font-medium text-noku-text-mid leading-6">
            {update.title}
          </h1>
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: catStyle.bg, borderColor: catStyle.border, color: catStyle.text }}
            >
              {update.label}
            </span>
            <span className="text-[10px] text-noku-text-dim">{update.time}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 pb-8">
          {update.body.map((para, i) => (
            <p key={i} className="text-xs text-noku-text-mid leading-[18px]">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
