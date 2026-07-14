"use client";

import { useState } from "react";
import { activeIssues } from "@/lib/issues-data";
import type { Issue } from "@/lib/issues-data";

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.667 8 6.667 12 13.333 4" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 12 4M5.333 4H12v6.667" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7.5 6 4l3.5 3.5" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

function StepperInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const num = parseInt(value) || 0;
  return (
    <div className="flex-1 min-w-0 bg-white border border-[#d8d8d0] rounded-[8px] flex items-stretch overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex-1 px-3 py-2">
        <span className="text-sm font-normal leading-5 text-[#7c7c67]">{value}</span>
      </div>
      <div className="border-l border-[#d8d8d0] flex flex-col shrink-0">
        <button
          type="button"
          onClick={() => onChange(String(num + 1))}
          className="flex-1 px-2 py-[2px] flex items-end justify-center text-[#7c7c67]"
        >
          <ChevronUpIcon />
        </button>
        <div className="h-px bg-[#d8d8d0]" />
        <button
          type="button"
          onClick={() => onChange(String(Math.max(0, num - 1)))}
          className="flex-1 px-2 py-[2px] flex items-start justify-center text-[#7c7c67]"
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
}

type ActiveEdit = "personal" | "apartment" | null;

type ResidentDetailsProps = {
  onBack: () => void;
  onIssues: () => void;
  onIssueDetail: (issue: Issue) => void;
};

export default function ResidentDetails({ onBack, onIssues, onIssueDetail }: ResidentDetailsProps) {
  const [activeEdit, setActiveEdit] = useState<ActiveEdit>(null);

  // Personal fields
  const [fullName, setFullName] = useState("Ciroma Chukwuma Adekunle");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [email, setEmail] = useState("ciroma@email.com");

  // Apartment fields
  const [blockUnit] = useState("Block B, Unit 4");
  const [occupants, setOccupants] = useState("5");
  const [bedrooms, setBedrooms] = useState("3");
  const [acUnits, setAcUnits] = useState("4");

  const activeLabel =
    activeIssues.length === 0
      ? null
      : activeIssues.length === 1
      ? activeIssues[0].category
      : `${activeIssues[0].category} + ${activeIssues.length - 1} more issue${activeIssues.length - 1 > 1 ? "s" : ""}`;

  function handleIssueClick() {
    if (activeIssues.length === 1) {
      onIssueDetail(activeIssues[0]);
    } else {
      onIssues();
    }
  }

  const editingPersonal = activeEdit === "personal";
  const editingApartment = activeEdit === "apartment";

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
          <p className="text-base font-medium leading-6 text-[#7c7c67]">Resident Details</p>
        </div>

        {/* Personal section */}
        <div className="px-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal leading-5 text-[#474739]">Personal</p>
            <button
              onClick={() => setActiveEdit(editingPersonal ? null : "personal")}
              disabled={editingApartment}
              className={`flex items-center gap-1 text-sm font-medium leading-5 text-[#474739] transition-opacity ${editingApartment ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              {editingPersonal ? <>Save <CheckIcon /></> : <>Edit <EditIcon /></>}
            </button>
          </div>

          {editingPersonal ? (
            /* Edit state — bare rows with inputs */
            <div className="flex flex-col gap-2">
              {[
                { label: "Full Name", value: fullName, onChange: setFullName, type: "text" },
                { label: "Phone",     value: phone,    onChange: setPhone,    type: "tel" },
                { label: "Email",     value: email,    onChange: setEmail,    type: "email" },
              ].map(({ label, value, onChange, type }) => (
                <div key={label} className="flex items-center gap-12 py-[6px]">
                  <p className="flex-1 max-w-[88px] shrink-0 text-sm font-normal leading-5 text-[#7c7c67]">{label}</p>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 min-w-0 bg-white border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-sm font-normal leading-5 text-[#7c7c67] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] outline-none focus:border-[#23c45c]"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* View state — white card with dividers */
            <div className="bg-white border border-[#d8d8d0] rounded-[12px] py-1">
              {[
                { label: "Full Name", value: fullName },
                { label: "Phone",     value: phone },
                { label: "Email",     value: email },
              ].map(({ label, value }, i) => (
                <div key={label}>
                  {i > 0 && <div className="h-px bg-[#e8e8e3] mx-4" />}
                  <div className="px-4 py-3 flex items-center gap-10">
                    <p className="flex-1 max-w-[80px] shrink-0 text-sm font-normal leading-5 text-[#7c7c67]">{label}</p>
                    <p className="text-sm font-normal leading-5 text-[#474739] text-right flex-1">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apartment section */}
        <div className="px-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal leading-5 text-[#474739]">Apartment</p>
            <button
              onClick={() => setActiveEdit(editingApartment ? null : "apartment")}
              disabled={editingPersonal}
              className={`flex items-center gap-1 text-sm font-medium leading-5 text-[#474739] transition-opacity ${editingPersonal ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              {editingApartment ? <>Save <CheckIcon /></> : <>Edit <EditIcon /></>}
            </button>
          </div>

          {editingApartment ? (
            /* Edit state — stepper inputs, no Block/Unit */
            <div className="flex flex-col gap-2">
              {[
                { label: "Occupants", value: occupants, onChange: setOccupants },
                { label: "AC Units",  value: acUnits,   onChange: setAcUnits },
              ].map(({ label, value, onChange }) => (
                <div key={label} className="flex items-center gap-12 py-[6px]">
                  <p className="flex-1 max-w-[88px] shrink-0 text-sm font-normal leading-5 text-[#7c7c67]">{label}</p>
                  <StepperInput value={value} onChange={onChange} />
                </div>
              ))}
            </div>
          ) : (
            /* View state — bare rows with dividers */
            <div className="flex flex-col">
              {[
                { label: "Block, Unit", value: blockUnit },
                { label: "Occupants",   value: occupants },
                { label: "Bedrooms",    value: bedrooms },
                { label: "AC Units",    value: acUnits },
              ].map(({ label, value }, i) => (
                <div key={label}>
                  {i > 0 && <div className="h-px bg-[#e8e8e3]" />}
                  <div className="flex items-center gap-12 py-3">
                    <p className="flex-1 max-w-[88px] shrink-0 text-sm font-normal leading-5 text-[#7c7c67]">{label}</p>
                    <p className="text-sm font-normal leading-5 text-[#474739] whitespace-nowrap">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Issues section */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Issues</p>
          <div className="flex items-center gap-12 py-3">
            <p className="flex-1 max-w-[88px] shrink-0 text-sm font-normal leading-5 text-[#7c7c67]">Active Issues</p>
            {activeLabel ? (
              <button
                onClick={handleIssueClick}
                className="flex items-center gap-2 text-sm font-medium leading-5 text-[#474739]"
              >
                {activeLabel} <ArrowUpRightIcon />
              </button>
            ) : (
              <p className="text-sm font-normal leading-5 text-[#7c7c67]">None</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
