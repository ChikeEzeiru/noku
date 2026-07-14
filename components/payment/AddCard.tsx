"use client";

import { useState } from "react";

const visaLogoOnCard = "/images/Payment-method-icon.svg";

function PaypassIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 6.5 a10 10 0 0 1 0 15" stroke="#16803c" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M14 9.5 a7 7 0 0 1 0 9" stroke="#16803c" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M14 12.5 a4 4 0 0 1 0 3" stroke="#16803c" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}


function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5"/>
    </svg>
  );
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + " / " + digits.slice(2);
}

type AddCardProps = {
  onBack: () => void;
  onConfirm: () => void;
};

export default function AddCard({ onBack, onConfirm }: AddCardProps) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const displayName = name.trim() || "YOUR NAME";
  const displayNumber = cardNumber.padEnd(19, "·").replace(/ /g, " ");
  const rawDigits = cardNumber.replace(/\D/g, "");
  const displayExpiry = expiry || "MM/YY";

  const chunks = [
    rawDigits.slice(0, 4) || "4242",
    rawDigits.slice(4, 8) || "4242",
    rawDigits.slice(8, 12) || "4242",
    rawDigits.slice(12, 16) || "4242",
  ].join(" ");

  return (
    <div className="bg-noku-bg h-[calc(100vh-44px)] flex flex-col">
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pt-6">
        {/* Back button */}
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
        <div className="px-6">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Add a Payment Method
          </p>
        </div>

        {/* Card preview */}
        <div className="px-6">
          <div
            className="rounded-2xl p-5 flex flex-col justify-between aspect-[1.586/1] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              border: "1px solid #86efac",
            }}
          >
            {/* Top row: bank name + paypass */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-noku-brand-deep tracking-wide">My Bank</p>
              <PaypassIcon />
            </div>

            {/* Card number */}
            <p className="text-lg font-mono font-medium text-noku-brand-deep tracking-[0.15em] mt-4">
              {chunks}
            </p>

            {/* Bottom row: name, expiry, Visa logo */}
            <div className="flex items-end justify-between mt-3">
              <div className="flex flex-col gap-0.5">
                <p className="text-[9px] text-noku-brand-mid uppercase tracking-widest">Card Holder</p>
                <p className="text-xs font-semibold text-noku-brand-deep uppercase tracking-wide truncate max-w-[140px]">
                  {displayName}
                </p>
              </div>
              <div className="flex flex-col gap-0.5 items-end">
                <p className="text-[9px] text-noku-brand-mid uppercase tracking-widest">Expires</p>
                <p className="text-xs font-semibold text-noku-brand-deep">{displayExpiry}</p>
              </div>
              <img src={visaLogoOnCard} alt="Visa" className="h-8 object-contain" />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 flex flex-col gap-3">
          {/* Name on card */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-noku-text-mid">
              Name on card <span className="text-noku-red">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ciroma Chukwuma Adekunle"
              className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2.5 text-sm text-noku-text-mid placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid"
            />
          </div>

          {/* Card number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-noku-text-mid">
              Card number <span className="text-noku-red">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2.5 text-sm text-noku-text-mid placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid font-mono tracking-wide"
            />
          </div>

          {/* Expiry + CVV row */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-noku-text-mid">
                Expiry <span className="text-noku-red">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="06 / 2028"
                maxLength={9}
                className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2.5 text-sm text-noku-text-mid placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-noku-text-mid">
                CVV <span className="text-noku-red">*</span>
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="•••"
                maxLength={4}
                className="w-full bg-white border border-noku-nav-border rounded-lg px-3 py-2.5 text-sm text-noku-text-mid placeholder:text-noku-text-subtle outline-none focus:border-noku-brand-mid"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-6 pb-10 pt-4">
        <button
          onClick={onConfirm}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          Add Card
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
