"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FilterPanel, { type FilterField, type AppliedFilter } from "@/components/admin/shared/FilterPanel";
import { issues, type ReportedIssue, type IssueBadgeType } from "@/components/admin/residents/issuesData";
import IssueDetailDrawer from "@/components/admin/residents/IssueDetailDrawer";

// ── Icons ─────────────────────────────────────────────────────────────────────

function ResidentsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.3333 2.8898C14.5681 3.50343 15.4167 4.77762 15.4167 6.25C15.4167 7.72238 14.5681 8.99657 13.3333 9.6102M15 13.972C16.2596 14.5419 17.3938 15.4708 18.3333 16.6667M1.66667 16.6667C3.28875 14.6021 5.49099 13.3333 7.91667 13.3333C10.3424 13.3333 12.5446 14.6021 14.1667 16.6667M11.6667 6.25C11.6667 8.32107 9.98774 10 7.91667 10C5.8456 10 4.16667 8.32107 4.16667 6.25C4.16667 4.17893 5.8456 2.5 7.91667 2.5C9.98774 2.5 11.6667 4.17893 11.6667 6.25Z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.25 3.5L8.75 7l-3.5 3.5" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      <circle cx="10" cy="10" r="8.333" />
      <path d="M10 6.667v4.166M10 13.333h.008" />
    </svg>
  );
}

// ── Filter config ─────────────────────────────────────────────────────────────

const FILTER_FIELDS: FilterField[] = [
  { key: "type",   label: "Issue Type", type: "multiselect", operators: ["Is", "Is not"], options: ["Power Issue", "Bill Issue", "Payment Issue"] },
  { key: "status", label: "Status",     type: "multiselect", operators: ["Is", "Is not"], options: ["Open", "Resolved"] },
];

// ── Badges ────────────────────────────────────────────────────────────────────

const TYPE_DOT: Record<IssueBadgeType, string> = {
  "Power Issue":   "#f59e0b",
  "Bill Issue":    "#ef4444",
  "Payment Issue": "#3b82f6",
};

function TypeBadge({ type }: { type: IssueBadgeType }) {
  return (
    <span
      className="inline-flex items-center gap-1 bg-white border border-[#d4d4d4] rounded-[6px] px-2 py-1 whitespace-nowrap"
      style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: TYPE_DOT[type] }} />
      <span className="text-[12px] font-medium text-[#404040] leading-4">{type}</span>
    </span>
  );
}

function StatusBadge({ resolved }: { resolved: boolean }) {
  return resolved ? (
    <span className="inline-flex items-center bg-[#f0fdf4] border border-[#bbf7d0] rounded-[6px] px-2 py-1 whitespace-nowrap">
      <span className="text-[12px] font-medium text-[#15803d] leading-4">Resolved</span>
    </span>
  ) : (
    <span className="inline-flex items-center bg-[#fefce8] border border-[#fef08a] rounded-[6px] px-2 py-1 whitespace-nowrap">
      <span className="text-[12px] font-medium text-[#a16207] leading-4">Open</span>
    </span>
  );
}

// ── Rows ──────────────────────────────────────────────────────────────────────

function IssueRow({ issue, onClick }: { issue: ReportedIssue; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center border-b border-[#e5e5e5] py-4 h-[72px] max-h-[72px] gap-6 cursor-pointer hover:bg-[#fafafa] transition-colors">
      {/* Col 1 — icon + apartment + resident */}
      <div className="flex items-center gap-3 shrink-0 w-[240px]">
        <div className="shrink-0 border border-[#e8e8e3] rounded p-1.5 flex items-center justify-center text-[#404040]">
          <AlertCircleIcon />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#171717] leading-5 truncate">{issue.building}</p>
          <p className="text-sm text-[#525252] leading-5 truncate">{issue.resident}</p>
        </div>
      </div>

      {/* Col 2 — issue summary */}
      <div className="flex-1 min-w-0 h-[40px] flex items-center overflow-hidden">
        <p className="text-sm text-[#525252] leading-5 line-clamp-2">{issue.preview}</p>
      </div>

      {/* Col 3 — category */}
      <div className="shrink-0 w-[120px] flex items-center">
        <TypeBadge type={issue.type} />
      </div>

      {/* Col 4 — date reported */}
      <div className="shrink-0 w-[96px] flex items-center">
        <p className="text-sm text-[#7c7c67] whitespace-nowrap">{issue.date}</p>
      </div>

      {/* Col 5 — status */}
      <div className="shrink-0 w-[80px] flex items-center">
        <StatusBadge resolved={issue.resolved} />
      </div>
    </div>
  );
}

function IssueRowMobile({ issue, onClick }: { issue: ReportedIssue; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex gap-3 border-b border-[#e5e5e5] px-4 py-4 cursor-pointer hover:bg-[#fafafa] transition-colors active:bg-[#f4f4f0]">
      <div className="shrink-0 border border-[#e8e8e3] rounded p-1.5 flex items-center justify-center text-[#404040] self-start mt-0.5">
        <AlertCircleIcon />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#171717] leading-5">{issue.building}</p>
            <p className="text-xs text-[#525252]">{issue.resident}</p>
          </div>
          <p className="text-xs text-[#9ca3af] shrink-0 whitespace-nowrap">{issue.date}</p>
        </div>
        <p className="text-xs text-[#525252] leading-[18px] line-clamp-2">{issue.preview}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <TypeBadge type={issue.type} />
          <StatusBadge resolved={issue.resolved} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const MONTH_IDX: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
function parseDateMs(s: string): number {
  const [mon, day] = s.split(" ");
  return new Date(2026, MONTH_IDX[mon] ?? 0, parseInt(day, 10)).getTime();
}

const PER_PAGE = 8;

export default function IssuesPage() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<AppliedFilter[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<ReportedIssue | null>(null);

  const filtered = useMemo(() => {
    let rows = issues;
    for (const f of activeFilters) {
      const v = f.value;
      if (!Array.isArray(v) || v.length === 0) continue;
      rows = rows.filter(issue => {
        const itemVal = f.field === "type"   ? issue.type
                      : f.field === "status" ? (issue.resolved ? "Resolved" : "Open")
                      : "";
        const match = v.some(opt => opt.toLowerCase() === itemVal.toLowerCase());
        return f.operator === "Is not" ? !match : match;
      });
    }
    return [...rows].sort((a, b) => {
      if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
      return parseDateMs(a.date) - parseDateMs(b.date);
    });
  }, [activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const openCount = issues.filter(i => !i.resolved).length;

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header section ── */}
      <div className="flex flex-col gap-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[#737373]">
          <Link href="/admin/residents" className="p-1 rounded-md hover:bg-[#f4f4f0] transition-colors">
            <ResidentsIcon />
          </Link>
          <ChevronRightIcon />
          <span className="px-2 py-1 rounded-md bg-[#fafafa] text-sm font-semibold text-[#474739]">
            Reported Issues
          </span>
        </div>

        {/* Title + count */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-[#171717] leading-[30px]">Reported Issues</h1>
          {openCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#fefce8] border border-[#fef08a] text-[#a16207]">
              {openCount} open
            </span>
          )}
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-3">
          <FilterPanel
            fields={FILTER_FIELDS}
            onApply={(fs) => { setActiveFilters(fs); setPage(1); }}
          />
          <span className="text-sm text-[#737373]">
            {activeFilters.some(f => Array.isArray(f.value) && f.value.length > 0)
              ? `${filtered.length} of ${issues.length} issues`
              : `${issues.length} ${issues.length === 1 ? "issue" : "issues"} total`}
          </span>
        </div>
      </div>

      {/* ── Card ── */}
      <div
        className="bg-white border border-[#e5e5e5] rounded-[12px] overflow-hidden"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
      >
        <div className="p-6 flex flex-col gap-5">
          {/* Desktop table */}
          <div className="hidden lg:block">
            {/* Table header */}
            <div className="flex items-center gap-6 border-b border-[#e5e5e5] py-3">
              <div className="shrink-0 w-[240px] text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">Unit / Resident</div>
              <div className="flex-1 text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">Issue Summary</div>
              <div className="shrink-0 w-[120px] text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">Category</div>
              <div className="shrink-0 w-[96px] text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">Date Reported</div>
              <div className="shrink-0 w-[80px] text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">Status</div>
            </div>
            {pageItems.length > 0 ? (
              pageItems.map((issue, i) => (
                <IssueRow key={i} issue={issue} onClick={() => setSelectedIssue(issue)} />
              ))
            ) : (
              <p className="py-12 text-center text-sm text-[#737373]">No issues match the current filters.</p>
            )}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden border-t border-[#e5e5e5] -mx-6">
            {pageItems.length > 0 ? (
              pageItems.map((issue, i) => (
                <IssueRowMobile key={i} issue={issue} onClick={() => setSelectedIssue(issue)} />
              ))
            ) : (
              <p className="py-12 text-center text-sm text-[#737373]">No issues match the current filters.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1 flex items-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="flex items-center gap-1 bg-white border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739] disabled:opacity-50 disabled:cursor-not-allowed btn-press-nav"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                >
                  <ArrowLeftIcon />
                  Previous
                </button>
              </div>

              <div className="flex items-center gap-0.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-[8px] flex items-center justify-center text-sm font-medium transition-colors ${
                      safePage === p ? "bg-[#f4f4f0] text-[#404040]" : "text-[#7c7c67] hover:text-[#404040]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex-1 flex items-center justify-end">
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="flex items-center gap-1 bg-white border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739] disabled:opacity-50 disabled:cursor-not-allowed btn-press-nav"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                >
                  Next
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <IssueDetailDrawer issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
    </div>
  );
}
