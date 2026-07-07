"use client";

import { useState } from "react";


function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="w-11 h-6 rounded-full relative transition-colors shrink-0"
      style={{ backgroundColor: on ? "#17a248" : "#e2e2e2" }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
        style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">{title}</p>
      <div className="bg-white border border-noku-border-light rounded-xl divide-y divide-noku-border-light">
        {children}
      </div>
    </div>
  );
}

function PrefRow({
  label, description, on, onChange,
}: { label: string; description: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-noku-text-mid">{label}</p>
        <p className="text-xs text-noku-text-dim leading-[18px]">{description}</p>
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
    paymentReminders: true,
    billingUpdates: true,
    outageAlerts: true,
    maintenanceNotices: false,
    announcements: true,
    committeeUpdates: false,
  });

  function toggle(key: keyof Prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="bg-noku-bg min-h-screen pb-10">
      {/* Back */}
      <div className="px-6 pt-6">
        <button
          onClick={onBack}
          className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
        >
          <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
          <span className="text-xs">Back</span>
        </button>
      </div>

      <div className="px-6 mt-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
            Notification Preferences
          </p>
          <p className="text-sm text-noku-text-dim mt-1">
            Choose which notifications you'd like to receive.
          </p>
        </div>

        <Section title="Payments">
          <PrefRow
            label="Payment reminders"
            description="Get reminded before your monthly levy is due"
            on={prefs.paymentReminders}
            onChange={() => toggle("paymentReminders")}
          />
          <PrefRow
            label="Billing updates"
            description="Be notified when your bill amount changes"
            on={prefs.billingUpdates}
            onChange={() => toggle("billingUpdates")}
          />
        </Section>

        <Section title="Estate">
          <PrefRow
            label="Outage alerts"
            description="Receive immediate alerts when power goes out"
            on={prefs.outageAlerts}
            onChange={() => toggle("outageAlerts")}
          />
          <PrefRow
            label="Maintenance notices"
            description="Get notified about scheduled maintenance windows"
            on={prefs.maintenanceNotices}
            onChange={() => toggle("maintenanceNotices")}
          />
          <PrefRow
            label="Announcements"
            description="Stay informed about estate news and updates"
            on={prefs.announcements}
            onChange={() => toggle("announcements")}
          />
          <PrefRow
            label="Committee updates"
            description="Receive minutes and decisions from committee meetings"
            on={prefs.committeeUpdates}
            onChange={() => toggle("committeeUpdates")}
          />
        </Section>
      </div>
    </div>
  );
}
