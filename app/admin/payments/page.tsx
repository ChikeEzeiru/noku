"use client";

import CollectionDataCard from "@/components/admin/payments/CollectionDataCard";
import QuickActionsCard from "@/components/admin/payments/QuickActionsCard";
import ReceivedPaymentsTable from "@/components/admin/payments/ReceivedPaymentsTable";

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.25" y="2.5" width="12.5" height="11.25" rx="1.25" />
      <path d="M10 1.25v2.5M5 1.25v2.5M1.25 6.25h12.5" />
    </svg>
  );
}

export default function AdminPayments() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">Payments</h1>
        <button
          className="flex items-center gap-2 text-sm font-medium text-[#404040] border border-[#e5e5e5] rounded-lg px-3 py-2 bg-white"
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
        >
          <CalendarIcon />
          Jun 2026
        </button>
      </div>

      {/* Row 1: Collection Data + Quick Actions */}
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <CollectionDataCard />
        </div>
        <div className="xl:w-[400px] w-full shrink-0">
          <QuickActionsCard />
        </div>
      </div>

      {/* Row 2: Received Payments table */}
      <ReceivedPaymentsTable />
    </div>
  );
}
