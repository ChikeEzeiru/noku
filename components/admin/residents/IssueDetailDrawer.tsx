"use client";

import { useEffect, useRef } from "react";
import type { ReportedIssue, IssueBadgeType } from "./issuesData";

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5L5 15M5 5L15 15" />
    </svg>
  );
}

const TYPE_DOT: Record<IssueBadgeType, string> = {
  "Power Issue":   "#f59e0b",
  "Bill Issue":    "#ef4444",
  "Payment Issue": "#3b82f6",
};

function TypeBadge({ type }: { type: IssueBadgeType }) {
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

function StatusBadge({ resolved }: { resolved: boolean }) {
  return resolved ? (
    <span className="inline-flex items-center bg-[#f0fdf4] border border-[#bbf7d0] rounded-[6px] px-2 py-1 whitespace-nowrap shrink-0">
      <span className="text-[12px] font-medium text-[#15803d] leading-4">Resolved</span>
    </span>
  ) : (
    <span className="inline-flex items-center bg-[#fefce8] border border-[#fef08a] rounded-[6px] px-2 py-1 whitespace-nowrap shrink-0">
      <span className="text-[12px] font-medium text-[#a16207] leading-4">Open</span>
    </span>
  );
}

type Props = {
  issue: ReportedIssue | null;
  onClose: () => void;
};

export default function IssueDetailDrawer({ issue, onClose }: Props) {
  const open = !!issue;
  const displayRef = useRef<ReportedIssue | null>(null);
  if (issue) displayRef.current = issue;
  const d = displayRef.current;

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
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 w-full max-w-[480px] bg-[#fbfbf9] rounded-tl-[12px] rounded-bl-[12px] flex flex-col overflow-hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div
          className="shrink-0 flex flex-col"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-start gap-4 pt-5 px-6 pb-5">
            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
              <p className="text-sm font-medium text-[#474739] leading-5">
                {d?.building} — {d?.resident}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {d && <TypeBadge type={d.type} />}
                {d && <StatusBadge resolved={d.resolved} />}
                <span className="text-[10px] text-[#9ca3af]">{d?.date}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-6 h-6 flex items-center justify-center text-[#737373] hover:text-[#171717] transition-colors mt-0.5"
            >
              <XIcon />
            </button>
          </div>
          <div className="h-px bg-[#e5e5e5]" />
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 px-6 py-5 flex flex-col gap-3 overflow-hidden">
          <p className="text-sm text-[#525252] shrink-0">Issue description:</p>

          <div className="bg-white border border-[#d8d8d0] rounded-[12px] overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-[14px] py-3">
              <p className="text-xs text-[#474739] leading-[18px]">{d?.message}</p>
            </div>
            <div className="shrink-0 border-t border-[#d8d8d0] flex items-start justify-between px-[14px] pt-3 pb-2 gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-medium text-[#7c7c67]">Reported by</p>
                <p className="text-[13px] font-semibold text-[#474739]">{d?.resident ?? "—"}</p>
              </div>
              <div className="flex flex-col gap-0.5 items-end">
                <p className="text-[13px] font-medium text-[#7c7c67]">Date</p>
                <p className="text-[13px] font-semibold text-[#474739]">{d?.date ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="shrink-0 flex flex-col"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
        >
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center justify-end gap-3 pt-5 px-6 pb-5">
            <button
              onClick={onClose}
              className="bg-white rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739]"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
