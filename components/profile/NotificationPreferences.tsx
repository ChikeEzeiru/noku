"use client";

import { useState } from "react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="w-[36px] h-[20px] rounded-full flex items-center p-[2px] shrink-0 transition-colors"
      style={{ backgroundColor: on ? "#17a248" : "#e5e5e5", justifyContent: on ? "flex-end" : "flex-start" }}
    >
      <div className="w-[16px] h-[16px] bg-white rounded-full shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </button>
  );
}

function PrefRow({ label, description, on, onChange }: {
  label: string; description: string; on: boolean; onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-3">
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <p className="text-sm font-medium leading-5 text-[#474739]">{label}</p>
        <p className="text-xs font-normal leading-[18px] text-[#7c7c67]">{description}</p>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  );
}

type Prefs = {
  paymentReminders: boolean;
  billingUpdates: boolean;
  outageAlerts: boolean;
  maintenanceNotices: boolean;
  announcements: boolean;
  committeeUpdates: boolean;
};

type NotificationPreferencesProps = { onBack: () => void };

export default function NotificationPreferences({ onBack }: NotificationPreferencesProps) {
  const [prefs, setPrefs] = useState<Prefs>({
    paymentReminders:  true,
    billingUpdates:    true,
    outageAlerts:      true,
    maintenanceNotices: true,
    announcements:     true,
    committeeUpdates:  true,
  });

  function toggle(key: keyof Prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

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
          <p className="text-base font-medium leading-6 text-[#7c7c67]">Notification Preferences</p>
        </div>

        {/* Payments section */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Payments</p>
          <div className="bg-white border border-[#e8e8e3] rounded-[12px] overflow-hidden">
            <PrefRow
              label="Payment reminders"
              description="Get reminded before your monthly levy is due"
              on={prefs.paymentReminders}
              onChange={() => toggle("paymentReminders")}
            />
            <div className="h-px bg-[#e8e8e3]" />
            <PrefRow
              label="Billing updates"
              description="Be notified when your bill amount changes"
              on={prefs.billingUpdates}
              onChange={() => toggle("billingUpdates")}
            />
          </div>
        </div>

        {/* Estate section */}
        <div className="px-6 flex flex-col gap-4">
          <p className="text-sm font-normal leading-5 text-[#474739]">Estate</p>
          <div className="bg-white border border-[#e8e8e3] rounded-[12px] overflow-hidden">
            <PrefRow
              label="Outage alerts"
              description="Receive immediate alerts when power goes out"
              on={prefs.outageAlerts}
              onChange={() => toggle("outageAlerts")}
            />
            <div className="h-px bg-[#e8e8e3]" />
            <PrefRow
              label="Maintenance notices"
              description="Get notified about scheduled maintenance windows"
              on={prefs.maintenanceNotices}
              onChange={() => toggle("maintenanceNotices")}
            />
            <div className="h-px bg-[#e8e8e3]" />
            <PrefRow
              label="Announcements"
              description="Stay informed about estate news and updates"
              on={prefs.announcements}
              onChange={() => toggle("announcements")}
            />
            <div className="h-px bg-[#e8e8e3]" />
            <PrefRow
              label="Committee updates"
              description="Receive minutes and decisions from committee meetings"
              on={prefs.committeeUpdates}
              onChange={() => toggle("committeeUpdates")}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
