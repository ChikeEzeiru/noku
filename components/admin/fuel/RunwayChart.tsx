"use client";

import { useState } from "react";

type Scenario = "baseline" | "increase";

// Chart constants
const SVG_W = 580;
const SVG_H = 280;
const PLOT_X0 = 64;   // left edge of plot area
const PLOT_X1 = 520;  // right edge (leaves room for Warning/Critical labels)
const PLOT_Y0 = 16;   // top edge
const PLOT_Y1 = 236;  // bottom edge
const MAX_VAL = 2_500_000;
const WARNING  = 750_000;
const CRITICAL = 500_000;

function mapX(day: number) {
  return PLOT_X0 + ((day - 1) / 29) * (PLOT_X1 - PLOT_X0);
}
function mapY(val: number) {
  return PLOT_Y1 - (val / MAX_VAL) * (PLOT_Y1 - PLOT_Y0);
}
function toPoints(data: [number, number][]) {
  return data.map(([d, v]) => `${mapX(d).toFixed(1)},${mapY(v).toFixed(1)}`).join(" ");
}

const baselineData: [number, number][] = [
  [1, 2_300_000], [3, 2_200_000], [5, 2_080_000], [7, 1_960_000],
  [9, 1_840_000], [11, 1_730_000], [13, 1_640_000], [15, 1_530_000],
  [17, 1_400_000], [19, 1_240_000], [21, 1_060_000], [22, 870_000],
  [23, 730_000],  [25, 540_000],  [27, 310_000],  [29, 110_000], [30, 20_000],
];

const increaseData: [number, number][] = [
  [1, 2_300_000], [3, 2_080_000], [5, 1_840_000], [7, 1_580_000],
  [9, 1_320_000], [11, 1_060_000], [13, 810_000], [15, 590_000],
  [16, 490_000],  [18, 310_000],  [20, 140_000], [21, 40_000], [22, 0],
];

const yLabels: [string, number][] = [
  ["₦2.3m", 2_300_000],
  ["₦2m",   2_000_000],
  ["₦1.5m", 1_500_000],
  ["₦1m",   1_000_000],
  ["₦0.5m",   500_000],
  ["₦0",          0],
];

const xLabels = [1, 5, 10, 15, 20, 25, 30];

export default function RunwayChart() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const data = scenario === "baseline" ? baselineData : increaseData;

  const yWarning  = mapY(WARNING);
  const yCritical = mapY(CRITICAL);

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-base font-semibold text-noku-heading">Runway projection</p>
        <div className="flex items-center gap-1 bg-noku-secondary-alt border border-noku-rule rounded-lg">
          {(["baseline", "increase"] as Scenario[]).map((s) => (
            <button
              key={s}
              onClick={() => setScenario(s)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                scenario === s
                  ? "border border-noku-rule bg-white font-semibold text-noku-heading shadow-sm"
                  : "border border-transparent text-[#525252] font-medium hover:text-noku-heading"
              }`}
            >
              {s === "baseline" ? "Baseline" : "20% fuel price increase"}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ minWidth: 320, display: "block" }}
          aria-label="Runway projection chart"
        >
          {/* Y-axis gridlines + labels */}
          {yLabels.map(([label, val]) => {
            const y = mapY(val);
            return (
              <g key={label}>
                <line x1={PLOT_X0} y1={y} x2={PLOT_X1} y2={y} stroke="#e5e5e5" strokeWidth="1" />
                <text x={PLOT_X0 - 6} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">
                  {label}
                </text>
              </g>
            );
          })}

          {/* Warning threshold line */}
          <line x1={PLOT_X0} y1={yWarning} x2={PLOT_X1} y2={yWarning} stroke="#EAB308" strokeWidth="1.5" strokeDasharray="0" />
          <text x={PLOT_X1 + 6} y={yWarning + 4} fontSize="11" fill="#EAB308" fontWeight="500">Warning</text>

          {/* Critical threshold line */}
          <line x1={PLOT_X0} y1={yCritical} x2={PLOT_X1} y2={yCritical} stroke="#EF4444" strokeWidth="1.5" />
          <text x={PLOT_X1 + 6} y={yCritical + 4} fontSize="11" fill="#EF4444" fontWeight="500">Critical</text>

          {/* Main projection line */}
          <polyline
            points={toPoints(data)}
            fill="none"
            stroke="#17a248"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis labels */}
          {xLabels.map((day) => (
            <text key={day} x={mapX(day)} y={PLOT_Y1 + 18} textAnchor="middle" fontSize="11" fill="#9ca3af">
              {day}
            </text>
          ))}

          {/* X-axis label: DAY OF THE MONTH */}
          <text x={(PLOT_X0 + PLOT_X1) / 2} y={SVG_H - 2} textAnchor="middle" fontSize="10" fill="#9ca3af" letterSpacing="0.08em">
            DAY OF THE MONTH
          </text>

          {/* Y-axis label: FUND BALANCE (rotated) */}
          <text
            x={10}
            y={(PLOT_Y0 + PLOT_Y1) / 2}
            textAnchor="middle"
            fontSize="10"
            fill="#9ca3af"
            letterSpacing="0.08em"
            transform={`rotate(-90, 10, ${(PLOT_Y0 + PLOT_Y1) / 2})`}
          >
            FUND BALANCE
          </text>
        </svg>
      </div>
    </div>
  );
}
