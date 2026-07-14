"use client";

import { useState } from "react";
import BottomNav, { NavTab } from "@/components/shared/BottomNav";
import type { PaymentRecord } from "@/types/payment";

// Generator house images — local public assets for instant switching
const generatorImgOn       = "/Images/generator-on.png";
const generatorImgOff      = "/Images/generator-off.png";
const generatorImgRationed = "/Images/generator-rationed.png";
const generatorImgRepairs  = "/Images/generator-repair.png";

// Quick action icons — local public assets
const reportIssueIcon = "/icons/ReportIssueIcon.svg";
const payNowIcon      = "/icons/PayNowIcon.svg";
const myUnitIcon      = "/icons/ResidentDetailsIcon.svg";
const receiptIcon     = "/icons/ReceiptIcon.svg";
const arrowUpRightIcon     = "/icons/arrow-up-rightIcon.svg";
const recentPaymentsIcon   = "/icons/RecentPaymentsIcon.svg";

function ZapBadgeIcon({ color, strokeColor }: { color: string; strokeColor: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M7.10352 0.766113C7.28114 0.55325 7.57768 0.482911 7.83203 0.593262C8.08644 0.703699 8.23738 0.968455 8.20312 1.24365L7.70801 5.2085H11.2539C11.4003 5.2085 11.5534 5.20798 11.6777 5.21924C11.7892 5.22934 12.0104 5.25604 12.2031 5.41162C12.4221 5.58859 12.548 5.85664 12.5439 6.13818C12.5402 6.38616 12.4191 6.57439 12.3555 6.6665C12.2845 6.76915 12.1864 6.88621 12.0928 6.99854L6.89648 13.2329C6.71892 13.446 6.42243 13.5171 6.16797 13.4067C5.91346 13.2963 5.76246 13.0307 5.79688 12.7554L6.29199 8.7915H2.74609C2.59972 8.7915 2.44662 8.79202 2.32227 8.78076C2.21073 8.77066 1.98968 8.74321 1.79688 8.5874C1.57775 8.41032 1.45181 8.14254 1.45605 7.86084L1.46289 7.771C1.48941 7.56771 1.58886 7.4141 1.64453 7.3335C1.71553 7.2307 1.81347 7.113 1.90723 7.00049L7.10352 0.766113Z"
          fill={color} stroke={strokeColor} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

function ArrowNarrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.917 7h8.166M7.583 4.667 9.917 7l-2.334 2.333" />
    </svg>
  );
}

type GeneratorStatus = "on" | "off" | "rationed" | "repairs";

const STATUS_ORDER: GeneratorStatus[] = ["on", "off", "rationed", "repairs"];

const STATUS_CONFIG: Record<GeneratorStatus, {
  badgeBg: string;
  badgeBorder: string;
  badgeTextColor: string;
  badgeLabel: string;
  zapColor: string;
  zapStroke: string;
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
    zapColor: "#17a248",
    zapStroke: "#bbf7cf",
    imgSrc: generatorImgOn,
    title: "7:00pm - 2:00am",
    titleColor: "#15522c",
    subtitle: "turns off in 5 hours",
    subtitleColor: "#17a248",
    hasAlert: false,
  },
  off: {
    badgeBg: "#ffffff",
    badgeBorder: "#abab9c",
    badgeTextColor: "#474739",
    badgeLabel: "Power: Generator",
    zapColor: "#474739",
    zapStroke: "#abab9c",
    imgSrc: generatorImgOff,
    title: "Generator Off",
    titleColor: "#474739",
    subtitle: "Resumes 7pm",
    subtitleColor: "#5b5b4b",
    hasAlert: true,
  },
  rationed: {
    badgeBg: "#ffffff",
    badgeBorder: "#ca8a04",
    badgeTextColor: "#ca8a04",
    badgeLabel: "Power: Generator (rationed)",
    zapColor: "#ca8a04",
    zapStroke: "#fef08a",
    imgSrc: generatorImgRationed,
    title: "7:00pm - 11:00pm",
    titleColor: "#a16207",
    subtitle: "Turns off in 3 hours",
    subtitleColor: "#ca8a04",
    hasAlert: true,
  },
  repairs: {
    badgeBg: "#ffffff",
    badgeBorder: "#dc2626",
    badgeTextColor: "#b91c1c",
    badgeLabel: "Generator unavailable",
    zapColor: "#b91c1c",
    zapStroke: "#fecaca",
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
  onMyUnit: () => void;
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
  onMyUnit,
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
        { amount: "₦95,000", date: "Paid · May 1",  period: "May 2026",   datePaid: "May 1, 2026", channel: "In app" },
        { amount: "₦70,000", date: "Paid · Apr 3",  period: "April 2026", datePaid: "Apr 3, 2026", channel: "External" },
        { amount: "₦70,000", date: "Paid · Mar 3",  period: "March 2026", datePaid: "Mar 3, 2026", channel: "In app" },
      ];

  return (
    <div className="bg-noku-bg min-h-screen pb-32 relative">

      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-medium leading-6">
            <span style={{ color: "#474739" }}>Good Evening, </span>
            <span style={{ color: "#16803c" }}>Ciroma</span>
          </p>
          <p className="text-[10px] leading-4 text-noku-text-dim">Building B, Unit 4</p>
        </div>
        <button
          onClick={onNotifications}
          className="relative flex items-center justify-center p-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: "#ffffff", border: "1px solid #f4f4f0" }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2a6 6 0 0 0-6 6v2.5l-1.5 2.5h15l-1.5-2.5V8a6 6 0 0 0-6-6Z"/>
            <path d="M8 15a2 2 0 0 0 4 0"/>
          </svg>
          {cfg.hasAlert && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white" />
          )}
        </button>
      </div>

      {/* Generator section — no card bg, image flush right */}
      <div className="px-5 relative mt-5">
        <div className="min-h-[120px] py-3 overflow-hidden">
          <div className="flex flex-col gap-2 items-start">
            {/* Badge */}
            <div
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-[6px] drop-shadow-sm"
              style={{ backgroundColor: cfg.badgeBg, border: `1px solid ${cfg.badgeBorder}` }}
            >
              <ZapBadgeIcon color={cfg.zapColor} strokeColor={cfg.zapStroke} />
              <span className="text-[10px] leading-4 font-normal" style={{ color: cfg.badgeTextColor }}>
                {cfg.badgeLabel}
              </span>
            </div>
            <div className="flex flex-col gap-[2px]">
              {/* Title */}
              <p className="text-lg font-semibold leading-7" style={{ color: cfg.titleColor }}>
                {cfg.title}
              </p>
              {/* Subtitle */}
              <p className="text-[10px] leading-4 font-normal" style={{ color: cfg.subtitleColor }}>
                {cfg.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Generator illustration */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ width: 207, height: 134 }}
        >
          <img
            src={cfg.imgSrc}
            alt=""
            className="w-full h-full object-contain object-right"
          />
        </div>

        {/* Demo cycle button */}
        <button
          onClick={cycleStatus}
          title="Cycle generator state (demo)"
          className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-black/10 rounded-md px-1.5 py-1 text-[10px] text-noku-text-dim shadow-sm"
        >
          <CycleIcon />
          cycle
        </button>
      </div>

      {/* Stats cards — period/detail on top, amount/badge on bottom */}
      <div className="px-5 mt-6 flex gap-2 items-start">
        {/* Billing card */}
        <button
          onClick={() => onNavigate("payments")}
          className="bg-white border border-noku-border-light rounded-[12px] p-3 flex-1 flex flex-col gap-4 items-start text-left self-stretch"
        >
          {/* Top: period + detail */}
          <div className="flex flex-col gap-1 w-full flex-1">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium leading-[18px]" style={{ color: "#474739" }}>JUN 2026</span>
              <img src={arrowUpRightIcon} alt="" className="w-4 h-4" />
            </div>
            <p className="text-[10px] leading-4 font-normal text-noku-text-dim">
              5 occupants · 3 bed · 4 AC
            </p>
          </div>
          {/* Bottom: amount + badge */}
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-medium leading-[30px]" style={{ color: "#474739" }}>₦95,000</span>
            {isPaid ? (
              <span className="text-[10px] font-medium leading-4 text-noku-paid-text bg-noku-paid-bg border border-noku-paid-border rounded-[6px] px-1.5 py-0.5">
                Paid
              </span>
            ) : (
              <span className="text-[10px] font-medium leading-4 text-noku-overdue-text bg-noku-overdue-bg border border-noku-overdue-border rounded-[6px] px-1.5 py-0.5">
                Overdue
              </span>
            )}
          </div>
        </button>

        {/* Fund health card */}
        <button
          onClick={() => onNavigate("fund")}
          className="bg-white border border-noku-border-light rounded-[12px] p-3 flex-1 flex flex-col gap-8 items-start text-left overflow-hidden self-stretch"
        >
          {/* Top: label + detail */}
          <div className="flex flex-col gap-1 w-full flex-1">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium leading-[18px]" style={{ color: "#474739" }}>FUND HEALTH</span>
              <img src={arrowUpRightIcon} alt="" className="w-4 h-4" />
            </div>
            <p className="text-[10px] leading-4 font-normal text-noku-text-dim">
              28 of 30 generator days covered
            </p>
          </div>
          {/* Bottom: progress + % — min-h matches the 30px line-height of the billing amount */}
          <div className="flex items-center gap-2 w-full min-h-[30px]">
            <div className="flex-1 h-2 rounded-full relative" style={{ backgroundColor: "#e5e5e5" }}>
              <div className="absolute left-0 top-0 h-full rounded-full bg-noku-brand-mid" style={{ width: "90%" }} />
            </div>
            <span className="text-sm font-medium leading-5" style={{ color: "#474739" }}>90%</span>
          </div>
        </button>
      </div>

      {/* Quick actions */}
      <div className="px-5 mt-6 flex flex-col gap-4">
        <p className="text-sm font-normal leading-5" style={{ color: "#474739" }}>Quick actions</p>
        <div className="flex gap-2">
          <button
            onClick={onReportIssue}
            className="flex-1 h-16 bg-white border border-noku-border-light rounded-[8px] flex flex-col items-center justify-center gap-1 overflow-hidden p-2"
          >
            <img src={reportIssueIcon} alt="" className="w-5 h-5" />
            <span className="text-xs font-normal leading-[18px]" style={{ color: "#474739" }}>Report Issue</span>
          </button>

          {isPaid ? (
            <button
              onClick={onViewReceipt}
              className="flex-1 h-16 bg-white border border-noku-border-light rounded-[8px] flex flex-col items-center justify-center gap-1 overflow-hidden p-2"
            >
              <img src={receiptIcon} alt="" className="w-5 h-5" />
              <span className="text-xs font-normal leading-[18px]" style={{ color: "#474739" }}>View receipt</span>
            </button>
          ) : (
            <>
              <button
                onClick={onPayNow}
                className="flex-1 h-16 bg-white border border-noku-border-light rounded-[8px] flex flex-col items-center justify-center gap-1 overflow-hidden p-2"
              >
                <img src={payNowIcon} alt="" className="w-5 h-5" />
                <span className="text-xs font-normal leading-[18px]" style={{ color: "#474739" }}>Pay Now</span>
              </button>
              <button
                onClick={onMyUnit}
                className="flex-1 h-16 bg-white border border-noku-border-light rounded-[8px] flex flex-col items-center justify-center gap-1 overflow-hidden p-2"
              >
                <img src={myUnitIcon} alt="" className="w-5 h-5" />
                <span className="text-xs font-normal leading-[18px]" style={{ color: "#474739" }}>My Unit</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Recent payments */}
      <div className="px-5 mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal leading-5" style={{ color: "#474739" }}>Recent payments</p>
          <button onClick={onSeeAll} className="flex items-center gap-1 text-noku-green text-sm font-medium leading-5">
            See All
            <ArrowNarrowRightIcon />
          </button>
        </div>

        <div className="bg-white border border-noku-border-light rounded-[8px] overflow-hidden">
          {recentPayments.map((p, i) => (
            <div key={i}>
              {i > 0 && (
                <div className="h-px" style={{ backgroundColor: "#e8e8e3" }} />
              )}
              <button
                onClick={() => onViewPaymentReceipt(p)}
                className="w-full p-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Icon cell — skeuomorphic style from Figma */}
                  <div
                    className="shrink-0 w-8 h-8 rounded-[6px] relative overflow-hidden"
                    style={{
                      border: "1px solid #d4d4d4",
                      boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="absolute inset-0 bg-noku-bg rounded-[6px]" />
                    <img src={recentPaymentsIcon} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium leading-5" style={{ color: "#474739" }}>{p.amount}</p>
                    <p className="text-xs font-normal leading-[18px] text-noku-text-dim">{p.date}</p>
                  </div>
                </div>
                <p className="text-xs font-normal leading-[18px] text-noku-text-dim">{p.channel}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}
