"use client";

import { useState } from "react";
import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { PaymentRecord } from "@/types/payment";

const generatorImgOn       = "https://www.figma.com/api/mcp/asset/4bd1dd8d-543d-48e5-889b-fb433c91f875";
const generatorImgOff      = "https://www.figma.com/api/mcp/asset/f0166a65-d510-4e8a-a2a0-b94469590acd";
const generatorImgRationed = "https://www.figma.com/api/mcp/asset/47e72313-15a8-42e4-8234-146ec39886cc";
const generatorImgRepairs  = "https://www.figma.com/api/mcp/asset/e977aa3a-7266-4070-a842-2e42ecdd93bc";

const zapIconOn       = "https://www.figma.com/api/mcp/asset/099f517e-9df7-47d3-81c4-90f439617a1d";
const zapIconOff      = "https://www.figma.com/api/mcp/asset/f11eb15d-a5dd-4c13-b319-bf0df9c129e8";
const zapIconRationed = "https://www.figma.com/api/mcp/asset/439a6ee2-57a4-4019-aa6c-a1deaaf231d1";
const zapIconRepairs  = "https://www.figma.com/api/mcp/asset/78971a47-b046-42f7-a02c-b899e45dc2af";

const myUnitIcon = "https://www.figma.com/api/mcp/asset/ceac2839-e1e3-41be-9503-cd444645f76b";

type GeneratorStatus = "on" | "off" | "rationed" | "repairs";

const STATUS_ORDER: GeneratorStatus[] = ["on", "off", "rationed", "repairs"];

const STATUS_CONFIG: Record<GeneratorStatus, {
  badgeBg: string;
  badgeBorder: string;
  badgeTextColor: string;
  badgeLabel: string;
  badgeIconSrc: string;
  imgSrc: string;
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
  hasAlert: boolean;
}> = {
  on: {
    badgeBg: "#f0fdf4",
    badgeBorder: "#87eeab",
    badgeTextColor: "#16803c",
    badgeLabel: "Power: Generator",
    badgeIconSrc: zapIconOn,
    imgSrc: generatorImgOn,
    title: "7:00pm – 2:00am",
    titleColor: "#15522c",
    subtitle: "turns off in 5 hours",
    subtitleColor: "#17a248",
    hasAlert: false,
  },
  off: {
    badgeBg: "#f4f4f0",
    badgeBorder: "#abab9c",
    badgeTextColor: "#474739",
    badgeLabel: "Power: Generator",
    badgeIconSrc: zapIconOff,
    imgSrc: generatorImgOff,
    title: "Generator Off",
    titleColor: "#474739",
    subtitle: "Resumes 7pm",
    subtitleColor: "#5b5b4b",
    hasAlert: true,
  },
  rationed: {
    badgeBg: "#fffbeb",
    badgeBorder: "#fde68a",
    badgeTextColor: "#ca8a04",
    badgeLabel: "Power: Generator (rationed)",
    badgeIconSrc: zapIconRationed,
    imgSrc: generatorImgRationed,
    title: "7:00pm – 11:00pm",
    titleColor: "#a16207",
    subtitle: "Turns off in 3 hours",
    subtitleColor: "#ca8a04",
    hasAlert: true,
  },
  repairs: {
    badgeBg: "#fef2f2",
    badgeBorder: "#fecaca",
    badgeTextColor: "#b91c1c",
    badgeLabel: "Generator unavailable",
    badgeIconSrc: zapIconRepairs,
    imgSrc: generatorImgRepairs,
    title: "Repairs ongoing",
    titleColor: "#b91c1c",
    subtitle: "The committee is working on this",
    subtitleColor: "#ef4444",
    hasAlert: true,
  },
};

function CycleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6a5 5 0 0 1 8.5-3.5L11 1M11 1v3H8M11 6a5 5 0 0 1-8.5 3.5L1 11M1 11V8h3"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a6 6 0 0 0-6 6v2.5l-1.5 2.5h15l-1.5-2.5V8a6 6 0 0 0-6-6Z"/>
      <path d="M8 15a2 2 0 0 0 4 0"/>
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M12 4H6M12 4v6"/>
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

export default function HomeScreen({
  isPaid,
  onPayNow,
  onViewReceipt,
  onViewPaymentReceipt,
  onNavigate,
  onSeeAll,
  onReportIssue,
  onNotifications,
}: HomeScreenProps) {
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
    <div className="bg-noku-bg min-h-screen pb-32 relative">

      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6">
        <div>
          <p className="text-base font-medium">
            <span style={{ color: "#474739" }}>Good Evening, </span>
            <span style={{ color: "#16803c" }}>Ciroma</span>
          </p>
          <p className="text-[10px] text-noku-text-dim mt-0.5">Building B, Unit 4</p>
        </div>
        <button
          onClick={onNotifications}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-noku-text-mid flex-shrink-0"
          style={{ backgroundColor: "#ffffff", border: "1px solid #f4f4f0" }}
        >
          <BellIcon />
          {cfg.hasAlert && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
          )}
        </button>
      </div>

      {/* Generator status — transparent, no card */}
      <div className="mt-5 relative min-h-[120px] overflow-hidden">
        <div className="pl-6 pr-4 flex flex-col gap-2 z-10 relative max-w-[55%]">
          {/* Badge */}
          <div
            className="flex items-center gap-1 self-start rounded-md px-1.5 py-0.5"
            style={{ backgroundColor: cfg.badgeBg, border: `1px solid ${cfg.badgeBorder}` }}
          >
            <img src={cfg.badgeIconSrc} alt="" className="w-3.5 h-3.5" />
            <span className="text-[10px]" style={{ color: cfg.badgeTextColor }}>{cfg.badgeLabel}</span>
          </div>
          {/* Title */}
          <p className="text-lg font-semibold leading-snug" style={{ color: cfg.titleColor }}>
            {cfg.title}
          </p>
          {/* Subtitle */}
          <p className="text-[10px]" style={{ color: cfg.subtitleColor }}>{cfg.subtitle}</p>
        </div>

        {/* House + generator image */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 207, height: 134 }}
        >
          <img
            src={cfg.imgSrc}
            alt=""
            className="w-full h-full object-contain"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>

        {/* Demo cycle button */}
        <button
          onClick={cycleStatus}
          title="Cycle generator state (demo)"
          className="absolute bottom-1 right-2 z-10 flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-black/10 rounded-md px-1.5 py-1 text-[10px] text-noku-text-dim shadow-sm"
        >
          <CycleIcon />
          cycle
        </button>
      </div>

      {/* Stats cards */}
      <div className="px-6 mt-5 flex gap-3">
        {/* Billing card */}
        <button
          onClick={() => onNavigate("payments")}
          className="bg-white border border-noku-border-light rounded-xl p-3 flex-1 flex flex-col gap-3 text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-noku-text-dim">JUN 2026</span>
            <span className="text-noku-text-dim"><ArrowUpRightIcon /></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-lg font-semibold text-noku-text-mid">₦95,000</span>
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
          </div>
        </button>

        {/* Fund health card */}
        <button
          onClick={() => onNavigate("fund")}
          className="bg-white border border-noku-border-light rounded-xl p-3 flex-1 flex flex-col gap-3 overflow-hidden text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-noku-text-dim">FUND HEALTH</span>
            <span className="text-noku-text-dim"><ArrowUpRightIcon /></span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "#e8e8e3" }}>
                <div className="h-full w-[90%] bg-noku-brand-mid rounded-full" />
              </div>
              <span className="text-sm font-semibold text-noku-text-mid">90%</span>
            </div>
            <p className="text-[10px] text-noku-text-dim">28 of 30 days covered</p>
          </div>
        </button>
      </div>

      {/* Quick actions */}
      <div className="px-6 mt-6">
        <p className="text-sm text-noku-text-dim mb-3">Quick actions</p>
        <div className="flex gap-2">
          <button
            onClick={onReportIssue}
            className="flex-1 h-16 bg-white border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
          >
            <img src="/icons/ReportIssueIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Report Issue</span>
          </button>

          {isPaid ? (
            <button
              onClick={onViewReceipt}
              className="flex-1 h-16 bg-white border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
            >
              <img src="/icons/ReceiptnocheckIcon.svg" alt="" className="w-5 h-5" />
              <span className="text-xs">View receipt</span>
            </button>
          ) : (
            <>
              <button
                onClick={onPayNow}
                className="flex-1 h-16 bg-white border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
              >
                <img src="/icons/PayNowIcon.svg" alt="" className="w-5 h-5" />
                <span className="text-xs">Pay Now</span>
              </button>
              <button
                onClick={() => onNavigate("profile")}
                className="flex-1 h-16 bg-white border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
              >
                <img src={myUnitIcon} alt="" className="w-5 h-5" />
                <span className="text-xs">My Unit</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Recent payments */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-noku-text-dim">Recent payments</p>
          <button onClick={onSeeAll} className="flex items-center gap-0.5 text-noku-green text-sm font-medium">
            See All
            <ArrowNarrowRightIcon />
          </button>
        </div>

        <div className="bg-white border border-noku-border-light rounded-lg overflow-hidden">
          {recentPayments.map((p, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px mx-4" style={{ backgroundColor: "#e8e8e3" }} />}
              <button
                onClick={() => onViewPaymentReceipt(p)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md border border-noku-border-light bg-noku-bg flex items-center justify-center shadow-sm shrink-0">
                    <img src="/icons/RecentPaymentsIcon.svg" alt="" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-noku-text-mid">{p.amount}</p>
                    <p className="text-xs text-noku-text-dim">{p.date}</p>
                  </div>
                </div>
                <p className="text-xs text-noku-text-dim">{p.channel}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}
