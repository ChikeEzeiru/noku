"use client";

import { useState } from "react";
import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { PaymentRecord } from "@/types/payment";

const generatorImgOn      = "https://www.figma.com/api/mcp/asset/d8e6f15d-bda4-40e6-b464-de1731a5f261";
const generatorImgOff     = "https://www.figma.com/api/mcp/asset/816aac98-de0e-4acb-bff1-ff283c0fc454";
const generatorImgRationed = "https://www.figma.com/api/mcp/asset/69865f03-16bc-4349-a7ef-4c807d1cebbc";
const generatorImgRepairs = "https://www.figma.com/api/mcp/asset/bad85627-c267-4bc3-9da4-228418d08c77";

type GeneratorStatus = "on" | "off" | "rationed" | "repairs";

const STATUS_ORDER: GeneratorStatus[] = ["on", "off", "rationed", "repairs"];

const STATUS_CONFIG: Record<GeneratorStatus, {
  cardBg: string;
  cardBorder: string;
  badgeBorder: string;
  badgeTextColor: string;
  badgeLabel: string;
  badgeIcon: "zap" | "zap-off";
  gradientColor: string;
  imgSrc: string;
  imgOpacity: number;
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
}> = {
  on: {
    cardBg: "var(--color-noku-brand-light)",
    cardBorder: "var(--color-noku-brand-mid)",
    badgeBorder: "var(--color-noku-brand-border)",
    badgeTextColor: "var(--color-noku-green)",
    badgeLabel: "Power: Generator",
    badgeIcon: "zap",
    gradientColor: "rgba(23,162,72,0.8)",
    imgSrc: generatorImgOn,
    imgOpacity: 0.8,
    title: "7:00pm – 2:00am",
    titleColor: "var(--color-noku-brand-deep)",
    subtitle: "turns off in 5 hours",
    subtitleColor: "var(--color-noku-brand-mid)",
  },
  off: {
    cardBg: "#f4f4f0",
    cardBorder: "#1d1d16",
    badgeBorder: "#abab9c",
    badgeTextColor: "#474739",
    badgeLabel: "Power: Generator",
    badgeIcon: "zap",
    gradientColor: "rgba(71,71,57,0.7)",
    imgSrc: generatorImgOff,
    imgOpacity: 0.8,
    title: "Generator Off",
    titleColor: "#1d1d16",
    subtitle: "Resumes 7pm",
    subtitleColor: "#5b5b4b",
  },
  rationed: {
    cardBg: "#fefce8",
    cardBorder: "#ca8a04",
    badgeBorder: "#ca8a04",
    badgeTextColor: "#ca8a04",
    badgeLabel: "Power: Generator (rationed)",
    badgeIcon: "zap",
    gradientColor: "rgba(202,138,4,0.8)",
    imgSrc: generatorImgRationed,
    imgOpacity: 0.8,
    title: "7:00pm – 11:00 pm",
    titleColor: "#5b5b4b",
    subtitle: "From: 7:00 PM – 2:00 AM",
    subtitleColor: "#5b5b4b",
  },
  repairs: {
    cardBg: "#fef2f2",
    cardBorder: "#dc2626",
    badgeBorder: "#dc2626",
    badgeTextColor: "#b91c1c",
    badgeLabel: "Generator unavailable",
    badgeIcon: "zap-off",
    gradientColor: "rgba(220,38,38,0.6)",
    imgSrc: generatorImgRepairs,
    imgOpacity: 0.45,
    title: "Repairs ongoing",
    titleColor: "#2b2b22",
    subtitle: "The committee is working on this",
    subtitleColor: "#5b5b4b",
  },
};

function ZapIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.167 1.167 2.333 7.583h4.084L5.833 12.833l5.834-6.416H7.583l.584-5.25Z" fill={color} stroke="none"/>
    </svg>
  );
}

function ZapOffIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1l12 12" stroke={color}/>
      <path d="M8.167 1.167 6.25 3.5M5.25 6.125 2.333 7.583h4.084L5.833 12.833l3.334-3.666M6.417 4.083l1.166-2.916" stroke={color}/>
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6a5 5 0 0 1 8.5-3.5L11 1M11 1v3H8M11 6a5 5 0 0 1-8.5 3.5L1 11M1 11V8h3"/>
    </svg>
  );
}

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
  const [generatorStatus, setGeneratorStatus] = useState<GeneratorStatus>("on");

  function cycleStatus() {
    setGeneratorStatus((prev) => {
      const idx = STATUS_ORDER.indexOf(prev);
      return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
    });
  }

  const cfg = STATUS_CONFIG[generatorStatus];

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
          className="rounded-2xl p-3 min-h-[120px] flex items-start relative overflow-hidden"
          style={{ backgroundColor: cfg.cardBg, border: `1px solid ${cfg.cardBorder}` }}
        >
          <div className="flex flex-col justify-between self-stretch z-10">
            {/* Badge */}
            <div
              className="bg-white rounded-md px-1.5 py-0.5 flex items-center gap-1 self-start shadow-sm"
              style={{ border: `1px solid ${cfg.badgeBorder}` }}
            >
              {cfg.badgeIcon === "zap" ? (
                <ZapIcon color={cfg.badgeTextColor} />
              ) : (
                <ZapOffIcon color={cfg.badgeTextColor} />
              )}
              <span className="text-[10px]" style={{ color: cfg.badgeTextColor }}>{cfg.badgeLabel}</span>
            </div>
            {/* Text */}
            <div className="mt-auto">
              <p className="text-sm font-medium" style={{ color: cfg.titleColor }}>{cfg.title}</p>
              <p className="text-[10px] mt-1" style={{ color: cfg.subtitleColor }}>{cfg.subtitle}</p>
            </div>
          </div>

          {/* Generator image + gradient */}
          <div
            className="absolute right-0 top-0 h-full w-[175px] pointer-events-none"
            style={{ opacity: cfg.imgOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${cfg.gradientColor} 0%, transparent 70%)`,
              }}
            />
            <img src={cfg.imgSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Demo cycle button */}
          <button
            onClick={cycleStatus}
            title="Cycle generator state (demo)"
            className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-white/70 backdrop-blur-sm border border-black/10 rounded-md px-1.5 py-1 text-[10px] text-noku-text-dim shadow-sm"
          >
            <CycleIcon />
            cycle
          </button>
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
