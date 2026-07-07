"use client";

import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { PaymentRecord } from "@/types/payment";

const visaLogo = "https://www.figma.com/api/mcp/asset/ef00d06b-9f2e-466a-9516-9ff1861cf0f3";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8h9.334M9.333 5.333 12 8l-2.667 2.667"/>
    </svg>
  );
}

function ArrowNarrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.333 8h9.334M9.333 5.333 12 8l-2.667 2.667"/>
    </svg>
  );
}


type PaymentItem = PaymentRecord & { date: string };

const paymentHistory: PaymentItem[] = [
  { amount: "₦95,000", date: "Paid · May 1 2026", period: "May 2026",  datePaid: "May 1, 2026", channel: "In app" },
  { amount: "₦70,000", date: "Paid · Apr 3 2026", period: "April 2026", datePaid: "Apr 3, 2026", channel: "External" },
  { amount: "₦70,000", date: "Paid · Mar 3 2026", period: "March 2026", datePaid: "Mar 3, 2026", channel: "In app" },
  { amount: "₦70,000", date: "Paid · Feb 3 2026", period: "February 2026", datePaid: "Feb 3, 2026", channel: "External" },
  { amount: "₦70,000", date: "Paid · Jan 4 2026", period: "January 2026", datePaid: "Jan 4, 2026", channel: "External" },
];

const paymentHistoryPaid: PaymentItem[] = [
  { amount: "₦95,000", date: "Paid · Jun 4 2026", period: "June 2026", datePaid: "Jun 4, 2026", channel: "In app" },
  ...paymentHistory,
];


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

export default function PaymentsScreen({ isPaid, historyOnly, onPayNow, onNavigate, onAddPaymentMethod, onViewPaymentReceipt, onSeeAll, onBack }: PaymentsScreenProps) {
  const history = isPaid ? paymentHistoryPaid : paymentHistory;

  if (historyOnly) {
    return (
      <div className="bg-noku-bg min-h-screen pb-10">
        {/* Back button */}
        <div className="px-6 pt-6">
          <button
            onClick={onBack}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back</span>
          </button>
        </div>

        {/* History only */}
        <div className="px-6 mt-6 flex flex-col gap-4">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Payment History
          </p>
          <div className="flex flex-col gap-3">
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => onViewPaymentReceipt(item)}
                className="bg-noku-payment-item border border-noku-border-light rounded-xl p-2 flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm text-noku-text-dim shrink-0">
                    <img src="/icons/RecentPaymentsIcon.svg" alt="" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-noku-text-mid">{item.amount}</p>
                    <p className="text-xs text-noku-text-dim">{item.date}</p>
                  </div>
                </div>
                <p className="text-xs text-noku-text-dim">{item.channel}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">
      {/* Current payment status */}
      <div className="px-6 pt-6 flex flex-col gap-4">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          Current Payment Status
        </p>
        <div className="border border-noku-border-light rounded-lg p-3 flex flex-col gap-1">
          <p className="text-[10px] text-noku-text-dim">JUN 2026</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-noku-text-mid">₦95,000</p>
            {isPaid && (
              <span className="text-[10px] font-medium text-noku-paid-text bg-noku-paid-bg border border-noku-paid-border rounded-md px-1.5 py-0.5">
                Paid
              </span>
            )}
          </div>
          {isPaid ? (
            <p className="text-xs text-noku-text-mid">Paid on Jun 4</p>
          ) : (
            <p className="text-xs text-noku-red">Overdue</p>
          )}
          <div className="flex items-center justify-between mt-1">
            <p className="text-[10px] text-noku-text-dim">5 occupants · 3 bed · 4 AC</p>
            {!isPaid && (
              <button
                onClick={onPayNow}
                className="flex items-center gap-1 text-sm font-semibold text-noku-green"
              >
                Pay Now
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="px-6 mt-6 flex flex-col gap-4">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          Payment Method
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1 rounded-lg p-3 flex flex-col gap-1 h-16 justify-center bg-white" style={{ border: "2px solid #2b2b22" }}>
            <img src={visaLogo} alt="Visa" className="h-6 w-[34px] object-contain" />
            <p className="text-xs text-noku-text-mid">**** **** **** 1234</p>
            <div className="absolute top-2 right-2 w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: "#2b2b22" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.667 5l2.5 2.5 4.166-5"/>
              </svg>
            </div>
          </div>
          <button
            onClick={onAddPaymentMethod}
            className="flex-1 border border-noku-border-light rounded-lg h-16 flex flex-col items-center justify-center gap-1 text-noku-text-mid"
          >
            <img src="/icons/AddNewIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Add New</span>
          </button>
        </div>
      </div>

      {/* Payment history */}
      <div className="px-6 mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Payment History
          </p>
          <button onClick={onSeeAll} className="flex items-center gap-1 text-noku-green text-sm font-medium">
            See All
            <ArrowNarrowRightIcon />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {history.map((item, i) => (
            <button
              key={i}
              onClick={() => onViewPaymentReceipt(item)}
              className="bg-noku-payment-item border border-noku-border-light rounded-xl p-2 flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm text-noku-text-dim shrink-0">
                  <img src="/icons/RecentPaymentsIcon.svg" alt="" className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-noku-text-mid">{item.amount}</p>
                  <p className="text-xs text-noku-text-dim">{item.date}</p>
                </div>
              </div>
              <p className="text-xs text-noku-text-dim">{item.channel}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav activeTab="payments" onNavigate={onNavigate} />
    </div>
  );
}
