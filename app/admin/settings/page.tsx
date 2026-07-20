"use client";

import { useState, useEffect, useRef } from "react";
import { useEstateStore } from "@/store/estateStore";
import type { CommitteeMember } from "@/components/admin-onboarding/Step8";

const TABS = [
  "Estate Info",
  "Generator Schedule",
  "Billing Formula",
  "Payment Settings",
  "Committee Mgt",
  "Data & Reports",
  "Danger Zone",
] as const;

type Tab = (typeof TABS)[number];

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 17.5L14.583 14.583M16.667 9.583a7.083 7.083 0 11-14.167 0 7.083 7.083 0 0114.167 0z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="9" height="9" rx="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
    </svg>
  );
}

function RegenerateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 8A6.5 6.5 0 0114 5.5M14.5 8A6.5 6.5 0 012 10.5M1.5 4v2h2M12.5 10v2h2" />
    </svg>
  );
}

function RequiredStar() {
  return <span className="text-noku-green ml-0.5">*</span>;
}

function SectionDivider() {
  return <div className="border-t border-[#e5e5e5]" />;
}

function FormInput({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-3 py-2.5 text-sm border border-[#d1d5db] rounded-lg text-noku-heading placeholder:text-[#9ca3af] outline-none focus:border-[#ABAB9C] transition-colors bg-white"
    />
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.75 3.5h10.5M5.25 3.5V2.333a.583.583 0 01.583-.583h2.334a.583.583 0 01.583.583V3.5M11.083 3.5l-.583 7.583a.583.583 0 01-.583.584H4.083a.583.583 0 01-.583-.584L2.917 3.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 6.75l4.5 4.5 4.5-4.5" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M6.06 6a2 2 0 013.887.667C9.947 7.333 8 8 8 8M8 11h.007" />
    </svg>
  );
}

const ROLES = ["Treasurer", "Secretary", "Fuel Manager", "Technical Officer", "Billing Officer"];

type ModalTab = "resident" | "non-resident";

function RoleSelect({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-0.5">
        <label className="text-sm font-medium text-[#404040]">Role</label>
        <span className="text-noku-green text-sm">*</span>
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none px-3 pr-9 py-[9px] bg-white border rounded-[8px] text-sm outline-none focus:border-[#ABAB9C] transition-colors cursor-pointer ${error ? "border-red-400" : "border-[#d4d4d4]"}`}
          style={{
            boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
            color: value ? "#171717" : "#737373",
          }}
        >
          <option value="" disabled>e.g. Electricity Committee</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon />
        </span>
      </div>
      {error && <p className="text-xs text-red-500">Required.</p>}
    </div>
  );
}

function AddMemberModal({ onClose, onAdd }: { onClose: () => void; onAdd: (m: CommitteeMember) => void }) {
  const residents = useEstateStore((s) => s.residents);
  const committee = useEstateStore((s) => s.committee);
  const [tab, setTab] = useState<ModalTab>("resident");

  // Resident tab
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ name: string; phone: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Non-resident tab
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Shared
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const addedNames = new Set(committee.map((m) => m.name));
  const suggestions = residents.filter(
    (r) => r.name.trim() !== "" && !addedNames.has(r.name) && r.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchTab = (t: ModalTab) => {
    setTab(t);
    setErrors({});
    setQuery(""); setSelected(null);
    setFullName(""); setPhone(""); setEmail("");
    setRole("");
  };

  const clearErr = (key: string) => setErrors((p) => { const n = { ...p }; delete n[key]; return n; });

  const handleAdd = () => {
    const e: Record<string, boolean> = {};
    if (tab === "resident") {
      if (!selected) e.name = true;
    } else {
      if (!fullName.trim()) e.name = true;
      if (!phone.trim()) e.phone = true;
      if (!email.trim()) e.email = true;
    }
    if (!role) e.role = true;
    if (Object.keys(e).length) { setErrors(e); return; }

    const dateAdded = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (tab === "resident") {
      onAdd({ name: selected!.name, phone: selected!.phone, role, dateAdded });
    } else {
      onAdd({ name: fullName.trim(), phone: phone.trim(), email: email.trim(), role, dateAdded });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[16px] w-full max-w-[480px] flex flex-col overflow-hidden"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="relative flex flex-col gap-4 px-6 pt-6 pb-5">
          {/* Featured icon */}
          <div
            className="relative w-10 h-10 rounded-[8px] flex items-center justify-center bg-white border border-[#d4d4d4] shrink-0"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#404040" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
              <circle cx="10" cy="8.5" r="2.5" />
              <path d="M4.5 17.5c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" />
            </svg>
          </div>

          {/* Title + subtitle */}
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-[#171717]">
              Add a {tab === "resident" ? "Resident" : "Non Resident"} Committee member
            </p>
            <p className="text-sm text-[#525252]">Add a user to help manage the estate</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-[8px] text-[#737373] hover:bg-[#f5f5f5] transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e5e5e5] mx-0" />

        {/* Tab switcher */}
        <div className="px-6 pt-5">
          <div className="inline-flex items-center gap-[2px] bg-[#fafafa] border border-[#e5e5e5] rounded-[8px]">
            {(["resident", "non-resident"] as ModalTab[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`h-9 px-[10px] text-sm font-semibold rounded-[8px] transition-colors whitespace-nowrap ${
                  tab === t
                    ? "bg-white border border-[#d4d4d4] text-[#404040] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                    : "text-[#737373]"
                }`}
              >
                {t === "resident" ? "Resident" : "Non Resident"}
              </button>
            ))}
          </div>
        </div>

        {/* Form content */}
        <div className="px-6 pt-5 pb-0 flex flex-col gap-4">
          {tab === "resident" ? (
            <>
              {/* Select Member — full width */}
              <div className="flex flex-col gap-1.5" ref={searchRef}>
                <div className="flex items-center gap-[2px]">
                  <label className="text-sm font-medium text-[#404040]">Select Member</label>
                  <span className="text-noku-green text-sm">*</span>
                  <span className="ml-1"><HelpCircleIcon /></span>
                </div>
                <div className="relative">
                  <div
                    className={`flex items-center gap-2 bg-white border rounded-[8px] pl-3 pr-2 py-[9px] opacity-80 ${errors.name ? "border-red-400" : "border-[#d4d4d4]"}`}
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                  >
                    <SearchIcon />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setSelected(null); setShowDropdown(true); clearErr("name"); }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="Choose a member from the resident list"
                      className="flex-1 min-w-0 text-base text-[#171717] placeholder:text-[#737373] outline-none bg-transparent"
                    />
                  </div>
                  {showDropdown && query.length > 0 && suggestions.length > 0 && (
                    <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-[#e5e5e5] rounded-[8px] overflow-y-auto max-h-48 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
                      {suggestions.map((r) => (
                        <button
                          key={r.name}
                          type="button"
                          onMouseDown={() => { setSelected(r); setQuery(r.name); setShowDropdown(false); clearErr("name"); }}
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
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#474739]">Phone No</label>
                  <div
                    className="px-3 py-[9px] bg-[#f4f4f0] border border-[#d8d8d0] rounded-[8px] text-base min-h-[42px] flex items-center opacity-75"
                    style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
                  >
                    {selected
                      ? <span className="text-[#7c7c67]">{selected.phone}</span>
                      : <span className="text-[#7c7c67]">e.g. 08123456789</span>
                    }
                  </div>
                </div>
                <RoleSelect value={role} onChange={(v) => { setRole(v); clearErr("role"); }} error={errors.role} />
              </div>
            </>
          ) : (
            <>
              {/* Full Name — full width */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-0.5">
                  <label className="text-sm font-medium text-[#474739]">Member Full Name</label>
                  <span className="text-noku-green text-sm">*</span>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); clearErr("name"); }}
                  placeholder="e.g. Emeka Femi Mohammed"
                  className={`w-full px-3 py-[9px] text-base border rounded-[8px] text-noku-heading placeholder:text-[#737373] outline-none focus:border-[#ABAB9C] transition-colors bg-white opacity-80 ${errors.name ? "border-red-400" : "border-[#d8d8d0]"}`}
                  style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
                />
                {errors.name && <p className="text-xs text-red-500">Required.</p>}
              </div>

              {/* Email — full width (added field) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-0.5">
                  <label className="text-sm font-medium text-[#474739]">Email Address</label>
                  <span className="text-noku-green text-sm">*</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                  placeholder="e.g. emeka@example.com"
                  className={`w-full px-3 py-[9px] text-base border rounded-[8px] text-noku-heading placeholder:text-[#737373] outline-none focus:border-[#ABAB9C] transition-colors bg-white opacity-80 ${errors.email ? "border-red-400" : "border-[#d8d8d0]"}`}
                  style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
                />
                {errors.email && <p className="text-xs text-red-500">Required.</p>}
              </div>

              {/* Phone + Role row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <label className="text-sm font-medium text-[#474739]">Phone No</label>
                    <span className="text-noku-green text-sm">*</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }}
                    placeholder="e.g. 08123456789"
                    className={`w-full px-3 py-[9px] text-base border rounded-[8px] text-noku-heading placeholder:text-[#737373] outline-none focus:border-[#ABAB9C] transition-colors bg-white ${errors.phone ? "border-red-400" : "border-[#d8d8d0]"}`}
                    style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
                  />
                  {errors.phone && <p className="text-xs text-red-500">Required.</p>}
                </div>
                <RoleSelect value={role} onChange={(v) => { setRole(v); clearErr("role"); }} error={errors.role} />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8">
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center justify-end gap-3 px-6 py-6">
            <button
              onClick={onClose}
              className="flex items-center justify-center px-4 py-[10px] rounded-[8px] text-base font-semibold text-[#474739] bg-white relative"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-1.5 px-4 py-[10px] rounded-[8px] text-base font-semibold text-white relative"
              style={{
                backgroundColor: "#2b2b22",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Add Member
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                <path d="M8 3v10M3 8h10" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function CommitteeMgtTab() {
  const committee = useEstateStore((s) => s.committee);
  const setCommittee = useEstateStore((s) => s.setCommittee);
  const admin = useEstateStore((s) => s.admin);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const anyChecked = checked.size > 0;
  const allChecked = checked.size === committee.length && committee.length > 0;

  const toggleAll = () => {
    if (allChecked) {
      setChecked(new Set());
    } else {
      setChecked(new Set(committee.map((_, i) => i)));
    }
  };

  const toggleRow = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const confirmRemove = () => {
    setCommittee(committee.filter((_, i) => !checked.has(i)));
    setChecked(new Set());
    setShowRemoveConfirm(false);
  };

  return (
    <div className="flex flex-col gap-0">
      {showModal && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onAdd={(m) => setCommittee([...committee, m])}
        />
      )}

      {showRemoveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[400px] flex flex-col overflow-hidden"
            style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03)" }}
          >
            <div className="px-6 pt-6 pb-5 flex flex-col gap-3">
              <p className="text-base font-semibold text-[#171717]">
                {checked.size === 1
                  ? `Remove ${committee[Array.from(checked)[0]]?.name}?`
                  : `Remove ${checked.size} members?`}
              </p>
              <p className="text-sm text-[#525252] leading-5">
                {checked.size === 1
                  ? `${committee[Array.from(checked)[0]]?.name} will be removed from the committee. You can add them back later.`
                  : `These ${checked.size} members will be removed from the committee. You can add them back later.`}
              </p>
            </div>
            <div className="h-px bg-[#e5e5e5]" />
            <div className="flex items-center justify-end gap-3 px-6 py-4">
              <button
                onClick={() => setShowRemoveConfirm(false)}
                className="px-4 py-[10px] rounded-[8px] text-sm font-semibold text-[#474739] bg-white"
                style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-[10px] rounded-[8px] text-sm font-semibold text-white"
                style={{
                  backgroundColor: "#dc2626",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-noku-heading">Committee</p>
            <p className="text-sm text-[#525252] truncate">You can manage the Power committee here</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-white rounded-[8px] px-[14px] py-[9px] text-sm font-semibold text-[#474739] shrink-0"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
          >
            Add member
            <PlusIcon />
          </button>
        </div>
        <SectionDivider />
      </div>

      {/* Content */}
      <div className="py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 shrink-0">
          <p className="text-sm font-semibold text-noku-heading">Committee list</p>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Action bar — appears when rows are selected */}
          {anyChecked && (
            <div className="flex items-center justify-between gap-3 px-3 py-2.5 bg-[#fff8f8] border border-[#fecaca] rounded-[8px]">
              <p className="text-sm text-[#474739]">
                <span className="font-semibold">{checked.size}</span> member{checked.size !== 1 ? "s" : ""} selected
              </p>
              <button
                onClick={() => setShowRemoveConfirm(true)}
                className="flex items-center gap-1.5 bg-white rounded-[8px] px-[12px] py-[7px] text-sm font-semibold text-[#dc2626]"
                style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(220,38,38,0.3), inset 0px -2px 0px 0px rgba(220,38,38,0.1)" }}
              >
                <TrashIcon />
                Remove selected
              </button>
            </div>
          )}

          {/* Desktop table */}
          <div className="hidden lg:block border border-[#d8d8d0] rounded-[12px] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fbfbf9] border-b border-[#e8e8e3] h-10">
                  <th className="w-12 px-3 text-left">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      disabled={committee.length === 0}
                      className="w-4 h-4 rounded border border-[#d4d4d4] accent-noku-green cursor-pointer disabled:cursor-not-allowed"
                    />
                  </th>
                  {["Member Name", "Phone Number", "Role", "Date Added"].map((col) => (
                    <th key={col} className="px-3 py-2.5 text-left text-xs font-medium text-[#7c7c67] uppercase tracking-wide whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Current admin row — greyed out, not selectable */}
                {admin && (
                  <tr className="border-b border-[#e8e8e3] bg-[#fbfbf9] opacity-50">
                    <td className="w-12 px-3 py-3.5">
                      <input type="checkbox" disabled className="w-4 h-4 rounded border border-[#d4d4d4] cursor-not-allowed" />
                    </td>
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className="font-medium text-[#474739]">{admin.fullName}</span>
                      <span className="ml-2 text-xs text-[#9ca3af]">(you)</span>
                    </td>
                    <td className="px-3 py-3.5 text-[#474739] whitespace-nowrap">{admin.phone || "—"}</td>
                    <td className="px-3 py-3.5 text-[#474739] whitespace-nowrap capitalize">{admin.role || "Admin"}</td>
                    <td className="px-3 py-3.5 text-[#474739] whitespace-nowrap">—</td>
                  </tr>
                )}
                {committee.length === 0 && !admin ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-12 text-center text-sm text-[#9ca3af]">
                      No committee members yet
                    </td>
                  </tr>
                ) : null}
                {committee.map((member, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#e8e8e3] last:border-0 transition-colors ${checked.has(i) ? "bg-[#fbfbf9]" : "hover:bg-[#fafaf9]"}`}
                  >
                    <td className="w-12 px-3 py-3.5">
                      <input
                        type="checkbox"
                        checked={checked.has(i)}
                        onChange={() => toggleRow(i)}
                        className="w-4 h-4 rounded border border-[#d4d4d4] accent-noku-green cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-3.5 font-medium text-[#474739] whitespace-nowrap">{member.name}</td>
                    <td className="px-3 py-3.5 text-[#474739] whitespace-nowrap">{member.phone || "—"}</td>
                    <td className="px-3 py-3.5 text-[#474739] whitespace-nowrap capitalize">{member.role}</td>
                    <td className="px-3 py-3.5 text-[#474739] whitespace-nowrap">{member.dateAdded || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden flex flex-col gap-3">
            {/* Current admin card — greyed out */}
            {admin && (
              <div className="border border-[#e8e8e3] rounded-[12px] p-4 flex items-start gap-3 opacity-50">
                <input type="checkbox" disabled className="mt-0.5 w-4 h-4 rounded border border-[#d4d4d4] cursor-not-allowed shrink-0" />
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-[#474739] truncate">{admin.fullName}</p>
                    <span className="text-xs text-[#9ca3af]">(you)</span>
                  </div>
                  <p className="text-xs text-[#525252] capitalize">{admin.role || "Admin"}</p>
                  {admin.phone && <p className="text-xs text-[#737373]">{admin.phone}</p>}
                </div>
              </div>
            )}
            {committee.length === 0 && !admin && (
              <div className="border border-[#d8d8d0] rounded-[12px] py-12 flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-noku-heading">No committee members yet</p>
                <p className="text-sm text-[#737373] text-center max-w-xs">Members added during onboarding will appear here.</p>
              </div>
            )}
            {committee.map((member, i) => (
              <div
                key={i}
                className={`border rounded-[12px] p-4 flex items-start gap-3 transition-colors ${checked.has(i) ? "border-[#d8d8d0] bg-[#fbfbf9]" : "border-[#d8d8d0]"}`}
              >
                <input
                  type="checkbox"
                  checked={checked.has(i)}
                  onChange={() => toggleRow(i)}
                  className="mt-0.5 w-4 h-4 rounded border border-[#d4d4d4] accent-noku-green cursor-pointer shrink-0"
                />
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-sm font-medium text-[#474739] truncate">{member.name}</p>
                  <p className="text-xs text-[#525252] capitalize">{member.role}</p>
                  {member.phone && <p className="text-xs text-[#737373]">{member.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}

function EstateInfoTab() {
  const { estate, structure } = useEstateStore();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [inviteCode] = useState("nudaiw8374erfb");

  useEffect(() => {
    if (estate) {
      setAddress(estate.address);
      setCity(estate.city);
      setState(estate.state);
    }
  }, [estate]);

  const estateName = estate?.estateName ?? "—";
  const blockCount = structure?.buildingNames.length ?? 0;
  const totalUnits = structure?.aptCounts.reduce((a, b) => a + b, 0) ?? 0;

  const blockRange = blockCount > 0
    ? `Building ${structure!.buildingNames[0]} – ${structure!.buildingNames[blockCount - 1]}`
    : "—";

  const aptNaming = structure?.aptNaming ?? "Unit";
  const unitsPerBlock = blockCount > 0 ? (structure!.aptCounts[0] ?? 0) : 0;
  const unitRange = unitsPerBlock > 0 ? `${aptNaming} 1 – ${unitsPerBlock}` : "—";

  return (
    <div className="flex flex-col">
      {/* Estate name */}
      <div className="py-6">
        <p className="text-sm font-semibold text-noku-heading mb-1">Estate</p>
        <p className="text-sm text-[#525252]">{estateName}</p>
      </div>

      <SectionDivider />

      {/* Estate Details */}
      <div className="py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 shrink-0">
          <p className="text-sm font-semibold text-noku-heading">
            Estate Details<RequiredStar />
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#404040]">
              Address<RequiredStar />
            </label>
            <FormInput value={address} onChange={setAddress} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#404040]">
                City<RequiredStar />
              </label>
              <FormInput value={city} onChange={setCity} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#404040]">
                State<RequiredStar />
              </label>
              <FormInput value={state} onChange={setState} />
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Infrastructure */}
      <div className="py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 shrink-0">
          <p className="text-sm font-semibold text-noku-heading">Infrastructure</p>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[#737373]">Number of blocks</p>
              <p className="text-sm text-noku-heading">
                <span className="font-semibold">{blockCount || "—"}</span>{" "}
                {blockCount > 0 && <span className="text-[#737373]">({blockRange})</span>}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[#737373]">Units per block</p>
              <p className="text-sm text-noku-heading">
                <span className="font-semibold">{unitsPerBlock || "—"}</span>{" "}
                {unitsPerBlock > 0 && <span className="text-[#737373]">({unitRange})</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#737373]">Total Units in the Estate</p>
            <p className="text-sm font-semibold text-noku-heading">{totalUnits || "—"}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[#737373]">Estate Invite Code</p>
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm font-mono font-medium text-noku-heading">{inviteCode}</p>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 bg-white rounded-[8px] px-[12px] py-[8px] text-sm font-semibold text-[#474739]"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
                >
                  Copy
                  <CopyIcon />
                </button>
                <button
                  className="flex items-center gap-1.5 bg-white rounded-[8px] px-[12px] py-[8px] text-sm font-semibold text-[#474739]"
                  style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
                >
                  Regenerate
                  <RegenerateIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}

function DangerZoneTab() {
  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    localStorage.removeItem("noku-estate");
    window.location.href = "/admin-onboarding";
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div className="border border-[#fca5a5] rounded-xl p-5 flex flex-col gap-4 bg-[#fff5f5]">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[#dc2626]">Reset prototype data</p>
          <p className="text-sm text-[#737373]">
            Clears all onboarding data from local storage and returns to the onboarding flow. Use this to test a fresh setup.
          </p>
        </div>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="self-start flex items-center gap-2 rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-white"
            style={{ backgroundColor: "#dc2626", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1), inset 0 -2px 0 rgba(0,0,0,0.15)" }}
          >
            Reset all data
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-[#dc2626]">Are you sure? This cannot be undone.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-white"
                style={{ backgroundColor: "#dc2626", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1), inset 0 -2px 0 rgba(0,0,0,0.15)" }}
              >
                Yes, reset everything
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739]"
                style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("Estate Info");

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-noku-heading tracking-tight">Settings</h1>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 py-2 text-sm border border-[#e5e5e5] rounded-lg bg-white text-noku-heading placeholder:text-[#9ca3af] outline-none focus:border-[#ABAB9C] transition-colors w-52"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          />
        </div>
      </div>

      {/* Tab row */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-1 bg-noku-secondary-alt border border-noku-rule rounded-lg w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                activeTab === tab
                  ? "border border-noku-rule bg-white font-semibold text-noku-heading shadow-sm"
                  : "border border-transparent font-medium text-[#525252] hover:text-noku-heading"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "Estate Info" ? (
        <EstateInfoTab />
      ) : activeTab === "Committee Mgt" ? (
        <CommitteeMgtTab />
      ) : activeTab === "Danger Zone" ? (
        <DangerZoneTab />
      ) : (
        <div className="py-16 flex items-center justify-center text-sm text-[#9ca3af]">
          {activeTab} — coming soon
        </div>
      )}
    </div>
  );
}
