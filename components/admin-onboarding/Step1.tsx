"use client";

import { useState } from "react";
import { useEstateStore } from "@/store/estateStore";
import Image from "next/image";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

function NokuIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C6.8982 9.14741 6.48284 9.28911 6.05032 9.37451ZM7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C6.45138 10.7003 6.88388 10.8438 7.277 11.086Z"
        fill="#17A248"
      />
      <path
        d="M20 10C20 4.477 15.523 0 10 0C4.645 0 0.273501 4.2095 0.012001 9.5L0 10.5V17C0 17.7956 0.31607 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H9.5V15.613C9.5 14.612 9.439 13.575 8.914 12.723C8.50362 12.057 7.94298 11.4964 7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C5.62275 10.5227 5.22453 10.465 4.71213 10.4095L3.02063 10.3785C2.94168 10.3515 2.87314 10.3005 2.82462 10.2326C2.77609 10.1648 2.75 10.0834 2.75 10C2.75 9.91657 2.77609 9.83522 2.82462 9.76735C2.87314 9.69948 2.94168 9.64849 3.02063 9.6215L4.71213 9.5905C5.24152 9.53503 5.64888 9.47816 6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C7.8876 8.53816 8.41022 8.03537 8.8094 7.43976C9.20857 6.84414 9.47497 6.16964 9.5905 5.462L9.6215 5.2705C9.64849 5.19155 9.69948 5.12302 9.76735 5.07449C9.83522 5.02596 9.91657 4.99987 10 4.99987C10.0834 4.99987 10.1648 5.02596 10.2326 5.07449C10.3005 5.12302 10.3515 5.19155 10.3785 5.2705L10.4095 5.462C10.5784 6.49591 11.0678 7.45066 11.8086 8.19144C12.5493 8.93222 13.5041 9.4216 14.538 9.5905L14.7295 9.6215C14.8084 9.64849 14.877 9.69948 14.9255 9.76735C14.974 9.83522 15.0001 9.91657 15.0001 10C15.0001 10.0834 14.974 10.1648 14.9255 10.2326C14.877 10.3005 14.8084 10.3515 14.7295 10.3785L14.538 10.4095C13.8304 10.5251 13.1559 10.7915 12.5603 11.1906C11.9647 11.5898 11.4619 12.1124 11.086 12.723C10.561 13.575 10.5 14.612 10.5 15.613V20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V10Z"
        fill="#17A248"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (!open) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 2l12 12M6.585 6.595A2 2 0 008 10a2 2 0 002-2 2 2 0 00-.405-1.205M4.368 4.376C3.045 5.183 1.92 6.454 1.333 8c.934 2.567 3.4 4.333 6.667 4.333a7.147 7.147 0 003.532-.921M7.167 3.72A7.13 7.13 0 018 3.667c3.267 0 5.733 1.766 6.667 4.333-.38 1.042-.997 1.94-1.8 2.66" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.333 8C2.267 5.433 4.733 3.667 8 3.667c3.267 0 5.733 1.766 6.667 4.333C13.733 10.567 11.267 12.333 8 12.333c-3.267 0-5.733-1.766-6.667-4.333z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

function CheckCircleIcon({ valid }: { valid: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={valid ? "#17a248" : "#737373"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
      <circle cx="8" cy="8" r="6" />
      <path d="M5.5 8l1.75 1.75L10.5 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

const inputClass =
  "w-full px-[14px] py-[10px] bg-white border border-[#d4d4d4] rounded-[8px] text-base text-[#171717] placeholder:text-[#7c7c67] outline-none focus:border-[#17a248] transition-colors";
const inputShadow = { boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" };

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-[#474739]">
      {children} <span className="text-red-500">*</span>
    </p>
  );
}

function FlipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M3.333 7.5H12.5a4.167 4.167 0 010 8.333H7.5" />
      <path d="M6.667 4.167L3.333 7.5l3.334 3.333" />
    </svg>
  );
}

export default function AdminOnboardingStep1({ onNext, onBack }: Props) {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  const setAdmin = useEstateStore((s) => s.setAdmin);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const canProceed =
    form.fullName.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.length >= 6 &&
    form.role !== "";

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[360px]">

          {/* Step header */}
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={onBack} className="flex items-center gap-2 bg-white border border-[#e8e8e3] rounded-[8px] p-[6px]">
              <FlipBackIcon />
              <span className="text-xs text-[#474739]">Back</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-[#525252]">
              <span>Step</span>
              <span className="text-[20px] font-bold leading-[20px] tracking-[-0.4px]">1</span>
              <span>of 8</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <NokuIcon />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              Create your account
            </p>
            <p className="text-base text-[#525252] leading-6">
              Create your personal account by filling the details below:
            </p>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-6">
            {/* Fields */}
            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-[6px]">
                <FieldLabel>Full Name</FieldLabel>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="Enter your full name"
                  className={inputClass}
                  style={inputShadow}
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-[6px]">
                  <FieldLabel>Phone Number</FieldLabel>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="e.g. 08123456789"
                    className={inputClass}
                    style={inputShadow}
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <FieldLabel>Email</FieldLabel>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Enter your email"
                    className={inputClass}
                    style={inputShadow}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[6px]">
                <FieldLabel>Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Create a password"
                    className={`${inputClass} pr-10`}
                    style={inputShadow}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373]"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <CheckCircleIcon valid={form.password.length >= 6} />
                  <p className="text-sm transition-colors" style={{ color: form.password.length >= 6 ? "#17a248" : "#5b5b4b" }}>
                    Must be at least 6 characters.
                  </p>
                </div>
              </div>

              {/* Role in committee */}
              <div className="flex flex-col gap-[6px]">
                <FieldLabel>Role in committee</FieldLabel>
                <div className="relative">
                  <select
                    value={form.role}
                    onChange={set("role")}
                    className="w-full appearance-none px-[12px] py-[8px] bg-white border border-[#d4d4d4] rounded-[8px] text-base outline-none focus:border-[#17a248] transition-colors pr-10 cursor-pointer"
                    style={{
                      boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
                      color: form.role ? "#171717" : "#737373",
                    }}
                  >
                    <option value="" disabled>Select a Role</option>
                    <option value="chairman">Chairman</option>
                    <option value="secretary">Secretary</option>
                    <option value="treasurer">Treasurer</option>
                    <option value="member">Committee Member</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => { setAdmin({ fullName: form.fullName, phone: form.phone, email: form.email, role: form.role }); onNext(); }}
              disabled={!canProceed}
              className="w-full py-[13px] px-4 rounded-[10px] text-base font-semibold text-white transition-opacity"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                opacity: canProceed ? 1 : 0.5,
                cursor: canProceed ? "pointer" : "default",
              }}
            >
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Right — generator image */}
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
