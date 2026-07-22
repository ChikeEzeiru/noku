"use client";

import { useEffect, useRef, useState } from "react";
import CollectionDataCard from "@/components/admin/payments/CollectionDataCard";
import QuickActionsCard from "@/components/admin/payments/QuickActionsCard";
import ReceivedPaymentsTable from "@/components/admin/payments/ReceivedPaymentsTable";
import PaymentHistoryDrawer, { type DrawerRow } from "@/components/admin/payments/ResidentDrawer";
import LogExternalCollectionModal from "@/components/admin/payments/LogExternalCollectionModal";
import SendReminderModal, { type PreselectedUnit } from "@/components/admin/payments/SendReminderModal";
import { MonthPicker, formatMonth, type MonthValue } from "@/components/admin/shared/MonthPicker";

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.25" y="2.5" width="12.5" height="11.25" rx="1.25" />
      <path d="M10 1.25v2.5M5 1.25v2.5M1.25 6.25h12.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7.25" />
      <path d="M6 9l2 2 4-4" />
    </svg>
  );
}

export default function AdminPayments() {
  const [selectedMonth, setSelectedMonth] = useState<MonthValue>({ year: 2026, month: 6 });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [drawerRow, setDrawerRow] = useState<DrawerRow | null>(null);
  const [logModalOpen,    setLogModalOpen]    = useState(false);
  const [reminderOpen,    setReminderOpen]    = useState(false);
  const [reminderUnit,    setReminderUnit]    = useState<PreselectedUnit | undefined>(undefined);
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

  function handleSent(count: number, residentName?: string) {
    const firstName = residentName && residentName !== "—" ? residentName.split(" ")[0] : null;
    const msg = count === 1 && firstName
      ? `Reminder sent to ${firstName}`
      : `Reminders sent to ${count} resident${count !== 1 ? "s" : ""}`;
    showToast(msg);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">Payments</h1>
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
      </div>

      {/* Row 1: Collection Data + Quick Actions */}
      <div className="flex flex-col xl:flex-row xl:items-stretch gap-4">
        <div className="flex-1 min-w-0">
          <CollectionDataCard month={selectedMonth.month} />
        </div>
        <div className="xl:w-100 w-full shrink-0">
          <QuickActionsCard
            onLogCollection={() => setLogModalOpen(true)}
            onBulkReminder={() => { setReminderUnit(undefined); setReminderOpen(true); }}
          />
        </div>
      </div>

      {/* Row 2: Received Payments table */}
      <ReceivedPaymentsTable
        onRowClick={setDrawerRow}
        onBellClick={(unit) => { setReminderUnit(unit); setReminderOpen(true); }}
      />

      {/* Payment history drawer */}
      <PaymentHistoryDrawer row={drawerRow} onClose={() => setDrawerRow(null)} />

      {/* Log External Collection modal */}
      <LogExternalCollectionModal
        open={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        onComplete={(unitLabel) => showToast(`Collection logged for ${unitLabel}`)}
      />

      {/* Send Reminder modal */}
      <SendReminderModal
        open={reminderOpen}
        onClose={() => { setReminderOpen(false); setReminderUnit(undefined); }}
        preselectedUnit={reminderUnit}
        onSent={handleSent}
      />

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
    </div>
  );
}
