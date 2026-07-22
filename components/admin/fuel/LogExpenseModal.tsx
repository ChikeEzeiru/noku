"use client";

import { useEffect, useState, useRef } from "react";
import { useEstateStore } from "@/store/estateStore";
import type { ExpenseEntry } from "./SpendHistoryDrawer";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatAmt(raw: string): string {
  const stripped = raw.replace(/[^\d.]/g, "");
  const dot = stripped.indexOf(".");
  const intPart = dot === -1 ? stripped : stripped.slice(0, dot);
  const decPart = dot === -1 ? "" : "." + stripped.slice(dot + 1).replace(/\./g, "").slice(0, 2);
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + decPart;
}

function parseAmt(s: string): number {
  return Number(s.replace(/[,\s]/g, "")) || 0;
}

function calcLitres(totalStr: string, perLitreStr: string): string {
  const total = parseAmt(totalStr);
  const unit  = parseAmt(perLitreStr);
  if (!total || !unit) return "";
  const litres = Math.round(total / unit);
  return litres.toLocaleString("en-NG");
}

function todayFormatted(): string {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function parseDateInput(s: string): string {
  if (!s) return todayFormatted();
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function ReceiptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 6.5C3.333 5.1 3.333 4.4 3.606 3.865A3.333 3.333 0 014.698 2.772C5.233 2.5 5.933 2.5 7.333 2.5H12.667c1.4 0 2.1 0 2.635.272.47.24.853.622 1.092 1.093C16.667 4.4 16.667 5.1 16.667 6.5V17.5l-2.292-1.667-2.083 1.667L10 15.833l-2.292 1.667L5.625 15.833 3.333 17.5V6.5Z" />
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

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4" />
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

function UploadCloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.667 13.333S3.333 13.333 3.333 10c0-2.945 2.39-4.444 4.444-4.444.11 0 .223.004.334.012A4.444 4.444 0 0116.11 8.556c0 .098-.004.195-.01.29A3.333 3.333 0 0113.333 15" />
      <path d="M10 10v6.667M8.333 11.667L10 10l1.667 1.667" />
    </svg>
  );
}

// ── Shared field styles ───────────────────────────────────────────────────────

const INPUT_BASE = "w-full border border-[#d8d8d0] rounded-[8px] bg-white text-base text-[#171717] placeholder:text-[#7c7c67] px-3 py-2 outline-none focus:border-[#ABAB9C] transition-colors";
const INPUT_SHADOW = { boxShadow: "0 1px 1px rgba(0,0,0,0.05)" };
const LABEL_CLASS = "text-sm font-medium text-[#474739]";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className={LABEL_CLASS}>{children} <span className="text-red-500">*</span></p>
  );
}

// ── Custom dropdown ───────────────────────────────────────────────────────────

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  onChange: (v: string) => void;
};

function Dropdown({ label, value, options, placeholder, required, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={ref}>
      {required ? <FieldLabel>{label}</FieldLabel> : <p className={LABEL_CLASS}>{label}</p>}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 border border-[#d4d4d4] rounded-[8px] bg-white px-3 py-2 text-base text-left outline-none"
        style={INPUT_SHADOW}
      >
        <span className={`flex-1 truncate ${value ? "text-[#171717]" : "text-[#737373]"}`}>
          {value || placeholder}
        </span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4d4d4] rounded-[8px] z-20 overflow-hidden"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-[#f4f4f0] ${
                value === opt ? "font-semibold text-[#171717]" : "text-[#404040]"
              }`}
              onMouseDown={(e) => { e.preventDefault(); onChange(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type ExpenseType = "fuel" | "repair";

const EXPENSE_TYPES: { label: string; value: ExpenseType }[] = [
  { label: "Fuel Purchase",                value: "fuel"   },
  { label: "Generator Repair/Maintenance", value: "repair" },
];

const PAYMENT_METHODS = ["In app", "Bank transfer", "Cash"];

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (entry: ExpenseEntry) => void;
};

// ── Modal ─────────────────────────────────────────────────────────────────────

export default function LogExpenseModal({ open, onClose, onSubmit }: Props) {
  const adminName = useEstateStore((s) => s.admin?.fullName ?? "Admin");

  const [expenseType,   setExpenseType]   = useState<ExpenseType>("fuel");
  const [costPerLitre,  setCostPerLitre]  = useState("");
  const [amountTotal,   setAmountTotal]   = useState("");
  const [amountPaid,    setAmountPaid]    = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [supplier,      setSupplier]      = useState("");
  const [vendor,        setVendor]        = useState("");
  const [date,          setDate]          = useState("");

  // scroll lock
  useEffect(() => {
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow     = "hidden";
      document.body.style.paddingRight = `${sw}px`;
    } else {
      document.body.style.overflow     = "";
      document.body.style.paddingRight = "";
    }
    return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function reset() {
    setExpenseType("fuel");
    setCostPerLitre(""); setAmountTotal(""); setAmountPaid("");
    setPaymentMethod(""); setSupplier(""); setVendor(""); setDate("");
  }

  function handleClose() { reset(); onClose(); }

  // ── canSubmit ──
  const fuelReady   = expenseType === "fuel"   && parseAmt(costPerLitre) > 0 && parseAmt(amountTotal) > 0 && !!paymentMethod && !!supplier && !!date;
  const repairReady = expenseType === "repair" && parseAmt(amountPaid) > 0 && !!paymentMethod && !!vendor && !!date;
  const canSubmit   = fuelReady || repairReady;

  function handleSubmit() {
    if (!canSubmit) return;
    const datePaid = parseDateInput(date);

    let entry: ExpenseEntry;
    if (expenseType === "fuel") {
      const total    = `₦${parseAmt(amountTotal).toLocaleString("en-NG")}`;
      const perLitre = `₦${parseAmt(costPerLitre).toLocaleString("en-NG")}`;
      const litres   = parseAmt(amountTotal) / parseAmt(costPerLitre);
      entry = {
        type: "fuel",
        date: datePaid,
        qty: Math.round(litres),
        unitPrice: perLitre,
        total,
        supplier,
        method: paymentMethod,
        loggedBy: adminName,
      };
    } else {
      const total = `₦${parseAmt(amountPaid).toLocaleString("en-NG")}`;
      entry = {
        type: "repair",
        date: datePaid,
        description: "Generator Repair/Maintenance",
        total,
        vendor,
        method: paymentMethod,
        loggedBy: adminName,
      };
    }
    onSubmit(entry);
    handleClose();
  }

  const litresDisplay = expenseType === "fuel" ? calcLitres(amountTotal, costPerLitre) : "";
  const typeLabel = EXPENSE_TYPES.find((t) => t.value === expenseType)?.label ?? "";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={handleClose} />

      <div
        className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col max-h-[90vh] screen-enter"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex flex-col shrink-0">
          <div className="flex flex-col gap-4 pt-6 px-6">
            <div
              className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040] shrink-0"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <ReceiptIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-[#171717] leading-6">Log an Expense</p>
              <p className="text-sm text-[#525252] leading-5">Record payment(s) for fuel purchases or maintenance</p>
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

        {/* Form body */}
        <div className="px-6 pt-5 pb-2 flex flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Type of Expense */}
          <Dropdown
            label="Type of Expense"
            required
            value={typeLabel}
            options={EXPENSE_TYPES.map((t) => t.label)}
            onChange={(label) => {
              const found = EXPENSE_TYPES.find((t) => t.label === label);
              if (found) setExpenseType(found.value);
            }}
          />

          {/* ── FUEL fields ── */}
          {expenseType === "fuel" && (
            <>
              {/* Row: Cost per litre | Amount purchased */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <FieldLabel>₦ Cost per litre</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b5b4b] pointer-events-none select-none">₦</span>
                    <input
                      type="text"
                      className={`${INPUT_BASE} pl-7`}
                      style={INPUT_SHADOW}
                      placeholder="X,XXX"
                      value={costPerLitre}
                      onChange={(e) => setCostPerLitre(formatAmt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <FieldLabel>Amount purchased</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b5b4b] pointer-events-none select-none">₦</span>
                    <input
                      type="text"
                      className={`${INPUT_BASE} pl-7`}
                      style={INPUT_SHADOW}
                      placeholder="XXX,XXX"
                      value={amountTotal}
                      onChange={(e) => setAmountTotal(formatAmt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Row: Litres purchased (auto) | Payment method */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <FieldLabel>Litres purchased</FieldLabel>
                  <input
                    type="text"
                    className={`${INPUT_BASE} bg-[#f4f4f0] opacity-50 cursor-not-allowed`}
                    style={INPUT_SHADOW}
                    placeholder="total cost ÷ litre cost"
                    value={litresDisplay}
                    readOnly
                    disabled
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Dropdown
                    label="Payment method"
                    required
                    value={paymentMethod}
                    options={PAYMENT_METHODS}
                    placeholder="e.g. Bank transfer"
                    onChange={setPaymentMethod}
                  />
                </div>
              </div>
            </>
          )}

          {/* ── REPAIR fields ── */}
          {expenseType === "repair" && (
            <>
              {/* Amount paid */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Amount paid</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b5b4b] pointer-events-none select-none">₦</span>
                  <input
                    type="text"
                    className={`${INPUT_BASE} pl-7`}
                    style={INPUT_SHADOW}
                    placeholder="XXX,XXX"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(formatAmt(e.target.value))}
                  />
                </div>
              </div>

              {/* Payment method */}
              <Dropdown
                label="Payment method"
                required
                value={paymentMethod}
                options={PAYMENT_METHODS}
                placeholder="e.g. Bank transfer"
                onChange={setPaymentMethod}
              />
            </>
          )}

          {/* Receipt upload (shared) */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Receipt upload</FieldLabel>
            <label className="flex flex-col items-center gap-3 border border-[#e5e5e5] rounded-[12px] px-6 py-4 bg-white cursor-pointer hover:bg-[#fafaf8] transition-colors">
              <div
                className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040]"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <UploadCloudIcon />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-semibold text-[#474739]">Click to upload</span>
                  <span className="text-[#525252]">or drag and drop</span>
                </div>
                <p className="text-xs text-[#525252]">SVG, PNG, JPG or GIF (max. 800×400px)</p>
              </div>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>
          </div>

          {/* Row: Supplier/Vendor | Date */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <FieldLabel>{expenseType === "fuel" ? "Supplier name" : "Vendor / Technician name"}</FieldLabel>
              <input
                type="text"
                className={INPUT_BASE}
                style={INPUT_SHADOW}
                placeholder={expenseType === "fuel" ? "e.g. ABC Fuel Services" : "e.g. Mikano Technical team"}
                value={expenseType === "fuel" ? supplier : vendor}
                onChange={(e) => expenseType === "fuel" ? setSupplier(e.target.value) : setVendor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <FieldLabel>{expenseType === "fuel" ? "Date of purchase" : "Date of payment"}</FieldLabel>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] pointer-events-none">
                  <CalendarIcon />
                </span>
                <input
                  type="date"
                  className={`${INPUT_BASE} pl-10`}
                  style={INPUT_SHADOW}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0">
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
              Log Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
