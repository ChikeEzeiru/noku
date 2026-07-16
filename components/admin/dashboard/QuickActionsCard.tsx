"use client";

function ReceiptIcon() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.33334 6.5C3.33334 5.09987 3.33334 4.3998 3.60583 3.86502C3.84551 3.39462 4.22796 3.01217 4.69837 2.77248C5.23315 2.5 5.93321 2.5 7.33334 2.5H12.6667C14.0668 2.5 14.7669 2.5 15.3017 2.77248C15.7721 3.01217 16.1545 3.39462 16.3942 3.86502C16.6667 4.3998 16.6667 5.09987 16.6667 6.5V17.5L14.375 15.8333L12.2917 17.5L10 15.8333L7.70834 17.5L5.62501 15.8333L3.33334 17.5V6.5Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.9924 15.0126C12.3498 16.3462 11.5583 17.7171 10.2247 18.0744C8.891 18.4318 7.52015 17.6403 7.1628 16.3067M9.07621 4.78428C9.32971 4.3282 9.41322 3.77695 9.2675 3.23312C8.96971 2.12173 7.82734 1.46219 6.71595 1.75998C5.60456 2.05778 4.94501 3.20015 5.24281 4.31153C5.38853 4.85536 5.73647 5.29101 6.18406 5.55923M13.5299 7.87132C13.2324 6.76121 12.4383 5.8329 11.3222 5.29063C10.2062 4.74835 8.85958 4.63652 7.57868 4.97973C6.29778 5.32295 5.18751 6.0931 4.49211 7.12075C3.79671 8.14841 3.57315 9.3494 3.8706 10.4595C4.36274 12.2962 4.26718 13.7615 3.95639 14.875C3.60216 16.144 3.42505 16.7786 3.4729 16.906C3.52764 17.0517 3.56724 17.0918 3.71244 17.148C3.83935 17.1972 4.37249 17.0543 5.43877 16.7686L15.3263 14.1192C16.3926 13.8335 16.9258 13.6907 17.0111 13.5846C17.1087 13.4633 17.123 13.4089 17.0975 13.2553C17.0752 13.121 16.6046 12.66 15.6633 11.7381C14.8374 10.9292 14.022 9.70803 13.5299 7.87132Z" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="20" height="20" opacity="0.8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.3333 6.66635V9.99968M8.54167 4.58302H5.66667C4.26654 4.58302 3.56647 4.58302 3.03169 4.8555C2.56129 5.09518 2.17884 5.47763 1.93915 5.94804C1.66667 6.48282 1.66667 7.18289 1.66667 8.58302L1.66667 9.58302C1.66667 10.3596 1.66667 10.7479 1.79354 11.0542C1.9627 11.4625 2.28715 11.787 2.69553 11.9561C3.00182 12.083 3.3901 12.083 4.16667 12.083V15.6247C4.16667 15.8182 4.16667 15.9149 4.1747 15.9964C4.25264 16.7877 4.87868 17.4137 5.66998 17.4917C5.75146 17.4997 5.8482 17.4997 6.04167 17.4997C6.23515 17.4997 6.33189 17.4997 6.41337 17.4917C7.20466 17.4137 7.83071 16.7877 7.90865 15.9964C7.91667 15.9149 7.91667 15.8182 7.91667 15.6247V12.083H8.54167C10.0137 12.083 11.8144 12.8721 13.2036 13.6294C14.014 14.0712 14.4192 14.2921 14.6846 14.2596C14.9308 14.2294 15.1168 14.1189 15.2611 13.9173C15.4167 13.6998 15.4167 13.2647 15.4167 12.3944V4.27159C15.4167 3.40135 15.4167 2.96622 15.2611 2.74876C15.1168 2.5471 14.9308 2.4366 14.6846 2.40646C14.4192 2.37395 14.014 2.59485 13.2036 3.03664C11.8144 3.79394 10.0137 4.58302 8.54167 4.58302Z" />
    </svg>
  );
}

const actions = [
  {
    icon: <ReceiptIcon />,
    title: "Log Expense",
    body: "Record fuel purchases, or maintenance bills",
  },
  {
    icon: <BellIcon />,
    title: "Send Reminder",
    body: "Notify specific or all residents",
  },
  {
    icon: <MegaphoneIcon />,
    title: "New Announcement",
    body: "Send important info to all residents via a blast",
  },
];

export default function QuickActionsCard() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <p className="text-base font-semibold text-noku-heading">Quick Actions</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, i) => (
          <button
            key={i}
            className="text-left bg-white border border-[#e5e5e5] rounded-xl p-4 flex flex-col gap-3 hover:bg-noku-bg transition-colors"
            style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
          >
            <div
              className="w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center text-[#404040]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              {action.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-[#404040]">{action.title}</p>
              <p className="text-sm text-[#525252] leading-5">{action.body}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
