"use client";

import { useState } from "react";


function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5.333" y="5.333" width="8" height="8" rx="1.333"/>
      <path d="M10.667 5.333V3.333a1.333 1.333 0 0 0-1.334-1.333H3.333A1.333 1.333 0 0 0 2 3.333v6a1.333 1.333 0 0 0 1.333 1.334h2"/>
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8.667 6 11.333l6.667-6.666"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10.833 7.5 14.167l8.333-8.334"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.667"/>
      <path d="M8 7.333V10.667M8 5.333h.007"/>
    </svg>
  );
}

function DetailRow({ label, value, copiable }: { label: string; value: string; copiable?: boolean }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b border-noku-border-light last:border-0">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-noku-text-dim">{label}</p>
        <p className="text-sm font-medium text-noku-text-mid">{value}</p>
      </div>
      {copiable && (
        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center gap-1 text-xs font-medium mt-3.5"
          style={{ color: copied ? "#17a248" : "#7c7c67" }}
        >
          {copied ? <CheckSmallIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

type BankTransferProps = {
  onBack: () => void;
  onConfirm: () => void;
};

export default function BankTransfer({ onBack, onConfirm }: BankTransferProps) {
  return (
    <div className="bg-noku-bg min-h-screen flex flex-col justify-between pb-10">
      <div className="flex flex-col gap-6 pt-6">
        {/* Back */}
        <div className="px-6">
          <button
            onClick={onBack}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="px-6 flex flex-col gap-2">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Bank Transfer
          </p>
          <p className="text-sm text-noku-text-dim">
            Transfer your levy payment to the account details below.
          </p>
        </div>

        {/* Amount due */}
        <div className="px-6">
          <div className="bg-noku-warm-card border border-noku-border-warm rounded-xl p-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs text-noku-text-dim">Amount due</p>
              <p className="text-xl font-semibold text-noku-text-mid">₦95,000</p>
            </div>
            <span className="text-[10px] font-medium text-noku-overdue-text bg-noku-overdue-bg border border-noku-overdue-border rounded-md px-1.5 py-0.5">
              Overdue
            </span>
          </div>
        </div>

        {/* Bank details */}
        <div className="px-6 flex flex-col gap-2">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Account Details
          </p>
          <div className="bg-white border border-noku-border-light rounded-xl px-4 py-1">
            <DetailRow label="Bank"           value="GTBank" />
            <DetailRow label="Account name"   value="Noku Estate Management" />
            <DetailRow label="Account number" value="0123456789" copiable />
            <DetailRow label="Reference"      value="JUN26-BLDGB-UNIT4" copiable />
          </div>
        </div>

        {/* Info notice */}
        <div className="px-6">
          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-3 flex gap-2.5 items-start">
            <span className="text-[#92400e] mt-0.5 shrink-0">
              <InfoIcon />
            </span>
            <p className="text-xs text-[#92400e] leading-[18px]">
              Always include the reference number when making your transfer. Your payment will be confirmed within 24 hours of receipt.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6">
        <button
          onClick={onConfirm}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          I've made the transfer
          <CheckIcon />
        </button>
      </div>
    </div>
  );
}
