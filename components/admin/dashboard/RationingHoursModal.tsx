"use client";

import { useState, useEffect } from "react";
import { TimePicker, nextTimeSlot, isValidEnd } from "@/components/admin/shared/TimePicker";
import type { TimeValue } from "@/components/admin/shared/TimePicker";

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8.333" />
      <path d="M10 5.833V10l2.917 2.917" />
    </svg>
  );
}

type Props = {
  onSave: (startTime: TimeValue, endTime: TimeValue) => void;
  onCancel: () => void;
};

export default function RationingHoursModal({ onSave, onCancel }: Props) {
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime]     = useState<TimeValue | null>(null);

  const isComplete = (t: TimeValue | null) => !!(t?.hour && t?.minute);

  useEffect(() => {
    if (!isComplete(startTime)) return;
    if (!isComplete(endTime) || !isValidEnd(startTime!, endTime!)) {
      setEndTime(nextTimeSlot(startTime!));
    }
  }, [startTime]);

  const canSave = isComplete(startTime) && isComplete(endTime);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onCancel} />
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[400px] flex flex-col"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 pt-6 px-6 pb-5">
          <div
            className="w-10 h-10 rounded-lg border border-[#e5e5e5] flex items-center justify-center text-[#404040] shrink-0"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <ClockIcon />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-[#171717] leading-6">Set rationing hours</p>
            <p className="text-sm text-[#525252] leading-5">
              This schedule will be shared with residents while rationing is active.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#474739]">Start Time</label>
            <TimePicker value={startTime} onChange={setStartTime} />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#474739]">End Time</label>
            <TimePicker value={endTime} onChange={setEndTime} minTime={startTime ?? undefined} />
          </div>
        </div>

        {/* Footer */}
        <div>
          <div className="h-px bg-[#e5e5e5]" />
          <div className="flex items-center justify-end gap-3 px-6 py-5">
            <button
              onClick={onCancel}
              className="bg-white rounded-[8px] px-4 py-2.5 text-base font-semibold text-[#474739]"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Cancel
            </button>
            <button
              onClick={() => canSave && onSave(startTime!, endTime!)}
              disabled={!canSave}
              className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ boxShadow: "inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Activate rationing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
