"use client";

import { useEffect } from "react";

export type DrawerRow = {
  building: string;
  resident: string;
  amount: string;
  status: "Paid" | "Unpaid" | "Overdue";
  phone: string;
  occupants: string;
  bedrooms: string;
  acUnits: string;
};

type HistoryEntry = {
  amount: string;
  channel: string;
  entryStatus: "Paid" | "Unpaid" | "Overdue";
  date: string;
};

const PRIOR_HISTORY: HistoryEntry[] = [
  { amount: "₦95,000", channel: "In app",   entryStatus: "Paid", date: "May 1 2026" },
  { amount: "₦70,000", channel: "In app",   entryStatus: "Paid", date: "Apr 3 2026" },
  { amount: "₦70,000", channel: "In app",   entryStatus: "Paid", date: "Mar 3 2026" },
  { amount: "₦70,000", channel: "External", entryStatus: "Paid", date: "Feb 3 2026" },
  { amount: "₦70,000", channel: "External", entryStatus: "Paid", date: "Jan 4 2026" },
];

function currentMonthEntry(status: DrawerRow["status"]): HistoryEntry {
  if (status === "Paid")    return { amount: "₦95,000", channel: "In app",  entryStatus: "Paid",    date: "Jun 4 2026" };
  if (status === "Unpaid")  return { amount: "₦95,000", channel: "—",       entryStatus: "Unpaid",  date: "--" };
  /* Overdue */              return { amount: "₦95,000", channel: "Overdue", entryStatus: "Unpaid",  date: "--" };
}

function HistoryBadge({ status }: { status: "Paid" | "Unpaid" | "Overdue" }) {
  if (status === "Paid") return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] whitespace-nowrap">Paid</span>
  );
  /* Unpaid / Overdue shown as Unpaid badge in yellow per design */
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#fefce8] border border-[#fef08a] text-[#a16207] whitespace-nowrap">Unpaid</span>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" />
    </svg>
  );
}

type Props = {
  row: DrawerRow | null;
  onClose: () => void;
};

export default function PaymentHistoryDrawer({ row, onClose }: Props) {
  const open = row !== null;

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

  const history = row ? [currentMonthEntry(row.status), ...PRIOR_HISTORY] : [];

  const hasResident = row && row.resident !== "—";
  const detailLine = hasResident && row
    ? `${row.bedrooms} bedroom${row.bedrooms !== "1" ? "s" : ""} ・ ${row.occupants} occupant${row.occupants !== "1" ? "s" : ""} ・ ${row.acUnits} AC${row.acUnits !== "1" ? "s" : ""}`
    : "";

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
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <p className="text-base font-semibold text-[#171717] leading-6 truncate">{row?.building}</p>
              <p className="text-sm text-[#525252] truncate">{row?.resident !== "—" ? row?.resident : "Vacant"}</p>
              {detailLine && <p className="text-xs text-[#7c7c67] truncate">{detailLine}</p>}
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
        </div>
      </div>
    </>
  );
}
