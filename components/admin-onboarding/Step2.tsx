"use client";

import { useState } from "react";
import { useEstateStore } from "@/store/estateStore";
import Image from "next/image";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

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
      <path d="M14 14l-3.333-3.333M10.667 6.667a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

const baseInput =
  "w-full px-[14px] py-[10px] bg-white border rounded-[8px] text-base text-[#171717] placeholder:text-[#7c7c67] outline-none focus:border-[#17a248] transition-colors";
const inputShadow = { boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" };

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-[#474739]">
      {children} <span className="text-red-500">*</span>
    </p>
  );
}

export default function AdminOnboardingStep2({ onNext, onBack }: Props) {
  const [form, setForm] = useState({ estateName: "", address: "", city: "", state: "" });
  const setEstate = useEstateStore((s) => s.setEstate);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const canProceed =
    form.estateName.trim() !== "" &&
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state.trim() !== "";

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
              <span className="text-[20px] font-bold leading-[20px] tracking-[-0.4px]">2</span>
              <span>of 8</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <NokuIcon />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              Estate Information
            </p>
            <p className="text-base text-[#525252] leading-6">
              Confirm your estate details
            </p>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">

              {/* Estate Name */}
              <div className="flex flex-col gap-[6px]">
                <FieldLabel>Estate Name</FieldLabel>
                <input
                  type="text"
                  value={form.estateName}
                  onChange={set("estateName")}
                  placeholder="e.g. Harmony Gardens Estate"
                  className={`${baseInput} border-[#d4d4d4]`}
                  style={inputShadow}
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-[6px]">
                <FieldLabel>Address</FieldLabel>
                <input
                  type="text"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Please enter the address of your estate"
                  className={`${baseInput} border-[#d4d4d4]`}
                  style={inputShadow}
                />
              </div>

              {/* City + State */}
              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="flex flex-col gap-[6px]">
                  <FieldLabel>City</FieldLabel>
                  <div
                    className="flex items-center gap-2 bg-white border border-[#d4d4d4] rounded-[8px] pl-[12px] pr-[8px] py-[8px]"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                  >
                    <span className="shrink-0"><SearchIcon /></span>
                    <input
                      type="text"
                      value={form.city}
                      onChange={set("city")}
                      placeholder="e.g. Ikeja"
                      className="flex-1 min-w-0 text-base text-[#171717] placeholder:text-[#737373] outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* State */}
                <div className="flex flex-col gap-[6px]">
                  <FieldLabel>State</FieldLabel>
                  <div
                    className="flex items-center gap-2 bg-white border border-[#d4d4d4] rounded-[8px] pl-[12px] pr-[8px] py-[8px]"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                  >
                    <span className="shrink-0"><SearchIcon /></span>
                    <input
                      type="text"
                      value={form.state}
                      onChange={set("state")}
                      placeholder="e.g. Lagos"
                      className="flex-1 min-w-0 text-base text-[#171717] placeholder:text-[#737373] outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => { setEstate(form); onNext(); }}
              disabled={!canProceed}
              className="w-full py-[13px] px-4 rounded-[10px] text-base font-semibold text-white transition-opacity"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                opacity: canProceed ? 1 : 0.5,
                cursor: canProceed ? "pointer" : "default",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Right — generator image */}
      <div className="flex-1 p-3">
        <div className="relative h-full w-full rounded-[20px] overflow-hidden">
          <Image src="/Images/Generator img for admin side.avif" alt="" fill className="object-cover" priority />
        </div>
      </div>
    </div>
  );
}
