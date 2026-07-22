"use client";

import { useState, useRef, useEffect } from "react";
import StatCard from "@/components/admin/dashboard/StatCard";
import RunwayChart from "@/components/admin/fuel/RunwayChart";
import ReconciliationCard from "@/components/admin/fuel/ReconciliationCard";
import SpendHistoryTable from "@/components/admin/fuel/SpendHistoryTable";
import SpendHistoryDrawer, { type ExpenseEntry } from "@/components/admin/fuel/SpendHistoryDrawer";
import LogExpenseModal from "@/components/admin/fuel/LogExpenseModal";
import { useEstateStore } from "@/store/estateStore";
import { MonthPicker, formatMonth, type MonthValue } from "@/components/admin/shared/MonthPicker";

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7.25" />
      <path d="M6 9l2 2 4-4" />
    </svg>
  );
}

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

function runwayColor(runway: string): string {
  const days = parseInt(runway, 10);
  if (isNaN(days)) return "text-noku-heading";
  if (days <= 3) return "text-noku-red";
  if (days <= 7) return "text-noku-amber";
  return "text-noku-green";
}

const FUEL_STATS: Record<number, { estimate: string; actual: string; variance: string; varianceSub: string; runway: string }> = {
  6: { estimate: "₦2.47m", actual: "₦2.24m", variance: "₦60k",  varianceSub: "under budget (2.5%)",  runway: "3 days" },
  5: { estimate: "₦2.47m", actual: "₦2.51m", variance: "₦40k",  varianceSub: "over budget (-1.6%)",  runway: "3 days" },
};

export default function AdminFuel() {
  const adminName = useEstateStore((s) => s.admin?.fullName ?? "Admin");

  const [selectedMonth,   setSelectedMonth]   = useState<MonthValue>({ year: 2026, month: 6 });
  const [pickerOpen,      setPickerOpen]      = useState(false);
  const [drawerEntry,     setDrawerEntry]     = useState<ExpenseEntry | null>(null);
  const [logModalOpen,    setLogModalOpen]    = useState(false);
  const [toastMsg,        setToastMsg]        = useState<string | null>(null);
  const [isToastExiting,  setIsToastExiting]  = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setIsToastExiting(false);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => dismissToast(), 3300);
  }

  function dismissToast() {
    setIsToastExiting(true);
    setTimeout(() => { setToastMsg(null); setIsToastExiting(false); }, 200);
  }

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  const [entries, setEntries] = useState<ExpenseEntry[]>(() => [
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,233", total: "₦616,500", supplier: "ABC Fuel Services", method: "In app",   loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services", method: "In app",   loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services", method: "In app",   loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services", method: "Transfer", loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "EcoFuel Solutions", method: "In app",   loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services", method: "Transfer", loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,290", total: "₦645,000", supplier: "ABC Fuel Services", method: "Transfer", loggedBy: adminName },
    { type: "fuel", date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,290", total: "₦645,000", supplier: "EcoFuel Solutions", method: "Transfer", loggedBy: adminName },
  ]);

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
            onClick={() => setLogModalOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2"
            style={{
              backgroundColor: "#1D1D16",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            <TagIcon />
            Log an Expense
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
          valueClassName={runwayColor(fuel.runway)}
        />
      </div>

      {/* Runway chart + Reconciliation */}
      <div className="flex flex-col xl:flex-row gap-4 xl:h-[384px]">
        <div className="flex-1 min-w-0">
          <RunwayChart />
        </div>
        <div className="xl:w-[400px] w-full shrink-0">
          <ReconciliationCard />
        </div>
      </div>

      {/* Spend history table */}
      <SpendHistoryTable entries={entries} onRowClick={setDrawerEntry} />

      {/* Expense detail drawer */}
      <SpendHistoryDrawer entry={drawerEntry} onClose={() => setDrawerEntry(null)} />

      {/* Success toast */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 text-sm font-medium text-white rounded-[10px] px-4 py-3 toast-enter${isToastExiting ? " animate-[toastOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]" : ""}`}
          style={{ background: "#2b2b22", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
        >
          <CheckCircleIcon />
          {toastMsg}
        </div>
      )}

      {/* Log Expense modal */}
      <LogExpenseModal
        open={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        onSubmit={(entry) => {
          setEntries((prev) => [entry, ...prev]);
          showToast(entry.type === "fuel" ? "Fuel purchase logged" : "Generator expense logged");
        }}
      />
    </div>
  );
}
