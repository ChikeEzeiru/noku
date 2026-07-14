"use client";

import { useState } from "react";
import Image from "next/image";

function StepDots({ step }: { step: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1">
      {([0, 1, 2, 3] as const).map((i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-200"
          style={{
            width: i === step ? 24 : 8,
            height: i === step ? 8 : 6,
            backgroundColor: i === step ? "#17a248" : "#e8e8e3",
          }}
        />
      ))}
    </div>
  );
}

type CreateAccountScreenProps = {
  onNext: (name: string, phone: string) => void;
  onBack: () => void;
};

export default function CreateAccountScreen({
  onNext,
  onBack,
}: CreateAccountScreenProps) {
  const [name, setName] = useState("Ciroma Chukwuma Adekunle");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canProceed = name.trim() && phone.trim() && password.length >= 6;

  return (
    <div className="h-[calc(100vh-44px)] bg-noku-bg flex flex-col">
      <div className="flex-1 overflow-y-auto flex flex-col gap-12 px-6 pt-6">
        {/* Step indicator */}
        <StepDots step={2} />

        {/* Illustration */}
        <div className="flex items-center justify-center">
          <Image
            src="/Images/Noku Logo Vector.svg"
            alt=""
            height={200}
            width={200}
            className="w-50 h-50 object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
              Create your account
            </p>
            <p className="text-base text-[#5b5b4b] leading-6">
              Fill in your details to complete registration.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-noku-text-mid">
                Your full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2 text-sm text-noku-heading outline-none focus:border-noku-brand-mid"
                style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-noku-text-mid">
                Your phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2 text-sm text-noku-heading outline-none focus:border-noku-brand-mid"
                style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-noku-text-mid">
                Create password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2 pr-10 text-sm text-noku-heading placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid"
                  style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-noku-text-dim"
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 8s2.667-4 6-4 6 4 6 4-2.667 4-6 4-6-4-6-4Z" />
                      <circle cx="8" cy="8" r="1.5" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 2l12 12M6.667 6.727A1.5 1.5 0 0 0 9.273 9.333M3.347 3.413C2.047 4.36 1.04 5.867 1.04 8c0 0 2.32 5.333 6.96 5.333a7.12 7.12 0 0 0 3.693-1.08M6.013 2.8A7.267 7.267 0 0 1 8 2.667C12.64 2.667 14.96 8 14.96 8c-.4.747-.893 1.44-1.467 2.053" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 px-6 pb-10 pt-4 flex items-center justify-end gap-4">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#5b5b4b]"
        >
          Back
        </button>
        <button
          onClick={() => onNext(name.trim(), phone.trim())}
          disabled={!canProceed}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
          style={{
            backgroundColor: "#17a248",
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)",
          }}
        >
          Next
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
