"use client";

import { useState } from "react";
import Image from "next/image";

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

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M4.5 8h7M7 12h2" />
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

type Priority = "Normal" | "Urgent";

function LabelBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-[#c4b5fd] text-[#6d28d9]">
      Label
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === "Urgent") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-[#fcd34d] text-[#92400e]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
        Urgent
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border border-[#d1d5db] text-[#525252]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] shrink-0" />
      Normal
    </span>
  );
}

const announcements = [
  {
    img: "/Images/update-card-1.jpg",
    title: "Exciting Update: New Renewable Energy System Launched for Mini Estate",
    author: "Chijioke Adebayo",
    priority: "Normal" as Priority,
    readCount: "18 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-2.jpg",
    title: "Electricity Committee Update: New Solar Initiative Announced",
    author: "Ireti Omoregbe",
    priority: "Normal" as Priority,
    readCount: "24 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-3.jpg",
    title: "Power Supply Enhancement: Upcoming Maintenance Schedule",
    author: "Ireti Omoregbe",
    priority: "Urgent" as Priority,
    readCount: "20 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-4.jpg",
    title: "Community Alert: Voltage Stabilization Project Underway",
    author: "Ireti Omoregbe",
    priority: "Urgent" as Priority,
    readCount: "20 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-5.jpg",
    title: "Important Notice: Temporary Power Outage for Upgrades",
    author: "Chijioke Adebayo",
    priority: "Urgent" as Priority,
    readCount: "21 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-6.jpg",
    title: "Announcement: New Energy Efficiency Programs Available",
    author: "Chijioke Adebayo",
    priority: "Normal" as Priority,
    readCount: "15 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-3.jpg",
    title: "Update: Smart Meter Installation Begins Next Week",
    author: "Ireti Omoregbe",
    priority: "Normal" as Priority,
    readCount: "23 of 24 read",
    timeAgo: "1 day ago",
  },
  {
    img: "/Images/update-card-4.jpg",
    title: "Welcome to Noku: The App that manages power for our mini-estate",
    author: "Ireti Omoregbe",
    priority: "Normal" as Priority,
    readCount: "23 of 24 read",
    timeAgo: "1 day ago",
  },
];

const TOTAL_PAGES = 2;

function AnnouncementCard({ item }: { item: typeof announcements[number] }) {
  return (
    <div className="flex border border-[#e5e5e5] rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Thumbnail */}
      <div className="w-28 shrink-0 relative">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 flex-1 min-w-0 gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-noku-heading leading-5 line-clamp-2">{item.title}</p>
          <p className="text-xs text-[#737373]">by {item.author}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 flex-wrap">
          <LabelBadge />
          <PriorityBadge priority={item.priority} />
          <span className="text-xs text-[#737373] flex-1">{item.readCount}</span>
          <span className="text-xs text-[#9ca3af] shrink-0">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminAnnouncements() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">Announcements</h1>
        <button
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
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-9 pr-12 py-2 text-sm border border-[#e5e5e5] rounded-lg bg-white text-noku-heading placeholder:text-[#9ca3af] outline-none focus:border-[#ABAB9C] transition-colors w-52"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#9ca3af] border border-[#e5e5e5] rounded px-1 py-0.5 pointer-events-none leading-none">
              ⌘K
            </span>
          </div>

          {/* Filter */}
          <button
            className="flex items-center gap-2 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739]"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            <FilterIcon />
            Filter
          </button>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5]" />

      {/* 2-column card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {announcements.map((item, i) => (
          <AnnouncementCard key={i} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
        >
          <ArrowLeftIcon />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                page === p ? "bg-noku-green text-white font-semibold" : "text-[#525252] hover:bg-[#f5f5f5]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={page === TOTAL_PAGES}
          className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
        >
          Next
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
