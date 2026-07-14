"use client";


function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10.833 7.5 14.167l8.333-8.334"/>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6a5 5 0 1 0 1.1-3.1"/>
      <path d="M1 2v2h2"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14 1.333 14.667 2 11.333 11.333 2Z"/>
    </svg>
  );
}

type ReportIssue3Props = {
  category: string;
  subject: string;
  description: string;
  onEdit: () => void;
  onChangeCategory: () => void;
  onSubmit: () => void;
  onBack: () => void;
};

export default function ReportIssue3({
  category, subject, description,
  onEdit, onChangeCategory, onSubmit, onBack,
}: ReportIssue3Props) {
  return (
    <div className="bg-noku-bg flex flex-col h-[calc(100vh-44px)]">
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pt-6">
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
        <div className="px-6 flex flex-col gap-4">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Report an Issue:{" "}
            <span className="font-semibold text-noku-text-mid">Confirm Details</span>
          </p>
          <p className="text-sm text-[#5b5b4b]">Review a summary of the issue below:</p>
        </div>

        {/* Summary card */}
        <div className="px-6 py-2">
          <div className="bg-white border border-noku-nav-border rounded-xl p-3 flex flex-col gap-4">
            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-noku-text-dim">Category</p>
              <button
                onClick={onChangeCategory}
                className="self-start bg-white border border-noku-border-primary rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-sm font-medium text-[#404040]"
                style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
              >
                {category} Issue
                <RefreshIcon />
              </button>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-noku-text-dim">Subject</p>
              <p className="text-sm text-noku-text-mid">{subject}</p>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-noku-text-dim">Description</p>
              <p className="text-sm text-noku-text-mid leading-5">{description}</p>
            </div>

            {/* Edit button */}
            <div className="flex justify-end">
              <button
                onClick={onEdit}
                className="flex items-center gap-1 text-sm font-semibold text-[#5b5b4b]"
              >
                Edit
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-6 pb-10 pt-4">
        <button
          onClick={onSubmit}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          Report Issue
          <CheckIcon />
        </button>
      </div>
    </div>
  );
}
