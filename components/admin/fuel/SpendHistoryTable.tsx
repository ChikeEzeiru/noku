"use client";

import { useState, useMemo } from "react";
import type { ExpenseEntry } from "./SpendHistoryDrawer";
import FilterPanel, { type FilterField, type AppliedFilter } from "@/components/admin/shared/FilterPanel";

const FILTER_FIELDS: FilterField[] = [
  { key: "supplier", label: "Supplier",       type: "multiselect", operators: ["Is", "Is not"], options: ["ABC Fuel Services", "EcoFuel Solutions"] },
  { key: "method",   label: "Payment Method", type: "multiselect", operators: ["Is", "Is not"], options: ["In app", "Transfer"] },
  { key: "type",     label: "Entry Type",     type: "multiselect", operators: ["Is", "Is not"], options: ["Fuel", "Repair"] },
];

const PAGE_SIZE = 10;

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

function DotsVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="3" r="0.75" fill="currentColor" />
      <circle cx="8" cy="8" r="0.75" fill="currentColor" />
      <circle cx="8" cy="13" r="0.75" fill="currentColor" />
    </svg>
  );
}

type Props = {
  entries: ExpenseEntry[];
  onRowClick: (entry: ExpenseEntry) => void;
};

export default function SpendHistoryTable({ entries, onRowClick }: Props) {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<AppliedFilter[]>([]);

  const filteredEntries = useMemo(() => {
    let rows = entries;
    for (const f of activeFilters) {
      const v = f.value;
      if (!Array.isArray(v) || v.length === 0) continue;
      rows = rows.filter(r => {
        let itemVal = "";
        if (f.field === "supplier") itemVal = r.type === "fuel" ? r.supplier : r.type === "repair" ? r.vendor : "";
        else if (f.field === "method") itemVal = r.method;
        else if (f.field === "type") itemVal = r.type === "fuel" ? "Fuel" : "Repair";
        const match = v.some(opt => opt.toLowerCase() === itemVal.toLowerCase());
        return f.operator === "Is not" ? !match : match;
      });
    }
    return rows;
  }, [entries, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageEntries = filteredEntries.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
        <p className="text-base font-semibold text-noku-heading">Fund Expenditure (Spend) History</p>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#fafafa] text-[#737373] transition-colors">
          <DotsVerticalIcon />
        </button>
      </div>

      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-[#e5e5e5] flex items-center gap-3">
        <FilterPanel
          fields={FILTER_FIELDS}
          onApply={(fs) => { setActiveFilters(fs); setPage(1); }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5]">
              {["Date", "Qty (Litres)", "Unit Price (₦/Litre)", "Total Cost", "Supplier", "Payment Method", "Logged By", "Receipt"].map((col) => (
                <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            {pageEntries.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick(row)}
                className="hover:bg-[#fafafa] transition-colors cursor-pointer"
              >
                {row.type === "fuel" && (
                  <>
                    <td className="px-5 py-3.5 text-sm text-[#171717] whitespace-nowrap">{row.date}</td>
                    <td className="px-5 py-3.5 text-sm text-[#404040]">{row.qty}</td>
                    <td className="px-5 py-3.5 text-sm text-[#404040]">{row.unitPrice}</td>
                    <td className="px-5 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.total}</td>
                    <td className="px-5 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.supplier}</td>
                    <td className="px-5 py-3.5 text-sm text-[#525252]">{row.method}</td>
                    <td className="px-5 py-3.5 text-sm text-[#525252] whitespace-nowrap">{row.loggedBy}</td>
                  </>
                )}
                {row.type === "repair" && (
                  <>
                    <td className="px-5 py-3.5 text-sm text-[#171717] whitespace-nowrap">{row.date}</td>
                    <td className="px-5 py-3.5 text-sm text-[#737373]" colSpan={2}>—</td>
                    <td className="px-5 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.total}</td>
                    <td className="px-5 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.vendor}</td>
                    <td className="px-5 py-3.5 text-sm text-[#525252]">{row.method}</td>
                    <td className="px-5 py-3.5 text-sm text-[#525252] whitespace-nowrap">{row.loggedBy}</td>
                  </>
                )}
                <td className="px-5 py-3.5">
                  <img src="/icons/Expense_receipt-icon.svg" width={20} height={20} alt="Receipt" className="mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
