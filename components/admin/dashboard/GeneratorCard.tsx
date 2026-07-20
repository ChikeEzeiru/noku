"use client";

import Image from "next/image";
import { useEstateStore } from "@/store/estateStore";
import type { TimeValue } from "@/components/admin-onboarding/Step4";

function formatTime(t: TimeValue | null | undefined): string {
  if (!t) return "—";
  return `${t.hour}:${t.minute} ${t.period}`;
}

type GeneratorStatus = "normal" | "off" | "rationed" | "under_repair";

const statusConfig: Record<GeneratorStatus, { image: string; label: string }> = {
  normal:       { image: "/Images/Dashboard-gen-status-normal.png",       label: "The generator is operating normally." },
  off:          { image: "/Images/Dashboard-gen-status-off.png",           label: "The generator is currently off." },
  rationed:     { image: "/Images/Dashboard-gen-status-rationed.png",     label: "Rationing is active — power is being distributed in shifts." },
  under_repair: { image: "/Images/Dashboard-gen-status-under_repair.png", label: "The generator is under repair." },
};

export default function GeneratorCard({
  className = "",
  status = "normal",
}: {
  className?: string;
  status?: GeneratorStatus;
}) {
  const { image, label } = statusConfig[status];
  const generator = useEstateStore((s) => s.generator);

  const timeLabel = generator
    ? `${formatTime(generator.startTime)} – ${formatTime(generator.endTime)}`
    : "7:00PM – 2:00AM";

  return (
    <div className={`bg-white border border-[#e5e5e5] rounded-xl overflow-hidden flex flex-col ${className}`} style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Time header */}
      <div className="px-6 pt-5 pb-4 border-b border-[#e5e5e5]">
        <p className="text-sm text-[#525252]">{timeLabel}</p>
      </div>

      {/* Image + status */}
      <div className="flex flex-col gap-5 p-6 flex-1">
        <div className="rounded-xl overflow-hidden bg-[#fdf7f2] w-full relative flex-1">
          <Image
            src={image}
            alt={label}
            fill
            className="object-cover object-center"
          />
        </div>
        <p className="text-sm text-[#525252] text-center">{label}</p>
      </div>

      {/* Actions */}
      <div className="border-t border-[#e5e5e5] px-6 py-4 flex items-center gap-3">
        <button className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739]" style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}>
          Activate Rationing
        </button>
        <button className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739]" style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)" }}>
          Override Status
        </button>
      </div>
    </div>
  );
}
