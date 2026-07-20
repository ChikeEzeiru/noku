"use client";

import { useState } from "react";
import StatCard from "@/components/admin/dashboard/StatCard";
import RunwayChart from "@/components/admin/fuel/RunwayChart";
import ReconciliationCard from "@/components/admin/fuel/ReconciliationCard";
import SpendHistoryTable from "@/components/admin/fuel/SpendHistoryTable";
import { MonthPicker, formatMonth, type MonthValue } from "@/components/admin/shared/MonthPicker";

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.25" y="2.5" width="12.5" height="11.25" rx="1.25" />
      <path d="M10 1.25v2.5M5 1.25v2.5M1.25 6.25h12.5" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.488 2.012l7.5 7.5a1.667 1.667 0 010 2.357l-5 5a1.667 1.667 0 01-2.357 0l-7.5-7.5A1.667 1.667 0 012.5 8.19V3.333A1.333 1.333 0 013.833 2h4.857c.442 0 .866.176 1.178.488v0zM5.833 5.833h.009" />
    </svg>
  );
}

const FUEL_STATS: Record<number, { estimate: string; actual: string; variance: string; varianceSub: string; runway: string }> = {
  6: { estimate: "₦2.47m", actual: "₦2.24m", variance: "₦60k",  varianceSub: "under budget (2.5%)",  runway: "3 days" },
  5: { estimate: "₦2.47m", actual: "₦2.51m", variance: "₦40k",  varianceSub: "over budget (-1.6%)",  runway: "3 days" },
};

export default function AdminFuel() {
  const [selectedMonth, setSelectedMonth] = useState<MonthValue>({ year: 2026, month: 6 });
  const [pickerOpen, setPickerOpen] = useState(false);

  const fuel = FUEL_STATS[selectedMonth.month] ?? FUEL_STATS[6];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">Fuel and Budget</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setPickerOpen((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-[#404040] border border-[#e5e5e5] rounded-lg px-3 py-2 bg-white"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <CalendarIcon />
              {formatMonth(selectedMonth)}
            </button>
            {pickerOpen && (
              <MonthPicker
                selected={selectedMonth}
                onSelect={setSelectedMonth}
                onClose={() => setPickerOpen(false)}
              />
            )}
          </div>
          <button
            className="flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2"
            style={{
              backgroundColor: "#1D1D16",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            <TagIcon />
            Log a purchase
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Estimate"
          value={fuel.estimate}
          subtitle={formatMonth(selectedMonth)}
          tooltip="Estimated monthly fuel spend for all units"
        />
        <StatCard
          title="Actual Spend"
          value={fuel.actual}
          subtitle="vs estimate"
          tooltip="Actual amount spent on fuel this month"
        />
        <StatCard
          title="Variance"
          value={fuel.variance}
          subtitle={fuel.varianceSub}
          tooltip="Difference between estimate and actual spend"
        />
        <StatCard
          title="Fund Runway"
          value={fuel.runway}
          subtitle="days of power remaining"
          tooltip="Estimated days of power at current spend rate"
          valueClassName="text-noku-green"
        />
      </div>

      {/* Runway chart + Reconciliation */}
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <RunwayChart />
        </div>
        <div className="xl:w-[400px] w-full shrink-0">
          <ReconciliationCard />
        </div>
      </div>

      {/* Spend history table */}
      <SpendHistoryTable />
    </div>
  );
}
