"use client";

import { useState, useEffect } from "react";

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

function BatteryIcon({ level, charging }: { level: number; charging: boolean }) {
  const fillWidth = Math.round((level / 100) * 17);
  const fillColor = level <= 20 ? "#ef4444" : "currentColor";
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
      <rect x="2" y="2" width={fillWidth} height="8" rx="2" fill={fillColor}/>
      {charging && (
        <path d="M9 2.5 7 6.5h3L8 10" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      )}
      <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  );
}

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    }
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!("getBattery" in navigator)) return;
    (navigator as Navigator & { getBattery(): Promise<BatteryManager> })
      .getBattery()
      .then((bat) => {
        function update() {
          setBattery({ level: Math.round(bat.level * 100), charging: bat.charging });
        }
        update();
        bat.addEventListener("levelchange", update);
        bat.addEventListener("chargingchange", update);
        return () => {
          bat.removeEventListener("levelchange", update);
          bat.removeEventListener("chargingchange", update);
        };
      });
  }, []);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-noku-bg z-50 h-11 flex items-center justify-between px-6">
      <span className="text-sm font-semibold text-noku-heading tracking-tight">
        {time || "9:41"}
      </span>
      <div className="flex items-center gap-1.5 text-noku-heading">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon level={battery?.level ?? 80} charging={battery?.charging ?? false} />
      </div>
    </div>
  );
}

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
}
