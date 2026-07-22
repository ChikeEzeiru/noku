"use client";

import { useState } from "react";

type Scenario = "baseline" | "increase";

// ── Thresholds & scale ────────────────────────────────────────────────────────

const MAX_VAL      = 2_300_000;
const WARNING_VAL  =   750_000;
const CRITICAL_VAL =   500_000;

// ── SVG viewport ──────────────────────────────────────────────────────────────

const VW = 568;
const VH = 248;

// Plot area — margins reserved for axis labels
const PX0 = 62;   // left  (FUND BALANCE col + y-tick labels + gap)
const PX1 = 510;  // right (leaves room for Warning / Critical text)
const PY0 = 10;
const PY1 = 204;

const X_LABEL_Y = 218;
const X_TITLE_Y = 236;

// ── Axis config ───────────────────────────────────────────────────────────────

const Y_TICKS: [string, number][] = [
  ["₦2.3m", 2_300_000],
  ["₦2m",   2_000_000],
  ["₦1.5m", 1_500_000],
  ["₦1m",   1_000_000],
  ["₦0.5m",   500_000],
  ["₦0",           0],
];

const X_TICKS = [1, 5, 10, 15, 20, 25, 30];

// ── Data ──────────────────────────────────────────────────────────────────────

const BASELINE: [number, number][] = [
  [1, 2_300_000], [3, 2_200_000],  [5, 2_080_000],  [7, 1_960_000],
  [9, 1_840_000], [11, 1_730_000], [13, 1_640_000], [15, 1_530_000],
  [17, 1_400_000],[19, 1_240_000], [21, 1_060_000], [22, 870_000],
  [23, 730_000],  [25, 540_000],   [27, 310_000],   [29, 110_000], [30, 20_000],
];

const INCREASE: [number, number][] = [
  [1, 2_300_000], [3, 2_080_000],  [5, 1_840_000], [7, 1_580_000],
  [9, 1_320_000], [11, 1_060_000], [13, 810_000],  [15, 590_000],
  [16, 490_000],  [18, 310_000],   [20, 140_000],  [21, 40_000], [22, 0],
];

// ── Coordinate helpers ────────────────────────────────────────────────────────

function px(day: number) {
  return PX0 + ((day - 1) / 29) * (PX1 - PX0);
}
function py(val: number) {
  return PY1 - (val / MAX_VAL) * (PY1 - PY0);
}
function pt(day: number, val: number) {
  return `${px(day).toFixed(2)},${py(val).toFixed(2)}`;
}

function colorFor(val: number): string {
  if (val <= CRITICAL_VAL) return "#dc2626";
  if (val <= WARNING_VAL)  return "#ca8a04";
  return "#17a248";
}

// ── Segment builder ───────────────────────────────────────────────────────────
// Inserts exact threshold-crossing points, then groups consecutive same-colour
// sub-segments into a single SVG path per colour zone.

function buildColoredSegments(data: [number, number][]): { d: string; color: string }[] {
  // 1. Expand: insert crossing points at each threshold
  const expanded: [number, number][] = [data[0]];

  for (let i = 1; i < data.length; i++) {
    const [d1, v1] = data[i - 1];
    const [d2, v2] = data[i];

    const crossings: [number, number][] = [];
    for (const T of [WARNING_VAL, CRITICAL_VAL]) {
      if ((v1 > T) !== (v2 > T)) {
        const t = (v1 - T) / (v1 - v2);
        crossings.push([d1 + t * (d2 - d1), T]);
      }
    }
    crossings.sort((a, b) => a[0] - b[0]);
    expanded.push(...crossings, [d2, v2]);
  }

  // 2. Walk expanded array, merging runs with the same colour
  const segments: { d: string; color: string }[] = [];
  let i = 0;

  while (i < expanded.length - 1) {
    const [da, va] = expanded[i];
    const [db, vb] = expanded[i + 1];
    const color = colorFor((va + vb) / 2);

    let d = `M ${pt(da, va)} L ${pt(db, vb)}`;
    let j = i + 2;

    while (j < expanded.length) {
      const [dc, vc] = expanded[j];
      const [dp, vp] = expanded[j - 1];
      if (colorFor((vp + vc) / 2) !== color) break;
      d += ` L ${pt(dc, vc)}`;
      j++;
    }

    segments.push({ d, color });
    i = j - 1;
  }

  return segments;
}

// ── Area path (single gradient fill — decorative only) ────────────────────────

function buildAreaPath(data: [number, number][]): string {
  const first = data[0];
  const last  = data[data.length - 1];
  const line  = data.map(([d, v]) => `${pt(d, v)}`).join(" L ");
  return `M ${pt(first[0], first[1])} L ${line} L ${px(last[0]).toFixed(2)},${PY1} L ${px(first[0]).toFixed(2)},${PY1} Z`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function RunwayChart() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const data     = scenario === "baseline" ? BASELINE : INCREASE;
  const segments = buildColoredSegments(data);

  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl h-full flex flex-col"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-col gap-5 p-6 h-full">

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 shrink-0">
          <p className="text-base font-semibold text-[#171717]">Runway projection</p>

          <div className="flex items-center gap-1 bg-noku-secondary-alt border border-noku-rule rounded-lg">
            {(["baseline", "increase"] as Scenario[]).map((s) => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  scenario === s
                    ? "border border-noku-rule bg-white font-semibold text-noku-heading shadow-sm"
                    : "border border-transparent font-medium text-[#525252] hover:text-noku-heading"
                }`}
              >
                {s === "baseline" ? "Baseline" : "20% fuel price increase"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chart ── */}
        <div className="flex-1 min-h-0 w-full relative">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
          >
            <defs>
              <linearGradient id="runway-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#17a248" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#17a248" stopOpacity="0"    />
              </linearGradient>
            </defs>

            {/* "FUND BALANCE" rotated y-axis title */}
            <text
              x={8}
              y={(PY0 + PY1) / 2}
              textAnchor="middle"
              fontSize="10"
              fill="#5b5b4b"
              letterSpacing="0.06em"
              transform={`rotate(-90 8 ${(PY0 + PY1) / 2})`}
            >
              FUND BALANCE
            </text>

            {/* Gridlines + y-axis tick labels */}
            {Y_TICKS.map(([label, val]) => {
              const y = py(val);
              return (
                <g key={label}>
                  <line x1={PX0} y1={y} x2={PX1} y2={y} stroke="#e5e5e5" strokeWidth="1" />
                  <text
                    x={PX0 - 8} y={y + 4}
                    textAnchor="end" fontSize="12" fill="#5b5b4b"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            <path d={buildAreaPath(data)} fill="url(#runway-area)" />

            {/* Warning threshold line + label */}
            <line
              x1={PX0} y1={py(WARNING_VAL)} x2={PX1} y2={py(WARNING_VAL)}
              stroke="#ca8a04" strokeWidth="1.5"
            />
            <text
              x={VW} y={py(WARNING_VAL) + 4}
              textAnchor="end" fontSize="10" fill="#ca8a04" fontWeight="500"
            >
              Warning
            </text>

            {/* Critical threshold line + label */}
            <line
              x1={PX0} y1={py(CRITICAL_VAL)} x2={PX1} y2={py(CRITICAL_VAL)}
              stroke="#dc2626" strokeWidth="1.5"
            />
            <text
              x={VW} y={py(CRITICAL_VAL) + 4}
              textAnchor="end" fontSize="10" fill="#dc2626" fontWeight="500"
            >
              Critical
            </text>

            {/* Colour-coded projection line */}
            {segments.map((seg, i) => (
              <path
                key={i}
                d={seg.d}
                fill="none"
                stroke={seg.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* X-axis labels */}
            {X_TICKS.map((day) => (
              <text
                key={day}
                x={px(day)} y={X_LABEL_Y}
                textAnchor="middle" fontSize="11" fill="#5b5b4b"
              >
                {day}
              </text>
            ))}

            {/* "DAY OF THE MONTH" */}
            <text
              x={(PX0 + PX1) / 2} y={X_TITLE_Y}
              textAnchor="middle" fontSize="10" fill="#5b5b4b" letterSpacing="0.06em"
            >
              DAY OF THE MONTH
            </text>
          </svg>
        </div>

      </div>
    </div>
  );
}
