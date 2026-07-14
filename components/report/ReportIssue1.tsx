"use client";


function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.667 5l2.5 2.5 4.166-5"/>
    </svg>
  );
}

const categories = [
  { id: "Billing",        subtitle: "e.g. My contribution seems wrong." },
  { id: "Household data", subtitle: "e.g. My apartment data has changed." },
  { id: "Generator",      subtitle: "e.g. Generator is making unusual noise" },
  { id: "Payment",        subtitle: "I paid externally but it's still showing unpaid" },
  { id: "Other",          subtitle: "Share a unique issue" },
];

type ReportIssue1Props = {
  selected: string;
  onSelect: (category: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function ReportIssue1({ selected, onSelect, onNext, onBack }: ReportIssue1Props) {
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
              Report an Issue
            </p>
            {/* Step indicator: step 1 of 2 */}
            <div className="flex items-center gap-1">
              <div className="w-6 h-2 bg-noku-brand-mid rounded-full" />
              <div className="w-2 h-1.5 bg-noku-rule rounded-full" />
            </div>
          </div>
          <p className="text-sm text-[#5b5b4b]">
            Kindly select the issue you're facing from the options below:
          </p>
        </div>

        {/* Category options */}
        <div className="px-6 py-2 flex flex-col gap-3">
          {categories.map(({ id, subtitle }) => {
            const isSelected = selected === id;
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className="w-full text-left flex items-center gap-3 p-4 rounded-xl bg-white transition-all"
                style={{ border: isSelected ? "2px solid #2b2b22" : "1px solid #e5e5e5" }}
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isSelected ? "#2b2b22" : "transparent",
                    border: isSelected ? "none" : "1px solid #d4d4d4",
                  }}
                >
                  {isSelected && <CheckIcon />}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-[#404040]">{id}</p>
                  <p className="text-sm text-[#525252]">{subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-6 pb-10 pt-4">
        <button
          onClick={onNext}
          disabled={!selected}
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
