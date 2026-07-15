"use client";


function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.667"/>
      <path d="m5.333 8 1.667 1.667 3.333-3.334"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.333 1.333 2.667 9.333H8l-1.333 5.334 6.666-8H8l1.333-5.334Z"/>
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.858 2.295 1.219 11.6A1.333 1.333 0 0 0 2.362 13.6h11.276a1.333 1.333 0 0 0 1.143-2L9.142 2.295a1.333 1.333 0 0 0-2.284 0Z"/>
      <path d="M8 6.667v2.666M8 11.333h.007"/>
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h12v7.333a.667.667 0 0 1-.667.667H2.667A.667.667 0 0 1 2 13.333V6Z"/>
      <path d="M2 6V4a.667.667 0 0 1 .667-.667h10.666A.667.667 0 0 1 14 4v2"/>
      <path d="M11.333 10h.007"/>
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.333 2.667v10.666L8 10.667H4A1.333 1.333 0 0 1 2.667 9.333V6.667A1.333 1.333 0 0 1 4 5.333h4l5.333-2.666Z"/>
      <path d="M6 10.667V14"/>
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.293 1.84a3.667 3.667 0 0 1-4.12 5.647L2.707 11a1 1 0 0 0 0 1.414l.88.88a1 1 0 0 0 1.413 0l3.513-3.467a3.667 3.667 0 0 1 5.647-4.12l-2.16 2.16-1.253-1.253 2.16-2.16a3.667 3.667 0 0 1-2.614 1.306"/>
    </svg>
  );
}

type NotifType = "payment" | "outage" | "alert" | "fund" | "announcement" | "maintenance";

type Notification = {
  type: NotifType;
  title: string;
  body: string;
  time: string;
  isUnread: boolean;
};

const notifications: Notification[] = [
  {
    type: "payment",
    title: "Payment confirmed",
    body: "Your June 2026 levy of ₦95,000 has been received. View your receipt for details.",
    time: "Jun 4",
    isUnread: false,
  },
  {
    type: "outage",
    title: "Generator back online",
    body: "Power has been restored. The generator came back on at 7:02pm after a brief outage.",
    time: "Jun 3",
    isUnread: false,
  },
  {
    type: "alert",
    title: "June levy overdue",
    body: "Your June 2026 levy of ₦95,000 is now overdue. Please make payment to avoid service interruption.",
    time: "Jun 1",
    isUnread: false,
  },
  {
    type: "fund",
    title: "Fund topped up",
    body: "The estate fund has been replenished. Generator coverage is now secured for 28 days.",
    time: "May 30",
    isUnread: false,
  },
  {
    type: "maintenance",
    title: "Scheduled maintenance",
    body: "Generator servicing is planned for Jun 10, 10am–1pm. Expect a brief power interruption.",
    time: "May 28",
    isUnread: false,
  },
  {
    type: "alert",
    title: "Payment reminder",
    body: "Your June 2026 levy of ₦95,000 is due on Jun 1. Pay early to avoid late fees.",
    time: "May 25",
    isUnread: false,
  },
  {
    type: "announcement",
    title: "Committee meeting",
    body: "The estate committee will meet on Jul 5 at 4pm in the community hall. All residents welcome.",
    time: "May 22",
    isUnread: false,
  },
  {
    type: "fund",
    title: "May levy collected",
    body: "₦2,660,000 collected from 28 of 30 units for May. Outstanding units have been notified.",
    time: "May 4",
    isUnread: false,
  },
];

const typeConfig: Record<NotifType, { color: string; icon: React.ReactNode }> = {
  payment:      { color: "#15803d", icon: <CheckCircleIcon /> },
  outage:       { color: "#15803d", icon: <ZapIcon /> },
  alert:        { color: "#b91c1c", icon: <AlertTriangleIcon /> },
  fund:         { color: "#92400e", icon: <WalletIcon /> },
  announcement: { color: "#6d28d9", icon: <MegaphoneIcon /> },
  maintenance:  { color: "#1d4ed8", icon: <ToolIcon /> },
};

function NotifRow({ notif }: { notif: Notification }) {
  const { color, icon } = typeConfig[notif.type];
  return (
    <div className="flex gap-3 py-3 px-4 border-b border-noku-border-light last:border-0">
      <div
        className="w-8 h-8 rounded-md border border-noku-border-primary bg-noku-bg flex items-center justify-center shadow-sm shrink-0 mt-0.5 opacity-60"
        style={{ color }}
      >
        {icon}
      </div>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-noku-text-mid leading-tight">{notif.title}</p>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-noku-text-subtle">{notif.time}</span>
            {notif.isUnread && (
              <div className="w-1.5 h-1.5 rounded-full bg-noku-brand-mid" />
            )}
          </div>
        </div>
        <p className="text-xs text-noku-text-dim leading-[18px]">{notif.body}</p>
      </div>
    </div>
  );
}

type NotificationsScreenProps = {
  onBack: () => void;
};

export default function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  return (
    <div className="bg-noku-bg h-[calc(100vh-44px)] overflow-y-auto flex flex-col gap-6 pt-6 pb-10">
      {/* Back */}
      <div className="px-5">
        <button
          onClick={onBack}
          className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid"
        >
          <img src="/icons/BackIcon.svg" alt="" className="w-5 h-5" />
          <span className="text-xs">Back</span>
        </button>
      </div>

      {/* Header */}
      <div className="px-5 -mt-2">
        <p className="text-base font-medium leading-6 text-noku-text-dim">Notifications</p>
      </div>

      {/* List */}
      <div className="px-5 -mt-2">
        <div className="bg-white border border-noku-border-light rounded-xl">
          {notifications.map((notif, i) => (
            <NotifRow key={i} notif={notif} />
          ))}
        </div>
      </div>
    </div>
  );
}
