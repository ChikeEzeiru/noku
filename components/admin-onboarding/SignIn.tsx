"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  onSignUp: () => void;
};

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

export default function SignIn({ onSignUp }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[360px]">

          {/* Header */}
          <div className="flex flex-col gap-16 items-center">
            {/* Logo */}
            <Image src="/Images/Noku Full logo.svg" alt="Noku" width={116} height={34} />

            {/* Title + subtitle */}
            <div className="flex flex-col gap-3 text-center w-full">
              <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
                Log in to your account
              </p>
              <p className="text-base text-[#525252] leading-6">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-4">
            {/* Joined input card */}
            <div
              className="bg-white border border-[#d8d8d0] rounded-[9px] overflow-hidden"
              style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
            >
              {/* Email */}
              <div className="px-[14px] py-[10px] border-b border-[#d8d8d0]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-base text-[#171717] placeholder:text-[#7c7c67] outline-none bg-transparent"
                />
              </div>
              {/* Password */}
              <div className="px-[14px] py-[10px] flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="flex-1 text-base text-[#171717] placeholder:text-[#7c7c67] placeholder:opacity-50 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              onClick={() => router.push("/admin")}
              className="w-full py-[10px] px-4 rounded-[8px] text-base font-semibold text-white border-2 border-[rgba(255,255,255,0.12)]"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Sign in
            </button>
          </div>

          {/* Footer links */}
          <div className="flex flex-col gap-3 items-center">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-[#525252]">Don't have an account?</span>
              <button onClick={onSignUp} className="font-semibold text-[#16803c]">
                Sign up
              </button>
            </div>
            <button className="text-sm font-semibold text-[#16803c]">
              Forgot password
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
