"use client";

import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { PaymentRecord } from "@/types/payment";

const visaImg = "https://www.figma.com/api/mcp/asset/9b442311-c3de-4153-9268-6b1d65ea5df7";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8h9.334M9.333 5.333 12 8l-2.667 2.667" />
    </svg>
  );
}

function ArrowNarrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8h9.334M9.333 5.333 12 8l-2.667 2.667" />
    </svg>
  );
}

type PaymentItem = PaymentRecord & { date: string };

const paymentHistory: PaymentItem[] = [
  { amount: "₦95,000", date: "Paid · May 1 2026",  period: "May 2026",      datePaid: "May 1, 2026", channel: "In app" },
  { amount: "₦70,000", date: "Paid · Apr 3 2026",  period: "April 2026",    datePaid: "Apr 3, 2026", channel: "External" },
  { amount: "₦70,000", date: "Paid · Mar 3 2026",  period: "March 2026",    datePaid: "Mar 3, 2026", channel: "In app" },
  { amount: "₦70,000", date: "Paid · Feb 3 2026",  period: "February 2026", datePaid: "Feb 3, 2026", channel: "External" },
  { amount: "₦70,000", date: "Paid · Jan 4 2026",  period: "January 2026",  datePaid: "Jan 4, 2026", channel: "External" },
];

const paymentHistoryPaid: PaymentItem[] = [
  { amount: "₦95,000", date: "Paid · Jun 4 2026", period: "June 2026", datePaid: "Jun 4, 2026", channel: "In app" },
  ...paymentHistory,
];

function PaymentHistoryList({
  history,
  onViewPaymentReceipt,
}: {
  history: PaymentItem[];
  onViewPaymentReceipt: (payment: PaymentRecord) => void;
}) {
  return (
    <div className="bg-white border border-noku-border-light rounded-[12px] overflow-hidden">
      {history.map((item, i) => (
        <div key={i}>
          {i > 0 && <div className="h-px" style={{ backgroundColor: "#e8e8e3" }} />}
          <button
            onClick={() => onViewPaymentReceipt(item)}
            className="w-full p-3 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="shrink-0 w-8 h-8 rounded-[6px] relative overflow-hidden"
                style={{ border: "1px solid #d4d4d4", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px rgba(0,0,0,0.05)" }}
              >
                <div className="absolute inset-0 bg-noku-bg rounded-[6px]" />
                <img src="/icons/RecentPaymentsIcon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium leading-5" style={{ color: "#474739" }}>{item.amount}</p>
                <p className="text-xs font-normal leading-[18px] text-noku-text-dim">{item.date}</p>
              </div>
            </div>
            <p className="text-xs font-normal leading-[18px] text-noku-text-dim">{item.channel}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

type PaymentsScreenProps = {
  isPaid: boolean;
  historyOnly?: boolean;
  onPayNow: () => void;
  onNavigate: (tab: NavTab) => void;
  onAddPaymentMethod: () => void;
  onViewPaymentReceipt: (payment: PaymentRecord) => void;
  onSeeAll?: () => void;
  onBack?: () => void;
};

export default function PaymentsScreen({
  isPaid,
  historyOnly,
  onPayNow,
  onNavigate,
  onAddPaymentMethod,
  onViewPaymentReceipt,
  onSeeAll,
  onBack,
}: PaymentsScreenProps) {
  const history = isPaid ? paymentHistoryPaid : paymentHistory;

  if (historyOnly) {
    return (
      <div className="bg-noku-bg min-h-screen pb-10">
        <div className="px-5 pt-6">
          <button
            onClick={onBack}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back</span>
          </button>
        </div>
        <div className="px-5 mt-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5" style={{ color: "#474739" }}>Payment history</p>
          <PaymentHistoryList history={history} onViewPaymentReceipt={onViewPaymentReceipt} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">

      {/* Page title */}
      <div className="px-5 pt-6">
        <p className="text-base font-medium leading-6 text-noku-text-dim">Payments</p>
      </div>

      {/* Current payment card */}
      <div className="px-5 mt-6">
        <div className="rounded-[12px]" style={{ backgroundColor: isPaid ? "#f0fdf4" : "#0c0c09" }}>
          <div
            className="rounded-[12px] p-4 flex flex-col gap-1"
            style={{ border: `1px solid ${isPaid ? "#23c45c" : "#2b2b22"}` }}
          >
            <p className="text-[10px] font-normal leading-4" style={{ color: isPaid ? "#5b5b4b" : "#abab9c" }}>
              JUN 2026 · Current mth payment
            </p>
            <div className="flex items-center gap-1">
              <span
                className={`text-[20px] leading-[30px] ${isPaid ? "font-semibold" : "font-medium"}`}
                style={{ color: isPaid ? "#474739" : "#d8d8d0" }}
              >
                ₦95,000
              </span>
              {isPaid ? (
                <span className="text-[10px] font-medium leading-4 px-1.5 py-0.5 rounded-[6px]"
                  style={{ backgroundColor: "#dcfce7", border: "1px solid #4ade80", color: "#15803d" }}>
                  Paid
                </span>
              ) : (
                <span className="text-[10px] font-medium leading-4 px-1.5 py-0.5 rounded-[6px]"
                  style={{ backgroundColor: "#450a0a", border: "1px solid #991b1b", color: "#fca5a5" }}>
                  Overdue
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-normal leading-4" style={{ color: isPaid ? "#7c7c67" : "#abab9c" }}>
                5 occupants · 3 bed · 4 AC
              </p>
              {!isPaid && (
                <button
                  onClick={onPayNow}
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "#87eeab" }}
                >
                  Pay Now
                  <ArrowRightIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="px-5 mt-6 flex flex-col gap-4">
        <p className="text-sm font-normal leading-5" style={{ color: "#474739" }}>Payment method</p>
        <div className="flex gap-2">
          <div
            className="flex-1 h-16 rounded-[8px] p-3 flex flex-col gap-1 bg-white"
            style={{ border: "1px solid #474739" }}
          >
            <div className="flex items-start justify-between h-6">
              <img src={visaImg} alt="Visa" className="h-6 w-[34px] object-contain" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#474739" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="5.5" />
                <path d="M5.5 8l1.75 1.75L10.5 6" />
              </svg>
            </div>
            <p className="text-xs font-normal leading-[18px]" style={{ color: "#474739" }}>**** **** **** 1234</p>
          </div>
          <button
            onClick={onAddPaymentMethod}
            className="flex-1 h-16 border border-noku-border-light rounded-[8px] flex flex-col items-center justify-center gap-1"
          >
            <img src="/icons/AddNewIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs font-normal leading-[18px]" style={{ color: "#474739" }}>Add New</span>
          </button>
        </div>
      </div>

      {/* Payment history */}
      <div className="px-5 mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal leading-5" style={{ color: "#474739" }}>Payment history</p>
          <button onClick={onSeeAll} className="flex items-center gap-1 text-noku-green text-sm font-medium leading-5">
            See All
            <ArrowNarrowRightIcon />
          </button>
        </div>
        <PaymentHistoryList history={history} onViewPaymentReceipt={onViewPaymentReceipt} />
      </div>

      <BottomNav activeTab="payments" onNavigate={onNavigate} />
    </div>
  );
}
