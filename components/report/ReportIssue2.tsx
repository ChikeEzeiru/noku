"use client";

import { useState, useRef } from "react";

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M5.333 4V2.667a.667.667 0 0 1 .667-.667h4a.667.667 0 0 1 .667.667V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 8a1.333 1.333 0 0 0 1.333 1.333h5.334A1.333 1.333 0 0 0 12 12l.667-8"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#17a248" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.667"/>
      <path d="m5.333 8 1.667 1.667 3.333-3.334"/>
    </svg>
  );
}

const FILE_TYPE_ICONS: Record<string, string> = {
  JPG: "/icons/AttachmentIcon - JPG.svg",
  PNG: "/icons/AttachmentIcon - PNG.svg",
  GIF: "/icons/AttachmentIcon - GIF.svg",
  SVG: "/icons/AttachmentIcon - SVG.svg",
};

function FileTypeIcon({ ext }: { ext: string }) {
  const src = FILE_TYPE_ICONS[ext] ?? "/icons/AttachmentIcon.svg";
  return <img src={src} alt={ext} className="w-10 h-10 shrink-0" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExt(file: File) {
  const map: Record<string, string> = {
    "image/jpeg": "JPG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/svg+xml": "SVG",
  };
  return map[file.type] ?? file.name.split(".").pop()?.toUpperCase() ?? "FILE";
}

function RefreshIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6a5 5 0 1 0 1.1-3.1"/>
      <path d="M1 2v2h2"/>
    </svg>
  );
}

type ReportIssue2Props = {
  category: string;
  subject: string;
  description: string;
  attachment: File | null;
  onSubjectChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onAttachmentChange: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
  onChangeCategory: () => void;
};

export default function ReportIssue2({
  category, subject, description, attachment,
  onSubjectChange, onDescriptionChange, onAttachmentChange,
  onNext, onBack, onChangeCategory,
}: ReportIssue2Props) {
  const canProceed = subject.trim().length > 0 && description.trim().length > 0;
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return;
    onAttachmentChange(file);
  }

  function clearAttachment() {
    onAttachmentChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="bg-noku-bg flex flex-col h-[calc(100vh-44px)]">
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pt-6">
        {/* Back */}
        <div className="px-6">
          <button
            onClick={onBack}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="px-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
              Report an Issue:{" "}
              <span className="font-semibold text-noku-text-mid">Issue Details</span>
            </p>
            {/* Step indicator: step 2 of 2 */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-1.5 bg-noku-rule rounded-full" />
              <div className="w-6 h-2 bg-noku-brand-mid rounded-full" />
            </div>
          </div>
          <p className="text-sm text-[#5b5b4b]">Please fill in the details below</p>
        </div>

        {/* Form */}
        <div className="px-6 py-2 flex flex-col gap-3">
          {/* Category (read-only badge + change) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-noku-text-mid">Category</label>
            <button
              onClick={onChangeCategory}
              className="self-start bg-white border border-noku-border-primary rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-sm font-medium text-[#404040]"
              style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
            >
              {category}
              <RefreshIcon />
            </button>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-noku-text-mid">
              Subject <span className="text-noku-brand-mid">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              placeholder="e.g. Wrong AC count"
              className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2.5 text-sm text-noku-text-mid placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid"
              style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#404040]">
              Description <span className="text-noku-brand-mid">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Describe the issue in as much detail as you can."
              rows={5}
              className="w-full bg-white border border-noku-border-primary rounded-lg p-3 text-sm text-noku-text-mid placeholder:text-[#737373] outline-none focus:border-noku-brand-mid resize-none"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            />
          </div>

          {/* Attachment (optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-noku-text-mid">
              Attachment <span className="text-noku-text-dim font-normal">(optional)</span>
            </label>

            {attachment ? (
              /* Uploaded state */
              <div
                className="w-full bg-white border border-[#e5e5e5] rounded-xl p-4 flex items-start gap-3 relative"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <FileTypeIcon ext={getExt(attachment)} />
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <p className="text-sm font-medium text-[#404040] truncate">{attachment.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#525252]">{formatBytes(attachment.size)}</span>
                    <span className="w-px h-3 bg-[#d4d4d4]" />
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon />
                      <span className="text-sm text-[#525252]">100%</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearAttachment}
                  className="absolute top-2 right-2 p-1.5 rounded-md text-noku-text-dim hover:bg-noku-bg"
                >
                  <TrashIcon />
                </button>
              </div>
            ) : (
              /* Dropzone */
              <label
                className="w-full bg-white border border-[#e5e5e5] rounded-xl px-6 py-4 flex flex-col items-center gap-3 cursor-pointer"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/svg+xml,image/png,image/jpeg,image/gif"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <div
                  className="w-10 h-10 bg-noku-bg rounded-[6px] flex items-center justify-center"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px rgba(0,0,0,0.05)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.667 13.333S4.167 13.333 4.167 10.833a4.167 4.167 0 0 1 3.916-4.158 3.333 3.333 0 0 1 6.25 1.492c0 .055-.002.11-.005.166A3.333 3.333 0 0 1 13.333 15"/>
                    <path d="M10 13.333v5M8.333 15l1.667-1.667L11.667 15"/>
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-[#474739]">Click to upload</span>
                    <span className="text-sm text-[#525252]">or drag and drop</span>
                  </div>
                  <p className="text-xs text-[#525252] text-center">SVG, PNG, JPG or GIF (max. 1mb)</p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-6 pb-10 pt-4">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 btn-press-cta"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          Next
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
