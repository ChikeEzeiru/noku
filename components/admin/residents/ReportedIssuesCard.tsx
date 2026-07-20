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

type IssueBadgeType = "Power Issue" | "Bill Issue" | "Payment Issue";

function IssueBadge({ type }: { type: IssueBadgeType }) {
  const styles: Record<IssueBadgeType, string> = {
    "Power Issue": "border-[#93c5fd] text-[#1d4ed8] bg-[#eff6ff]",
    "Bill Issue": "border-[#fcd34d] text-[#92400e] bg-[#fffbeb]",
    "Payment Issue": "border-[#93c5fd] text-[#1d4ed8] bg-[#eff6ff]",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styles[type]}`}
    >
      {type}
    </span>
  );
}

const issues = [
  {
    building: "Building C, Unit 6",
    resident: "Aminu Eze",
    preview: "Power outage in my unit....",
    type: "Power Issue" as IssueBadgeType,
    date: "Jun 27",
  },
  {
    building: "Building D, Unit 3",
    resident: "Tunde Okafor",
    preview: "My bill seems too high for...",
    type: "Bill Issue" as IssueBadgeType,
    date: "Jun 24",
  },
  {
    building: "Building B, Unit 4",
    resident: "Ciroma Adekunle",
    preview: "I've been unable to make p...",
    type: "Payment Issue" as IssueBadgeType,
    date: "Jun 12",
  },
  {
    building: "Building C, Unit 3",
    resident: "Obinna Amos",
    preview: "Power outage in my unit....",
    type: "Power Issue" as IssueBadgeType,
    date: "Jun 8",
  },
];

export default function ReportedIssuesCard() {
  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden h-full flex flex-col"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
        <p className="text-base font-semibold text-noku-heading">
          Reported Issues
        </p>
        <button className="flex items-center gap-1 text-sm font-semibold text-noku-green hover:opacity-80 transition-opacity">
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
        </button>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-[#e5e5e5] flex-1">
        {issues.map((issue, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-4">
            <span className="shrink-0">
              <AlertCircleIcon />
            </span>
            <div className="w-36 shrink-0">
              <p className="text-sm font-semibold text-noku-heading leading-5">
                {issue.building}
              </p>
              <p className="text-xs text-[#737373]">{issue.resident}</p>
            </div>
            <p className="flex-1 text-sm text-[#525252] truncate min-w-0">
              {issue.preview}
            </p>
            <IssueBadge type={issue.type} />
            <p className="text-xs text-[#737373] shrink-0 w-12 text-right">
              {issue.date}
            </p>
          </div>
        ))}
        <div className="h-1 divide-y border-[#e5e5e5]" />
      </div>
    </div>
  );
}
