"use client";

import { useState } from "react";

const visaCardIcon = "https://www.figma.com/api/mcp/asset/baa3fd31-1ce6-4ba8-94c7-d187a4d446d8";
const creditCardPlusIcon = "https://www.figma.com/api/mcp/asset/9cbd675c-f0b3-4990-84a7-226780d7e260";
const buildingIcon = "https://www.figma.com/api/mcp/asset/c827b7f9-847f-4a0d-93b0-8e351c7ca64b";


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

type Method = "existing" | "add-card" | "bank-transfer";

type AddPaymentMethodProps = {
  onBack: () => void;
  onAddCard: () => void;
  onBankTransfer: () => void;
  onConfirm: () => void;
};

export default function AddPaymentMethod({ onBack, onAddCard, onBankTransfer, onConfirm }: AddPaymentMethodProps) {
  const [selected, setSelected] = useState<Method>("existing");

  function handleContinue() {
    if (selected === "add-card") {
      onAddCard();
    } else if (selected === "bank-transfer") {
      onBankTransfer();
    } else {
      onConfirm();
    }
  }

  return (
    <div className="bg-noku-bg min-h-screen flex flex-col justify-between pt-6 pb-10">
      <div className="flex flex-col gap-6">
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
        <div className="px-6 flex flex-col gap-2">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Add a Payment Method
          </p>
          <p className="text-sm text-noku-text-mid">
            Select your preferred payment method below:
          </p>
        </div>

        {/* Options */}
        <div className="px-6 flex flex-col gap-3">
          {/* Existing Visa card */}
          <button
            onClick={() => setSelected("existing")}
            className="w-full text-left flex items-start gap-1 p-4 rounded-xl bg-white transition-all"
            style={{
              border: selected === "existing"
                ? "2px solid #2b2b22"
                : "1px solid #e5e5e5",
            }}
          >
            <div className="flex flex-1 gap-3 items-start">
              <div className="w-[46px] h-8 shrink-0">
                <img src={visaCardIcon} alt="Visa" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col leading-5">
                  <p className="text-sm font-medium text-[#404040]">Visa ending in 4242</p>
                  <p className="text-sm text-[#525252]">Expiry 06/2028</p>
                </div>
                <p className="text-xs font-medium text-noku-text-dim">Default Card</p>
              </div>
            </div>
            <div
              className="w-4 h-4 rounded shrink-0 flex items-center justify-center mt-0.5"
              style={{
                backgroundColor: selected === "existing" ? "#2b2b22" : "transparent",
                border: selected === "existing" ? "none" : "1px solid #d4d4d4",
              }}
            >
              {selected === "existing" && <CheckIcon />}
            </div>
          </button>

          {/* Add a Card */}
          <button
            onClick={() => setSelected("add-card")}
            className="w-full text-left flex items-start gap-1 p-4 rounded-xl bg-white transition-all"
            style={{
              border: selected === "add-card"
                ? "2px solid #2b2b22"
                : "1px solid #e5e5e5",
            }}
          >
            <div className="flex flex-1 gap-3 items-center">
              <div
                className="w-10 h-10 rounded border border-noku-border-primary bg-white flex items-center justify-center shrink-0"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <img src={creditCardPlusIcon} alt="" className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-5">
                <p className="text-sm font-medium text-[#404040]">Add a Card</p>
                <p className="text-sm text-[#525252]">Pay via a debit/credit card</p>
              </div>
            </div>
            <div
              className="w-4 h-4 rounded shrink-0 flex items-center justify-center mt-2.5"
              style={{
                backgroundColor: selected === "add-card" ? "#2b2b22" : "transparent",
                border: selected === "add-card" ? "none" : "1px solid #d4d4d4",
              }}
            >
              {selected === "add-card" && <CheckIcon />}
            </div>
          </button>

          {/* Bank Transfer */}
          <button
            onClick={() => setSelected("bank-transfer")}
            className="w-full text-left flex items-start gap-1 p-4 rounded-xl bg-white transition-all"
            style={{
              border: selected === "bank-transfer"
                ? "2px solid #2b2b22"
                : "1px solid #e5e5e5",
            }}
          >
            <div className="flex flex-1 gap-3 items-center">
              <div
                className="w-10 h-10 rounded border border-noku-border-primary bg-white flex items-center justify-center shrink-0"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <img src={buildingIcon} alt="" className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-5">
                <p className="text-sm font-medium text-[#404040]">Bank Transfer</p>
                <p className="text-sm text-[#525252]">Make payments from your bank</p>
              </div>
            </div>
            <div
              className="w-4 h-4 rounded shrink-0 flex items-center justify-center mt-2.5"
              style={{
                backgroundColor: selected === "bank-transfer" ? "#2b2b22" : "transparent",
                border: selected === "bank-transfer" ? "none" : "1px solid #d4d4d4",
              }}
            >
              {selected === "bank-transfer" && <CheckIcon />}
            </div>
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6">
        <button
          onClick={handleContinue}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
        >
          Continue
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
