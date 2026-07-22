"use client";

import { useEffect, useState, useMemo } from "react";
import { useEstateStore } from "@/store/estateStore";

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6.667a5 5 0 00-10 0c0 5.833-2.5 7.5-2.5 7.5h15s-2.5-1.667-2.5-7.5M11.44 17.5a1.667 1.667 0 01-2.88 0" />
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

function MiniCheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L4.5 8.5L2 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8h9.334M8.667 4L13 8l-4.333 4" />
    </svg>
  );
}

function ConfirmCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.333 4L6 11.333l-3.333-3.333" />
    </svg>
  );
}

type UnitStatus = "Unpaid" | "Overdue";

type ReminderUnit = {
  label: string;
  resident: string;
  amount: string;
  status: UnitStatus;
  daysOverdue?: number;
};

export type PreselectedUnit = {
  label: string;
  resident: string;
  amount: string;
  status: UnitStatus;
};

type Props = {
  open: boolean;
  onClose: () => void;
  preselectedUnit?: PreselectedUnit;
  onSent?: (count: number, residentName?: string) => void;
};

function simulateStatus(idx: number, total: number): "Paid" | "Unpaid" | "Overdue" {
  if (idx >= total - 2) return "Overdue";
  if (idx >= total - 4) return "Unpaid";
  return "Paid";
}

const CURRENT_MONTH = "July 2026";
const STD_TEMPLATE  = `Hi [Name], your Noku contribution of [amount] for ${CURRENT_MONTH} is due. You can pay directly through the app. If you have any questions, reach out to the estate committee.`;

function buildMessage(resident: string, amount: string): string {
  const name = resident && resident !== "—" ? resident.split(" ")[0] : "Resident";
  return `Hi ${name}, your Noku contribution of ${amount} for ${CURRENT_MONTH} is due. You can pay directly through the app. If you have any questions, reach out to the estate committee.`;
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`shrink-0 w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
        checked ? "bg-noku-green border-noku-green" : "bg-white border-[#d4d4d4]"
      }`}
      style={!checked ? { boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" } : undefined}
    >
      {checked && <MiniCheckIcon />}
    </button>
  );
}

function UnitStatusBadge({ status }: { status: UnitStatus }) {
  if (status === "Unpaid") return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[6px] text-[10px] font-medium bg-[#fefce8] border border-[#fef08a] text-[#a16207] whitespace-nowrap">
      Unpaid
    </span>
  );
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[6px] text-[10px] font-medium bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] whitespace-nowrap">
      Overdue
    </span>
  );
}

const HEADER = {
  1: { title: "Send Reminder",            subtitle: "Notify specific or all residents that payment is due" },
  2: { title: "Edit Message",             subtitle: "Add some details to the reminder" },
  3: { title: "Confirm Reminder details", subtitle: "Here's a summary of the reminder that will be sent to the resident(s)" },
} as const;

const DARK_BTN = {
  className: "flex items-center gap-2 bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 btn-press-cta",
  style:     { boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 0 rgba(0,0,0,0.05)" },
};

export default function SendReminderModal({ open, onClose, preselectedUnit, onSent }: Props) {
  const [step,      setStep]      = useState<1 | 2 | 3>(1);
  const [selected,  setSelected]  = useState<Set<string>>(new Set());
  const [extraNote, setExtraNote] = useState("");

  const { structure, residents, paymentOverrides } = useEstateStore();

  const unpaidUnits = useMemo<ReminderUnit[]>(() => {
    if (!structure) return [];
    const total = structure.aptCounts.reduce((a, b) => a + b, 0);
    const result: ReminderUnit[] = [];
    let slot = 0;
    structure.buildingNames.forEach((name, bi) => {
      const count = structure.aptCounts[bi] ?? 0;
      for (let u = 1; u <= count; u++) {
        const unitLabel = `Building ${name}, ${structure.aptNaming} ${u}`;
        if (!paymentOverrides[unitLabel]) {
          const status = simulateStatus(slot, total);
          if (status === "Unpaid" || status === "Overdue") {
            const stored      = residents[slot];
            const hasResident = stored?.name?.trim() !== "";
            result.push({
              label:       unitLabel,
              resident:    hasResident ? stored.name : "—",
              amount:      "₦95,000",
              status,
              daysOverdue: status === "Overdue" ? (slot % 3 + 1) * 3 : undefined,
            });
          }
        }
        slot++;
      }
    });
    return result;
  }, [structure, residents, paymentOverrides]);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setExtraNote("");
    if (preselectedUnit) {
      setSelected(new Set([preselectedUnit.label]));
    } else {
      setSelected(new Set(unpaidUnits.map((u) => u.label)));
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow    = "hidden";
      document.body.style.paddingRight = `${sw}px`;
    } else {
      document.body.style.overflow    = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow    = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (label: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  const next = () => setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3);
  const back = () => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3);

  // Step 1 shows: only the preselected unit (row bell) or all unpaid units (bulk)
  const step1Units: ReminderUnit[] = preselectedUnit
    ? [{ ...preselectedUnit, daysOverdue: preselectedUnit.status === "Overdue" ? 6 : undefined }]
    : unpaidUnits;

  const confirmUnits: ReminderUnit[] = step1Units.filter((u) => selected.has(u.label));

  const { title, subtitle } = HEADER[step];

  const showBack    = step > 1;
  const showCancel  = step === 1;
  const showNext    = step < 3;
  const showConfirm = step === 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div
        className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col screen-enter"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 pt-6 px-6">
            <div
              className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040] shrink-0"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <BellIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-[#171717] leading-6">{title}</p>
              <p className="text-sm text-[#525252] leading-5">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-[8px] text-[#737373] hover:text-[#171717] hover:bg-[#f4f4f0] transition-colors"
          >
            <XIcon />
          </button>
          <div className="h-5" />
          <div className="h-px bg-[#e5e5e5]" />
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 max-h-[55vh] overflow-y-auto">

          {/* ── Step 1: select recipients ── */}
          {step === 1 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-[#5b5b4b]">Units with unpaid levies</p>
              {step1Units.length === 0 ? (
                <p className="text-sm text-[#9ca3af] py-6 text-center">
                  No unpaid units — all payments are up to date.
                </p>
              ) : (
                <div className="border border-[#e8e8e3] rounded-[12px] px-4 py-0.5 flex flex-col">
                  {step1Units.map((unit, i) => (
                    <div
                      key={unit.label}
                      className={`flex items-center h-[72px] gap-4 sm:gap-6 ${
                        i < step1Units.length - 1 ? "border-b border-[#e5e5e5]" : ""
                      }`}
                    >
                      {/* Checkbox + names */}
                      <div className="flex items-center gap-6 flex-1 min-w-0 pr-2">
                        {!preselectedUnit && (
                          <Checkbox checked={selected.has(unit.label)} onChange={() => toggle(unit.label)} />
                        )}
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-medium text-[#171717] truncate">{unit.label}</p>
                          <p className="text-sm text-[#525252] truncate">{unit.resident}</p>
                        </div>
                      </div>
                      {/* Amount */}
                      <p className="text-sm text-[#7c7c67] shrink-0 hidden sm:block">
                        <span>₦</span>
                        {" 95,000"}
                      </p>
                      {/* Status badge */}
                      <div className="shrink-0">
                        <UnitStatusBadge status={unit.status} />
                      </div>
                      {/* Overdue text */}
                      <div className="shrink-0 min-w-[90px] text-right hidden sm:block">
                        {unit.status === "Overdue" ? (
                          <p className="text-sm text-[#dc2626]">{unit.daysOverdue} days overdue</p>
                        ) : (
                          <p className="text-sm text-[#7c7c67]">not overdue</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Step 2: edit message ── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              {/* Standard message — read-only preview */}
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[#5b5b4b]">Reminder message</p>
                <textarea
                  className="w-full border border-[#d4d4d4] rounded-[8px] bg-[#f4f4f0] text-sm text-[#1d1d16] px-3 py-3 resize-none opacity-60 cursor-not-allowed leading-5 outline-none"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                  rows={4}
                  value={STD_TEMPLATE}
                  readOnly
                  disabled
                />
              </div>
              {/* Extra note — editable */}
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[#474739]">Extra note/details</p>
                <textarea
                  className="w-full border border-[#d4d4d4] rounded-[8px] bg-white text-sm text-[#171717] placeholder:text-[#737373] px-3 py-3 outline-none focus:border-[#ABAB9C] transition-colors resize-none leading-5"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                  rows={4}
                  placeholder="e.g. Power usage rationing may begin if contributions aren't received by the 15th."
                  value={extraNote}
                  onChange={(e) => setExtraNote(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── Step 3: confirmation (bulk) + single-unit ── */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              {/* Unit(s) summary card */}
              <div className="border border-[#d8d8d0] rounded-[12px] overflow-hidden">
                {confirmUnits.map((unit, i) => (
                  <div
                    key={unit.label}
                    className={`flex flex-col gap-2 px-3 py-3 ${
                      i < confirmUnits.length - 1 ? "border-b border-[#e8e8e3]" : ""
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <p className="text-sm text-[#474739] shrink-0">Apartment:</p>
                      <p className="text-sm font-medium text-[#1d1d16]">{unit.label}</p>
                    </div>
                    {unit.resident && unit.resident !== "—" && (
                      <div className="flex gap-3 items-center">
                        <p className="text-sm text-[#474739] shrink-0">Resident Name:</p>
                        <p className="text-sm font-medium text-[#1d1d16]">{unit.resident}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message preview */}
              <div className="flex flex-col gap-5 px-1">
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm text-[#474739]">Reminder Message:</p>
                  <p className="text-sm text-[#1d1d16] leading-5">
                    {confirmUnits.length === 1
                      ? buildMessage(confirmUnits[0].resident, confirmUnits[0].amount)
                      : STD_TEMPLATE}
                  </p>
                  {confirmUnits.length > 1 && (
                    <p className="text-xs text-[#7c7c67] mt-0.5 leading-4">
                      Each resident receives a personalised version with their name and amount.
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm text-[#474739]">Extra Note:</p>
                  <p className="text-sm text-[#1d1d16] leading-5">{extraNote || "—"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div>
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center px-6 py-6 gap-3">
            {/* Step counter */}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-base font-semibold text-[#171717]">Step {step}</span>
              <span className="text-sm text-[#7c7c67]">of 3</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {showCancel && (
                <button onClick={onClose} className="text-base font-semibold text-[#5b5b4b] px-2 py-2.5">
                  Cancel
                </button>
              )}
              {showBack && (
                <button onClick={back} className="text-base font-semibold text-[#5b5b4b] px-2 py-2.5">
                  Back
                </button>
              )}
              {showNext && (
                <button
                  onClick={next}
                  disabled={step === 1 && selected.size === 0}
                  className={`${DARK_BTN.className} disabled:opacity-40 disabled:cursor-not-allowed`}
                  style={DARK_BTN.style}
                >
                  Next
                  <ArrowRightIcon />
                </button>
              )}
              {showConfirm && (
                <button
                  onClick={() => {
                    onSent?.(confirmUnits.length, confirmUnits[0]?.resident);
                    onClose();
                  }}
                  className={DARK_BTN.className}
                  style={DARK_BTN.style}
                >
                  Confirm & Send
                  <ConfirmCheckIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
