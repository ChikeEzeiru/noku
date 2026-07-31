"use client";

import Link from "next/link";
import type {
  IssueBadgeType,
  ReportedIssue,
} from "@/components/admin/residents/issuesData";
import { issues } from "@/components/admin/residents/issuesData";

function AlertCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="#ABAB9C"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="9" r="7.5" />
      <path d="M9 6v3.75M9 12h.008" />
    </svg>
  );
}

const TYPE_DOT: Record<IssueBadgeType, string> = {
  "Power Issue": "#f59e0b",
  "Bill Issue": "#ef4444",
  "Payment Issue": "#3b82f6",
};

function IssueBadge({ type }: { type: IssueBadgeType }) {
  return (
    <span
      className="inline-flex items-center gap-1 bg-white border border-noku-border-primary rounded-md px-2 py-1 whitespace-nowrap shrink-0"
      style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: TYPE_DOT[type] }}
      />
      <span className="text-[12px] font-medium text-[#404040] leading-4">
        {type}
      </span>
    </span>
  );
}

type Props = {
  onIssueClick?: (issue: ReportedIssue) => void;
};

export default function ReportedIssuesCard({ onIssueClick }: Props) {
  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden h-full flex flex-col w-full min-w-0"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
        <p className="text-base font-semibold text-noku-heading">
          Reported Issues
        </p>
        <Link
          href="/admin/issues"
          className="flex items-center gap-1 text-sm font-semibold text-noku-green hover:opacity-80 transition-opacity"
        >
          See All
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.917 7h8.166M7 2.917L11.083 7 7 11.083" />
          </svg>
        </Link>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-[#e5e5e5] flex-1 w-full min-w-0">
        {issues.slice(0, 4).map((issue, i) => (
          <div
            key={i}
            onClick={() => onIssueClick?.(issue)}
            className="flex items-center gap-3 px-6 py-4 w-full min-w-0 hover:bg-noku-secondary-alt transition-colors cursor-pointer"
          >
            <span className="shrink-0">
              <AlertCircleIcon />
            </span>
            <div className="w-36 shrink-0">
              <p className="text-sm font-semibold text-noku-heading leading-5">
                {issue.building}
              </p>
              <p className="text-xs text-[#737373]">{issue.resident}</p>
            </div>
            <p className="flex-1 text-sm text-[#525252] line-clamp-2 min-w-0">
              {issue.preview}
            </p>
            <div className="shrink-0 w-32.5 flex justify-start">
              <IssueBadge type={issue.type} />
            </div>
            <p className="text-xs text-[#737373] shrink-0 w-12 text-right">
              {issue.date}
            </p>
          </div>
        ))}
        <div className="h-1" />
      </div>
    </div>
  );
}
