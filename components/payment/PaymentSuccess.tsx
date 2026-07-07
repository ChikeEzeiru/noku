"use client";


function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8.333"/>
      <path d="m6.667 10 2.5 2.5 4.166-5"/>
    </svg>
  );
}

type PaymentSuccessProps = {
  onBackToHome: () => void;
  onViewReceipt: () => void;
};

export default function PaymentSuccess({ onBackToHome, onViewReceipt }: PaymentSuccessProps) {
  return (
    <div className="bg-noku-bg min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-6 pt-6">
        {/* Back to home */}
        <div className="px-6">
          <button
            onClick={onBackToHome}
            className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
          >
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs">Back to home</span>
          </button>
        </div>

        {/* Success content */}
        <div className="px-6 flex flex-col items-center gap-6">
          {/* Success icon */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-10 h-10 rounded-lg bg-noku-success flex items-center justify-center shadow-sm"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <CheckCircleIcon />
            </div>
            <p className="text-base font-medium text-noku-heading">Payment Successful!</p>
          </div>

          {/* Payment summary */}
          <div className="w-full flex flex-col gap-4">
            {/* Billing period + amount */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between p-2">
                <p className="text-sm text-noku-text-dim min-w-[124px]">Billing Period:</p>
                <p className="text-sm font-medium text-noku-text-mid">June 2026</p>
              </div>
              <div className="flex items-center gap-2 px-2">
                <p className="text-xl font-semibold text-noku-heading">₦95,000</p>
                <span className="text-[10px] font-medium text-noku-paid-text bg-noku-paid-bg border border-noku-paid-border rounded-md px-1.5 py-0.5">
                  Paid
                </span>
              </div>

              {/* Transaction details box */}
              <div className="bg-white border border-noku-border-light rounded-lg p-3 flex flex-col gap-1 mt-1">
                <div className="flex items-start justify-between p-1">
                  <p className="text-sm text-noku-text-dim">Reference:</p>
                  <p className="text-sm font-medium text-noku-text-mid">NKU-070326-B4</p>
                </div>
                <div className="flex items-start justify-between p-1">
                  <p className="text-sm text-noku-text-dim">Payment Method:</p>
                  <p className="text-sm font-medium text-noku-text-mid">In-app</p>
                </div>
                <div className="flex items-start justify-between p-1">
                  <p className="text-sm text-noku-text-dim">Date paid:</p>
                  <p className="text-sm font-medium text-noku-text-mid">Jun 4, 2026</p>
                </div>
              </div>
            </div>

            {/* Apartment details */}
            <div className="flex items-start gap-2 p-2">
              <p className="text-sm text-noku-text-dim min-w-[124px]">Apartment details:</p>
              <p className="text-sm font-medium text-noku-text-mid">
                5 occupants · 3 bed · 4 ACs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Receipt button */}
      <div className="px-6 pb-10">
        <button
          onClick={onViewReceipt}
          className="w-full border border-noku-nav-border bg-white rounded-lg py-2.5 text-sm font-semibold text-noku-text-mid shadow-sm"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
        >
          View Receipt
        </button>
      </div>
    </div>
  );
}
