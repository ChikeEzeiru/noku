"use client";

import { useState } from "react";
import Image from "next/image";

export type BillingSettings = { dueDate: number; gracePeriod: string };

type Props = {
  onNext: (billing: BillingSettings) => void;
  onBack: () => void;
};

/* ── Icons ─────────────────────────────────────────────────── */

function FlipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M3.333 7.5H12.5a4.167 4.167 0 010 8.333H7.5" />
      <path d="M6.667 4.167L3.333 7.5l3.334 3.333" />
    </svg>
  );
}

function NokuIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C6.8982 9.14741 6.48284 9.28911 6.05032 9.37451ZM7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C6.45138 10.7003 6.88388 10.8438 7.277 11.086Z" fill="#17A248" />
      <path d="M20 10C20 4.477 15.523 0 10 0C4.645 0 0.273501 4.2095 0.012001 9.5L0 10.5V17C0 17.7956 0.31607 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H9.5V15.613C9.5 14.612 9.439 13.575 8.914 12.723C8.50362 12.057 7.94298 11.4964 7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C5.62275 10.5227 5.22453 10.465 4.71213 10.4095L3.02063 10.3785C2.94168 10.3515 2.87314 10.3005 2.82462 10.2326C2.77609 10.1648 2.75 10.0834 2.75 10C2.75 9.91657 2.77609 9.83522 2.82462 9.76735C2.87314 9.69948 2.94168 9.64849 3.02063 9.6215L4.71213 9.5905C5.24152 9.53503 5.64888 9.47816 6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C7.8876 8.53816 8.41022 8.03537 8.8094 7.43976C9.20857 6.84414 9.47497 6.16964 9.5905 5.462L9.6215 5.2705C9.64849 5.19155 9.69948 5.12302 9.76735 5.07449C9.83522 5.02596 9.91657 4.99987 10 4.99987C10.0834 4.99987 10.1648 5.02596 10.2326 5.07449C10.3005 5.12302 10.3515 5.19155 10.3785 5.2705L10.4095 5.462C10.5784 6.49591 11.0678 7.45066 11.8086 8.19144C12.5493 8.93222 13.5041 9.4216 14.538 9.5905L14.7295 9.6215C14.8084 9.64849 14.877 9.69948 14.9255 9.76735C14.974 9.83522 15.0001 9.91657 15.0001 10C15.0001 10.0834 14.974 10.1648 14.9255 10.2326C14.877 10.3005 14.8084 10.3515 14.7295 10.3785L14.538 10.4095C13.8304 10.5251 13.1559 10.7915 12.5603 11.1906C11.9647 11.5898 11.4619 12.1124 11.086 12.723C10.561 13.575 10.5 14.612 10.5 15.613V20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V10Z" fill="#17A248" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M6.06 6a2 2 0 013.887.667C9.947 7.333 8 8 8 8M8 11h.007" />
    </svg>
  );
}

function ChevronUpSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.5l3-3 3 3" />
    </svg>
  );
}

function ChevronDownSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

/* ── Tooltip ────────────────────────────────────────────────── */

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="relative group inline-flex items-center">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-[8px] bg-[#1d1d16] px-3 py-2 text-xs text-white leading-[1.5] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50"
      >
        {text}
        {/* arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1d1d16]" />
      </span>
    </span>
  );
}

/* ── Ordinal helper ─────────────────────────────────────────── */

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* ── Due-date stepper ───────────────────────────────────────── */

function DueDateStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div
      className="flex bg-white border border-[#d8d8d0] rounded-[8px] overflow-hidden w-full"
      style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-1 items-center px-[14px] py-[10px] min-w-0">
        <span className="text-base text-[#7c7c67]">{ordinal(value)}</span>
      </div>
      <div className="flex flex-col border-l border-[#d8d8d0] self-stretch w-7 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.min(28, value + 1))}
          className="flex flex-1 items-end justify-center pb-[4px] hover:bg-[#f5f5f5] transition-colors"
        >
          <ChevronUpSmIcon />
        </button>
        <div className="h-px bg-[#d8d8d0]" />
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="flex flex-1 items-start justify-center pt-[4px] hover:bg-[#f5f5f5] transition-colors"
        >
          <ChevronDownSmIcon />
        </button>
      </div>
    </div>
  );
}

/* ── Checkbox ───────────────────────────────────────────────── */

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className="shrink-0 w-5 h-5 rounded-[6px] flex items-center justify-center transition-colors"
        style={{
          backgroundColor: checked ? "#5b5b4b" : "white",
          border: checked ? "none" : "1.5px solid #d4d4d4",
        }}
      >
        {checked && <CheckIcon />}
      </button>
      <span className="text-sm text-[#5b5b4b] leading-5">{label}</span>
    </label>
  );
}

/* ── Component ──────────────────────────────────────────────── */

function formatCurrency(raw: string): string {
  const stripped = raw.replace(/[^0-9.]/g, "");
  const [intStr = "", ...rest] = stripped.split(".");
  const intFormatted = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (rest.length > 0) {
    return intFormatted + "." + rest.join("").slice(0, 1);
  }
  return intFormatted;
}

export default function AdminOnboardingStep6({ onNext, onBack }: Props) {
  const [fuelCost, setFuelCost]       = useState("");
  const [dueDate, setDueDate]         = useState(5);
  const [gracePeriod, setGracePeriod] = useState("7");
  const [remind3Before, setRemind3Before] = useState(true);
  const [remindOnDay, setRemindOnDay]     = useState(true);
  const [remind3After, setRemind3After]   = useState(true);

  const handleFuelCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuelCost(formatCurrency(e.target.value));
  };

  const handleFuelCostBlur = () => {
    if (!fuelCost) return;
    const hasDecimal = fuelCost.includes(".");
    if (!hasDecimal) setFuelCost(fuelCost + ".0");
  };

  const canProceed = fuelCost.replace(/[^0-9]/g, "").length > 0;

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">

      {/* ── Left — form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[440px]">

          {/* Step header */}
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={onBack} className="flex items-center gap-2 bg-white border border-[#e8e8e3] rounded-[8px] p-[6px]">
              <FlipBackIcon />
              <span className="text-xs text-[#474739]">Back</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-[#525252]">
              <span>Step</span>
              <span className="text-[20px] font-bold leading-[20px] tracking-[-0.4px]">6</span>
              <span>of 8</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <NokuIcon />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              Payment Settings
            </p>
            <p className="text-base text-[#525252] leading-6">
              Billing cycle will be monthly, so please fill the details below so we can compute payments accurately
            </p>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">

              {/* Fuel cost */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-sm font-medium text-[#474739] leading-5">
                  Estimated total generator fuel cost for this month?
                </label>
                <div
                  className="flex items-center bg-white border border-[#d8d8d0] rounded-[8px] overflow-hidden"
                  style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
                >
                  <span className="pl-[14px] py-[10px] text-base text-[#5b5b4b] shrink-0 leading-6">₦</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={fuelCost}
                    onChange={handleFuelCostChange}
                    onBlur={handleFuelCostBlur}
                    placeholder="e.g. 300,000.0"
                    className="flex-1 min-w-0 px-2 py-[10px] text-base text-[#171717] placeholder:text-[#7c7c67] outline-none bg-transparent"
                  />
                </div>
                <p className="text-sm text-[#5b5b4b] leading-5">
                  For the first 3 months, you&apos;ll set this manually. After that, Noku calculates it automatically from your fuel purchase history.
                </p>
              </div>

              {/* Payment Due date + Grace Period */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-sm font-medium text-[#474739] leading-5">Payment Due date</label>
                  <DueDateStepper value={dueDate} onChange={setDueDate} />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium text-[#404040] leading-5">Grace Period</label>
                    <Tooltip text="Extra days after the due date before a resident is marked overdue. No late fees apply during this window.">
                      <HelpCircleIcon />
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <select
                      value={gracePeriod}
                      onChange={(e) => setGracePeriod(e.target.value)}
                      className="w-full appearance-none px-[14px] pr-10 py-[10px] bg-white border border-[#d4d4d4] rounded-[8px] text-base text-[#171717] outline-none focus:border-[#17a248] transition-colors cursor-pointer"
                      style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                    >
                      <option value="0">None</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="14">14 days</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </div>

              {/* Reminder checkboxes */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#474739] leading-5">Send payment reminders</p>
                <Checkbox
                  checked={remind3Before}
                  onChange={() => setRemind3Before((v) => !v)}
                  label="3 days before due date"
                />
                <Checkbox
                  checked={remindOnDay}
                  onChange={() => setRemindOnDay((v) => !v)}
                  label="On due date"
                />
                <Checkbox
                  checked={remind3After}
                  onChange={() => setRemind3After((v) => !v)}
                  label="3 days after due date"
                />
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onNext({ dueDate, gracePeriod })}
              disabled={!canProceed}
              className="w-full py-[13px] px-4 rounded-[10px] text-base font-semibold text-white transition-opacity"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                opacity: canProceed ? 1 : 0.5,
                cursor: canProceed ? "pointer" : "default",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* ── Right — generator image ──────────────────────────── */}
      <div className="flex-1 p-3">
        <div className="relative h-full w-full rounded-[20px] overflow-hidden">
          <Image
            src="/Images/Generator img for admin side.avif"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

    </div>
  );
}
