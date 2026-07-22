"use client";

import { useEffect } from "react";
import { useEstateStore } from "@/store/estateStore";
import { issuesForUnit, type ReportedIssue } from "@/components/admin/residents/issuesData";
import type { IssueBadgeType } from "@/components/admin/residents/issuesData";

export type ResidentDrawerRow = {
  buildingUnit: string;
  resident: string;
  amount: string;
  paymentStatus: "Paid" | "Unpaid" | "Overdue";
  phone: string;
  occupants: string;
  bedrooms: string;
  acUnits: string;
  addedAt?: string;
};

function formatJoinedDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

type HistoryEntry = {
  amount: string;
  channel: string;
  entryStatus: "Paid" | "Unpaid" | "Overdue";
  date: string;
};

const PRIOR_HISTORY: HistoryEntry[] = [
  { amount: "₦95,000", channel: "In app",   entryStatus: "Paid", date: "May 1 2026" },
  { amount: "₦70,000", channel: "In app",   entryStatus: "Paid", date: "Apr 3 2026" },
];

function currentMonthEntry(status: ResidentDrawerRow["paymentStatus"]): HistoryEntry {
  if (status === "Paid")   return { amount: "₦95,000", channel: "In app", entryStatus: "Paid",   date: "Jun 4 2026" };
  if (status === "Unpaid") return { amount: "₦95,000", channel: "—",      entryStatus: "Unpaid", date: "--" };
  /* Overdue */             return { amount: "₦95,000", channel: "—",      entryStatus: "Overdue", date: "--" };
}

function HistoryBadge({ status }: { status: "Paid" | "Unpaid" | "Overdue" }) {
  if (status === "Paid") return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] whitespace-nowrap">Paid</span>
  );
  if (status === "Unpaid") return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#fefce8] border border-[#fef08a] text-[#a16207] whitespace-nowrap">Unpaid</span>
  );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] whitespace-nowrap">Overdue</span>
  );
}

const TYPE_DOT: Record<IssueBadgeType, string> = {
  "Power Issue":   "#f59e0b",
  "Bill Issue":    "#ef4444",
  "Payment Issue": "#3b82f6",
};

function IssueBadge({ type }: { type: IssueBadgeType }) {
  return (
    <span
      className="inline-flex items-center gap-1 bg-white border border-[#d4d4d4] rounded-[6px] px-2 py-1 whitespace-nowrap shrink-0"
      style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: TYPE_DOT[type] }} />
      <span className="text-[12px] font-medium text-[#404040] leading-4">{type}</span>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" />
    </svg>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <p className="text-sm font-medium text-[#7c7c67]">{label}</p>
      <p className="text-sm font-medium text-[#474739]">{value}</p>
    </div>
  );
}

type Props = {
  row: ResidentDrawerRow | null;
  onClose: () => void;
};

export default function ResidentDetailDrawer({ row, onClose }: Props) {
  const open = row !== null;
  const onboardingCompletedAt = useEstateStore((s) => s.onboardingCompletedAt);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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

  const history = row ? [currentMonthEntry(row.paymentStatus), ...PRIOR_HISTORY] : [];
  const unitIssues = row ? issuesForUnit(row.buildingUnit) : [];

  const hasResident = row && row.resident.trim() !== "";
  const calcDesc = hasResident && row
    ? `Calculated using resident data (${row.occupants} occupant${row.occupants !== "1" ? "s" : ""}, ${row.bedrooms} bedroom${row.bedrooms !== "1" ? "s" : ""} and ${row.acUnits} AC${row.acUnits !== "1" ? "s" : ""})`
    : "No resident data on file";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 w-full lg:w-[480px] bg-[#fbfbf9] lg:rounded-tl-[12px] lg:rounded-bl-[12px] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sticky header */}
        <div className="shrink-0 backdrop-blur-md bg-white/90 border-b border-[#e5e5e5]">
          <div className="flex items-start gap-4 px-6 pt-5 pb-4">
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-semibold text-[#171717] leading-6">
                  {hasResident ? row!.resident : "Vacant Unit"}
                </p>
                <p className="text-sm text-[#525252] truncate">{row?.buildingUnit}</p>
              </div>
              {(() => {
                const joinedIso = row?.addedAt ?? onboardingCompletedAt;
                return joinedIso ? (
                  <span className="inline-flex self-start items-center px-1.5 py-0.5 rounded-[6px] text-xs font-medium text-[#404040] border border-[#d4d4d4] bg-white" style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}>
                    Joined {formatJoinedDate(joinedIso)}
                  </span>
                ) : null;
              })()}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-[#737373] hover:text-[#171717] hover:bg-[#f4f4f0] transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Resident Data */}
          <div className="px-6 py-5 flex flex-col gap-3">
            <p className="text-sm text-[#525252]">Resident Data</p>
            <div className="flex flex-col">
              <DataRow label="Phone Number:" value={row?.phone || "—"} />
              <DataRow label="Occupants:"   value={row?.occupants || "—"} />
              <DataRow label="Bedrooms:"    value={row?.bedrooms || "—"} />
              <DataRow label="ACs"          value={row?.acUnits || "—"} />
            </div>

            {/* Contribution amount card */}
            <div className="bg-white border border-[#d8d8d0] rounded-[12px] overflow-hidden">
              <div className="px-[14px] py-3 border-b border-[#f0f0ec]">
                <p className="text-sm text-[#525252]">Contribution Amount</p>
              </div>
              <div className="px-[14px] py-2 flex flex-col gap-1">
                <p className="text-lg font-medium text-[#5b5b4b] leading-7">{row?.amount ?? "₦95,000"}</p>
                <p className="text-xs text-[#7c7c67] leading-[18px]">{calcDesc}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#e5e5e5] mx-6" />

          {/* Payment History */}
          <div className="px-6 py-5 flex flex-col gap-3">
            <p className="text-sm text-[#525252]">Payment History</p>
            <div className="flex flex-col">
              {history.map((entry, i) => (
                <div key={i} className="flex items-center justify-between px-2 py-2">
                  <div className="flex flex-col gap-0.5 shrink-0 min-w-[80px]">
                    <p className="text-sm font-medium text-[#474739]">{entry.amount}</p>
                    <p className="text-xs text-[#7c7c67]">{entry.channel}</p>
                  </div>
                  <HistoryBadge status={entry.entryStatus} />
                  <p className="text-xs text-[#7c7c67] whitespace-nowrap shrink-0 min-w-[65px] text-right">{entry.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#e5e5e5] mx-6" />

          {/* Issues reported */}
          <div className="px-6 py-5 flex flex-col gap-3">
            <p className="text-sm text-[#525252]">Issues reported:</p>
            {unitIssues.length === 0 ? (
              <p className="text-sm font-medium text-[#474739]">None</p>
            ) : (
              <div className="flex flex-col gap-2">
                {unitIssues.map((issue, i) => (
                  <div key={i} className="bg-[#fffbeb] border border-[#fcd34d] rounded-[10px] px-3 py-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <IssueBadge type={issue.type} />
                      <p className="text-xs text-[#737373] shrink-0">{issue.date}</p>
                    </div>
                    <p className="text-xs text-[#474739] leading-[18px]">{issue.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
