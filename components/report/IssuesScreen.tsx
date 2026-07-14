"use client";

import { issues } from "@/lib/issues-data";
import type { Issue } from "@/lib/issues-data";

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4.167v11.666M4.167 10h11.666" />
    </svg>
  );
}

const statusStyle = {
  "In review": { bg: "#fefce8", border: "#fef08a", text: "#a16207" },
  "Resolved":  { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
} as const;

type IssuesScreenProps = {
  onBack: () => void;
  onReportIssue: () => void;
  onSelectIssue: (issue: Issue) => void;
};

export default function IssuesScreen({ onBack, onReportIssue, onSelectIssue }: IssuesScreenProps) {
  return (
    <div className="bg-noku-bg min-h-screen pb-10">
      <div className="flex flex-col gap-8 pt-6">

        {/* Back */}
        <div className="px-6">
          <button onClick={onBack} className="border border-[#e8e8e3] rounded-[8px] p-[6px] flex items-center gap-2">
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs font-normal leading-[18px] text-[#474739]">Back</span>
          </button>
        </div>

        {/* Page title */}
        <div className="px-6">
          <p className="text-base font-medium leading-6 text-[#7c7c67]">Reported Issues</p>
        </div>

        {/* Issues list */}
        <div className="px-6 flex flex-col gap-4">
          <div className="bg-white border border-[#d8d8d0] rounded-[12px] overflow-hidden">
            {issues.map((issue, i) => {
              const s = statusStyle[issue.status];
              return (
                <button
                  key={issue.id}
                  onClick={() => onSelectIssue(issue)}
                  className="w-full text-left"
                >
                  {i > 0 && <div className="h-px bg-[#e8e8e3]" />}
                  <div className="p-3 flex flex-col gap-[6px]">
                    <div className="flex items-start justify-between">
                      <div className="bg-white border border-[#d4d4d4] rounded-[6px] px-[6px] py-[2px] flex items-center gap-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: issue.dotColor }} />
                        <p className="text-[10px] font-medium leading-4 text-[#404040]">{issue.category}</p>
                      </div>
                      <div className="rounded-[6px] px-[6px] py-[2px]" style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
                        <p className="text-[10px] font-medium leading-4" style={{ color: s.text }}>{issue.status}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-5 text-[#474739]">{issue.subject}</p>
                    <p className="text-xs font-normal leading-[18px] text-[#7c7c67]">{issue.dateLong}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Report button */}
        <div className="px-6">
          <button
            onClick={onReportIssue}
            className="w-full bg-white rounded-[8px] px-[14px] py-[10px] flex items-center justify-center gap-1 text-sm font-semibold leading-5 text-[#474739]"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)",
            }}
          >
            Report an Issue
            <PlusIcon />
          </button>
        </div>

      </div>
    </div>
  );
}
