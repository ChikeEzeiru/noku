function ReceiptIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      opacity="0.8"
      stroke="currentColor"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.33334 6.5C3.33334 5.09987 3.33334 4.3998 3.60583 3.86502C3.84551 3.39462 4.22796 3.01217 4.69837 2.77248C5.23315 2.5 5.93321 2.5 7.33334 2.5H12.6667C14.0668 2.5 14.7669 2.5 15.3017 2.77248C15.7721 3.01217 16.1545 3.39462 16.3942 3.86502C16.6667 4.3998 16.6667 5.09987 16.6667 6.5V17.5L14.375 15.8333L12.2917 17.5L10 15.8333L7.70834 17.5L5.62501 15.8333L3.33334 17.5V6.5Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      opacity="0.8"
      stroke="currentColor"
      strokeWidth="1.39"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.9924 15.0126C12.3498 16.3462 11.5583 17.7171 10.2247 18.0744C8.891 18.4318 7.52015 17.6403 7.1628 16.3067M9.07621 4.78428C9.32971 4.3282 9.41322 3.77695 9.2675 3.23312C8.96971 2.12173 7.82734 1.46219 6.71595 1.75998C5.60456 2.05778 4.94501 3.20015 5.24281 4.31153C5.38853 4.85536 5.73647 5.29101 6.18406 5.55923M13.5299 7.87132C13.2324 6.76121 12.4383 5.8329 11.3222 5.29063C10.2062 4.74835 8.85958 4.63652 7.57868 4.97973C6.29778 5.32295 5.18751 6.0931 4.49211 7.12075C3.79671 8.14841 3.57315 9.3494 3.8706 10.4595C4.36274 12.2962 4.26718 13.7615 3.95639 14.875C3.60216 16.144 3.42505 16.7786 3.4729 16.906C3.52764 17.0517 3.56724 17.0918 3.71244 17.148C3.83935 17.1972 4.37249 17.0543 5.43877 16.7686L15.3263 14.1192C16.3926 13.8335 16.9258 13.6907 17.0111 13.5846C17.1087 13.4633 17.123 13.4089 17.0975 13.2553C17.0752 13.121 16.6046 12.66 15.6633 11.7381C14.8374 10.9292 14.022 9.70803 13.5299 7.87132Z" />
    </svg>
  );
}

import type { ReactNode } from "react";

type Action = {
  icon: ReactNode;
  title: string;
  body: string;
  onClick?: () => void;
};

type Props = {
  onLogCollection?: () => void;
  onBulkReminder?:  () => void;
};

export default function QuickActionsCard({ onLogCollection, onBulkReminder }: Props) {
  const actions: Action[] = [
    {
      icon:    <ReceiptIcon />,
      title:   "Log External Collection",
      body:    "Record collections received from sources other than Noku",
      onClick: onLogCollection,
    },
    {
      icon:    <BellIcon />,
      title:   "Send Bulk Reminder",
      body:    "Notify specific or all residents",
      onClick: onBulkReminder,
    },
  ];

  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5 h-full"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <p className="text-base font-semibold text-noku-heading">Quick Actions</p>

      <div className="flex flex-col gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className="text-left flex items-center gap-3 border border-[#e5e5e5] rounded-xl p-4 hover:bg-noku-secondary-alt transition-colors"
            style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.04)" }}
          >
            <div
              className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040] shrink-0"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              {action.icon}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-sm font-semibold text-[#171717]">{action.title}</p>
              <p className="text-xs text-[#525252] leading-4">{action.body}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
