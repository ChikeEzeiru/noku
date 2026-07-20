"use client";

import { useState, useEffect } from "react";

export type EstateStructure = {
  buildingNames: string[];
  aptNaming: string;
  aptCounts: number[];
};

type Props = {
  onNext: (structure: EstateStructure) => void;
  onBack: () => void;
};

/* ── Icons ─────────────────────────────────────────────────── */

function FlipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#474739" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M3.333 7.5H12.5a4.167 4.167 0 010 8.333H7.5" />
      <path d="M6.667 4.167L3.333 7.5l3.334 3.333" />
    </svg>
  );
}

function NokuIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C6.8982 9.14741 6.48284 9.28911 6.05032 9.37451ZM7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C6.45138 10.7003 6.88388 10.8438 7.277 11.086Z" fill="#17A248" />
      <path d="M20 10C20 4.477 15.523 0 10 0C4.645 0 0.273501 4.2095 0.012001 9.5L0 10.5V17C0 17.7956 0.31607 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H9.5V15.613C9.5 14.612 9.439 13.575 8.914 12.723C8.50362 12.057 7.94298 11.4964 7.277 11.086C6.79552 10.8595 6.40988 10.7169 6.0012 10.616C5.62275 10.5227 5.22453 10.465 4.71213 10.4095L3.02063 10.3785C2.94168 10.3515 2.87314 10.3005 2.82462 10.2326C2.77609 10.1648 2.75 10.0834 2.75 10C2.75 9.91657 2.77609 9.83522 2.82462 9.76735C2.87314 9.69948 2.94168 9.64849 3.02063 9.6215L4.71213 9.5905C5.24152 9.53503 5.64888 9.47816 6.05032 9.37451C6.43144 9.2761 6.80721 9.13554 7.277 8.914C7.8876 8.53816 8.41022 8.03537 8.8094 7.43976C9.20857 6.84414 9.47497 6.16964 9.5905 5.462L9.6215 5.2705C9.64849 5.19155 9.69948 5.12302 9.76735 5.07449C9.83522 5.02596 9.91657 4.99987 10 4.99987C10.0834 4.99987 10.1648 5.02596 10.2326 5.07449C10.3005 5.12302 10.3515 5.19155 10.3785 5.2705L10.4095 5.462C10.5784 6.49591 11.0678 7.45066 11.8086 8.19144C12.5493 8.93222 13.5041 9.4216 14.538 9.5905L14.7295 9.6215C14.8084 9.64849 14.877 9.69948 14.9255 9.76735C14.974 9.83522 15.0001 9.91657 15.0001 10C15.0001 10.0834 14.974 10.1648 14.9255 10.2326C14.877 10.3005 14.8084 10.3515 14.7295 10.3785L14.538 10.4095C13.8304 10.5251 13.1559 10.7915 12.5603 11.1906C11.9647 11.5898 11.4619 12.1124 11.086 12.723C10.561 13.575 10.5 14.612 10.5 15.613V20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V10Z" fill="#17A248" />
    </svg>
  );
}

function HelpTooltip({ text }: { text: string }) {
  return (
    <span className="relative group inline-flex items-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="cursor-default">
        <circle cx="8" cy="8" r="6" />
        <path d="M6.06 6a2 2 0 013.887.667C9.947 7.333 8 8 8 8M8 11h.007" />
      </svg>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-[8px] px-3 py-2 text-xs leading-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20"
        style={{ backgroundColor: "#1d1d16", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
      >
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: "#1d1d16" }} />
      </span>
    </span>
  );
}

function ChevronUpSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.5l3-3 3 3" />
    </svg>
  );
}

function ChevronDownSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/* ── Stepper input ──────────────────────────────────────────── */

function StepperInput({
  value, onChange, placeholder, min = 1, error = false, disabled = false,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  min?: number;
  error?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex bg-white border rounded-[8px] overflow-hidden transition-opacity ${error ? "border-red-500" : "border-[#d8d8d0]"} ${disabled ? "opacity-40 pointer-events-none" : ""}`}
      style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
    >
      <input
        type="number"
        value={value > 0 ? value : ""}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || 0))}
        placeholder={placeholder}
        min={min}
        disabled={disabled}
        className="flex-1 min-w-0 px-[14px] py-[10px] text-base text-[#171717] placeholder:text-[#7c7c67] outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="flex flex-col border-l border-[#d8d8d0] self-stretch w-7 shrink-0">
        <button
          type="button"
          onClick={() => onChange((value || 0) + 1)}
          className="flex flex-1 items-end justify-center pb-0.5 hover:bg-[#f5f5f5] transition-colors"
        >
          <ChevronUpSmIcon />
        </button>
        <div className="h-px bg-[#d8d8d0]" />
        <button
          type="button"
          onClick={() => onChange(Math.max(min, (value || 0) - 1))}
          className="flex flex-1 items-start justify-center pt-0.5 hover:bg-[#f5f5f5] transition-colors"
        >
          <ChevronDownSmIcon />
        </button>
      </div>
    </div>
  );
}

/* ── Shared styles ──────────────────────────────────────────── */

const inputCls = (err?: boolean) =>
  `w-full px-[14px] py-[10px] bg-white border rounded-[8px] text-base text-[#171717] placeholder:text-[#7c7c67] outline-none focus:border-[#17a248] transition-colors ${err ? "border-red-500" : "border-[#d8d8d0]"}`;

const inputShadow = { boxShadow: "0px 1px 1px rgba(0,0,0,0.05)" };

const selectShadow = { boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" };

const letter = (i: number) => String.fromCharCode(65 + i);

/* ── Component ──────────────────────────────────────────────── */

export default function AdminOnboardingStep3({ onNext, onBack }: Props) {
  const [numBuildings, setNumBuildings]       = useState(0);
  const [aptsPerBuilding, setAptsPerBuilding] = useState(0);
  const [buildingNaming, setBuildingNaming]   = useState("");
  const [aptNaming, setAptNaming]             = useState("");
  const [isCustom, setIsCustom]               = useState(false);

  const [buildingNames, setBuildingNames] = useState<string[]>([]);
  const [buildingApts, setBuildingApts]   = useState<string[]>([]);

  /* Resize right-panel arrays when numBuildings changes */
  useEffect(() => {
    const naming = buildingNaming || "Building";
    setBuildingNames((prev) =>
      Array.from({ length: numBuildings }, (_, i) => prev[i] ?? `${naming} ${letter(i)}`)
    );
    setBuildingApts((prev) =>
      Array.from({ length: numBuildings }, (_, i) => prev[i] ?? (aptsPerBuilding > 0 ? String(aptsPerBuilding) : ""))
    );
  }, [numBuildings]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Regenerate names when naming convention changes */
  useEffect(() => {
    if (!buildingNaming || numBuildings === 0) return;
    setBuildingNames(Array.from({ length: numBuildings }, (_, i) => `${buildingNaming} ${letter(i)}`));
  }, [buildingNaming]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Propagate uniform count when not in custom mode */
  useEffect(() => {
    if (isCustom || aptsPerBuilding <= 0 || numBuildings === 0) return;
    setBuildingApts(Array.from({ length: numBuildings }, () => String(aptsPerBuilding)));
  }, [aptsPerBuilding, isCustom]); // eslint-disable-line react-hooks/exhaustive-deps

  const canProceed =
    numBuildings > 0 &&
    buildingNaming !== "" &&
    aptNaming !== "" &&
    (isCustom
      ? buildingApts.length === numBuildings && buildingApts.every((a) => a !== "" && Number(a) > 0)
      : aptsPerBuilding > 0);

  const showRightContent = isCustom && numBuildings > 0;

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">

      {/* ── Left — form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-8 w-full max-w-[360px]">

          {/* Step header */}
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={onBack} className="flex items-center gap-2 bg-white border border-[#e8e8e3] rounded-[8px] p-[6px]">
              <FlipBackIcon />
              <span className="text-xs text-[#474739]">Back</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-[#525252]">
              <span>Step</span>
              <span className="text-[20px] font-bold leading-[20px] tracking-[-0.4px]">3</span>
              <span>of 8</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <NokuIcon />
            <p className="text-2xl font-semibold text-[#171717] tracking-[-0.48px] leading-8">
              Estate Structure
            </p>
            <p className="text-base text-[#525252] leading-6">
              Confirm the structure of your estate
            </p>
          </div>

          {/* Form + CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">

              {/* No of Buildings + Apartments per building */}
              <div className="grid grid-cols-2 gap-4">
                {/* No of Buildings */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-sm font-medium text-[#474739]">No of Buildings</label>
                  <StepperInput
                    value={numBuildings}
                    onChange={setNumBuildings}
                    placeholder="e.g. 4"
                  />
                </div>

                {/* Apartments per building */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#474739]">Apts per building</label>
                    <button
                      type="button"
                      onClick={() => setIsCustom((v) => !v)}
                      className={`text-xs font-medium transition-colors ${
                        isCustom
                          ? "text-[#16803c]"
                          : "text-[#737373] hover:text-[#16803c]"
                      }`}
                    >
                      {isCustom ? "✓ Custom" : "Custom"}
                    </button>
                  </div>
                  <StepperInput
                    value={aptsPerBuilding}
                    onChange={setAptsPerBuilding}
                    placeholder="e.g. 6"
                    disabled={isCustom}
                  />
                </div>
              </div>

              {/* Building Naming */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-1">
                  <label className="text-sm font-medium text-[#404040]">Building Naming</label>
                  <HelpTooltip text={'How the structures in your estate are labelled. Residents will see this in their unit address — e.g. selecting “Block” gives “Block A, Flat 3”.'} />
                </div>
                <div className="relative">
                  <select
                    value={buildingNaming}
                    onChange={(e) => setBuildingNaming(e.target.value)}
                    className="w-full appearance-none pl-[12px] pr-10 py-[8px] bg-white border border-[#d4d4d4] rounded-[8px] text-base outline-none focus:border-[#17a248] transition-colors cursor-pointer"
                    style={{ ...selectShadow, color: buildingNaming ? "#171717" : "#737373" }}
                  >
                    <option value="" disabled>e.g. Block, Building, House…</option>
                    <option value="Building">Building</option>
                    <option value="Block">Block</option>
                    <option value="Tower">Tower</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Apartment Naming */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-1">
                  <label className="text-sm font-medium text-[#404040]">Apartment Naming</label>
                  <HelpTooltip text={'How individual units within a building are labelled. This appears alongside the building name — e.g. selecting "Flat" gives "Block A, Flat 3".'} />
                </div>
                <div className="relative">
                  <select
                    value={aptNaming}
                    onChange={(e) => setAptNaming(e.target.value)}
                    className="w-full appearance-none pl-[12px] pr-10 py-[8px] bg-white border border-[#d4d4d4] rounded-[8px] text-base outline-none focus:border-[#17a248] transition-colors cursor-pointer"
                    style={{ ...selectShadow, color: aptNaming ? "#171717" : "#737373" }}
                  >
                    <option value="" disabled>e.g. Flat, Apartment, Unit…</option>
                    <option value="Flat">Flat</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Unit">Unit</option>
                    <option value="Suite">Suite</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onNext({
                buildingNames,
                aptNaming,
                aptCounts: isCustom
                  ? buildingApts.map(Number)
                  : Array.from({ length: numBuildings }, () => aptsPerBuilding),
              })}
              disabled={!canProceed}
              className="w-full py-[13px] px-4 rounded-[10px] text-base font-semibold text-white transition-opacity"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
                opacity: canProceed ? 1 : 0.5,
                cursor: canProceed ? "pointer" : "default",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* ── Right — per-building panel ───────────────────────── */}
      <div className="flex-1 p-3">
        <div
          className={`h-full bg-[#fbfbf9] rounded-[16px] flex flex-col items-center overflow-y-auto transition-all ${
            showRightContent ? "justify-start p-8 pt-10" : "justify-center p-8"
          }`}
        >
          {showRightContent ? (
            <div className="flex flex-col w-full max-w-[400px]">

              {/* Column headers */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wide">Building</p>
                <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wide">No of Apartments</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e5e5e0] mb-5" />

              {/* Per-building rows */}
              <div className="flex flex-col gap-4">
                {Array.from({ length: numBuildings }, (_, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    {/* Building name */}
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-sm font-medium text-[#474739]">
                        {buildingNaming || "Building"} {letter(i)}
                      </label>
                      <input
                        type="text"
                        value={buildingNames[i] ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          setBuildingNames((prev) => prev.map((x, j) => j === i ? v : x));
                        }}
                        placeholder={`${buildingNaming || "Building"} ${letter(i)}`}
                        className={inputCls()}
                        style={inputShadow}
                      />
                    </div>

                    {/* No of apartments */}
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-sm font-medium text-[#474739]">No of Apartments</label>
                      <input
                        type="number"
                        value={buildingApts[i] ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          setBuildingApts((prev) => prev.map((x, j) => j === i ? v : x));
                        }}
                        placeholder="e.g. 8"
                        min={1}
                        className={`${inputCls()} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        style={inputShadow}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 max-w-[220px] text-center">
              <p className="text-sm text-[#9ca3af] leading-6">
                {isCustom
                  ? "Set the number of buildings on the left to configure each one"
                  : "Set a uniform count, or click Custom to specify per building"}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
