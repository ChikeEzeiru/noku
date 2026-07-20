"use client";

import { useState, useRef, useEffect } from "react";
import { useEstateStore } from "@/store/estateStore";
import Image from "next/image";


type Props = {
  onNext: () => void;
  onBack: () => void;
};

const ROLES = ["Treasurer", "Secretary", "Fuel Manager", "Technical Officer", "Billing Officer"];

const MAX_MEMBERS = 3;

/* ── Icons ─────────────────────────────────────────────────── */

function FlipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M3.333 7.5H12.5a4.167 4.167 0 010 8.333H7.5" />
      <path d="M6.667 4.167L3.333 7.5l3.334 3.333" />
    </svg>
  );
}

function NokuIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C6.8982 9.14741 6.48284 9.28911 6.05032 9.37451ZM7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C6.45138 10.7003 6.88388 10.8438 7.277 11.086Z" fill="#17A248" />
      <path d="M20 10C20 4.477 15.523 0 10 0C4.645 0 0.273501 4.2095 0.012001 9.5L0 10.5V17C0 17.7956 0.31607 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H9.5V15.613C9.5 14.612 9.439 13.575 8.914 12.723C8.50362 12.057 7.94298 11.4964 7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C5.62275 10.5227 5.22453 10.465 4.71213 10.4095L3.02063 10.3785C2.94168 10.3515 2.87314 10.3005 2.82462 10.2326C2.77609 10.1648 2.75 10.0834 2.75 10C2.75 9.91657 2.77609 9.83522 2.82462 9.76735C2.87314 9.69948 2.94168 9.64849 3.02063 9.6215L4.71213 9.5905C5.24152 9.53503 5.64888 9.47816 6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C7.8876 8.53816 8.41022 8.03537 8.8094 7.43976C9.20857 6.84414 9.47497 6.16964 9.5905 5.462L9.6215 5.2705C9.64849 5.19155 9.69948 5.12302 9.76735 5.07449C9.83522 5.02596 9.91657 4.99987 10 4.99987C10.0834 4.99987 10.1648 5.02596 10.2326 5.07449C10.3005 5.12302 10.3515 5.19155 10.3785 5.2705L10.4095 5.462C10.5784 6.49591 11.0678 7.45066 11.8086 8.19144C12.5493 8.93222 13.5041 9.4216 14.538 9.5905L14.7295 9.6215C14.8084 9.64849 14.877 9.69948 14.9255 9.76735C14.974 9.83522 15.0001 9.91657 15.0001 10C15.0001 10.0834 14.974 10.1648 14.9255 10.2326C14.877 10.3005 14.8084 10.3515 14.7295 10.3785L14.538 10.4095C13.8304 10.5251 13.1559 10.7915 12.5603 11.1906C11.9647 11.5898 11.4619 12.1124 11.086 12.723C10.561 13.575 10.5 14.612 10.5 15.613V20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V10Z" fill="#17A248" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6.667" cy="6.667" r="4" />
      <path d="M14 14l-3.333-3.333" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 5h15M6.667 5V3.333a1.667 1.667 0 011.666-1.666h3.334a1.667 1.667 0 011.666 1.666V5m2.5 0l-.833 10a1.667 1.667 0 01-1.667 1.667H6.667A1.667 1.667 0 015 15L4.167 5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4.167v11.666M4.167 10h11.666" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M6.06 6a2 2 0 013.887.667C9.947 7.333 8 8 8 8M8 11h.007" />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────── */

export type CommitteeMember = { name: string; phone: string; role: string; dateAdded: string; email?: string };

export default function AdminOnboardingStep8({ onNext, onBack }: Props) {
  const residents = useEstateStore((s) => s.residents);
  const [query, setQuery]               = useState("");
  const [selected, setSelected]         = useState<{ name: string; phone: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [role, setRole]                 = useState("");
  const [members, setMembers]           = useState<CommitteeMember[]>([]);
  const setCommittee = useEstateStore((s) => s.setCommittee);
  const [errors, setErrors]             = useState<Record<string, boolean>>({});
  const searchRef                       = useRef<HTMLDivElement>(null);

  const addedNames = new Set(members.map((m) => m.name));
  const suggestions = residents.filter(
    (r) => !addedNames.has(r.name) && r.name.toLowerCase().includes(query.toLowerCase())
  );

  const canAdd = selected !== null && role !== "" && members.length < MAX_MEMBERS;
  const canContinue = members.length >= 1;
  const atLimit = members.length >= MAX_MEMBERS;

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelectResident = (r: { name: string; phone: string }) => {
    setSelected(r);
    setQuery(r.name);
    setShowDropdown(false);
    if (errors.name) setErrors((prev) => { const n = { ...prev }; delete n.name; return n; });
  };

  const handleAdd = () => {
    const e: Record<string, boolean> = {};
    if (!selected) e.name = true;
    if (!role)     e.role = true;
    if (Object.keys(e).length) { setErrors(e); return; }
    const dateAdded = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setMembers((prev) => [...prev, { name: selected!.name, phone: selected!.phone, role, dateAdded }]);
    setQuery("");
    setSelected(null);
    setRole("");
    setErrors({});
  };

  const handleRemove = (i: number) => {
    setMembers((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">

      {/* ── Left — form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[440px]">

          {/* Step header */}
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={onBack} className="flex items-center gap-2 bg-white border border-[#e8e8e3] rounded-[8px] p-[6px]">
              <FlipBackIcon />
              <span className="text-xs text-[#474739]">Back</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-[#525252]">
              <span>Step</span>
              <span className="text-[20px] font-bold leading-[20px] tracking-[-0.4px]">8</span>
              <span>of 8</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <NokuIcon />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              Invite Committee Members
            </p>
            <p className="text-base text-[#525252] leading-6">
              Add other committee members so they can help manage the estate. You can always add more later from Settings.
            </p>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">

              {/* Full Name search */}
              <div className="flex flex-col gap-[6px]" ref={searchRef}>
                <label className="text-sm font-medium text-[#404040] leading-5">Full Name</label>
                <div className="relative">
                  <div
                    className={`flex items-center gap-2 bg-white border rounded-[8px] pl-3 pr-3 py-2 ${errors.name ? "border-red-500" : "border-[#d4d4d4]"}`}
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                  >
                    <SearchIcon />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelected(null);
                        setShowDropdown(true);
                        if (errors.name) setErrors((prev) => { const n = { ...prev }; delete n.name; return n; });
                      }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="e.g. Seun Emeka Ahmed"
                      className="flex-1 min-w-0 text-base text-[#171717] placeholder:text-[#737373] outline-none bg-transparent"
                    />
                  </div>

                  {/* Autocomplete dropdown */}
                  {showDropdown && query.length > 0 && suggestions.length > 0 && (
                    <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-[#e5e5e5] rounded-[8px] overflow-y-auto max-h-48 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
                      {suggestions.map((r) => (
                        <button
                          key={r.name}
                          type="button"
                          onMouseDown={() => handleSelectResident(r)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-[#f5f5f5] transition-colors"
                        >
                          <span className="text-sm font-medium text-[#171717]">{r.name}</span>
                          <span className="text-xs text-[#7c7c67]">{r.phone}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.name && <p className="text-xs text-red-500">Please select a resident.</p>}
              </div>

              {/* Phone + Role row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Phone — read-only, auto-filled */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-sm font-medium text-[#474739] leading-5">Phone Number</label>
                  <div
                    className="px-[14px] py-[10px] bg-[#f4f4f0] border border-[#d8d8d0] rounded-[8px] text-base text-[#5b5b4b] opacity-75"
                    style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
                  >
                    {selected ? selected.phone : <span className="text-[#9ca3af]">e.g. 08123456789</span>}
                  </div>
                </div>

                {/* Committee Role */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center gap-1">
                    <label className="text-sm font-medium text-[#404040] leading-5">Committee Role</label>
                    <HelpCircleIcon />
                  </div>
                  <div className="relative">
                    <select
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        if (errors.role) setErrors((prev) => { const n = { ...prev }; delete n.role; return n; });
                      }}
                      className={`w-full appearance-none px-[14px] pr-10 py-[10px] bg-white border rounded-[8px] text-base outline-none focus:border-[#17a248] transition-colors cursor-pointer ${errors.role ? "border-red-500" : "border-[#d4d4d4]"}`}
                      style={{
                        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
                        color: role ? "#171717" : "#737373",
                      }}
                    >
                      <option value="" disabled>Select a role</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {errors.role && <p className="text-xs text-red-500">Required.</p>}
                </div>
              </div>

              {/* Add Member button */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={!canAdd}
                className="w-full flex items-center justify-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739] transition-opacity"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)",
                  opacity: canAdd ? 1 : 0.4,
                  cursor: canAdd ? "pointer" : "default",
                }}
              >
                Add Member
                <PlusIcon />
              </button>

              {/* Members list */}
              {members.length > 0 && (
                <div className="flex flex-col gap-0">
                  {/* Counter */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#525252]">
                      <span className="font-semibold text-[#171717]">{members.length}</span>
                      {" / "}{MAX_MEMBERS} members added
                    </p>
                    {atLimit && (
                      <p className="text-xs text-[#7c7c67]">Limit reached — add more from Settings</p>
                    )}
                  </div>

                  {/* Member rows */}
                  <div className="flex flex-col gap-3">
                    {members.map((m, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-[#5b5b4b]">
                          <span className="font-semibold w-4 shrink-0">{i + 1}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-[#474739]">{m.name}</span>
                            <span className="text-xs text-[#7c7c67]">{m.role} · {m.phone}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(i)}
                          className="p-1 rounded-[6px] hover:bg-[#f5f5f5] transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Continue CTA */}
            <button
              onClick={canContinue ? () => { setCommittee(members); onNext(); } : undefined}
              disabled={!canContinue}
              className="w-full py-[13px] px-4 rounded-[10px] text-base font-semibold text-white transition-opacity"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                opacity: canContinue ? 1 : 0.5,
                cursor: canContinue ? "pointer" : "default",
              }}
            >
              Continue
            </button>

            {/* Skip */}
            <button
              type="button"
              onClick={onNext}
              className="w-full py-[10px] px-4 text-base font-semibold text-[#5b5b4b]"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      {/* ── Right — generator image ──────────────────────────── */}
      <div className="flex-1 p-3">
        <div className="relative h-full w-full rounded-[20px] overflow-hidden">
          <Image
            src="/Images/Generator img for admin side.avif"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

    </div>
  );
}
