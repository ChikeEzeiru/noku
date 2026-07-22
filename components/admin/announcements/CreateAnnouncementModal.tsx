"use client";

import React, { useEffect, useState, useRef } from "react";
import { useEstateStore } from "@/store/estateStore";

// ── Types ─────────────────────────────────────────────────────────────────────

export type AnnouncementPriority = "High" | "Normal" | "Low";

export type AnnouncementEntry = {
  title: string;
  message: string;
  category: string;
  priority: AnnouncementPriority;
  author: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (entry: AnnouncementEntry) => void;
  initialEntry?: Partial<AnnouncementEntry>;
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function MegaphoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.3333 6.66635V9.99968M8.54167 4.58302H5.66667C4.26654 4.58302 3.56647 4.58302 3.03169 4.8555C2.56129 5.09518 2.17884 5.47763 1.93915 5.94804C1.66667 6.48282 1.66667 7.18289 1.66667 8.58302L1.66667 9.58302C1.66667 10.3596 1.66667 10.7479 1.79354 11.0542C1.9627 11.4625 2.28715 11.787 2.69553 11.9561C3.00182 12.083 3.3901 12.083 4.16667 12.083V15.6247C4.16667 15.8182 4.16667 15.9149 4.1747 15.9964C4.25264 16.7877 4.87868 17.4137 5.66998 17.4917C5.75146 17.4997 5.8482 17.4997 6.04167 17.4997C6.23515 17.4997 6.33189 17.4997 6.41337 17.4917C7.20466 17.4137 7.83071 16.7877 7.90865 15.9964C7.91667 15.9149 7.91667 15.8182 7.91667 15.6247V12.083H8.54167C10.0137 12.083 11.8144 12.8721 13.2036 13.6294C14.014 14.0712 14.4192 14.2921 14.6846 14.2596C14.9308 14.2294 15.1168 14.1189 15.2611 13.9173C15.4167 13.6998 15.4167 13.2647 15.4167 12.3944V4.27159C15.4167 3.40135 15.4167 2.96622 15.2611 2.74876C15.1168 2.5471 14.9308 2.4366 14.6846 2.40646C14.4192 2.37395 14.014 2.59485 13.2036 3.03664C11.8144 3.79394 10.0137 4.58302 8.54167 4.58302Z" />
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

function UpArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#dc2626" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12V4M4 8l4-4 4 4" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.75" strokeLinecap="round">
      <path d="M4 8h8" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4v8M4 8l4 4 4-4" />
    </svg>
  );
}

// ── Priority config ───────────────────────────────────────────────────────────

type PriorityOption = {
  value: AnnouncementPriority;
  label: string;
  Icon: () => React.ReactElement;
};

const PRIORITIES: PriorityOption[] = [
  { value: "High",   label: "High",   Icon: UpArrowIcon   },
  { value: "Normal", label: "Normal", Icon: DashIcon       },
  { value: "Low",    label: "Low",    Icon: DownArrowIcon  },
];

const CATEGORIES = [
  "General",
  "Generator & Power",
  "Payments & Levy",
  "Maintenance",
  "Security & Safety",
];

// ── Shared styles ─────────────────────────────────────────────────────────────

const LABEL_CLASS = "text-sm font-medium text-[#474739]";
const INPUT_SHADOW = { boxShadow: "0 1px 1px rgba(0,0,0,0.05)" };
const INPUT_BASE   = "w-full border border-[#d8d8d0] rounded-[8px] bg-white text-base text-[#171717] placeholder:text-[#7c7c67] px-3 py-2 outline-none focus:border-[#ABAB9C] transition-colors";

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className={LABEL_CLASS}>
      {children}{required && <> <span className="text-red-500">*</span></>}
    </p>
  );
}

// ── Custom dropdown ───────────────────────────────────────────────────────────

function CategoryDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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
      <FieldLabel>Category</FieldLabel>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 border border-[#d4d4d4] rounded-[8px] bg-white px-3 py-2 text-base text-left outline-none"
        style={INPUT_SHADOW}
      >
        <span className={`flex-1 truncate ${value ? "text-[#171717]" : "text-[#737373]"}`}>
          {value || "Select a category"}
        </span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4d4d4] rounded-[8px] z-20 overflow-hidden"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}
        >
          {CATEGORIES.map((opt) => (
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

function PriorityDropdown({ value, onChange }: { value: AnnouncementPriority; onChange: (v: AnnouncementPriority) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = PRIORITIES.find((p) => p.value === value)!;

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={ref}>
      <FieldLabel>Priority</FieldLabel>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 border border-[#d4d4d4] rounded-[8px] bg-white px-3 py-2 text-base text-left outline-none"
        style={INPUT_SHADOW}
      >
        <selected.Icon />
        <span className="flex-1 text-[#171717] font-medium">{selected.label}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4d4d4] rounded-[8px] z-20 overflow-hidden"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}
        >
          {PRIORITIES.map(({ value: v, label, Icon }) => (
            <button
              key={v}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-[#f4f4f0] ${
                value === v ? "font-semibold text-[#171717]" : "text-[#404040]"
              }`}
              onMouseDown={(e) => { e.preventDefault(); onChange(v); setOpen(false); }}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

export default function CreateAnnouncementModal({ open, onClose, onSubmit, initialEntry }: Props) {
  const adminName = useEstateStore((s) => s.admin?.fullName ?? "Admin");

  const [title,    setTitle]    = useState("");
  const [message,  setMessage]  = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<AnnouncementPriority>("Normal");

  const isEditing = !!initialEntry?.title;

  // populate form when opened (create = blank, edit = prefill)
  useEffect(() => {
    if (open) {
      setTitle(initialEntry?.title ?? "");
      setMessage(initialEntry?.message ?? "");
      setCategory(initialEntry?.category ?? "");
      setPriority(initialEntry?.priority ?? "Normal");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setTitle(""); setMessage(""); setCategory(""); setPriority("Normal");
  }

  function handleClose() { reset(); onClose(); }

  const canSubmit = !!title.trim() && !!message.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({ title: title.trim(), message: message.trim(), category, priority, author: adminName });
    handleClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={handleClose} />

      <div
        className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col screen-enter"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex flex-col shrink-0">
          <div className="flex flex-col gap-4 pt-6 px-6">
            <div
              className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040] shrink-0"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <MegaphoneIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-[#171717] leading-6">{isEditing ? "Edit announcement" : "Create an announcement"}</p>
              <p className="text-sm text-[#525252] leading-5">{isEditing ? "Update the details below and resend to residents" : "Send important info to all residents via a blast"}</p>
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
        <div className="px-6 pt-5 pb-5 flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel required>Title</FieldLabel>
            <input
              type="text"
              className={INPUT_BASE}
              style={INPUT_SHADOW}
              placeholder="i.e. the main topic you want to share with residents"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <FieldLabel required>Message</FieldLabel>
            <textarea
              className={`${INPUT_BASE} min-h-[120px] resize-y leading-6`}
              style={INPUT_SHADOW}
              placeholder="i.e. more details on the above topic"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-xs text-[#737373]">Tip: separate paragraphs with a blank line — each one will be formatted individually in the resident app.</p>
          </div>

          {/* Category + Priority row */}
          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <CategoryDropdown value={category} onChange={setCategory} />
            </div>
            <div className="flex-1 min-w-0">
              <PriorityDropdown value={priority} onChange={setPriority} />
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
              {isEditing ? "Update Announcement" : "Create Announcement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
