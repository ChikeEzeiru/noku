"use client";

const visaImg = "/Images/Payment-method-icon.svg";

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className="w-[36px] h-[20px] rounded-full flex items-center p-[2px] shrink-0"
      style={{ backgroundColor: on ? "#17a248" : "#e5e5e5", justifyContent: on ? "flex-end" : "flex-start" }}
    >
      <div className="w-[16px] h-[16px] bg-white rounded-full shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.667 1.333v2.667M5.333 1.333v2.667M2 6h12M2.667 2.667h10.666C13.403 2.667 14 3.264 14 4v9.333c0 .737-.597 1.334-1.333 1.334H2.667A1.333 1.333 0 0 1 1.333 13.333V4c0-.736.597-1.333 1.334-1.333Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 10v2.667A1.333 1.333 0 0 1 12.667 14H3.333A1.333 1.333 0 0 1 2 12.667V10M4.667 6.667 8 10l3.333-3.333M8 10V2" />
    </svg>
  );
}

function DotsVertical() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="4.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="9"   r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="13.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type BillingScreenProps = { onBack: () => void };

export default function BillingScreen({ onBack }: BillingScreenProps) {
  return (
    <div className="bg-noku-bg min-h-screen pb-10">
      <div className="flex flex-col gap-8 pt-6">

        {/* Back */}
        <div className="px-6">
          <button onClick={onBack} className="border border-[#e8e8e3] rounded-[8px] p-[6px] flex items-center gap-2">
            <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
            <span className="text-xs font-normal leading-[18px] text-[#474739]">Back</span>
          </button>
        </div>

        {/* Page title */}
        <div className="px-6">
          <p className="text-base font-medium leading-6 text-[#7c7c67]">Billing</p>
        </div>

        {/* Billing History Summary */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Billing History Summary</p>
          <div className="flex gap-2">
            <div className="bg-white border border-[#d8d8d0] rounded-[8px] pt-4 pb-3 px-3 flex-1 flex flex-col items-center gap-2">
              <p className="text-sm font-medium leading-5 text-[#1d1d16]">₦470,000</p>
              <p className="text-[10px] font-normal leading-4 text-[#7c7c67]">total paid</p>
            </div>
            <div className="bg-white border border-[#d8d8d0] rounded-[8px] pt-4 pb-3 px-3 flex-1 flex flex-col items-center gap-2">
              <div className="flex items-end gap-[2px] text-[#1d1d16]">
                <p className="text-sm font-medium leading-5">6</p>
                <p className="text-[10px] font-normal leading-4">of 6</p>
              </div>
              <p className="text-[10px] font-normal leading-4 text-[#7c7c67]">months paid</p>
            </div>
            <div className="bg-white border border-[#d8d8d0] rounded-[8px] pt-4 pb-3 px-3 flex-1 flex flex-col items-center gap-2">
              <p className="text-sm font-medium leading-5 text-[#1d1d16]">₦78,333</p>
              <p className="text-[10px] font-normal leading-4 text-[#7c7c67]">Avg payment</p>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Payment methods</p>
          <div className="bg-white border border-[#e8e8e3] rounded-[8px] p-3 flex flex-col gap-3">
            <div className="flex items-start justify-between h-6">
              <img src={visaImg} alt="Visa" className="h-6 w-[34px] object-contain" />
              <div className="flex items-center gap-2">
                <div className="bg-white border border-[#d4d4d4] rounded-[6px] px-[6px] py-[2px] flex items-center gap-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <div className="w-2 h-2 rounded-full bg-[#a3a3a3] shrink-0" />
                  <p className="text-[10px] font-medium leading-4 text-[#404040]">Default</p>
                </div>
                <span className="text-[#474739]"><DotsVertical /></span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-normal leading-[18px] text-[#474739]">**** **** **** 1234</p>
              <div className="flex items-center gap-2">
                <p className="text-xs font-normal leading-[18px] text-[#7c7c67]">Expiry Date:</p>
                <p className="text-xs font-normal leading-[18px] text-[#474739]">11/29</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment settings */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Payment settings</p>
          <div className="bg-white border border-[#e8e8e3] rounded-[12px] overflow-hidden">
            <div className="flex items-center gap-4 p-3">
              <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                <p className="text-sm font-medium leading-5 text-[#474739]">Auto-pay</p>
                <p className="text-xs font-normal leading-[18px] text-[#7c7c67]">{"You'll receive a reminder when your monthly contribution is ready. Turn on auto-pay to avoid missing a payment."}</p>
              </div>
              <Toggle on={false} />
            </div>
          </div>
        </div>

        {/* Statements */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Statements</p>
          <div className="flex items-center gap-8 py-1">
            <div className="flex-1 bg-white border border-[#d8d8d0] rounded-[8px] px-3 py-2 flex items-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <span className="text-[#7c7c67]"><CalendarIcon /></span>
              <div className="flex items-center text-sm font-normal leading-5">
                <span className="text-[#7c7c67]">MM</span>
                <span className="text-[#abab9c] mx-0.5">/</span>
                <span className="text-[#7c7c67]">DD</span>
                <span className="text-[#abab9c] mx-0.5">/</span>
                <span className="text-[#7c7c67]">YYYY</span>
              </div>
            </div>
            <button
              className="flex items-center gap-1 px-[10px] py-[6px] rounded-[4px] text-white text-sm font-semibold leading-5"
              style={{
                backgroundColor: "#0c0c09",
                boxShadow: "inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px rgba(0,0,0,0.05)",
              }}
            >
              Download
              <DownloadIcon />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
