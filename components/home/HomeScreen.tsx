"use client";

import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { PaymentRecord } from "@/types/payment";

const generatorImg =
  "https://www.figma.com/api/mcp/asset/d8e6f15d-bda4-40e6-b464-de1731a5f261";

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a6 6 0 0 0-6 6v2.5l-1.5 2.5h15l-1.5-2.5V8a6 6 0 0 0-6-6Z"/>
      <path d="M8 15a2 2 0 0 0 4 0"/>
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

type HomeScreenProps = {
  isPaid: boolean;
  onPayNow: () => void;
  onViewReceipt: () => void;
  onViewPaymentReceipt: (payment: PaymentRecord) => void;
  onNavigate: (tab: NavTab) => void;
  onSeeAll: () => void;
  onReportIssue: () => void;
  onNotifications: () => void;
};

export default function HomeScreen({ isPaid, onPayNow, onViewReceipt, onViewPaymentReceipt, onNavigate, onSeeAll, onReportIssue, onNotifications }: HomeScreenProps) {
  const recentPayments: PaymentItem[] = isPaid
    ? [
        { amount: "₦95,000", date: "Paid · Jun 4", period: "June 2026",  datePaid: "Jun 4, 2026",  channel: "In app" },
        { amount: "₦95,000", date: "Paid · May 1", period: "May 2026",   datePaid: "May 1, 2026",  channel: "In app" },
        { amount: "₦70,000", date: "Paid · Apr 3", period: "April 2026", datePaid: "Apr 3, 2026",  channel: "External" },
      ]
    : [
        { amount: "₦95,000", date: "Paid · May 1",      period: "May 2026",   datePaid: "May 1, 2026",  channel: "In app" },
        { amount: "₦70,000", date: "Paid · Apr 3",      period: "April 2026", datePaid: "Apr 3, 2026",  channel: "External" },
        { amount: "₦70,000", date: "Paid · Mar 3 2026", period: "March 2026", datePaid: "Mar 3, 2026",  channel: "In app" },
      ];

  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6">
        <div>
          <p className="text-[10px] font-medium text-noku-text-dim uppercase tracking-[0.08em]">
            Good Evening
          </p>
          <div className="flex items-end gap-2 mt-0.5">
            <p className="text-xl font-medium text-noku-text-mid">Ciroma</p>
            <p className="text-[10px] font-medium text-noku-text-subtle pb-[5px]">
              Building B, Unit 4
            </p>
          </div>
        </div>
        <button onClick={onNotifications} className="p-2 text-noku-text-dim mt-1">
          <BellIcon />
        </button>
      </div>

      {/* Generator status card */}
      <div className="px-6 mt-6">
        <div
          className="bg-noku-brand-light border border-noku-brand-mid rounded-2xl p-3 min-h-[120px] flex items-start relative overflow-hidden"
        >
          <div className="flex flex-col justify-between self-stretch z-10">
            <div className="bg-white border border-noku-brand-border rounded-md px-1.5 py-0.5 flex items-center gap-1 self-start shadow-sm">
              <img src="/icons/ZapIcon.svg" alt="" className="w-3.5 h-3.5" />
              <span className="text-[10px] text-noku-green">Power: Generator</span>
            </div>
            <div className="mt-auto">
              <p className="text-sm font-medium text-noku-brand-deep">7:00pm – 2:00am</p>
              <p className="text-[10px] text-noku-brand-mid mt-1">turns off in 5 hours</p>
            </div>
          </div>
          {/* Generator image */}
          <div className="absolute right-0 top-0 h-full w-[175px] opacity-80 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(23,162,72,0.8) 0%, rgba(23,162,72,0) 70%)",
              }}
            />
            <img
              src={generatorImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="px-6 mt-6 flex gap-2">
        {/* Billing card */}
        <button onClick={() => onNavigate("payments")} className="bg-noku-warm-card border border-noku-border-warm rounded-xl p-3 flex-1 flex flex-col gap-2 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-noku-text-dim">JUN 2026</span>
            <img src="/icons/arrow-up-rightIcon.svg" alt="" className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-noku-text-mid">₦95,000</span>
            {isPaid ? (
              <span className="text-[10px] font-medium text-noku-paid-text bg-noku-paid-bg border border-noku-paid-border rounded-md px-1.5 py-0.5">
                Paid
              </span>
            ) : (
              <span className="text-[10px] font-medium text-noku-overdue-text bg-noku-overdue-bg border border-noku-overdue-border rounded-md px-1.5 py-0.5">
                Overdue
              </span>
            )}
          </div>
          <p className="text-[10px] text-noku-text-dim">5 occupants · 3 bed · 4 AC</p>
        </button>

        {/* Fund health card */}
        <button onClick={() => onNavigate("fund")} className="bg-noku-warm-card border border-noku-border-warm rounded-xl p-3 flex-1 flex flex-col gap-2 overflow-hidden text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-noku-text-dim">FUND HEALTH</span>
            <img src="/icons/arrow-up-rightIcon.svg" alt="" className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-[90%] bg-noku-brand-mid rounded-full" />
            </div>
            <span className="text-sm font-medium text-noku-text-mid">90%</span>
          </div>
          <p className="text-[10px] text-noku-text-dim">28 of 30 generator days covered</p>
        </button>
      </div>

      {/* Quick actions */}
      <div className="px-6 mt-6">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em] mb-4">
          Quick Actions
        </p>
        <div className="flex gap-2">
          <button onClick={onReportIssue} className="flex-1 h-16 border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid">
            <img src="/icons/ReportIssueIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Report Issue</span>
          </button>
          {isPaid ? (
            <button
              onClick={onViewReceipt}
              className="flex-1 h-16 border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
            >
              <img src="/icons/ReceiptnocheckIcon.svg" alt="" className="w-5 h-5" />
              <span className="text-xs">View receipt</span>
            </button>
          ) : (
            <button
              onClick={onPayNow}
              className="flex-1 h-16 border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
            >
              <img src="/icons/PayNowIcon.svg" alt="" className="w-5 h-5" />
              <span className="text-xs">Pay Now</span>
            </button>
          )}
        </div>
      </div>

      {/* Recent payments */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Recent Payments
          </p>
          <button onClick={onSeeAll} className="flex items-center gap-1 text-noku-green text-sm font-medium">
            See All
            <ArrowNarrowRightIcon />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {recentPayments.map((p, i) => (
            <button
              key={i}
              onClick={() => onViewPaymentReceipt(p)}
              className="bg-noku-payment-item border border-noku-border-light rounded-xl p-2 flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm shrink-0">
                  <img src="/icons/RecentPaymentsIcon.svg" alt="" className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-noku-text-mid">{p.amount}</p>
                  <p className="text-xs text-noku-text-dim">{p.date}</p>
                </div>
              </div>
              <p className="text-xs text-noku-text-dim">{p.channel}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}
