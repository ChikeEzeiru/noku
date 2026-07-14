"use client";

const visaImg = "/images/Payment-method-icon.svg";


type PaymentReviewProps = {
  onPay: () => void;
  onBack: () => void;
  onAddPaymentMethod: () => void;
};

export default function PaymentReview({ onPay, onBack, onAddPaymentMethod }: PaymentReviewProps) {
  return (
    <div className="bg-noku-bg min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-6 pt-6 pb-6">
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

        {/* Billing details */}
        <div className="px-6 flex flex-col gap-4">
          {/* Section header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
              Billing Details
            </p>
            <span className="text-[10px] font-medium text-noku-overdue-text bg-noku-overdue-bg border border-noku-overdue-border rounded-md px-1.5 py-0.5">
              Overdue
            </span>
          </div>

          {/* Billing period + amount */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2 p-2">
              <p className="text-sm text-noku-text-dim min-w-[124px]">Billing Period:</p>
              <p className="text-sm font-medium text-noku-text-mid">June 2026</p>
            </div>
            <div className="px-2">
              <p className="text-xl font-semibold text-noku-heading">₦95,000</p>
            </div>

            {/* Breakdown box */}
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

          {/* Apartment details */}
          <div className="flex items-start gap-2 p-2">
            <p className="text-sm text-noku-text-dim min-w-[124px]">Apartment details:</p>
            <p className="text-sm font-medium text-noku-text-mid">
              5 occupants · 3 bed · 4 ACs
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-noku-border-light" />

          {/* Payment method */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
              Payment Method
            </p>
            <div className="flex gap-2">
              {/* Existing card — selected */}
              <div className="relative flex-1 h-16 rounded-lg p-3 flex flex-col gap-1 justify-center bg-white" style={{ border: "2px solid #2b2b22" }}>
                <img src={visaImg} alt="Visa" className="h-6 w-[34px] object-contain" />
                <p className="text-xs text-noku-text-mid">**** **** **** 1234</p>
                <div className="absolute top-2 right-2 w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: "#2b2b22" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.667 5l2.5 2.5 4.166-5"/>
                  </svg>
                </div>
              </div>
              {/* Add new */}
              <button
                onClick={onAddPaymentMethod}
                className="flex-1 h-16 border border-noku-border-light rounded-lg flex flex-col items-center justify-center gap-1 text-noku-text-mid"
              >
                <img src="/icons/AddNewIcon.svg" alt="" className="w-5 h-5" />
                <span className="text-xs">Add New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-10 flex flex-col gap-4">
        <button
          onClick={onPay}
          className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold shadow-sm"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
        >
          Pay ₦95,000
        </button>
        <button
          onClick={onBack}
          className="w-full text-center text-sm font-semibold text-noku-text-mid py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
