"use client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type TimeValue = { hour: string; minute: string; period: "AM" | "PM" };

// ── Internal helpers ──────────────────────────────────────────────────────────

const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

function toMins24(t: { hour: string; minute: string; period: "AM" | "PM" }): number {
  let h = parseInt(t.hour, 10);
  const m = parseInt(t.minute, 10);
  if (t.period === "AM") { if (h === 12) h = 0; }
  else                   { if (h !== 12) h += 12; }
  return h * 60 + m;
}

// ── Public helpers ────────────────────────────────────────────────────────────

export function nextTimeSlot(t: TimeValue): TimeValue {
  const total = (toMins24(t) + 5) % (24 * 60);
  const h24 = Math.floor(total / 60);
  const m   = total % 60;
  const period: "AM" | "PM" = h24 < 12 ? "AM" : "PM";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return { hour: String(h12).padStart(2, "0"), minute: String(m).padStart(2, "0"), period };
}

// Cross-period (PM→AM or AM→PM) is always valid for scheduling purposes
// (covers overnight runs like 7:00 PM → 2:00 AM).
export function isValidEnd(start: TimeValue, end: TimeValue): boolean {
  if (start.period !== end.period) return true;
  return toMins24(end) > toMins24(start);
}

// ── Restriction helpers (used only when minTime is provided) ──────────────────

function canSelectPeriod(endPeriod: "AM" | "PM", minPeriod: "AM" | "PM", minMins: number): boolean {
  if (minPeriod !== endPeriod) return true; // cross-period always valid
  return HOURS.some((h) => MINUTES.some((m) => toMins24({ hour: h, minute: m, period: endPeriod }) > minMins));
}

function canSelectHour(endHour: string, endPeriod: "AM" | "PM", minPeriod: "AM" | "PM", minMins: number): boolean {
  if (minPeriod !== endPeriod) return true;
  return MINUTES.some((m) => toMins24({ hour: endHour, minute: m, period: endPeriod }) > minMins);
}

function canSelectMinute(endHour: string, endMinute: string, endPeriod: "AM" | "PM", minPeriod: "AM" | "PM", minMins: number): boolean {
  if (minPeriod !== endPeriod) return true;
  return toMins24({ hour: endHour, minute: endMinute, period: endPeriod }) > minMins;
}

// ── Component ─────────────────────────────────────────────────────────────────

type Props = {
  value: TimeValue | null;
  onChange: (v: TimeValue) => void;
  minTime?: TimeValue; // when set, options before this time are disabled
};

export function TimePicker({ value, onChange, minTime }: Props) {
  const selectCls = "appearance-none bg-transparent border-none outline-none text-base text-[#171717] cursor-pointer flex-1 text-center";

  const hour   = value?.hour   ?? "";
  const minute = value?.minute ?? "";
  const period = value?.period ?? "AM";

  const minMins   = minTime ? toMins24(minTime) : -1;
  const minPeriod = minTime?.period ?? "AM";

  function update(patch: Partial<TimeValue>) {
    onChange({ hour, minute, period, ...patch } as TimeValue);
  }

  function handleHourChange(newHour: string) {
    // If the current minute would become invalid for the new hour, advance to first valid minute
    if (minTime && minute && !canSelectMinute(newHour, minute, period, minPeriod, minMins)) {
      const firstValid = MINUTES.find((m) => canSelectMinute(newHour, m, period, minPeriod, minMins));
      onChange({ hour: newHour, minute: firstValid ?? "", period });
    } else {
      update({ hour: newHour });
    }
  }

  function handlePeriodChange(newPeriod: "AM" | "PM") {
    if (minTime && !canSelectPeriod(newPeriod, minPeriod, minMins)) return;
    // If current hour+minute becomes invalid in the new period, advance to first valid slot
    if (minTime && hour && minute && !canSelectMinute(hour, minute, newPeriod, minPeriod, minMins)) {
      const firstValidHour = HOURS.find((h) => canSelectHour(h, newPeriod, minPeriod, minMins));
      const firstValidMin  = firstValidHour
        ? (MINUTES.find((m) => canSelectMinute(firstValidHour, m, newPeriod, minPeriod, minMins)) ?? "")
        : "";
      onChange({ hour: firstValidHour ?? hour, minute: firstValidMin, period: newPeriod });
    } else {
      update({ period: newPeriod });
    }
  }

  return (
    <div
      className="flex items-center bg-white border border-[#d8d8d0] rounded-[8px] overflow-hidden transition-colors"
      style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" }}
    >
      <select
        value={hour}
        onChange={(e) => handleHourChange(e.target.value)}
        className={`${selectCls} pl-3 pr-1 py-[10px]`}
        style={{ color: hour ? "#171717" : "#7c7c67" }}
      >
        <option value="" disabled>HH</option>
        {HOURS.map((h) => (
          <option key={h} value={h} disabled={!!minTime && !canSelectHour(h, period, minPeriod, minMins)}>
            {h}
          </option>
        ))}
      </select>

      <span className="text-[#d8d8d0] text-base select-none">:</span>

      <select
        value={minute}
        onChange={(e) => update({ minute: e.target.value })}
        className={`${selectCls} pl-1 pr-1 py-[10px]`}
        style={{ color: minute ? "#171717" : "#7c7c67" }}
      >
        <option value="" disabled>MM</option>
        {MINUTES.map((m) => (
          <option key={m} value={m} disabled={!!minTime && !!hour && !canSelectMinute(hour, m, period, minPeriod, minMins)}>
            {m}
          </option>
        ))}
      </select>

      <div className="flex border-l border-[#e8e8e3] self-stretch">
        {(["AM", "PM"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePeriodChange(p)}
            disabled={!!minTime && !canSelectPeriod(p, minPeriod, minMins)}
            className="px-2 text-xs font-semibold transition-colors self-stretch disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              color:      period === p ? "#17a248" : "#737373",
              background: period === p ? "#f0faf4" : "transparent",
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
