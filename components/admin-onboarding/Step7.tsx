"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { EstateStructure } from "@/components/admin-onboarding/Step3";

export type Resident = { name: string; phone: string; occupants: string; bedrooms: string; acUnits: string; addedAt?: string; updatedAt?: string };

type Props = {
  estateStructure: EstateStructure;
  onNext: (residents: Resident[]) => void;
  onBack: () => void;
};

/* ── Icons ─────────────────────────────────────────────────── */

function FlipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M3.333 7.5H12.5a4.167 4.167 0 010 8.333H7.5" />
      <path d="M6.667 4.167L3.333 7.5l3.334 3.333" />
    </svg>
  );
}

function NokuIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C6.8982 9.14741 6.48284 9.28911 6.05032 9.37451ZM7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C6.45138 10.7003 6.88388 10.8438 7.277 11.086Z" fill="#17A248" />
      <path d="M20 10C20 4.477 15.523 0 10 0C4.645 0 0.273501 4.2095 0.012001 9.5L0 10.5V17C0 17.7956 0.31607 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H9.5V15.613C9.5 14.612 9.439 13.575 8.914 12.723C8.50362 12.057 7.94298 11.4964 7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C5.62275 10.5227 5.22453 10.465 4.71213 10.4095L3.02063 10.3785C2.94168 10.3515 2.87314 10.3005 2.82462 10.2326C2.77609 10.1648 2.75 10.0834 2.75 10C2.75 9.91657 2.77609 9.83522 2.82462 9.76735C2.87314 9.69948 2.94168 9.64849 3.02063 9.6215L4.71213 9.5905C5.24152 9.53503 5.64888 9.47816 6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C7.8876 8.53816 8.41022 8.03537 8.8094 7.43976C9.20857 6.84414 9.47497 6.16964 9.5905 5.462L9.6215 5.2705C9.64849 5.19155 9.69948 5.12302 9.76735 5.07449C9.83522 5.02596 9.91657 4.99987 10 4.99987C10.0834 4.99987 10.1648 5.02596 10.2326 5.07449C10.3005 5.12302 10.3515 5.19155 10.3785 5.2705L10.4095 5.462C10.5784 6.49591 11.0678 7.45066 11.8086 8.19144C12.5493 8.93222 13.5041 9.4216 14.538 9.5905L14.7295 9.6215C14.8084 9.64849 14.877 9.69948 14.9255 9.76735C14.974 9.83522 15.0001 9.91657 15.0001 10C15.0001 10.0834 14.974 10.1648 14.9255 10.2326C14.877 10.3005 14.8084 10.3515 14.7295 10.3785L14.538 10.4095C13.8304 10.5251 13.1559 10.7915 12.5603 11.1906C11.9647 11.5898 11.4619 12.1124 11.086 12.723C10.561 13.575 10.5 14.612 10.5 15.613V20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V10Z" fill="#17A248" />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.667 13.333S4.167 13.333 4.167 10.833a4.167 4.167 0 014.166-4.166 3.75 3.75 0 017.084 1.666S17.5 8.75 17.5 11.25a2.5 2.5 0 01-2.5 2.5" />
      <path d="M7.5 15l2.5-2.5 2.5 2.5M10 12.5v5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5b5b4b" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.333 9.917v.583a1.167 1.167 0 001.167 1.167h7a1.167 1.167 0 001.167-1.167v-.583M4.667 6.417L7 8.75l2.333-2.333M7 8.75v-7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0l-.667 8a1.333 1.333 0 01-1.333 1.333H5.333A1.333 1.333 0 014 12L3.333 4" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#17a248" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M5.5 8l1.75 1.75 3-3.5" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.833 10H4.167M4.167 10l5 5M4.167 10l5-5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10H15.833M15.833 10l-5-5M15.833 10l-5 5" />
    </svg>
  );
}

function ExcelFileIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4C4 1.79086 5.79086 0 8 0H24L36 12V36C36 38.2091 34.2091 40 32 40H8C5.79086 40 4 38.2091 4 36V4Z" fill="#16A34A"/>
      <path opacity="0.3" d="M24 0L36 12H28C25.7909 12 24 10.2091 24 8V0Z" fill="white"/>
      <path d="M9.93093 25.4545L11.2509 27.6854H11.302L12.6284 25.4545H14.1912L12.1937 28.7273L14.236 32H12.6444L11.302 29.766H11.2509L9.90856 32H8.32333L10.372 28.7273L8.36168 25.4545H9.93093ZM15.0669 32V25.4545H16.4508V30.859H19.2569V32H15.0669ZM23.7242 27.337C23.6986 27.0792 23.5889 26.8789 23.395 26.7362C23.2011 26.5934 22.9379 26.522 22.6056 26.522C22.3797 26.522 22.189 26.554 22.0335 26.6179C21.8779 26.6797 21.7586 26.766 21.6755 26.8768C21.5945 26.9876 21.5541 27.1133 21.5541 27.2539C21.5498 27.3711 21.5743 27.4734 21.6276 27.5607C21.683 27.6481 21.7586 27.7237 21.8545 27.7876C21.9504 27.8494 22.0612 27.9038 22.1869 27.9506C22.3126 27.9954 22.4468 28.0337 22.5896 28.0657L23.1776 28.2063C23.4632 28.2702 23.7252 28.3555 23.9639 28.462C24.2025 28.5685 24.4092 28.6996 24.5839 28.8551C24.7586 29.0107 24.8939 29.1939 24.9898 29.4048C25.0878 29.6158 25.1379 29.8576 25.14 30.1303C25.1379 30.5309 25.0356 30.8782 24.8332 31.1722C24.6329 31.4641 24.3431 31.6911 23.9639 31.853C23.5867 32.0128 23.1318 32.0927 22.5992 32.0927C22.0708 32.0927 21.6105 32.0117 21.2185 31.8498C20.8286 31.6879 20.5239 31.4482 20.3044 31.1307C20.0871 30.8111 19.9731 30.4158 19.9624 29.945H21.3016C21.3165 30.1644 21.3794 30.3477 21.4901 30.4947C21.6031 30.6396 21.7533 30.7493 21.9408 30.8239C22.1304 30.8963 22.3445 30.9325 22.5832 30.9325C22.8176 30.9325 23.021 30.8984 23.1936 30.8303C23.3683 30.7621 23.5036 30.6673 23.5995 30.5458C23.6954 30.4244 23.7433 30.2848 23.7433 30.1271C23.7433 29.9801 23.6997 29.8565 23.6123 29.7564C23.5271 29.6562 23.4014 29.571 23.2352 29.5007C23.0711 29.4304 22.8698 29.3665 22.6311 29.3089L21.9184 29.13C21.3666 28.9957 20.9308 28.7859 20.6112 28.5004C20.2916 28.2148 20.1329 27.8303 20.135 27.3466C20.1329 26.9503 20.2384 26.604 20.4514 26.3079C20.6666 26.0117 20.9617 25.7805 21.3367 25.6143C21.7117 25.4482 22.1379 25.3651 22.6151 25.3651C23.1009 25.3651 23.5249 25.4482 23.8872 25.6143C24.2515 25.7805 24.5349 26.0117 24.7373 26.3079C24.9397 26.604 25.0441 26.9471 25.0505 27.337H23.7242ZM27.3684 25.4545L28.6884 27.6854H28.7395L30.0659 25.4545H31.6287L29.6312 28.7273L31.6735 32H30.0819L28.7395 29.766H28.6884L27.3461 32H25.7608L27.8095 28.7273L25.7992 25.4545H27.3684Z" fill="white"/>
    </svg>
  );
}

/* ── CSV parser ─────────────────────────────────────────────── */

type ResidentRow = {
  unit: string;
  resident: string;
  phone: string;
  occupants: string;
  bedrooms: string;
  ac: string;
};

// Proper RFC-4180 CSV parser — handles quoted fields, unquoted numeric fields,
// and "" escaped quotes inside quoted fields. Excel mixes both styles when
// re-saving CSVs (string cells stay quoted, numeric cells become unquoted).
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let i = 0;
  while (i <= line.length) {
    if (line[i] === '"') {
      // Quoted field
      let value = "";
      i++; // skip opening quote
      while (i < line.length) {
        if (line[i] === '"' && line[i + 1] === '"') {
          value += '"';
          i += 2;
        } else if (line[i] === '"') {
          i++; // skip closing quote
          break;
        } else {
          value += line[i++];
        }
      }
      fields.push(value.trim());
      if (line[i] === ",") i++; // skip comma separator
    } else {
      // Unquoted field (Excel emits these for numbers)
      const end = line.indexOf(",", i);
      if (end === -1) {
        fields.push(line.slice(i).trim());
        break;
      }
      fields.push(line.slice(i, end).trim());
      i = end + 1;
    }
  }
  return fields;
}

// Restore the leading 0 Excel strips from Nigerian phone numbers.
// Also unwraps the ="..." formula our template uses to force text formatting.
function normalizePhone(raw: string): string {
  // Strip ="..." wrapper (e.g. ="08123456789" → 08123456789)
  const formulaMatch = raw.match(/^="(.*)"$/);
  const cleaned = (formulaMatch ? formulaMatch[1] : raw).trim();
  const digits = cleaned.replace(/\D/g, "");
  // 9–10 digits with no leading 0 → prepend one (11-digit Nigerian numbers lose their 0)
  if (digits.length >= 9 && digits.length <= 10 && !digits.startsWith("0")) {
    return "0" + digits;
  }
  return cleaned || raw.trim();
}

function parseCSV(text: string): ResidentRow[] {
  const lines = text.trim().split(/\r?\n/);
  return lines.slice(1) // skip header
    .filter((l) => l.trim() !== "")
    .map((line) => {
      const [building = "", unit = "", resident = "", phone = "", occupants = "", bedrooms = "", ac = ""] = parseCSVLine(line);
      return { unit: `${building}, ${unit}`, resident, phone: normalizePhone(phone), occupants, bedrooms, ac };
    });
}

/* ── Drop Zone ──────────────────────────────────────────────── */

function DropZone({ onUpload }: { onUpload: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => { if (file) onUpload(file); };

  return (
    <div
      className="w-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full flex flex-col items-center gap-3 bg-white border border-[#e5e5e5] rounded-[12px] px-6 py-4 hover:bg-[#fafafa] transition-colors"
      >
        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-noku-border-primary"
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
        >
          <UploadCloudIcon />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1 items-center justify-center">
            <span className="text-sm font-semibold text-[#1d1d16]">Click to upload</span>
            <span className="text-sm text-[#525252]">or drag and drop</span>
          </div>
          <p className="text-xs text-[#525252]">CSV (max. 750KB)</p>
        </div>
      </button>
    </div>
  );
}

/* ── File Queue Item ────────────────────────────────────────── */

function FileQueueItem({ name, size, onRemove }: { name: string; size: string; onRemove: () => void }) {
  return (
    <div className="relative flex items-start gap-3 bg-[#fbfbf9] border border-[#e5e5e5] rounded-[12px] p-4">
      <ExcelFileIcon />
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#404040] truncate">{name}</p>
        <div className="flex items-center gap-2 text-sm text-[#525252]">
          <span>{size}</span>
          <span className="w-px h-3 bg-[#d4d4d4]" />
          <span className="flex items-center gap-1">
            <CheckCircleIcon />
            Processed
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-[7px] right-[7px] p-1.5 rounded-[6px] hover:bg-[#f5f5f5] transition-colors"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

/* ── Right Panel — Residents Table ──────────────────────────── */

const PAGE_SIZE = 10;

function ResidentsTable({ rows }: { rows: ResidentRow[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const pageRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const filled = rows.filter((r) => r.resident.trim() !== "").length;

  return (
    <div className="flex flex-col gap-5 w-full max-w-[640px]">
      {/* Count */}
      <p className="text-sm font-medium text-[#404040]">
        <span className="font-bold">{filled}</span>{" "}
        <span className="text-[#7c7c67]">of {rows.length} units added</span>
      </p>

      {/* Table */}
      <div className="border border-[#d8d8d0] rounded-[12px] overflow-hidden w-full">
        {/* Header */}
        <div className="flex bg-[#f4f4f0] h-10 rounded-tl-[12px] rounded-tr-[12px]">
          <div className="flex flex-1 items-center px-3 min-w-0 overflow-hidden">
            <span className="text-xs font-medium text-[#7c7c67] truncate">BUILDING, UNIT</span>
          </div>
          <div className="flex flex-1 items-center px-3 min-w-0 overflow-hidden">
            <span className="text-xs font-medium text-[#7c7c67] truncate">RESIDENT</span>
          </div>
          <div className="flex w-[108px] shrink-0 items-center px-3">
            <span className="text-xs font-medium text-[#7c7c67]">PHONE</span>
          </div>
          <div className="flex w-[48px] shrink-0 items-center justify-center px-1">
            <span className="text-xs font-medium text-[#7c7c67]">OCC.</span>
          </div>
          <div className="flex w-[48px] shrink-0 items-center justify-center px-1">
            <span className="text-xs font-medium text-[#7c7c67]">BEDS</span>
          </div>
          <div className="flex w-[40px] shrink-0 items-center justify-center px-1">
            <span className="text-xs font-medium text-[#7c7c67]">AC</span>
          </div>
        </div>

        {/* Rows */}
        {pageRows.map((row, i) => (
          <div key={i} className="flex border-t border-[#e5e5e0]">
            <div className="flex flex-1 items-start px-3 py-[14px] min-w-0 overflow-hidden">
              <span className="text-sm font-medium text-[#474739] truncate">{row.unit}</span>
            </div>
            <div className="flex flex-1 items-start px-3 py-[14px] min-w-0 overflow-hidden">
              <span className={`text-sm font-medium truncate ${row.resident ? "text-[#474739]" : "text-[#d4d4d4]"}`}>
                {row.resident || "—"}
              </span>
            </div>
            <div className="flex w-[108px] shrink-0 items-start px-3 py-[14px]">
              <span className={`text-sm font-medium whitespace-nowrap ${row.phone ? "text-[#474739]" : "text-[#d4d4d4]"}`}>
                {row.phone || "—"}
              </span>
            </div>
            <div className="flex w-[48px] shrink-0 items-center justify-center px-1 py-[14px]">
              <span className={`text-sm font-medium ${row.occupants ? "text-[#474739]" : "text-[#d4d4d4]"}`}>
                {row.occupants || "—"}
              </span>
            </div>
            <div className="flex w-[48px] shrink-0 items-center justify-center px-1 py-[14px]">
              <span className={`text-sm font-medium ${row.bedrooms ? "text-[#474739]" : "text-[#d4d4d4]"}`}>
                {row.bedrooms || "—"}
              </span>
            </div>
            <div className="flex w-[40px] shrink-0 items-center justify-center px-1 py-[14px]">
              <span className={`text-sm font-medium ${row.ac ? "text-[#474739]" : "text-[#d4d4d4]"}`}>
                {row.ac || "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[#7c7c67] flex-1">Page {page + 1} of {totalPages}</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#d8d8d0] rounded-[8px] transition-opacity"
            style={{ opacity: page === 0 ? 0.4 : 1, cursor: page === 0 ? "not-allowed" : "pointer", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
          >
            <ArrowLeftIcon />
            <span className="text-sm font-semibold text-[#474739]">Previous</span>
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#d8d8d0] rounded-[8px] transition-opacity"
            style={{ opacity: page >= totalPages - 1 ? 0.4 : 1, cursor: page >= totalPages - 1 ? "not-allowed" : "pointer", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
          >
            <span className="text-sm font-semibold text-[#474739]">Next</span>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Template download ──────────────────────────────────────── */

const TEMPLATE_HEADERS = ["Building", "Unit", "Resident Name", "Phone Number", "Occupants", "Bedrooms", "AC Units"];

// Phone column index in TEMPLATE_HEADERS (0-based)
const PHONE_COL = 3;

function downloadTemplate(structure: EstateStructure) {
  const { buildingNames, aptNaming, aptCounts } = structure;
  const dataRows: string[][] = [];

  buildingNames.forEach((building, i) => {
    const count = aptCounts[i] ?? 0;
    for (let j = 1; j <= count; j++) {
      dataRows.push([building, `${aptNaming} ${j}`, "", "", "", "", ""]);
    }
  });

  const rows = [TEMPLATE_HEADERS, ...dataRows];
  // The phone column is serialised as ="value" so Excel/Sheets preserves it as
  // text and never strips the leading zero from Nigerian numbers.
  const csv = rows
    .map((r) =>
      r
        .map((c, ci) =>
          ci === PHONE_COL ? `"=""${c}"""` : `"${c}"`
        )
        .join(",")
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "noku-residents-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Component ──────────────────────────────────────────────── */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminOnboardingStep7({ estateStructure, onNext, onBack }: Props) {
  const [fileName, setFileName]   = useState("");
  const [fileSize, setFileSize]   = useState("");
  const [rows, setRows]           = useState<ResidentRow[]>([]);
  const uploaded = rows.length > 0;

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setRows(parsed);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
    };
    reader.readAsText(file);
  };

  const handleRemove = () => {
    setRows([]);
    setFileName("");
    setFileSize("");
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">

      {/* ── Left — form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[440px]">

          {/* Step header */}
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={onBack} className="flex items-center gap-2 bg-white border border-[#e8e8e3] rounded-[8px] p-[6px]">
              <FlipBackIcon />
              <span className="text-xs text-[#474739]">Back</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-[#525252]">
              <span>Step</span>
              <span className="text-[20px] font-bold leading-[20px] tracking-[-0.4px]">7</span>
              <span>of 8</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <NokuIcon />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              Add Residents
            </p>
            <p className="text-base text-[#525252] leading-6">
              You can use the Excel worksheet template below to fill in your residents&apos; data and reupload.
            </p>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">

              {/* How-to steps */}
              <div className="flex flex-col gap-3">
                {[
                  { n: 1, text: "Download the worksheet template" },
                  { n: 2, text: "Fill in each resident's building, unit, name, phone number, occupants, bedrooms, and AC units" },
                  { n: 3, text: "Upload the completed file below — Noku will process and import all rows" },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#f0faf4] text-[#17a248] text-xs font-semibold flex items-center justify-center mt-[1px]">
                      {n}
                    </span>
                    <p className="text-sm text-[#525252] leading-5">{text}</p>
                  </div>
                ))}
              </div>

              {/* Upload File section */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-sm font-medium text-[#474739]">Upload File</label>
                <div className="flex flex-col gap-5">
                  {!uploaded && <DropZone onUpload={handleUpload} />}
                  {uploaded && (
                    <FileQueueItem name={fileName} size={fileSize} onRemove={handleRemove} />
                  )}
                </div>
              </div>

              {/* Download template link */}
              <div className="flex justify-end">
                <button type="button" onClick={() => downloadTemplate(estateStructure)} className="flex items-center gap-1 text-sm font-semibold text-[#5b5b4b] hover:text-[#474739] transition-colors">
                  Download template
                  <DownloadIcon />
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={uploaded ? () => onNext(rows.filter((r) => r.resident.trim() !== "").map((r) => ({ name: r.resident, phone: r.phone, occupants: r.occupants, bedrooms: r.bedrooms, acUnits: r.ac }))) : undefined}
              disabled={!uploaded}
              className="w-full py-[13px] px-4 rounded-[10px] text-base font-semibold text-white transition-opacity"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                opacity: uploaded ? 1 : 0.5,
                cursor: uploaded ? "pointer" : "default",
              }}
            >
              Send invites and Continue
            </button>

            {/* Skip */}
            <button
              type="button"
              onClick={() => onNext([])}
              className="w-full py-[10px] px-4 text-base font-semibold text-[#5b5b4b]"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      {/* ── Right — generator image or table ────────────────── */}
      {uploaded ? (
        <div className="flex-1 p-3">
          <div className="h-full w-full bg-[#fbfbf9] rounded-[16px] flex flex-col items-center justify-center overflow-y-auto p-8 gap-5">
            <ResidentsTable rows={rows} />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-3">
          <div className="relative h-full w-full rounded-[20px] overflow-hidden">
            <Image
              src="/Images/Generator img for admin side.avif"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
