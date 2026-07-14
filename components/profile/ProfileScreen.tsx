"use client";

import BottomNav, { NavTab } from "@/components/shared/BottomNav";

const houseImg = "/images/profile-house.jpg";

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.75 4.5 11.25 9l-4.5 4.5"/>
    </svg>
  );
}

function getMenuItems(
  onBilling: () => void,
  onReportIssue: () => void,
  onResidentDetails: () => void,
  onNotificationPreferences: () => void,
) {
  return [
    { icon: <img src="/icons/ResidentDetailsIcon.svg" alt="" className="w-4 h-4" />, label: "Resident Details", onPress: onResidentDetails },
    { icon: <img src="/icons/BillingIcon.svg" alt="" className="w-4 h-4" />, label: "Billing", onPress: onBilling },
    { icon: <img src="/icons/NotificationPreferencesIcon.svg" alt="" className="w-4 h-4" />, label: "Notification preferences", onPress: onNotificationPreferences },
    { icon: <img src="/icons/ReportIssueIcon.svg" alt="" className="w-4 h-4" />, label: "Report issue", onPress: onReportIssue },
  ];
}

type ProfileScreenProps = {
  onNavigate: (tab: NavTab) => void;
  onBilling: () => void;
  onReportIssue: () => void;
  onResidentDetails: () => void;
  onNotificationPreferences: () => void;
  onLogout: () => void;
};

export default function ProfileScreen({ onNavigate, onBilling, onReportIssue, onResidentDetails, onNotificationPreferences, onLogout }: ProfileScreenProps) {
  return (
    <div className="bg-noku-bg min-h-screen pb-28 relative">
      {/* Apartment card */}
      <div className="px-6 pt-6 flex flex-col gap-4">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          My Apartment
        </p>
        <div className="bg-white border border-noku-border-light rounded-xl px-3 pt-3 pb-8 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src={houseImg}
              alt="Building B, Unit 4"
              className="w-[89px] h-20 rounded-full object-cover"
            />
            <p className="text-sm text-noku-text-mid">Building B, Unit 4</p>
          </div>
          <div className="flex gap-4 text-sm text-noku-text-dim">
            <ul className="flex flex-col gap-1">
              <li className="list-disc ml-5">5 occupants</li>
              <li className="list-disc ml-5">3 bedrooms</li>
            </ul>
            <ul className="flex flex-col gap-1">
              <li className="list-disc ml-5">4 AC units</li>
              <li className="list-disc ml-5">No issues</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Account section */}
      <div className="px-6 mt-8 flex flex-col gap-4">
        <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
          My Account
        </p>
        <div className="flex flex-col gap-1">
          {getMenuItems(onBilling, onReportIssue, onResidentDetails, onNotificationPreferences).map(({ icon, label, onPress }) => (
            <button
              key={label}
              onClick={onPress}
              className="flex items-center justify-between p-2 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm text-noku-text-dim shrink-0">
                  {icon}
                </div>
                <p className="text-sm text-noku-text-dim">{label}</p>
              </div>
              <span className="text-noku-text-dim">
                <ChevronRightIcon />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Log out */}
      <div className="px-6 mt-2">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 p-2 w-full text-noku-red"
        >
          <div className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 14H2.667A1.333 1.333 0 0 1 1.333 12.667V3.333A1.333 1.333 0 0 1 2.667 2H6M10.667 11.333 14 8l-3.333-3.333M14 8H6" />
            </svg>
          </div>
          <p className="text-sm">Log out</p>
        </button>
      </div>

      {/* Version footer */}
      <div className="px-6 mt-6 flex items-center justify-center gap-2">
        <span className="text-xs text-noku-text-subtle">NOKU</span>
        <span className="w-1 h-1 rounded-full bg-noku-text-subtle" />
        <span className="text-xs text-noku-text-subtle">Version 1.04</span>
      </div>

      <BottomNav activeTab="profile" onNavigate={onNavigate} />
    </div>
  );
}
