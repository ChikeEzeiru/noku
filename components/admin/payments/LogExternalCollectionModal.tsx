"use client";

import { useEffect, useState, useMemo } from "react";
import { useEstateStore } from "@/store/estateStore";
import type { ExternalPayment } from "@/store/estateStore";

const NIGERIAN_BANKS = [
  "Access Bank", "Ecobank", "FCMB", "Fidelity Bank", "First Bank",
  "GTBank", "Jaiz Bank", "Polaris Bank", "Stanbic IBTC", "Sterling Bank",
  "UBA", "Union Bank", "Wema Bank", "Zenith Bank",
];

function ReceiptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 6.5C3.333 5.1 3.333 4.4 3.606 3.865C3.845 3.395 4.228 3.012 4.698 2.772C5.233 2.5 5.933 2.5 7.333 2.5H12.667C14.067 2.5 14.767 2.5 15.302 2.772C15.772 3.012 16.154 3.395 16.394 3.865C16.667 4.4 16.667 5.1 16.667 6.5V17.5L14.375 15.833L12.292 17.5L10 15.833L7.708 17.5L5.625 15.833L3.333 17.5V6.5Z" />
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

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 17.5L14.583 14.583M16.667 9.583C16.667 13.496 13.496 16.667 9.583 16.667C5.671 16.667 2.5 13.496 2.5 9.583C2.5 5.671 5.671 2.5 9.583 2.5C13.496 2.5 16.667 5.671 16.667 9.583Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.667" y="3.333" width="16.667" height="15" rx="1.667" />
      <path d="M13.333 1.667v3.333M6.667 1.667v3.333M1.667 8.333h16.667" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5.333v.007M8 7.333v3.334" />
    </svg>
  );
}

function simulateStatus(idx: number, total: number): "Paid" | "Unpaid" | "Overdue" {
  if (idx >= total - 2) return "Overdue";
  if (idx >= total - 4) return "Unpaid";
  return "Paid";
}

function formatAmountInput(raw: string): string {
  // Keep only digits and one decimal point
  const stripped = raw.replace(/[^\d.]/g, "");
  const dotIndex = stripped.indexOf(".");
  const intPart  = dotIndex === -1 ? stripped : stripped.slice(0, dotIndex);
  const decPart  = dotIndex === -1 ? ""        : "." + stripped.slice(dotIndex + 1).replace(/\./g, "").slice(0, 2);
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatted + decPart;
}

const INPUT_BASE = "w-full border border-[#d4d4d4] rounded-[8px] bg-white text-base text-[#171717] placeholder:text-[#737373] px-3 py-2 outline-none focus:border-[#ABAB9C] transition-colors";
const INPUT_SHADOW = { boxShadow: "0 1px 2px rgba(0,0,0,0.05)" };

type SearchFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  open: boolean;
  options: string[];
  onSelect: (v: string) => void;
  required?: boolean;
};

function SearchField({ label, placeholder, value, onChange, onFocus, onBlur, open, options, onSelect, required }: SearchFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0 relative">
      <div className="flex gap-0.5 items-center">
        <p className="text-sm font-medium text-[#404040] leading-5 whitespace-nowrap">{label}</p>
        {required && <p className="text-sm font-medium text-noku-green leading-5">*</p>}
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] pointer-events-none">
          <SearchIcon />
        </span>
        <input
          type="text"
          className={`${INPUT_BASE} pl-10`}
          style={INPUT_SHADOW}
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {open && options.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4d4d4] rounded-[8px] max-h-44 overflow-y-auto z-20"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              className="w-full text-left px-3 py-2.5 text-sm text-[#171717] hover:bg-[#f4f4f0] transition-colors"
              onMouseDown={(e) => { e.preventDefault(); onSelect(opt); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete?: (unitLabel: string) => void;
};

export default function LogExternalCollectionModal({ open, onClose, onComplete }: Props) {
  const [unitSearch, setUnitSearch] = useState("");
  const [unitOpen, setUnitOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<{ label: string; resident: string } | null>(null);

  const [amount, setAmount] = useState("");

  const [bankSearch, setBankSearch] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const [dateReceived, setDateReceived] = useState("");
  const [notes, setNotes] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [errors, setErrors] = useState<{ unit?: string; amount?: string }>({});

  const { structure, residents, paymentOverrides, logExternalPayment } = useEstateStore();

  const units = useMemo(() => {
    if (!structure) return [];
    const total = structure.aptCounts.reduce((a, b) => a + b, 0);
    const result: { label: string; resident: string }[] = [];
    let slot = 0;
    structure.buildingNames.forEach((name, bi) => {
      const count = structure.aptCounts[bi] ?? 0;
      for (let u = 1; u <= count; u++) {
        const label = `Building ${name}, ${structure.aptNaming} ${u}`;
        if (!paymentOverrides[label]) {
          const status = simulateStatus(slot, total);
          if (status === "Unpaid" || status === "Overdue") {
            const stored = residents[slot];
            result.push({ label, resident: stored?.name?.trim() ?? "" });
          }
        }
        slot++;
      }
    });
    return result;
  }, [structure, residents, paymentOverrides]);

  const filteredUnits = useMemo(() => {
    const q = unitSearch.toLowerCase();
    return q ? units.filter((u) => u.label.toLowerCase().includes(q)) : units;
  }, [units, unitSearch]);

  const filteredBanks = useMemo(() => {
    const q = bankSearch.toLowerCase();
    return q ? NIGERIAN_BANKS.filter((b) => b.toLowerCase().includes(q)) : NIGERIAN_BANKS;
  }, [bankSearch]);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function reset() {
    setUnitSearch("");
    setUnitOpen(false);
    setSelectedUnit(null);
    setAmount("");
    setBankSearch("");
    setBankOpen(false);
    setSelectedBank("");
    setDateReceived("");
    setNotes("");
    setErrors({});
  }

  function handleClose() {
    reset();
    onClose();
  }

  function validate(): boolean {
    const errs: { unit?: string; amount?: string } = {};
    if (!selectedUnit) {
      errs.unit = "Please select a building and unit";
    }
    const raw = amount.replace(/[₦,\s]/g, "");
    if (!raw || isNaN(Number(raw)) || Number(raw) <= 0) {
      errs.amount = "Please enter a valid amount greater than zero";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const raw = amount.replace(/[₦,\s]/g, "");
    const formatted = `₦${Number(raw).toLocaleString("en-NG")}`;

    let datePaid: string;
    if (dateReceived) {
      const d = new Date(dateReceived + "T00:00:00");
      datePaid = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } else {
      datePaid = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    const payload: ExternalPayment = { status: "Paid", datePaid, channel: "External", amount: formatted };
    logExternalPayment(selectedUnit!.label, payload);
    onComplete?.(selectedUnit!.label);
    handleClose();
  }

  if (!open) return null;

  const amountRaw = amount.replace(/[,\s]/g, "");
  const canSubmit =
    !!selectedUnit &&
    !!amountRaw && !isNaN(Number(amountRaw)) && Number(amountRaw) > 0 &&
    !!selectedBank &&
    !!dateReceived;

  const unitDisplayValue = selectedUnit ? selectedUnit.label : unitSearch;
  const bankDisplayValue = selectedBank || bankSearch;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={handleClose} />

      {/* Panel */}
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 pt-6 px-6">
            <div
              className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040] shrink-0"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <ReceiptIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-[#171717] leading-6">Log an External Collection</p>
              <p className="text-sm text-[#525252] leading-5">Record payment(s) from residents made outside the Noku app</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-[8px] text-[#737373] hover:text-[#171717] hover:bg-[#f4f4f0] transition-colors"
          >
            <XIcon />
          </button>
          <div className="h-5" />
          <div className="h-px bg-[#e5e5e5]" />
        </div>

        {/* Form */}
        <div className="px-6 pt-5 pb-8 flex flex-col gap-5">
          {/* Row 1: Building/Unit + Resident Name */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <SearchField
                label="Building, Unit"
                placeholder="Search for unit"
                value={unitDisplayValue}
                required
                open={unitOpen}
                options={filteredUnits.map((u) => u.label)}
                onChange={(v) => { setUnitSearch(v); setSelectedUnit(null); setUnitOpen(true); if (errors.unit) setErrors((e) => ({ ...e, unit: undefined })); }}
                onFocus={() => { setUnitOpen(true); if (selectedUnit) { setSelectedUnit(null); setUnitSearch(""); } }}
                onBlur={() => setTimeout(() => setUnitOpen(false), 150)}
                onSelect={(label) => {
                  const found = units.find((u) => u.label === label);
                  if (found) { setSelectedUnit(found); setUnitSearch(""); setUnitOpen(false); setErrors((e) => ({ ...e, unit: undefined })); }
                }}
              />
              {errors.unit && <p className="text-xs text-[#dc2626] mt-0.5">{errors.unit}</p>}
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="text-sm font-medium text-[#404040] leading-5">Resident Name</p>
              <input
                type="text"
                className={`${INPUT_BASE} opacity-50 cursor-not-allowed`}
                style={INPUT_SHADOW}
                placeholder="e.g. John Mark"
                value={selectedUnit?.resident ?? ""}
                disabled
                readOnly
              />
            </div>
          </div>

          {/* Amount Received */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#404040] leading-5">Amount Received</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b5b4b] pointer-events-none select-none text-base leading-none">₦</span>
              <input
                type="text"
                className={`${INPUT_BASE} pl-8 ${errors.amount ? "border-[#dc2626] focus:border-[#dc2626]" : ""}`}
                style={INPUT_SHADOW}
                placeholder="XXX,XXX"
                value={amount}
                onChange={(e) => { setAmount(formatAmountInput(e.target.value)); if (errors.amount) setErrors((err) => ({ ...err, amount: undefined })); }}
              />
            </div>
            {errors.amount && <p className="text-xs text-[#dc2626] mt-0.5">{errors.amount}</p>}
          </div>

          {/* Row 2: Sending Bank + Date Received */}
          <div className="flex gap-4 items-start">
            <SearchField
              label="Sending Bank"
              placeholder="Search Banks"
              value={bankDisplayValue}
              open={bankOpen}
              options={filteredBanks}
              onChange={(v) => { setBankSearch(v); setSelectedBank(""); setBankOpen(true); }}
              onFocus={() => { setBankOpen(true); if (selectedBank) { setSelectedBank(""); setBankSearch(""); } }}
              onBlur={() => setTimeout(() => setBankOpen(false), 150)}
              onSelect={(bank) => { setSelectedBank(bank); setBankSearch(""); setBankOpen(false); }}
            />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="text-sm font-medium text-[#404040] leading-5">Date Received</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] pointer-events-none">
                  <CalendarIcon />
                </span>
                <input
                  type="date"
                  className={`${INPUT_BASE} pl-10`}
                  style={INPUT_SHADOW}
                  value={dateReceived}
                  onChange={(e) => setDateReceived(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1 items-center">
              <p className="text-sm font-medium text-[#404040] leading-5">Notes</p>
              <div className="relative shrink-0 mt-px">
                <button
                  type="button"
                  className="text-[#ABAB9C] hover:text-[#737373] transition-colors flex"
                  onMouseEnter={() => setTooltipOpen(true)}
                  onMouseLeave={() => setTooltipOpen(false)}
                  onClick={() => setTooltipOpen((v) => !v)}
                >
                  <HelpIcon />
                </button>
                {tooltipOpen && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#1d1d16] text-white text-xs leading-relaxed rounded-lg px-3 py-2.5 z-10 pointer-events-none whitespace-normal"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                  >
                    Add extra context — e.g. part-payments, promised balance dates, or special circumstances.
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #1d1d16" }} />
                  </div>
                )}
              </div>
            </div>
            <textarea
              className={`${INPUT_BASE} resize-y`}
              style={INPUT_SHADOW}
              placeholder="e.g. this is a part-payment, and the resident has promised the balance in 4 days"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Footer */}
        <div>
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center justify-end gap-3 px-6 py-6">
            <button
              onClick={handleClose}
              className="bg-white rounded-[8px] px-4 py-2.5 text-base font-semibold text-[#474739]"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed btn-press-cta"
              style={{ boxShadow: "inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Log Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
