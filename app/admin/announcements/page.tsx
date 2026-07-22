"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useEstateStore } from "@/store/estateStore";
import CreateAnnouncementModal, { type AnnouncementPriority, type AnnouncementEntry } from "@/components/admin/announcements/CreateAnnouncementModal";
import AnnouncementDetailDrawer, { type DrawerAnnouncement } from "@/components/admin/announcements/AnnouncementDetailDrawer";
import FilterPanel, { type FilterField, type AppliedFilter } from "@/components/admin/shared/FilterPanel";

const FILTER_FIELDS: FilterField[] = [
  { key: "category", label: "Category", type: "multiselect", operators: ["Is", "Is not"], options: ["General", "Generator & Power", "Payments & Levy", "Maintenance", "Security & Safety"] },
  { key: "priority", label: "Priority", type: "multiselect", operators: ["Is", "Is not"], options: ["High", "Normal", "Low"] },
];

function MegaphoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.3333 6.66635V9.99968M8.54167 4.58302H5.66667C4.26654 4.58302 3.56647 4.58302 3.03169 4.8555C2.56129 5.09518 2.17884 5.47763 1.93915 5.94804C1.66667 6.48282 1.66667 7.18289 1.66667 8.58302L1.66667 9.58302C1.66667 10.3596 1.66667 10.7479 1.79354 11.0542C1.9627 11.4625 2.28715 11.787 2.69553 11.9561C3.00182 12.083 3.3901 12.083 4.16667 12.083V15.6247C4.16667 15.8182 4.16667 15.9149 4.1747 15.9964C4.25264 16.7877 4.87868 17.4137 5.66998 17.4917C5.75146 17.4997 5.8482 17.4997 6.04167 17.4997C6.23515 17.4997 6.33189 17.4997 6.41337 17.4917C7.20466 17.4137 7.83071 16.7877 7.90865 15.9964C7.91667 15.9149 7.91667 15.8182 7.91667 15.6247V12.083H8.54167C10.0137 12.083 11.8144 12.8721 13.2036 13.6294C14.014 14.0712 14.4192 14.2921 14.6846 14.2596C14.9308 14.2294 15.1168 14.1189 15.2611 13.9173C15.4167 13.6998 15.4167 13.2647 15.4167 12.3944V4.27159C15.4167 3.40135 15.4167 2.96622 15.2611 2.74876C15.1168 2.5471 14.9308 2.4366 14.6846 2.40646C14.4192 2.37395 14.014 2.59485 13.2036 3.03664C11.8144 3.79394 10.0137 4.58302 8.54167 4.58302Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 17.5L14.583 14.583M16.667 9.583a7.083 7.083 0 11-14.167 0 7.083 7.083 0 0114.167 0z" />
    </svg>
  );
}


function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.75 3.5L5.25 7L8.75 10.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.25 3.5L8.75 7L5.25 10.5" />
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

const CATEGORY_COLORS: Record<string, { border: string; text: string; bg: string }> = {
  "General":           { border: "#e5e5e5", text: "#404040", bg: "#fafafa" },
  "Generator & Power": { border: "#fcd34d", text: "#92400e", bg: "#fffbeb" },
  "Payments & Levy":   { border: "#6ee7b7", text: "#065f46", bg: "#ecfdf5" },
  "Maintenance":       { border: "#93c5fd", text: "#1e40af", bg: "#eff6ff" },
  "Security & Safety": { border: "#fca5a5", text: "#991b1b", bg: "#fef2f2" },
};

const DEFAULT_CATEGORY_COLOR = CATEGORY_COLORS["General"];

function LabelBadge({ category }: { category?: string }) {
  const key = category || "General";
  const colors = CATEGORY_COLORS[key] ?? DEFAULT_CATEGORY_COLOR;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
      style={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.bg }}
    >
      {key}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: AnnouncementPriority }) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-[#fca5a5] text-[#b91c1c]">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12V4M4 8l4-4 4 4" />
        </svg>
        High
      </span>
    );
  }
  if (priority === "Low") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-[#86efac] text-[#15803d]">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4v8M4 8l4 4 4-4" />
        </svg>
        Low
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-[#d1d5db] text-[#525252]">
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round">
        <path d="M4 8h8" />
      </svg>
      Normal
    </span>
  );
}

type AnnouncementItem = {
  img: string;
  title: string;
  message?: string;
  author: string;
  priority: AnnouncementPriority;
  category: string;
  readCount: string;
  timeAgo: string;
};

const THUMBNAILS = [
  "/Images/update-card-1.jpg",
  "/Images/update-card-2.jpg",
  "/Images/update-card-3.jpg",
  "/Images/update-card-4.jpg",
  "/Images/update-card-5.jpg",
  "/Images/update-card-6.jpg",
];

const SEED_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    img: "/Images/update-card-1.jpg",
    title: "Exciting Update: New Renewable Energy System Launched for Mini Estate",
    message: "We are pleased to announce the launch of our new renewable energy system! After months of planning and community input, we have successfully installed a solar-hybrid backup that will complement our existing generator.\n\nThis system is expected to reduce our monthly fuel costs by approximately 30%, which means lower levies for all residents starting from next quarter.\n\nPlease note that during the activation window (July 30–31), there may be brief interruptions. We will notify you in advance and keep everyone informed every step of the way. Thank you for your continued support.",
    author: "Chijioke Adebayo",
    priority: "Normal",
    category: "Generator & Power",
    readCount: "18 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-2.jpg",
    title: "Electricity Committee Update: New Solar Initiative Announced",
    message: "Good news from your electricity committee! Our solar initiative has been formally approved and contracts have been signed with a certified installer.\n\nInstallation is expected to begin in the first week of August. Until then, our generator schedule remains unchanged. We will share a detailed timeline soon.",
    author: "Ireti Omoregbe",
    priority: "Normal",
    category: "General",
    readCount: "24 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-3.jpg",
    title: "Power Supply Enhancement: Upcoming Maintenance Schedule",
    message: "ACTION REQUIRED: Our generator is scheduled for a full maintenance check on Saturday, July 26th from 10am to 2pm.\n\nDuring this window, there will be NO power supply to the estate. Please make necessary arrangements — charge devices, refrigerate perishables, etc. — before 10am.\n\nWe apologise for the inconvenience and appreciate your understanding.",
    author: "Ireti Omoregbe",
    priority: "High",
    category: "Maintenance",
    readCount: "20 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-4.jpg",
    title: "Community Alert: Voltage Stabilization Project Underway",
    message: "Some residents have reported voltage fluctuations affecting appliances. We have engaged a technician who began work yesterday.\n\nUntil the issue is fully resolved, we recommend using surge protectors for sensitive electronics such as TVs, refrigerators, and laptops.\n\nWe expect the stabilization work to be completed within 48 hours. Updates will follow.",
    author: "Ireti Omoregbe",
    priority: "High",
    category: "Generator & Power",
    readCount: "20 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-5.jpg",
    title: "Important Notice: Temporary Power Outage for Upgrades",
    message: "We will be upgrading our estate's main distribution panel this Friday evening (July 25th) between 8pm and 10pm.\n\nThis upgrade will improve reliability and reduce the frequency of tripped circuits. Power will be fully restored by 10pm at the latest.\n\nIf you have any urgent concerns about this schedule, please contact the committee before Thursday.",
    author: "Chijioke Adebayo",
    priority: "High",
    category: "Maintenance",
    readCount: "21 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-6.jpg",
    title: "Announcement: New Energy Efficiency Programs Available",
    message: "The estate committee has partnered with two energy consultants who are offering discounted home energy audits for all residents.\n\nA home audit typically costs ₦15,000 but is available to estate residents at ₦8,000. Savings identified by the audit usually offset the cost within two months.\n\nInterested residents should send their name and unit number to the estate WhatsApp group by Monday.",
    author: "Chijioke Adebayo",
    priority: "Normal",
    category: "General",
    readCount: "15 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-3.jpg",
    title: "Update: Smart Meter Installation Begins Next Week",
    message: "Smart meter installation kicks off on Monday, July 28th. The process will be unit by unit and should take no longer than 20 minutes per household.\n\nThe installation team will knock between 9am and 5pm. Please ensure someone is home. If Monday does not work for your unit, reply to this message to schedule an alternate slot.",
    author: "Ireti Omoregbe",
    priority: "Normal",
    category: "Maintenance",
    readCount: "23 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-4.jpg",
    title: "Welcome to Noku: The App that manages power for our mini-estate",
    message: "Welcome to Noku — the app your estate committee uses to manage generator power, track fuel spending, and collect levy payments.\n\nAs a resident, you can view your payment history, make levy payments, and stay updated on estate announcements — all from your phone.\n\nIf you have any questions about using the app, please reach out to the committee. We are happy to help!",
    author: "Ireti Omoregbe",
    priority: "Normal",
    category: "General",
    readCount: "23 of 24 read",
    timeAgo: "1 day ago",
  },
];

const PAGE_SIZE = 4;

function AnnouncementCard({ item, onClick }: { item: AnnouncementItem; onClick?: () => void }) {
  return (
    <div
      role="button"
      onClick={onClick}
      className="flex border border-[#e5e5e5] rounded-xl overflow-hidden bg-white cursor-pointer hover:border-[#ABAB9C] hover:shadow-sm transition-all"
    >
      <div className="w-28 shrink-0 relative">
        <Image src={item.img} alt={item.title} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between p-4 flex-1 min-w-0 gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-noku-heading leading-5 line-clamp-2">{item.title}</p>
          <p className="text-xs text-[#737373]">by {item.author}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <LabelBadge category={item.category} />
          <PriorityBadge priority={item.priority} />
          <span className="text-xs text-[#737373] flex-1">{item.readCount}</span>
          <span className="text-xs text-[#9ca3af] shrink-0">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminAnnouncements() {
  const adminName = useEstateStore((s) => s.admin?.fullName ?? "Admin");
  const [page,           setPage]           = useState(1);
  const [search,         setSearch]         = useState("");
  const [activeFilters,  setActiveFilters]  = useState<AppliedFilter[]>([]);
  const [createOpen,     setCreateOpen]     = useState(false);
  const [toastMsg,       setToastMsg]       = useState<string | null>(null);
  const [isToastExiting, setIsToastExiting] = useState(false);
  const [announcements,  setAnnouncements]  = useState<AnnouncementItem[]>(SEED_ANNOUNCEMENTS);
  const [drawerEntry,    setDrawerEntry]    = useState<(AnnouncementItem & { index: number }) | null>(null);
  const [editIndex,      setEditIndex]      = useState<number | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleAnnouncements = useMemo(() => {
    let list = announcements;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.message ?? "").toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    }
    for (const f of activeFilters) {
      const v = f.value;
      if (!Array.isArray(v) || v.length === 0) continue;
      list = list.filter(a => {
        const itemVal = f.field === "category" ? a.category : f.field === "priority" ? a.priority : "";
        const match = v.some(opt => opt.toLowerCase() === itemVal.toLowerCase());
        return f.operator === "Is not" ? !match : match;
      });
    }
    return list;
  }, [announcements, search, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(visibleAnnouncements.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = visibleAnnouncements.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

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

  function handleSubmit(entry: AnnouncementEntry) {
    if (editIndex !== null) {
      setAnnouncements((prev) => {
        const next = [...prev];
        next[editIndex] = {
          ...next[editIndex],
          title: entry.title,
          message: entry.message,
          category: entry.category || "General",
          priority: entry.priority,
        };
        return next;
      });
      showToast("Announcement updated");
      setEditIndex(null);
    } else {
      const thumbIdx = announcements.length % THUMBNAILS.length;
      const newItem: AnnouncementItem = {
        img: THUMBNAILS[thumbIdx],
        title: entry.title,
        message: entry.message,
        author: adminName,
        priority: entry.priority,
        category: entry.category || "General",
        readCount: "0 of 24 read",
        timeAgo: "Just now",
      };
      setAnnouncements((prev) => [newItem, ...prev]);
      showToast("Announcement sent to all residents");
    }
  }

  function handleEdit(item: DrawerAnnouncement) {
    setDrawerEntry(null);
    setEditIndex(item.index);
    setCreateOpen(true);
  }

  function handleDelete(index: number) {
    setAnnouncements((prev) => prev.filter((_, i) => i !== index));
    showToast("Announcement deleted");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">Announcements</h1>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 text-sm font-semibold text-white rounded-lg px-4 py-2.5"
          style={{
            backgroundColor: "#1D1D16",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.15)",
          }}
        >
          Create an Announcement
          <MegaphoneIcon />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm font-medium text-noku-heading">Recent announcements</p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search"
              className="pl-9 pr-4 py-2 text-sm border border-[#e5e5e5] rounded-lg bg-white text-noku-heading placeholder:text-[#9ca3af] outline-none focus:border-[#ABAB9C] transition-colors w-52"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            />
          </div>
          <FilterPanel
            fields={FILTER_FIELDS}
            onApply={(fs) => { setActiveFilters(fs); setPage(1); }}
          />
        </div>
      </div>

      <div className="border-t border-[#e5e5e5]" />

      {/* 2-column card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pageItems.length === 0 ? (
          <p className="col-span-2 py-8 text-center text-sm text-[#737373]">No announcements match your filters.</p>
        ) : pageItems.map((item, i) => {
          const realIndex = announcements.indexOf(item);
          return (
            <AnnouncementCard
              key={i}
              item={item}
              onClick={() => setDrawerEntry({ ...item, index: realIndex })}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            <ArrowLeftIcon />
            Previous
          </button>
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-[8px] flex items-center justify-center text-sm font-medium transition-opacity ${
                  safePage === p ? "bg-[#f4f4f0] text-[#404040]" : "text-[#737373] opacity-40 hover:opacity-70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            Next
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {/* Create / Edit announcement modal */}
      <CreateAnnouncementModal
        open={createOpen}
        onClose={() => { setCreateOpen(false); setEditIndex(null); }}
        onSubmit={handleSubmit}
        initialEntry={editIndex !== null ? announcements[editIndex] : undefined}
      />

      {/* Announcement detail drawer */}
      <AnnouncementDetailDrawer
        entry={drawerEntry}
        onClose={() => setDrawerEntry(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
