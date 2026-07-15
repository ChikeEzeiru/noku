"use client";

import type { Issue } from "@/lib/issues-data";

const statusStyle = {
  "In review": { bg: "#fefce8", border: "#fef08a", text: "#a16207" },
  "Resolved":  { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
};

const FILE_TYPE_ICONS: Record<string, string> = {
  JPG: "/icons/AttachmentIcon - JPG.svg",
  PNG: "/icons/AttachmentIcon - PNG.svg",
  GIF: "/icons/AttachmentIcon - GIF.svg",
  SVG: "/icons/AttachmentIcon - SVG.svg",
};

function FileIcon({ fileType }: { fileType: string }) {
  const src = FILE_TYPE_ICONS[fileType] ?? "/icons/AttachmentIcon.svg";
  return <img src={src} alt={fileType} className="w-10 h-10 shrink-0" />;
}

function Divider() {
  return <div className="h-px bg-[#e8e8e3] -mx-3" />;
}

type IssueDetailScreenProps = {
  issue: Issue;
  onBack: () => void;
};

export default function IssueDetailScreen({ issue, onBack }: IssueDetailScreenProps) {
  const s = statusStyle[issue.status];

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
          <p className="text-base font-medium leading-6 text-[#7c7c67]">Issue Details</p>
        </div>

        {/* Detail card */}
        <div className="px-6">
          <div className="bg-white border border-[#d8d8d0] rounded-[12px] px-3 pt-3 pb-4 flex flex-col gap-4">

            {/* Date Reported + Status */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-[6px]">
                <p className="text-sm font-normal leading-5 text-[#7c7c67]">Date Reported</p>
                <p className="text-sm font-normal leading-5 text-[#474739]">{issue.dateReported}</p>
              </div>
              <div
                className="rounded-[6px] px-[6px] py-[2px]"
                style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
              >
                <p className="text-[10px] font-medium leading-4" style={{ color: s.text }}>
                  {issue.status}
                </p>
              </div>
            </div>

            <Divider />

            {/* Category */}
            <div className="flex flex-col gap-[6px]">
              <p className="text-sm font-normal leading-5 text-[#7c7c67]">Category</p>
              <div className="bg-white border border-[#d4d4d4] rounded-[8px] px-[10px] py-[4px] flex items-center gap-[6px] self-start shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: issue.dotColor }} />
                <p className="text-sm font-medium leading-5 text-[#404040]">{issue.category}</p>
              </div>
            </div>

            <Divider />

            {/* Subject */}
            <div className="flex flex-col gap-[6px]">
              <p className="text-sm font-normal leading-5 text-[#7c7c67]">Subject</p>
              <p className="text-sm font-semibold leading-5 text-[#474739]">{issue.subject}</p>
            </div>

            <Divider />

            {/* Description */}
            <div className="flex flex-col gap-[6px]">
              <p className="text-sm font-normal leading-5 text-[#7c7c67]">Description</p>
              <p className="text-sm font-normal leading-5 text-[#474739]">{issue.description}</p>
            </div>

            {issue.attachment && (
              <>
                <Divider />
                <div className="flex flex-col gap-[6px]">
                  <p className="text-sm font-normal leading-5 text-[#7c7c67]">Attachment</p>
                  <div className="flex items-end gap-1">
                    <FileIcon fileType={issue.attachment.fileType} />
                    <p className="text-[10px] font-semibold leading-4 text-[#474739]">
                      {issue.attachment.name}
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
