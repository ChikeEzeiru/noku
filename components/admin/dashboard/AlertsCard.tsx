function FlaggedIssuesIcon() {
  return (
    <svg
      width="20"
      height="20"
      opacity="0.8"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#92400e"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 5.99997V8.66664M8 11.3333H8.00667M7.07688 2.59445L1.59362 12.0655C1.28948 12.5909 1.13742 12.8535 1.15989 13.0691C1.1795 13.2571 1.27801 13.428 1.43091 13.5392C1.60622 13.6666 1.90973 13.6666 2.51674 13.6666H13.4833C14.0903 13.6666 14.3938 13.6666 14.5691 13.5392C14.722 13.428 14.8205 13.2571 14.8401 13.0691C14.8626 12.8535 14.7105 12.5909 14.4064 12.0655L8.92312 2.59445C8.62007 2.07101 8.46855 1.80929 8.27087 1.72139C8.09843 1.64471 7.90157 1.64471 7.72913 1.72139C7.53145 1.80929 7.37992 2.07101 7.07688 2.59445Z" />
    </svg>
  );
}

function HouseholdDataIcon() {
  return (
    <svg
      width="20"
      height="20"
      opacity="0.8"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#92400e"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.99984 17.5H13.9998M5.99984 17.5C5.06642 17.5 4.59971 17.5 4.24319 17.3183C3.92959 17.1586 3.67462 16.9036 3.51483 16.59C3.33317 16.2335 3.33317 15.7668 3.33317 14.8333V6.66667L8.39984 2.86667C8.9736 2.43634 9.26049 2.22118 9.57556 2.13824C9.85368 2.06503 10.146 2.06503 10.4241 2.13824C10.7392 2.22118 11.0261 2.43634 11.5998 2.86667L16.6665 6.66667V14.8333C16.6665 15.7668 16.6665 16.2335 16.4849 16.59C16.3251 16.9036 16.0701 17.1586 15.7565 17.3183C15.4 17.5 14.9333 17.5 13.9998 17.5M5.99984 17.5H7.49984V11.3333C7.49984 10.8666 7.49984 10.6333 7.59067 10.455C7.67056 10.2982 7.79805 10.1707 7.95485 10.0908C8.13311 10 8.36646 10 8.83317 10H11.1665C11.6332 10 11.8666 10 12.0448 10.0908C12.2016 10.1707 12.3291 10.2982 12.409 10.455C12.4998 10.6333 12.4998 10.8666 12.4998 11.3333V17.5H13.9998M1.6665 7.91667L9.19984 2.26667C9.48672 2.0515 9.63016 1.94392 9.7877 1.90245C9.92676 1.86585 10.0729 1.86585 10.212 1.90245C10.3695 1.94392 10.513 2.05151 10.7998 2.26667L18.3332 7.91667" />
    </svg>
  );
}

import Link from "next/link";

const BTN_SHADOW = "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)";
const BTN_CLASS  = "self-start bg-white rounded-lg px-3.5 py-2.5 text-sm font-semibold text-noku-text-mid";

export default function AlertsCard() {
  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <p className="text-base font-semibold text-noku-text-mid">Alerts</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Flagged issues */}
        <div className="flex flex-col gap-4">
          <div className="w-8 h-8 rounded-full bg-[#fef9c3] flex items-center justify-center shrink-0">
            <FlaggedIssuesIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-[#404040]">Flagged issues:</p>
            <p className="text-sm text-[#525252] text-pretty">4 residents have flagged issues that are yet to be resolved</p>
          </div>
          <Link href="/admin/issues" className={BTN_CLASS} style={{ boxShadow: BTN_SHADOW }}>
            View Issues
          </Link>
        </div>

        {/* Outdated household data */}
        <div className="flex flex-col gap-4">
          <div className="w-8 h-8 rounded-full bg-[#fef9c3] flex items-center justify-center shrink-0">
            <HouseholdDataIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-[#404040]">Outdated Household data:</p>
            <p className="text-sm text-[#525252] text-pretty">Residents' household info has not been updated in 2 months</p>
          </div>
          <Link href="/admin/residents" className={BTN_CLASS} style={{ boxShadow: BTN_SHADOW }}>
            View Residents
          </Link>
        </div>
      </div>
    </div>
  );
}
