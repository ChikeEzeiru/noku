function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
      <rect x="0"  y="8"  width="3" height="4"  rx="1" opacity="1"/>
      <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" opacity="1"/>
      <rect x="9"  y="3"  width="3" height="9"  rx="1" opacity="1"/>
      <rect x="13.5" y="0"  width="3" height="12" rx="1" opacity="1"/>
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 4.5a9.5 9.5 0 0 1 14 0" opacity="0.35"/>
      <path d="M3.5 7a6 6 0 0 1 9 0"      opacity="0.65"/>
      <path d="M6 9.5a3 3 0 0 1 4 0"/>
      <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
      <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor"/>
      <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  );
}

export default function StatusBar() {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-noku-bg z-50 h-11 flex items-center justify-between px-6">
      <span className="text-sm font-semibold text-noku-heading tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5 text-noku-heading">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
