"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FilterPanel, { type FilterField, type AppliedFilter } from "@/components/admin/shared/FilterPanel";

// ── Icons ─────────────────────────────────────────────────────────────────────

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.667 14.167h6.666M9.181 2.303L3.53 6.699c-.378.294-.567.44-.703.624a1.667 1.667 0 00-.262.565C2.5 8.086 2.5 8.325 2.5 8.804V14.833c0 .933 0 1.4.182 1.757a1.667 1.667 0 00.728.728c.357.182.824.182 1.757.182h9.666c.934 0 1.4 0 1.757-.182a1.667 1.667 0 00.728-.728c.182-.357.182-.824.182-1.757V8.804c0-.479 0-.718-.062-.939a1.667 1.667 0 00-.262-.565c-.136-.184-.325-.33-.703-.624L10.819 2.303a1.67 1.67 0 00-.601-.385 1.667 1.667 0 00-1.037 0 1.67 1.67 0 00-.601.385z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.25 3.5L8.75 7l-3.5 3.5" />
    </svg>
  );
}


function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}


// ── Activity-type icons ───────────────────────────────────────────────────────

function CreditCardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      <path d="M18.333 8.333H1.667M9.167 11.667H5M1.667 6.833v6.334c0 .933 0 1.4.181 1.756a1.667 1.667 0 00.729.729c.356.181.823.181 1.756.181H15.667c.933 0 1.4 0 1.756-.181a1.667 1.667 0 00.729-.729c.181-.356.181-.823.181-1.756V6.833c0-.933 0-1.4-.181-1.756a1.667 1.667 0 00-.729-.728c-.356-.182-.823-.182-1.756-.182H4.333c-.933 0-1.4 0-1.756.182a1.667 1.667 0 00-.729.728c-.181.356-.181.823-.181 1.756z" />
      <path d="M12.5 13.5l1.5-1.5 1.5 1.5" strokeLinejoin="round" />
    </svg>
  );
}

function LinkExternalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      <path d="M10.833 9.167L17.5 2.5M17.5 2.5h-5M17.5 2.5v5M8.333 2.5H5.5C4.567 2.5 4.1 2.5 3.743 2.682a1.667 1.667 0 00-.728.728C2.833 3.767 2.833 4.233 2.833 5.167v9.166c0 .934 0 1.4.182 1.757a1.667 1.667 0 00.728.729c.357.181.824.181 1.757.181h9.167c.933 0 1.4 0 1.756-.181a1.667 1.667 0 00.728-.729c.182-.356.182-.823.182-1.757V11.667" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      <path d="M7.5 15.833c.417.834 1.25 1.667 2.5 1.667s2.083-.833 2.5-1.667M10 2.5a1.25 1.25 0 00-1.25 1.25v.417A5 5 0 004.167 9v1.667c0 .833-.834 2.5-1.667 3.333h15c-.833-.833-1.667-2.5-1.667-3.333V9a5 5 0 00-4.583-4.833v-.417A1.25 1.25 0 0010 2.5z" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      <path d="M10 7.5v3.333M10 14.167h.008M8.846 3.243L1.992 15.082c-.38.657-.57.985-.542 1.254a1.25 1.25 0 00.447.582c.219.16.598.16 1.357.16H16.746c.759 0 1.138 0 1.357-.16a1.25 1.25 0 00.447-.582c.028-.27-.162-.597-.542-1.254L11.154 3.243c-.379-.652-.568-.978-.815-1.088a1.042 1.042 0 00-.878 0c-.247.11-.436.436-.815 1.088z" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
      <path d="M10.833 1.667L3.41 10.573c-.29.349-.435.523-.433.67a.625.625 0 00.128.376c.115.093.342.093.796.093H10L9.167 18.333l7.422-8.906c.29-.349.435-.523.433-.67a.625.625 0 00-.128-.376c-.115-.093-.342-.093-.796-.093H10L10.833 1.667z" />
    </svg>
  );
}

// ── Filter config ─────────────────────────────────────────────────────────────

const FILTER_FIELDS: FilterField[] = [
  { key: "category",    label: "Activity Type", type: "multiselect", operators: ["Is", "Is not"], options: ["Payment", "Fuel", "Announcement", "Issue", "Generator"] },
  { key: "triggeredBy", label: "Triggered by",  type: "multiselect", operators: ["Is", "Is not"], options: ["System", "Chijioke Adebayo", "Ireti Omoregbe"] },
];

function getCategory(icon: React.ReactNode): string {
  if (!icon || typeof icon !== "object" || !("type" in icon)) return "";
  const fn = (icon as React.ReactElement).type;
  if (typeof fn !== "function") return "";
  const name = (fn as { name?: string }).name ?? "";
  if (name === "CreditCardIcon")    return "Payment";
  if (name === "LinkExternalIcon")  return "Fuel";
  if (name === "BellIcon")          return "Announcement";
  if (name === "AlertTriangleIcon") return "Issue";
  if (name === "ZapIcon")           return "Generator";
  return "";
}

// ── Types & data ──────────────────────────────────────────────────────────────

type ActivityEntry = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  triggeredBy: string;
  date: string;
};

const B = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold text-[#474739]">{children}</span>
);

const ALL_ACTIVITIES: ActivityEntry[] = [
  // Page 1 ─ from Figma
  {
    icon: <CreditCardIcon />,
    title: "Building 3, Unit 6 paid",
    subtitle: "₦95,000",
    description: <><B>Aminu Eze</B>{" paid ₦95,000 for July 2026 via in-app transfer"}</>,
    triggeredBy: "System",
    date: "Jun 28",
  },
  {
    icon: <LinkExternalIcon />,
    title: "Fuel purchase logged:",
    subtitle: "450L, ₦391,500",
    description: <>{"Fuel purchase logged: "}<B>450 litres</B>{" at "}<B>₦870/litre</B>{", "}<B>₦391,500</B>{" from "}<B>KonTech Fuels</B>{". Payment via bank transfer."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 27",
  },
  {
    icon: <BellIcon />,
    title: "Payment Reminder Sent",
    subtitle: "Reminders",
    description: <>{"Payment reminder sent to 2 unpaid units ("}<B>Building B, Unit 5; Building C, Unit 3</B>{") for June 2026."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 27",
  },
  {
    icon: <AlertTriangleIcon />,
    title: "Building A, Unit 2 flagged issue:",
    subtitle: "Billing Dispute",
    description: <><B>Aisha Bello</B>{` flagged an issue: Billing — "My AC was removed last month but my contribution hasn't changed"`}</>,
    triggeredBy: "System",
    date: "Jun 26",
  },
  {
    icon: <ZapIcon />,
    title: "Generator Override",
    subtitle: "Generator Status",
    description: "Generator override reverted to schedule. Reason: Alternator repaired, resuming normal hours (7:00 AM – 11:00 PM). All residents notified.",
    triggeredBy: "Ireti Omoregbe",
    date: "Jun 25",
  },
  {
    icon: <ZapIcon />,
    title: "Generator Override",
    subtitle: "Generator Status",
    description: "Generator status overridden to OFF. Reason: Breakdown — faulty alternator. All residents notified.",
    triggeredBy: "Ireti Omoregbe",
    date: "Jun 25",
  },
  {
    icon: <CreditCardIcon />,
    title: "Building B Unit 1 paid",
    subtitle: "₦95,000",
    description: "External payment logged for Building B, Unit 1 (David Nwankwo): ₦95,000 for July 2026, received via bank transfer.",
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 25",
  },
  {
    icon: <BellIcon />,
    title: "Payment Reminder Sent",
    subtitle: "Reminders",
    description: <>{"Payment reminder sent to 2 unpaid units ("}<B>Building B, Unit 5; Building C, Unit 3</B>{") for June 2026."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 24",
  },
  // Page 2
  {
    icon: <CreditCardIcon />,
    title: "Building A, Unit 3 paid",
    subtitle: "₦95,000",
    description: <><B>Chioma Obi</B>{" paid ₦95,000 for June 2026 via in-app transfer"}</>,
    triggeredBy: "System",
    date: "Jun 23",
  },
  {
    icon: <LinkExternalIcon />,
    title: "Fuel purchase logged:",
    subtitle: "300L, ₦261,000",
    description: <>{"Fuel purchase logged: "}<B>300 litres</B>{" at "}<B>₦870/litre</B>{", "}<B>₦261,000</B>{" from "}<B>Stellar Petroleum</B>{". Payment via cash."}</>,
    triggeredBy: "Ireti Omoregbe",
    date: "Jun 22",
  },
  {
    icon: <AlertTriangleIcon />,
    title: "Building C, Unit 6 flagged issue:",
    subtitle: "Power Issue",
    description: <><B>Aminu Eze</B>{" flagged an issue: Power — "}<em>{'"There has been a complete power outage in my unit since yesterday."'}</em></>,
    triggeredBy: "System",
    date: "Jun 21",
  },
  {
    icon: <BellIcon />,
    title: "Payment Reminder Sent",
    subtitle: "Reminders",
    description: <>{"Payment reminder sent to 3 unpaid units ("}<B>Building A, Unit 4; Building C, Unit 2; Building D, Unit 1</B>{") for June 2026."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 20",
  },
  {
    icon: <CreditCardIcon />,
    title: "Building D, Unit 5 paid",
    subtitle: "₦95,000",
    description: <><B>Ngozi Eze</B>{" paid ₦95,000 for June 2026 via in-app transfer"}</>,
    triggeredBy: "System",
    date: "Jun 19",
  },
  {
    icon: <ZapIcon />,
    title: "Generator Schedule Updated",
    subtitle: "Generator Status",
    description: "Generator schedule updated: weekday hours changed from 6:00 AM – 10:00 PM to 7:00 AM – 11:00 PM. All residents notified.",
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 18",
  },
  {
    icon: <CreditCardIcon />,
    title: "Building B, Unit 3 paid",
    subtitle: "₦72,000",
    description: "External payment logged for Building B, Unit 3 (Tunde Okafor): ₦72,000 for June 2026, received via bank transfer.",
    triggeredBy: "Ireti Omoregbe",
    date: "Jun 17",
  },
  {
    icon: <AlertTriangleIcon />,
    title: "Building D, Unit 3 flagged issue:",
    subtitle: "Bill Issue",
    description: <><B>Tunde Okafor</B>{" flagged an issue: Billing — "}<em>{'"My bill seems too high compared to last month."'}</em></>,
    triggeredBy: "System",
    date: "Jun 16",
  },
  // Page 3
  {
    icon: <LinkExternalIcon />,
    title: "Fuel purchase logged:",
    subtitle: "500L, ₦435,000",
    description: <>{"Fuel purchase logged: "}<B>500 litres</B>{" at "}<B>₦870/litre</B>{", "}<B>₦435,000</B>{" from "}<B>KonTech Fuels</B>{". Payment via bank transfer."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 14",
  },
  {
    icon: <BellIcon />,
    title: "Payment Reminder Sent",
    subtitle: "Reminders",
    description: <>{"Monthly payment reminder sent to all 24 units for June 2026."}</>,
    triggeredBy: "System",
    date: "Jun 10",
  },
  {
    icon: <CreditCardIcon />,
    title: "Building C, Unit 2 paid",
    subtitle: "₦95,000",
    description: <><B>Fatima Balogun</B>{" paid ₦95,000 for June 2026 via in-app transfer"}</>,
    triggeredBy: "System",
    date: "Jun 9",
  },
  {
    icon: <ZapIcon />,
    title: "Generator Override",
    subtitle: "Generator Status",
    description: "Generator status overridden to OFF for scheduled maintenance. Estimated duration: 4 hours. All residents notified.",
    triggeredBy: "Ireti Omoregbe",
    date: "Jun 8",
  },
  {
    icon: <CreditCardIcon />,
    title: "Building A, Unit 1 paid",
    subtitle: "₦95,000",
    description: <><B>Emeka Nwosu</B>{" paid ₦95,000 for June 2026 via in-app transfer"}</>,
    triggeredBy: "System",
    date: "Jun 7",
  },
  {
    icon: <AlertTriangleIcon />,
    title: "Building B, Unit 4 flagged issue:",
    subtitle: "Payment Issue",
    description: <><B>Ciroma Adekunle</B>{" flagged an issue: Payment — "}<em>{"“I’ve been unable to make payments through the app for 3 days.”"}</em></>,
    triggeredBy: "System",
    date: "Jun 6",
  },
  {
    icon: <LinkExternalIcon />,
    title: "Fuel purchase logged:",
    subtitle: "400L, ₦348,000",
    description: <>{"Fuel purchase logged: "}<B>400 litres</B>{" at "}<B>₦870/litre</B>{", "}<B>₦348,000</B>{" from "}<B>Stellar Petroleum</B>{". Payment via cash."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 3",
  },
  {
    icon: <BellIcon />,
    title: "Payment Reminder Sent",
    subtitle: "Reminders",
    description: <>{"Payment reminder sent to 5 unpaid units for May 2026 (final notice)."}</>,
    triggeredBy: "Chijioke Adebayo",
    date: "Jun 1",
  },
];

const PER_PAGE = 8;


// ── Row ───────────────────────────────────────────────────────────────────────

function ActivityRow({ entry }: { entry: ActivityEntry }) {
  return (
    <div className="flex items-center justify-between">
      {/* Main cell */}
      <div className="flex-1 min-w-0 flex gap-12 items-center border-b border-[#e5e5e5] pr-6 py-4 h-[72px] max-h-[72px]">
        {/* Icon + title */}
        <div className="flex items-center gap-3 shrink-0 w-[264px]">
          <div className="shrink-0 border border-[#e8e8e3] rounded p-1.5 flex items-center justify-center text-[#404040]">
            {entry.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#171717] leading-5 truncate">{entry.title}</p>
            <p className="text-sm text-[#525252] leading-5 truncate">{entry.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 min-w-0 h-[40px] max-h-[40px] flex items-center overflow-hidden">
          <p className="text-sm text-[#525252] leading-5 line-clamp-2">{entry.description}</p>
        </div>

        {/* Triggered by */}
        <div className="shrink-0 flex flex-col items-end justify-center h-[40px]">
          <p className="text-xs text-[#7c7c67] leading-[18px]">Triggered by:</p>
          <p className="text-sm font-medium text-[#474739] leading-5">{entry.triggeredBy}</p>
        </div>
      </div>

      {/* Date cell */}
      <div className="shrink-0 w-[94px] pl-6 border-b border-[#e5e5e5] flex items-center h-[72px] max-h-[72px]">
        <p className="text-sm text-[#7c7c67] whitespace-nowrap">{entry.date}</p>
      </div>
    </div>
  );
}

// Mobile row card
function ActivityRowMobile({ entry }: { entry: ActivityEntry }) {
  return (
    <div className="flex gap-3 border-b border-[#e5e5e5] px-4 py-4">
      <div className="shrink-0 border border-[#e8e8e3] rounded p-1.5 flex items-center justify-center text-[#404040] self-start mt-0.5">
        {entry.icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#171717] leading-5">{entry.title}</p>
            <p className="text-xs text-[#525252]">{entry.subtitle}</p>
          </div>
          <p className="text-xs text-[#9ca3af] shrink-0 whitespace-nowrap">{entry.date}</p>
        </div>
        <p className="text-xs text-[#525252] leading-[18px] line-clamp-2">{entry.description}</p>
        <p className="text-xs text-[#7c7c67]">By: <span className="font-medium text-[#474739]">{entry.triggeredBy}</span></p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RecentActivityPage() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<AppliedFilter[]>([]);

  const filtered = useMemo(() => {
    let rows = ALL_ACTIVITIES;
    for (const f of activeFilters) {
      const v = f.value;
      if (!Array.isArray(v) || v.length === 0) continue;
      rows = rows.filter(entry => {
        const itemVal = f.field === "category"    ? getCategory(entry.icon)
                      : f.field === "triggeredBy" ? entry.triggeredBy
                      : "";
        const match = v.some(opt => opt.toLowerCase() === itemVal.toLowerCase());
        return f.operator === "Is not" ? !match : match;
      });
    }
    return rows;
  }, [activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header section ── */}
      <div className="flex flex-col gap-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[#737373]">
          <Link href="/admin" className="p-1 rounded-md hover:bg-[#f4f4f0] transition-colors">
            <HomeIcon />
          </Link>
          <ChevronRightIcon />
          <span className="px-2 py-1 rounded-md bg-[#fafafa] text-sm font-semibold text-[#474739]">
            Recent Activity
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-[#171717] leading-[30px]">Recent Activity</h1>

        {/* Filters bar */}
        <div className="flex items-center gap-3">
          <FilterPanel
            fields={FILTER_FIELDS}
            onApply={(fs) => { setActiveFilters(fs); setPage(1); }}
          />
        </div>
      </div>

      {/* ── Card ── */}
      <div
        className="bg-white border border-[#e5e5e5] rounded-[12px] overflow-hidden"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
      >
        <div className="p-6 flex flex-col gap-5">
          {/* Card header */}
          <div className="flex items-center justify-between py-1.5">
            <p className="text-base font-semibold text-[#474739]">Recent activity</p>
            <button className="text-sm font-semibold text-noku-green hover:opacity-80 transition-opacity">
              See More
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block border-t border-[#e5e5e5]">
            {pageItems.map((entry, i) => (
              <ActivityRow key={i} entry={entry} />
            ))}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden border-t border-[#e5e5e5] -mx-6">
            {pageItems.map((entry, i) => (
              <ActivityRowMobile key={i} entry={entry} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 flex items-center">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="flex items-center gap-1 bg-white border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <ArrowLeftIcon />
                Previous
              </button>
            </div>

            <div className="flex items-center gap-0.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-[8px] flex items-center justify-center text-sm font-medium transition-colors ${
                    safePage === p ? "bg-[#f4f4f0] text-[#404040]" : "text-[#7c7c67] hover:text-[#404040]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-end">
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="flex items-center gap-1 bg-white border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-sm font-semibold text-[#474739] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                Next
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
