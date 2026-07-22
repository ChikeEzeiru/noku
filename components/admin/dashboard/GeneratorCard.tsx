"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useEstateStore } from "@/store/estateStore";
import type { TimeValue } from "@/components/admin-onboarding/Step4";
import RationingHoursModal from "./RationingHoursModal";
import OverrideStatusModal from "./OverrideStatusModal";

function formatTime(t: TimeValue | null | undefined): string {
  if (!t) return "—";
  return `${t.hour}:${t.minute} ${t.period}`;
}

type GeneratorStatus = "normal" | "off" | "rationed" | "under_repair";

const statusConfig: Record<GeneratorStatus, { image: string; label: string }> = {
  normal:       { image: "/Images/Dashboard-gen-status-normal.png",       label: "The generator is operating normally." },
  off:          { image: "/Images/Dashboard-gen-status-off.png",           label: "The generator is currently off." },
  rationed:     { image: "/Images/Dashboard-gen-status-rationed.png",     label: "Rationing is active — power is being managed." },
  under_repair: { image: "/Images/Dashboard-gen-status-under_repair.png", label: "The generator is under repair." },
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2.5L1.667 17.5h16.666L10 2.5Z" />
      <path d="M10 8.333v3.334M10 14.167h.008" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8.333" />
      <path d="M6.667 10l2.5 2.5 4.166-5" />
    </svg>
  );
}

// ── Confirm dialog ────────────────────────────────────────────────────────────

function ConfirmRationingDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onCancel} />
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[400px] flex flex-col"
        style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
      >
        <div className="flex flex-col gap-4 pt-6 px-6 pb-5">
          <div
            className="w-10 h-10 rounded-lg border border-amber-200 bg-amber-50 flex items-center justify-center text-amber-700 shrink-0"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            <WarningIcon />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-[#171717] leading-6">Activate fuel rationing?</p>
            <p className="text-sm text-[#525252] leading-5">
              This will reduce generator hours for all residents until you manually deactivate it. Residents will not be notified automatically.
            </p>
          </div>
        </div>
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
              onClick={onConfirm}
              className="rounded-[8px] px-4 py-2.5 text-base font-semibold text-amber-900"
              style={{
                background: "#fef3c7",
                boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(217,119,6,0.35), inset 0px -2px 0px 0px rgba(217,119,6,0.12)",
              }}
            >
              Yes, activate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Card ──────────────────────────────────────────────────────────────────────

export default function GeneratorCard({
  className = "",
  status = "normal",
}: {
  className?: string;
  status?: GeneratorStatus;
}) {
  const generator            = useEstateStore((s) => s.generator);
  const rationingActive      = useEstateStore((s) => s.rationingActive);
  const rationingSchedule    = useEstateStore((s) => s.rationingSchedule);
  const setRationingActive   = useEstateStore((s) => s.setRationingActive);
  const setRationingSchedule = useEstateStore((s) => s.setRationingSchedule);
  const generatorOverride    = useEstateStore((s) => s.generatorOverride);
  const setGeneratorOverride = useEstateStore((s) => s.setGeneratorOverride);

  const effectiveStatus = generatorOverride ?? (rationingActive ? "rationed" : status);
  const { image, label } = statusConfig[effectiveStatus];

  const [showConfirm, setShowConfirm]       = useState(false);
  const [showHours, setShowHours]           = useState(false);
  const [showOverride, setShowOverride]     = useState(false);
  const [toastMsg, setToastMsg]             = useState<string | null>(null);
  const [isToastExiting, setIsToastExiting] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setIsToastExiting(false);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => {
      setIsToastExiting(true);
      setTimeout(() => { setToastMsg(null); setIsToastExiting(false); }, 200);
    }, 3300);
  }

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const timeLabel = rationingActive && rationingSchedule
    ? `${formatTime(rationingSchedule.startTime)} – ${formatTime(rationingSchedule.endTime)}`
    : generator
      ? `${formatTime(generator.startTime)} – ${formatTime(generator.endTime)}`
      : "7:00PM – 2:00AM";

  function handleHoursSaved(startTime: TimeValue, endTime: TimeValue) {
    setRationingSchedule({ startTime, endTime });
    setRationingActive(true);
    setShowHours(false);
    showToast("Rationing activated. Residents have been notified of the new schedule.");
  }

  return (
    <>
      <div className={`bg-white border border-[#e5e5e5] rounded-xl overflow-hidden flex flex-col ${className}`} style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
        {/* Time header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#e5e5e5] flex items-center justify-between gap-3">
          <p className="text-sm text-[#525252]">{timeLabel}</p>
          {rationingActive && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 border border-amber-200 text-amber-700 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              Rationing on
            </span>
          )}
        </div>

        {/* Image + status */}
        <div className="flex flex-col gap-5 p-6 flex-1">
          <div className="rounded-xl overflow-hidden bg-[#fdf7f2] w-full relative flex-1">
            <Image src={image} alt={label} fill className="object-contain" />
          </div>
          <p className="text-sm text-[#525252] text-center">{label}</p>
        </div>

        {/* Actions */}
        <div className="border-t border-[#e5e5e5] px-6 py-4 flex items-center gap-3">
          {generatorOverride ? (
            <button
              onClick={() => { setGeneratorOverride(null); showToast("Generator status restored. Residents have been notified."); }}
              className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739] btn-press-nav"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              Clear Override
            </button>
          ) : (
            <>
              {rationingActive ? (
                <button
                  onClick={() => { setRationingActive(false); setRationingSchedule(null); }}
                  className="flex-1 px-[14px] py-[10px] text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  Deactivate Rationing
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex-1 px-[14px] py-[10px] text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  Activate Rationing
                </button>
              )}
              <button
                onClick={() => setShowOverride(true)}
                className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739] btn-press-nav"
                style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}
              >
                Override Status
              </button>
            </>
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmRationingDialog
          onConfirm={() => { setShowConfirm(false); setShowHours(true); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showHours && (
        <RationingHoursModal
          onSave={handleHoursSaved}
          onCancel={() => setShowHours(false)}
        />
      )}

      {showOverride && (
        <OverrideStatusModal
          onConfirm={(value) => {
            setGeneratorOverride(value);
            setShowOverride(false);
            showToast(value === "off" ? "Generator marked as off. Residents have been notified." : "Generator marked as under repair. Residents have been notified.");
          }}
          onCancel={() => setShowOverride(false)}
        />
      )}

      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 text-sm font-medium text-white rounded-[10px] px-4 py-3 toast-enter${isToastExiting ? " animate-[toastOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]" : ""}`}
          style={{ background: "#2b2b22", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
        >
          <CheckCircleIcon />
          {toastMsg}
        </div>
      )}
    </>
  );
}
