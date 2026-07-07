"use client";


function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3.333v9.334M3.333 8h9.334"/>
    </svg>
  );
}

type IssueStatus = "Open" | "In review" | "Resolved";

type Issue = {
  category: string;
  subject: string;
  date: string;
  status: IssueStatus;
};

const issues: Issue[] = [
  {
    category: "Generator",
    subject: "Unusual noise from generator at night",
    date: "Jun 28, 2026",
    status: "In review",
  },
  {
    category: "Billing",
    subject: "My contribution amount seems incorrect",
    date: "Jun 15, 2026",
    status: "Resolved",
  },
  {
    category: "Payment",
    subject: "Made external payment but still showing unpaid",
    date: "May 20, 2026",
    status: "Resolved",
  },
];

const statusStyles: Record<IssueStatus, { bg: string; text: string; border: string }> = {
  "Open":      { bg: "#fefce8", text: "#854d0e", border: "#fde68a" },
  "In review": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  "Resolved":  { bg: "#f0fdf4", text: "#15803d", border: "#86efac" },
};

function IssueRow({ issue }: { issue: Issue }) {
  const s = statusStyles[issue.status];
  return (
    <div className="bg-white border border-noku-border-light rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className="text-[10px] font-medium text-noku-text-dim bg-noku-warm-hover border border-noku-border-light rounded-md px-1.5 py-0.5 w-fit">
            {issue.category}
          </span>
          <p className="text-sm font-medium text-noku-text-mid leading-[20px]">{issue.subject}</p>
        </div>
        <span
          className="text-[10px] font-medium rounded-md px-1.5 py-0.5 shrink-0 mt-0.5"
          style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
        >
          {issue.status}
        </span>
      </div>
      <p className="text-xs text-noku-text-subtle">Reported {issue.date}</p>
    </div>
  );
}

type IssuesScreenProps = {
  onBack: () => void;
  onReportIssue: () => void;
};

export default function IssuesScreen({ onBack, onReportIssue }: IssuesScreenProps) {
  return (
    <div className="bg-noku-bg min-h-screen flex flex-col justify-between pb-10">
      <div className="flex flex-col gap-6 pt-6">
        {/* Back */}
        <div className="px-6">
          <button
            onClick={onBack}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="px-6">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            My Issues
          </p>
        </div>

        {/* Issue list */}
        <div className="px-6 flex flex-col gap-3">
          {issues.map((issue, i) => (
            <IssueRow key={i} issue={issue} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6">
        <button
          onClick={onReportIssue}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          <PlusIcon />
          Report an issue
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
