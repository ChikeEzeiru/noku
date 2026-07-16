"use client";

import { useState } from "react";

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

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
      <path d="M11.9924 15.0126C12.3498 16.3462 11.5583 17.7171 10.2247 18.0744C8.891 18.4318 7.52015 17.6403 7.1628 16.3067M9.07621 4.78428C9.32971 4.3282 9.41322 3.77695 9.2675 3.23312C8.96971 2.12173 7.82734 1.46219 6.71595 1.75998C5.60456 2.05778 4.94501 3.20015 5.24281 4.31153C5.38853 4.85536 5.73647 5.29101 6.18406 5.55923M13.5299 7.87132C13.2324 6.76121 12.4383 5.8329 11.3222 5.29063C10.2062 4.74835 8.85958 4.63652 7.57868 4.97973C6.29778 5.32295 5.18751 6.0931 4.49211 7.12075C3.79671 8.14841 3.57315 9.3494 3.8706 10.4595C4.36274 12.2962 4.26718 13.7615 3.95639 14.875C3.60216 16.144 3.42505 16.7786 3.4729 16.906C3.52764 17.0517 3.56724 17.0918 3.71244 17.148C3.83935 17.1972 4.37249 17.0543 5.43877 16.7686L15.3263 14.1192C16.3926 13.8335 16.9258 13.6907 17.0111 13.5846C17.1087 13.4633 17.123 13.4089 17.0975 13.2553C17.0752 13.121 16.6046 12.66 15.6633 11.7381C14.8374 10.9292 14.022 9.70803 13.5299 7.87132Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
      <path d="M1.66667 7.5C1.66667 7.5 2.91667 5.41667 4.69667 3.63583C6.47667 1.855 8.905 0.833334 11.6667 0.833334C16.2692 0.833334 19.1667 4.53083 19.1667 9.16667C19.1667 13.8025 15.805 17.5 11.6667 17.5C8.36667 17.5 5.555 15.4608 4.38417 12.5M1.66667 7.5V2.5M1.66667 7.5H6.66667" />
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

type PaymentStatus = "Paid" | "Unpaid" | "Overdue";

const payments: {
  building: string;
  resident: string;
  amount: string;
  status: PaymentStatus;
  datePaid: string;
  channel: string;
}[] = [
  { building: "Building C, Unit 3", resident: "Obinna Eze",       amount: "₦95,000", status: "Unpaid",  datePaid: "--",           channel: "--"       },
  { building: "Building B, Unit 5", resident: "Amina Bello",      amount: "₦95,000", status: "Unpaid",  datePaid: "--",           channel: "--"       },
  { building: "Building A, Unit 4", resident: "Ngozi Adesanya",   amount: "₦95,000", status: "Paid",    datePaid: "Jun 15, 2026", channel: "External" },
  { building: "Building B, Unit 2", resident: "Tunde Balogun",    amount: "₦95,000", status: "Paid",    datePaid: "Jun 15, 2026", channel: "External" },
  { building: "Building D, Unit 6", resident: "Fatima Musa",      amount: "₦95,000", status: "Paid",    datePaid: "Jun 15, 2026", channel: "In app"   },
  { building: "Building C, Unit 1", resident: "Kemi Adebayo",     amount: "₦95,000", status: "Paid",    datePaid: "Jun 15, 2026", channel: "In app"   },
  { building: "Building A, Unit 5", resident: "Ifeoma Nwosu",     amount: "₦95,000", status: "Paid",    datePaid: "Jun 15, 2026", channel: "External" },
  { building: "Building A, Unit 3", resident: "Chukwudi Obi",     amount: "₦95,000", status: "Paid",    datePaid: "Jun 14, 2026", channel: "In app"   },
  { building: "Building D, Unit 2", resident: "Aisha Mohammed",   amount: "₦95,000", status: "Paid",    datePaid: "Jun 14, 2026", channel: "External" },
  { building: "Building D, Unit 1", resident: "Emeka Okafor",     amount: "₦95,000", status: "Paid",    datePaid: "Jun 13, 2026", channel: "In app"   },
];

const PAGE_SIZE = 10;
const TOTAL_PAGES = 3;

function StatusBadge({ status }: { status: PaymentStatus }) {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-noku-green text-noku-green">
        Paid
      </span>
    );
  }
  if (status === "Unpaid") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-[#EAB308] text-[#EAB308]">
        Unpaid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-[#EF4444] text-[#EF4444]">
      Overdue
    </span>
  );
}

function ActionBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="w-7 h-7 flex items-center justify-center rounded border border-[#e5e5e5] bg-white text-[#404040] hover:bg-[#fafafa] transition-colors shrink-0"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      {children}
    </button>
  );
}

export default function ReceivedPaymentsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Card header */}
      <div className="px-6 py-5 border-b border-[#e5e5e5]">
        <p className="text-base font-semibold text-noku-heading">Received Payments</p>
      </div>

      {/* Toolbar */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e5e5]">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search building, unit, resident..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#e5e5e5] rounded-lg bg-white text-noku-heading placeholder:text-[#9ca3af] outline-none focus:border-[#ABAB9C] transition-colors"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          />
        </div>

        {/* Filters */}
        <button
          className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739]"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
        >
          <FilterIcon />
          Filters
          <ChevronDownIcon />
        </button>

        <div className="flex-1" />

        {/* Export */}
        <button
          className="flex items-center gap-2 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739]"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
        >
          Export
          <ExportIcon />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5]">
              {["Building, Unit", "Resident Name", "Amount Due", "Status", "Date Paid", "Channel", ""].map((col) => (
                <th key={col} className="px-6 py-3 text-left text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            {payments.map((row, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-3.5 text-sm text-[#171717] whitespace-nowrap">{row.building}</td>
                <td className="px-6 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.resident}</td>
                <td className="px-6 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.amount}</td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-3.5 text-sm text-[#525252] whitespace-nowrap">{row.datePaid}</td>
                <td className="px-6 py-3.5 text-sm text-[#525252] whitespace-nowrap">{row.channel}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <ActionBtn><BellIcon /></ActionBtn>
                    <ActionBtn><ClockIcon /></ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-[#e5e5e5] flex items-center justify-between gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
        >
          <ArrowLeftIcon />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                page === p
                  ? "bg-noku-green text-white font-semibold"
                  : "text-[#525252] hover:bg-[#f5f5f5]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={page === TOTAL_PAGES}
          className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
        >
          Next
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
