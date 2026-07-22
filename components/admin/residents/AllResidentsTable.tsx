"use client";

import { useState, useMemo } from "react";
import { useEstateStore } from "@/store/estateStore";
import type { ResidentDrawerRow } from "@/components/admin/residents/ResidentDetailDrawer";
import FilterPanel, { type FilterField, type AppliedFilter } from "@/components/admin/shared/FilterPanel";

const FILTER_FIELDS: FilterField[] = [
  { key: "paymentStatus", label: "Payment Status", type: "multiselect", operators: ["Is", "Is not"], options: ["Paid", "Unpaid", "Overdue"] },
  { key: "bedrooms",      label: "Bedrooms",       type: "multiselect", operators: ["Is", "Is not"], options: ["1", "2", "3", "4"] },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#1D1D16" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
      <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M4.5 8h7M7 12h2" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1v8M5 4L8 1l3 3M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.75 3.5L5.25 7L8.75 10.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.25 3.5L8.75 7L5.25 10.5" />
    </svg>
  );
}

const ROWS_PER_PAGE = 10;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function resolveLastUpdated(updatedAt?: string, addedAt?: string, onboardingCompletedAt?: string): string {
  const iso = updatedAt ?? addedAt ?? onboardingCompletedAt;
  return iso ? formatDate(iso) : "—";
}

type PaymentStatus = "Paid" | "Unpaid" | "Overdue";

function simulateStatus(slotIndex: number, totalUnits: number): PaymentStatus {
  if (slotIndex >= totalUnits - 2) return "Overdue";
  if (slotIndex >= totalUnits - 4) return "Unpaid";
  return "Paid";
}

type TableRow = {
  buildingUnit: string;
  occupants: string;
  resident: string;
  phone: string;
  bedrooms: string;
  acUnits: string;
  sharePct: string;
  lastUpdated: string;
  addedAt?: string;
  status: "Active" | "Vacant" | "View";
  paymentStatus: PaymentStatus;
};

export default function AllResidentsTable({ onRowClick }: { onRowClick?: (row: ResidentDrawerRow) => void }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<AppliedFilter[]>([]);

  const { structure, residents, onboardingCompletedAt, paymentOverrides } = useEstateStore();

  const allRows = useMemo<TableRow[]>(() => {
    if (!structure) return [];

    const totalUnits = structure.aptCounts.reduce((a, b) => a + b, 0);
    const rows: TableRow[] = [];
    structure.buildingNames.forEach((name, bi) => {
      const count = structure.aptCounts[bi] ?? 0;
      for (let u = 1; u <= count; u++) {
        const slotIndex   = rows.length;
        const stored      = residents[slotIndex];
        const hasResident = stored && stored.name.trim() !== "";
        const unitLabel   = `Building ${name}, ${structure.aptNaming} ${u}`;
        const override    = paymentOverrides[unitLabel];
        rows.push({
          buildingUnit:  unitLabel,
          occupants:     hasResident ? (stored.occupants || "—") : "—",
          resident:      hasResident ? stored.name : "",
          phone:         hasResident ? (stored.phone    || "—") : "—",
          bedrooms:      hasResident ? (stored.bedrooms || "—") : "—",
          acUnits:       hasResident ? (stored.acUnits  || "—") : "—",
          sharePct:      hasResident ? "3.2" : "—",
          lastUpdated:   hasResident ? resolveLastUpdated(stored.updatedAt, stored.addedAt, onboardingCompletedAt) : "—",
          addedAt:       hasResident ? stored.addedAt : undefined,
          status:        hasResident ? "Active" : "Vacant",
          paymentStatus: override ? override.status : simulateStatus(slotIndex, totalUnits),
        });
      }
    });
    return rows;
  }, [structure, residents, onboardingCompletedAt, paymentOverrides]);

  const filtered = useMemo(() => {
    let rows = allRows;
    const q = search.toLowerCase();
    if (q) rows = rows.filter(r => r.buildingUnit.toLowerCase().includes(q) || r.resident.toLowerCase().includes(q));
    for (const f of activeFilters) {
      const v = f.value;
      const hasValue = Array.isArray(v) ? v.length > 0 : (v as string).trim() !== "";
      if (!hasValue) continue;
      rows = rows.filter(r => {
        const itemVal = f.field === "paymentStatus" ? r.paymentStatus : f.field === "bedrooms" ? r.bedrooms : "";
        if (Array.isArray(v)) {
          const match = v.some(opt => opt.toLowerCase() === itemVal.toLowerCase());
          return f.operator === "Is not" ? !match : match;
        }
        return true;
      });
    }
    return rows;
  }, [allRows, search, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  const isEmpty = allRows.length === 0;

  const COLS = ["BUILDING, UNIT", "OCCUPANTS", "RESIDENT", "BEDROOMS", "AC UNITS", "SHARE %", "LAST UPDATED", "STATUS"];

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Header + toolbar */}
      <div className="px-6 py-5 border-b border-[#e5e5e5] flex items-center justify-between gap-4 flex-wrap">
        <p className="text-base font-semibold text-noku-heading">All Residents</p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search building, unit, resident..."
              className="pl-9 pr-3 py-2 text-sm border border-[#e5e5e5] rounded-lg bg-white text-noku-heading placeholder:text-[#9ca3af] outline-none focus:border-[#ABAB9C] transition-colors w-64"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            />
          </div>
          <FilterPanel
            fields={FILTER_FIELDS}
            onApply={(fs) => { setActiveFilters(fs); setPage(1); }}
          />
          <button
            className="flex items-center gap-2 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739]"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            Export
            <ExportIcon />
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        {isEmpty ? (
          <div className="py-16 flex items-center justify-center text-sm text-[#9ca3af]">
            No residents yet — complete onboarding to populate this list.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                {COLS.map((col) => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {pageRows.map((row, i) => (
                <tr key={i} onClick={() => onRowClick?.({ buildingUnit: row.buildingUnit, resident: row.resident, amount: "₦95,000", paymentStatus: row.paymentStatus, phone: row.phone, occupants: row.occupants, bedrooms: row.bedrooms, acUnits: row.acUnits, addedAt: row.addedAt })} className="hover:bg-[#fafafa] transition-colors cursor-pointer">
                  <td className="px-6 py-3.5 text-sm text-[#171717] whitespace-nowrap">{row.buildingUnit}</td>
                  <td className="px-6 py-3.5 text-sm text-[#404040] text-center">{row.occupants}</td>
                  <td className="px-6 py-3.5 text-sm text-[#404040] whitespace-nowrap">
                    {row.resident || <span className="text-[#9ca3af] italic">Vacant</span>}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#404040] text-center">{row.bedrooms}</td>
                  <td className="px-6 py-3.5 text-sm text-[#404040] text-center">{row.acUnits}</td>
                  <td className="px-6 py-3.5 text-sm text-[#404040] text-center">{row.sharePct}</td>
                  <td className="px-6 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.lastUpdated}</td>
                  <td className="px-6 py-3.5">
                    {row.status === "Active" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-noku-green text-noku-green">
                        Active
                      </span>
                    )}
                    {row.status === "View" && (
                      <button className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#d1d5db] text-[#404040] hover:bg-[#f5f5f5] transition-colors">
                        View
                      </button>
                    )}
                    {row.status === "Vacant" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#d1d5db] text-[#9ca3af]">
                        Vacant
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden flex flex-col divide-y divide-[#e5e5e5]">
        {isEmpty ? (
          <div className="py-16 flex items-center justify-center text-sm text-[#9ca3af]">
            No residents yet.
          </div>
        ) : pageRows.map((row, i) => (
          <div key={i} onClick={() => onRowClick?.({ buildingUnit: row.buildingUnit, resident: row.resident, amount: "₦95,000", paymentStatus: row.paymentStatus, phone: row.phone, occupants: row.occupants, bedrooms: row.bedrooms, acUnits: row.acUnits, addedAt: row.addedAt })} className="px-4 py-4 flex flex-col gap-2 cursor-pointer hover:bg-[#fafafa] transition-colors">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-noku-heading">{row.buildingUnit}</p>
              {row.status === "Active" && (
                <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-noku-green text-noku-green">Active</span>
              )}
              {row.status === "Vacant" && (
                <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-[#d1d5db] text-[#9ca3af]">Vacant</span>
              )}
              {row.status === "View" && (
                <button className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-[#d1d5db] text-[#404040]">View</button>
              )}
            </div>
            {row.resident ? (
              <p className="text-sm text-[#404040]">{row.resident}</p>
            ) : (
              <p className="text-sm text-[#9ca3af] italic">Vacant</p>
            )}
            <div className="flex gap-4 text-xs text-[#737373]">
              <span>{row.occupants} occupants</span>
              <span>{row.bedrooms} beds</span>
              <span>{row.acUnits} AC</span>
              <span>{row.sharePct}%</span>
            </div>
            <p className="text-xs text-[#9ca3af]">{row.lastUpdated}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!isEmpty && (
        <div className="px-6 py-4 border-t border-[#e5e5e5] flex items-center justify-between gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            <ArrowLeftIcon />
            Previous
          </button>
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-[8px] flex items-center justify-center text-sm font-medium transition-opacity ${
                  safePage === p ? "bg-[#f4f4f0] text-[#404040]" : "text-[#737373] opacity-40 hover:opacity-70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            Next
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
