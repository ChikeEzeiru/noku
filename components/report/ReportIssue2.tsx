"use client";


function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5"/>
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

type ReportIssue2Props = {
  category: string;
  subject: string;
  description: string;
  onSubjectChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  onChangeCategory: () => void;
};

export default function ReportIssue2({
  category, subject, description,
  onSubjectChange, onDescriptionChange,
  onNext, onBack, onChangeCategory,
}: ReportIssue2Props) {
  const canProceed = subject.trim().length > 0 && description.trim().length > 0;

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
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
              Report an Issue:{" "}
              <span className="font-semibold text-noku-text-mid">Issue Details</span>
            </p>
            {/* Step indicator: step 2 of 2 */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-1.5 bg-noku-rule rounded-full" />
              <div className="w-6 h-2 bg-noku-brand-mid rounded-full" />
            </div>
          </div>
          <p className="text-sm text-[#5b5b4b]">Please fill in the details below</p>
        </div>

        {/* Form */}
        <div className="px-6 py-2 flex flex-col gap-3">
          {/* Category (read-only badge + change) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-noku-text-mid">Category</label>
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
            <label className="text-sm font-medium text-noku-text-mid">
              Subject <span className="text-noku-brand-mid">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              placeholder="e.g. Wrong AC count"
              className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2.5 text-sm text-noku-text-mid placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid"
              style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#404040]">
              Description <span className="text-noku-brand-mid">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Describe the issue in as much detail as you can."
              rows={5}
              className="w-full bg-white border border-noku-border-primary rounded-lg p-3 text-sm text-noku-text-mid placeholder:text-[#737373] outline-none focus:border-noku-brand-mid resize-none"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            />
          </div>

          {/* Attachment (optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-noku-text-mid">
              Attachment <span className="text-noku-text-dim font-normal">(optional)</span>
            </label>
            <div
              className="w-full flex rounded-lg overflow-hidden border border-noku-nav-border bg-white"
              style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
            >
              <div className="flex-1 px-3 py-2.5 text-sm text-noku-text-subtle">
                Upload an attachment
              </div>
              <div className="border-l border-noku-nav-border px-3.5 py-2.5 text-sm font-semibold text-[#404040] shrink-0">
                Browse
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-6 pb-10 pt-4">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          Next
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
