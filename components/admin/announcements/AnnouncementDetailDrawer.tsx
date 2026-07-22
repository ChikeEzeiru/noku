"use client";

import { useEffect, useRef, useState } from "react";
import type { AnnouncementPriority } from "./CreateAnnouncementModal";

// ── Types ─────────────────────────────────────────────────────────────────────

export type DrawerAnnouncement = {
  img?: string;
  title: string;
  message?: string;
  author: string;
  priority: AnnouncementPriority;
  category: string;
  readCount: string;
  index: number;
};

type Props = {
  entry: DrawerAnnouncement | null;
  onClose: () => void;
  onEdit: (entry: DrawerAnnouncement) => void;
  onDelete: (index: number) => void;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, { border: string; text: string; bg: string }> = {
  "General":           { border: "#e5e5e5", text: "#404040", bg: "#fafafa" },
  "Generator & Power": { border: "#fcd34d", text: "#92400e", bg: "#fffbeb" },
  "Payments & Levy":   { border: "#6ee7b7", text: "#065f46", bg: "#ecfdf5" },
  "Maintenance":       { border: "#93c5fd", text: "#1e40af", bg: "#eff6ff" },
  "Security & Safety": { border: "#fca5a5", text: "#991b1b", bg: "#fef2f2" },
};

const PRIORITY_DOT: Record<AnnouncementPriority, string> = {
  High:   "#dc2626",
  Normal: "#737373",
  Low:    "#16a34a",
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5L5 15M5 5L15 15" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.167 2.5a2.357 2.357 0 013.333 3.333L6.25 17.083l-4.583 1.25 1.25-4.583L14.167 2.5z" />
    </svg>
  );
}

// ── Badges ────────────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS["General"];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap shrink-0"
      style={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.bg }}
    >
      {category}
    </span>
  );
}

function PriorityDotBadge({ priority }: { priority: AnnouncementPriority }) {
  return (
    <span
      className="inline-flex items-center gap-1 bg-white border border-[#d4d4d4] rounded-[6px] px-1.5 py-0.5 text-[10px] font-medium text-[#404040] whitespace-nowrap shrink-0"
      style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.05))" }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: PRIORITY_DOT[priority] }} />
      {priority}
    </span>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────

export default function AnnouncementDetailDrawer({ entry, onClose, onEdit, onDelete }: Props) {
  const open = !!entry;
  const displayRef = useRef<DrawerAnnouncement | null>(null);
  if (entry) displayRef.current = entry;
  const d = displayRef.current;

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!open) setConfirmDelete(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const paragraphs = (d?.message ?? "").split("\n").filter(Boolean);
  const readDisplay = (d?.readCount ?? "").replace(" read", "");

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
        {/* ── Header ── */}
        <div
          className="shrink-0 flex flex-col"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-start gap-4 pt-5 px-6 pb-5">
            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
              <p className="text-sm font-medium text-[#474739] leading-5">{d?.title}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {d && <CategoryBadge category={d.category} />}
                {d && <PriorityDotBadge priority={d.priority} />}
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

        {/* ── Body ── */}
        <div className="flex-1 min-h-0 px-6 py-5 flex flex-col gap-3 overflow-hidden">
          {/* Thumbnail */}
          {d?.img && (
            <div className="h-[120px] rounded-[12px] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.img} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          <p className="text-sm text-[#525252] shrink-0">Message:</p>

          {/* Message card — expands to fill remaining space, footer pinned to bottom */}
          <div className="bg-white border border-[#d8d8d0] rounded-[12px] overflow-hidden flex-1 flex flex-col min-h-0">
            {paragraphs.length > 0 ? (
              <div className="flex-1 overflow-y-auto flex flex-col">
                {paragraphs.map((para, i) => (
                  <div key={i} className="px-[14px] py-2">
                    <p className="text-xs text-[#474739] leading-[18px]">{para}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 px-[14px] py-3">
                <p className="text-xs text-[#9ca3af] italic">No message content.</p>
              </div>
            )}

            {/* Written by / Read by */}
            <div className="shrink-0 border-t border-[#d8d8d0] flex items-start justify-between px-[14px] pt-3 pb-2 gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-medium text-[#7c7c67]">Written by</p>
                <p className="text-[13px] font-semibold text-[#474739]">{d?.author ?? ""}</p>
              </div>
              <div className="flex flex-col gap-0.5 items-end">
                <p className="text-[13px] font-medium text-[#7c7c67]">Read by:</p>
                <p className="text-[13px] font-semibold text-[#474739]">{readDisplay}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 flex flex-col"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
        >
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center justify-end gap-3 pt-5 px-6 pb-5">
            {confirmDelete ? (
              <>
                <p className="text-sm text-[#525252] mr-auto">Delete this announcement?</p>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="bg-white rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739]"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => { if (d) { onDelete(d.index); onClose(); } }}
                  className="bg-[#dc2626] rounded-[8px] px-3 py-2 text-sm font-semibold text-white"
                  style={{ boxShadow: "inset 0px 0px 0px 1px rgba(0,0,0,0.12), inset 0px -2px 0px 0px rgba(0,0,0,0.10)" }}
                >
                  Confirm
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="px-3 py-2 text-sm font-semibold text-[#dc2626] rounded-[8px] hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => { if (d) onEdit(d); }}
                  className="flex items-center gap-1.5 bg-white rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739]"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
                >
                  Edit
                  <EditIcon />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
