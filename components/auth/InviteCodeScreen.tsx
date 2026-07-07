"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

const VALID_CODE = "123456";
const CODE_LENGTH = 6;

type InviteCodeScreenProps = {
  onNext: () => void;
};

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

export default function InviteCodeScreen({ onNext }: InviteCodeScreenProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");

  function focusAt(i: number) {
    refs.current[i]?.focus();
  }

  function handleChange(i: number, val: string) {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    setError(false);
    if (digit && i < CODE_LENGTH - 1) focusAt(i + 1);
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const next = [...digits];
        next[i] = "";
        setDigits(next);
      } else if (i > 0) {
        focusAt(i - 1);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      focusAt(i - 1);
    } else if (e.key === "ArrowRight" && i < CODE_LENGTH - 1) {
      focusAt(i + 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((d, i) => { next[i] = d; });
    setDigits(next);
    setError(false);
    focusAt(Math.min(pasted.length, CODE_LENGTH - 1));
  }

  function handleContinue() {
    if (code.length < CODE_LENGTH) return;
    if (code === VALID_CODE) {
      onNext();
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-[calc(100vh-44px)] bg-noku-bg flex flex-col justify-between pt-6 pb-10">
      <div className="flex flex-col gap-12 px-6">

        {/* Step indicator */}
        <StepDots step={0} />

        {/* Illustration + content */}
        <div className="flex flex-col gap-12 items-center">
          <img
            src="https://www.figma.com/api/mcp/asset/fb7a5bf6-5e3f-40d2-8966-0e061dcef8b2"
            alt=""
            className="w-[200px] h-[200px] object-contain"
          />

          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
                Enter invite code
              </p>
              <p className="text-base text-[#5b5b4b] leading-6">
                Your estate committee will share this code with you
              </p>
            </div>

            {/* OTP boxes */}
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-noku-text-mid">Code</p>
              <div className="flex gap-2">
                {digits.map((d, i) => (
                  <div key={i} className="relative flex-1 min-w-[44px]">
                    {!d && (
                      <span className="absolute inset-0 flex items-center justify-center text-[18px] font-medium text-noku-text-dim opacity-50 pointer-events-none select-none">
                        0
                      </span>
                    )}
                    <input
                      ref={(el) => { refs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      onFocus={(e) => e.target.select()}
                      autoFocus={i === 0}
                      className={`w-full h-[52px] bg-white rounded-[8px] border px-[14px] py-[10px] text-[18px] font-medium text-center text-noku-heading outline-none transition-colors
                        ${error
                          ? "border-noku-red"
                          : d || document.activeElement === refs.current[i]
                          ? "border-noku-brand-mid"
                          : "border-noku-nav-border focus:border-noku-brand-mid"
                        }`}
                      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                    />
                  </div>
                ))}
              </div>
              {error && (
                <p className="text-xs text-noku-red">Incorrect code. Try <strong>123456</strong></p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 flex justify-end">
        <button
          onClick={handleContinue}
          disabled={code.length < CODE_LENGTH}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
          style={{
            backgroundColor: "#17a248",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
