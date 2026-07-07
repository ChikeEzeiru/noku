"use client";

import type { PaymentRecord } from "@/types/payment";


function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 12.5V3.333M6.667 6.667 10 3.333l3.333 3.334"/>
      <path d="M5 10H3.333A1.667 1.667 0 0 0 1.667 11.667v5A1.667 1.667 0 0 0 3.333 18.333h13.334a1.667 1.667 0 0 0 1.666-1.666v-5A1.667 1.667 0 0 0 16.667 10H15"/>
    </svg>
  );
}

const DEFAULT_PAYMENT: PaymentRecord = {
  amount: "₦95,000",
  period: "June 2026",
  datePaid: "Jun 4, 2026",
  channel: "In app",
};

type ReceiptProps = {
  onBack: () => void;
  payment?: PaymentRecord | null;
};

export default function Receipt({ onBack, payment }: ReceiptProps) {
  const p = payment ?? DEFAULT_PAYMENT;
  const channelLabel = p.channel === "In app" ? "In app (Card)" : p.channel;

  return (
    <div className="bg-noku-bg min-h-screen flex flex-col gap-6 pt-6 pb-10">
      {/* Header row: Back + Share */}
      <div className="px-6 flex items-center justify-between">
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

      {/* Payment details */}
      <div className="px-6 flex flex-col gap-4">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Payment Details
          </p>
          <span className="text-[10px] font-medium text-noku-paid-text bg-noku-paid-bg border border-noku-paid-border rounded-md px-1.5 py-0.5">
            Paid
          </span>
        </div>

        {/* Detail rows */}
        <div className="flex flex-col gap-1">
          {[
            { label: "Power Levy for:", value: p.period,      valueClass: "text-noku-text-mid" },
            { label: "Amount paid:",    value: p.amount,      valueClass: "text-noku-green font-medium" },
            { label: "Date paid:",      value: p.datePaid,    valueClass: "text-noku-text-mid" },
            { label: "Payment channel:", value: channelLabel, valueClass: "text-noku-text-mid" },
          ].map(({ label, value, valueClass }) => (
            <div key={label} className="flex items-start gap-2 p-2">
              <p className="text-sm text-noku-text-dim min-w-[124px]">{label}</p>
              <p className={`text-sm ${valueClass}`}>{value}</p>
            </div>
          ))}
          <div className="flex items-start gap-2 p-2">
            <p className="text-sm text-noku-text-dim min-w-[124px]">Apartment details:</p>
            <p className="text-sm font-medium text-noku-text-mid">
              5 occupants · 3 bed · 4 ACs
            </p>
          </div>
        </div>

        {/* Levy breakdown box */}
        <div className="bg-noku-warm-hover border border-noku-border-light rounded-lg p-3 flex flex-col gap-1">
          <p className="text-[10px] text-noku-text-dim uppercase tracking-[0.06em] mb-1">
            Levy Breakdown:
          </p>
          <div className="flex items-center justify-between p-1">
            <p className="text-sm text-noku-text-dim">Base amount:</p>
            <p className="text-sm font-medium text-noku-text-mid">{p.amount}</p>
          </div>
          <div className="flex items-center justify-between p-1 opacity-50">
            <p className="text-sm text-noku-text-dim">Credit/shortfall from prev mth:</p>
            <p className="text-sm font-medium text-noku-text-mid">₦0</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p className="text-sm text-noku-text-dim">Final amount charged</p>
            <p className="text-sm font-medium text-noku-text-mid">{p.amount}</p>
          </div>
        </div>

        {/* Settlement status */}
        <div className="flex items-start gap-2 p-2">
          <p className="text-sm text-noku-text-dim min-w-[124px]">Settlement status:</p>
          <p className="text-sm font-medium text-noku-text-mid">settled</p>
        </div>
      </div>
    </div>
  );
}
