"use client";

import { useEffect, useRef } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export type FuelEntry = {
  type: "fuel";
  date: string;
  qty: number;
  unitPrice: string;
  total: string;
  supplier: string;
  method: string;
  loggedBy: string;
};

export type RepairEntry = {
  type: "repair";
  date: string;
  description: string;
  total: string;
  vendor: string;
  method: string;
  loggedBy: string;
};

export type ExpenseEntry = FuelEntry | RepairEntry;

type Props = {
  entry: ExpenseEntry | null;
  onClose: () => void;
};

// ── Sub-components ───────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5L5 15M5 5L15 15" />
    </svg>
  );
}

function PdfFileIcon() {
  return (
    <div className="relative w-9 h-10 shrink-0">
      {/* Page */}
      <svg width="36" height="40" viewBox="0 0 36 40" fill="none" className="absolute inset-0">
        <rect x="1" y="1" width="28" height="38" rx="3" fill="white" stroke="#d4d4d4" strokeWidth="1.5" />
        <path d="M20 1v9h9" fill="none" stroke="#d4d4d4" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {/* PDF badge */}
      <span className="absolute bottom-1 left-0 bg-[#dc2626] text-white text-[9px] font-bold px-1 py-0.5 rounded-[2px] leading-none">
        PDF
      </span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between px-[14px] py-2 gap-4">
      <p className="text-sm font-medium text-[#7c7c67] shrink-0">{label}</p>
      <p className="text-sm font-medium text-[#474739] text-right">{value}</p>
    </div>
  );
}

function GroupDivider() {
  return <div className="w-full h-px bg-[#e8e8e3]" />;
}

function titleFor(entry: ExpenseEntry) {
  if (entry.type === "fuel")   return "Fuel Purchase";
  if (entry.type === "repair") return "Generator Repair";
  return "Expense";
}

// ── Drawer ───────────────────────────────────────────────────────────────────

export default function SpendHistoryDrawer({ entry, onClose }: Props) {
  const open = !!entry;
  // keep last non-null entry so content stays visible during exit animation
  const displayRef = useRef<ExpenseEntry | null>(null);
  if (entry) displayRef.current = entry;
  const display = displayRef.current;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 w-full max-w-[480px] bg-[#fbfbf9] rounded-tl-[12px] rounded-bl-[12px] flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex flex-col"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-5">
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-base font-semibold text-[#171717] leading-6">{display ? titleFor(display) : ""}</p>
              <p className="text-sm text-[#525252] leading-5">{display?.date}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#f4f4f0] transition-colors mt-0.5"
            >
              <XIcon />
            </button>
          </div>
          <div className="h-px bg-[#e5e5e5]" />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 px-6 py-5">
          <p className="text-sm text-[#525252]">Expense details</p>

          <div className="bg-white border border-[#d8d8d0] rounded-[12px] overflow-hidden">

            {/* Group 1: cost / quantity / unit price */}
            <div className="flex flex-col py-3">
              <DetailRow label="Total Cost:" value={display?.total ?? ""} />
              {display?.type === "fuel" && (
                <>
                  <DetailRow label="Quantity:" value={`${display.qty} Litres`} />
                  <DetailRow label="Unit price (per litre):" value={display.unitPrice} />
                </>
              )}
              {display?.type === "repair" && (
                <DetailRow label="Description:" value={display.description} />
              )}
            </div>

            <GroupDivider />

            {/* Group 2: payment / supplier or vendor */}
            <div className="flex flex-col py-3">
              <DetailRow label="Payment Method:" value={display?.method ?? ""} />
              {display?.type === "fuel"   && <DetailRow label="Supplier Name:" value={display.supplier} />}
              {display?.type === "repair" && <DetailRow label="Vendor / Technician:" value={display.vendor} />}
            </div>

            <GroupDivider />

            {/* Group 3: attached receipt */}
            <div className="flex items-start justify-between px-[14px] py-3 gap-4">
              <p className="text-sm font-medium text-[#7c7c67] shrink-0 pt-1">Attached Receipt:</p>
              <div className="flex flex-col items-center gap-1">
                <PdfFileIcon />
                <span className="text-[10px] font-semibold text-[#16803c] leading-4">View</span>
              </div>
            </div>

            <GroupDivider />

            {/* Group 4: logged by */}
            <div className="flex flex-col py-3">
              <DetailRow label="Logged by:" value={display?.loggedBy ?? ""} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
