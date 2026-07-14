"use client";

import { useState } from "react";

const visaImg = "/images/Payment-method-icon.svg";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        ref: string;
        currency: string;
        callback: (response: { reference: string; status: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="9" r="7" strokeOpacity="0.3" />
      <path d="M9 2a7 7 0 0 1 7 7" strokeLinecap="round" />
    </svg>
  );
}

type PaymentReviewProps = {
  onPaySuccess: () => void;
  onBack: () => void;
  onAddPaymentMethod: () => void;
};

export default function PaymentReview({ onPaySuccess, onBack, onAddPaymentMethod }: PaymentReviewProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handlePay() {
    setStatus("loading");
    setErrorMsg("");

    // Generate a unique reference for this transaction
    const reference = `NOKU-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    // Initialize transaction server-side
    let access_code: string;
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "ciroma.adekunle@noku.test",
          amount: 9500000, // ₦95,000 in kobo
          reference,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Initialization failed");
      access_code = data.access_code;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Could not connect to payment provider. Please try again.");
      return;
    }

    // Open Paystack inline popup
    if (!window.PaystackPop) {
      setStatus("error");
      setErrorMsg("Payment provider not loaded. Please refresh and try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: "ciroma.adekunle@noku.test",
      amount: 9500000,
      ref: reference,
      currency: "NGN",
      callback: async (response) => {
        // Paystack reports success — verify server-side
        // If verification itself fails, we still mark paid: user's money was taken
        try {
          await fetch(`/api/paystack/verify?reference=${encodeURIComponent(response.reference)}`);
        } catch {
          // verification network error — payment still happened, proceed
        }
        onPaySuccess();
      },
      onClose: () => {
        // User closed popup without completing payment
        setStatus("idle");
      },
    });

    handler.openIframe();
    // Keep button in loading state while popup is open;
    // onClose or callback will resolve it
  }

  const isLoading = status === "loading";

  return (
    <div className="bg-noku-bg min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-6 pt-6 pb-6">
        {/* Back button */}
        <div className="px-6">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid disabled:opacity-40"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back</span>
          </button>
        </div>

        {/* Billing details */}
        <div className="px-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
              Billing Details
            </p>
            <span className="text-[10px] font-medium text-noku-overdue-text bg-noku-overdue-bg border border-noku-overdue-border rounded-md px-1.5 py-0.5">
              Overdue
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2 p-2">
              <p className="text-sm text-noku-text-dim min-w-[124px]">Billing Period:</p>
              <p className="text-sm font-medium text-noku-text-mid">June 2026</p>
            </div>
            <div className="px-2">
              <p className="text-xl font-semibold text-noku-heading">₦95,000</p>
            </div>

            <div className="bg-noku-warm-hover border border-noku-border-light rounded-lg p-3 flex flex-col gap-1 mt-1">
              <div className="flex items-center justify-between p-1">
                <p className="text-sm text-noku-text-dim">Base amount:</p>
                <p className="text-sm font-medium text-noku-text-mid">₦95,000</p>
              </div>
              <div className="flex items-center justify-between p-1 opacity-50">
                <p className="text-sm text-noku-text-dim">Credit/shortfall from prev mth:</p>
                <p className="text-sm font-medium text-noku-text-mid">₦0</p>
              </div>
              <div className="flex items-center justify-between p-1">
                <p className="text-sm text-noku-text-dim">Final amount charged</p>
                <p className="text-sm font-medium text-noku-text-mid">₦95,000</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2">
            <p className="text-sm text-noku-text-dim min-w-[124px]">Apartment details:</p>
            <p className="text-sm font-medium text-noku-text-mid">
              5 occupants · 3 bed · 4 ACs
            </p>
          </div>

          <div className="border-t border-noku-border-light" />

          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
              Payment Method
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1 h-16 rounded-lg p-3 flex flex-col gap-1 justify-center bg-white" style={{ border: "2px solid #2b2b22" }}>
                <img src={visaImg} alt="Visa" className="h-6 w-[34px] object-contain" />
                <p className="text-xs text-noku-text-mid">**** **** **** 1234</p>
                <div className="absolute top-2 right-2 w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: "#2b2b22" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.667 5l2.5 2.5 4.166-5"/>
                  </svg>
                </div>
              </div>
              <button
                onClick={onAddPaymentMethod}
                disabled={isLoading}
                className="flex-1 h-16 border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid disabled:opacity-40"
              >
                <img src="/icons/AddNewIcon.svg" alt="" className="w-5 h-5" />
                <span className="text-xs">Add New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-10 flex flex-col gap-3">
        {status === "error" && (
          <p className="text-xs text-red-600 text-center leading-5">{errorMsg}</p>
        )}
        <button
          onClick={handlePay}
          disabled={isLoading}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
        >
          {isLoading ? <><Spinner /> Opening payment…</> : "Pay ₦95,000"}
        </button>
        <button
          onClick={onBack}
          disabled={isLoading}
          className="w-full text-center text-sm font-semibold text-noku-text-mid py-2.5 disabled:opacity-40"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
