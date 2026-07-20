"use client";

import { useState, useEffect } from "react";
import { useEstateStore } from "@/store/estateStore";
import { MonthPicker, formatMonth, type MonthValue } from "@/components/admin/shared/MonthPicker";
import StatCard from "@/components/admin/dashboard/StatCard";
import CollectionDataCard from "@/components/admin/dashboard/CollectionDataCard";
import AlertsCard from "@/components/admin/dashboard/AlertsCard";
import QuickActionsCard from "@/components/admin/dashboard/QuickActionsCard";
import GeneratorCard from "@/components/admin/dashboard/GeneratorCard";
import RecentActivityCard from "@/components/admin/dashboard/RecentActivityCard";

const periods = ["12 months", "30 days", "7 days", "24 hours"] as const;
type Period = (typeof periods)[number];

type Stats = { collected: string; spent: string; balance: string; runway: string };

const statsByMonthAndPeriod: Record<number, Record<Period, Stats>> = {
  6: {
    "12 months": { collected: "₦27.4m", spent: "₦26.8m", balance: "₦40k", runway: "3 days" },
    "30 days":   { collected: "₦2.28m", spent: "₦2.24m", balance: "₦40k", runway: "3 days" },
    "7 days":    { collected: "₦534k",  spent: "₦501k",  balance: "₦40k", runway: "3 days" },
    "24 hours":  { collected: "₦95k",   spent: "₦88k",   balance: "₦40k", runway: "3 days" },
  },
  5: {
    "12 months": { collected: "₦25.2m", spent: "₦24.6m", balance: "₦40k", runway: "3 days" },
    "30 days":   { collected: "₦2.15m", spent: "₦2.31m", balance: "₦40k", runway: "3 days" },
    "7 days":    { collected: "₦501k",  spent: "₦541k",  balance: "₦40k", runway: "3 days" },
    "24 hours":  { collected: "₦78k",   spent: "₦91k",   balance: "₦40k", runway: "3 days" },
  },
};

const CURRENT_MONTH = 6;
const PAST_DISABLED_PERIODS: Period[] = ["24 hours", "7 days"];

function buildTooltips(period: Period, monthLabel: string, isCurrent: boolean): { collected: string; spent: string; balance: string; runway: string } {
  const window = isCurrent
    ? ({ "12 months": "over the past 12 months", "30 days": "this month", "7 days": "this week", "24 hours": "today" } as Record<Period, string>)[period]
    : `in ${monthLabel}`;
  return {
    collected: `Total levy payments received from all residents ${window}`,
    spent:     `Total fund expenditure on fuel and operations ${window}`,
    balance:   "Current available fund balance after all expenditures",
    runway:    "Estimated days of generator power remaining at the current spend rate",
  };
}

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1.25" y="2.5" width="12.5" height="11.25" rx="1.25" />
      <path d="M10 1.25v2.5M5 1.25v2.5M1.25 6.25h12.5" />
    </svg>
  );
}

function buildSubtitles(selectedMonth: MonthValue): Record<Period, string> {
  const now = new Date();
  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-GB", opts);

  const isCurrent = selectedMonth.month === CURRENT_MONTH && selectedMonth.year === 2026;
  const monthLabel = formatMonth(selectedMonth);

  if (!isCurrent) {
    return {
      "12 months": `12 months to ${monthLabel}`,
      "30 days":   monthLabel,
      "7 days":    monthLabel,
      "24 hours":  monthLabel,
    };
  }

  const today = fmt(now, { day: "numeric", month: "short" });
  const month = fmt(now, { month: "short", year: "numeric" });
  const year = now.getFullYear();

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const week = `${fmt(weekStart, { day: "numeric", month: "short" })} – ${fmt(weekEnd, { day: "numeric", month: "short" })}`;

  return {
    "12 months": `This year – ${year}`,
    "30 days":   `This mth – ${month}`,
    "7 days":    `This week – ${week}`,
    "24 hours":  `Today, ${today}`,
  };
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("30 days");
  const admin = useEstateStore((s) => s.admin);
  const firstName = admin?.fullName?.split(" ")[0] ?? "Admin";
  const [selectedMonth, setSelectedMonth] = useState<MonthValue>({ year: 2026, month: 6 });
  const [pickerOpen, setPickerOpen] = useState(false);

  const isPastMonth = selectedMonth.month < CURRENT_MONTH || selectedMonth.year < 2026;
  const monthLabel  = formatMonth(selectedMonth);
  const isCurrent   = !isPastMonth;

  // Auto-switch off disabled tabs when user picks a past month
  useEffect(() => {
    if (isPastMonth && PAST_DISABLED_PERIODS.includes(period)) {
      setPeriod("30 days");
    }
  }, [isPastMonth, period]);

  const monthData = statsByMonthAndPeriod[selectedMonth.month] ?? statsByMonthAndPeriod[6];
  const stats    = monthData[period];
  const tooltips = buildTooltips(period, monthLabel, isCurrent);
  const subtitles = buildSubtitles(selectedMonth);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-[#525252]">Welcome back, {firstName}!</p>
      </div>

      {/* Period filters + date */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1 bg-noku-secondary-alt border border-noku-rule rounded-lg">
          {periods.map((p) => {
            const disabled = isPastMonth && PAST_DISABLED_PERIODS.includes(p);
            return (
              <button
                key={p}
                onClick={() => !disabled && setPeriod(p)}
                disabled={disabled}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  disabled
                    ? "border border-transparent text-[#c4c4c4] cursor-not-allowed font-medium"
                    : period === p
                    ? "border border-noku-rule bg-white font-semibold text-noku-heading shadow-sm"
                    : "border border-transparent text-[#525252] font-medium hover:text-noku-heading"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
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

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Funds Collected"
          value={stats.collected}
          subtitle={subtitles[period]}
          tooltip={tooltips.collected}
        />
        <StatCard
          title="Total Spent"
          value={stats.spent}
          subtitle={subtitles[period]}
          tooltip={tooltips.spent}
        />
        <StatCard
          title="Fund Balance"
          value={stats.balance}
          subtitle="Current balance"
          tooltip={tooltips.balance}
        />
        <StatCard
          title="Runway"
          value={stats.runway}
          subtitle="days of power remaining"
          tooltip={tooltips.runway}
        />
      </div>

      {/* Row 1: Collection + Generator (equal height) */}
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1 min-w-0 flex">
          <CollectionDataCard className="flex-1" />
        </div>
        <div className="xl:w-100 w-full shrink-0 flex">
          <GeneratorCard className="flex-1" />
        </div>
      </div>

      {/* Row 2: Alerts + Quick Actions (left) / Recent Activity (right) */}
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <AlertsCard />
          <QuickActionsCard />
        </div>
        <div className="xl:w-100 w-full shrink-0 flex">
          <RecentActivityCard className="flex-1" />
        </div>
      </div>
    </div>
  );
}
