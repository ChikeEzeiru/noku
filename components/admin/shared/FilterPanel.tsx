"use client";

import { useState, useRef, useEffect } from "react";

export type FilterField = {
  key: string;
  label: string;
  type: "text" | "multiselect";
  operators: string[];
  options?: string[];
};

export type AppliedFilter = {
  field: string;
  operator: string;
  value: string | string[];
};

type InternalRow = {
  id: string;
  field: string;
  operator: string;
  value: string | string[];
};

type Props = {
  fields: FilterField[];
  maxRows?: number;
  onApply: (filters: AppliedFilter[]) => void;
  className?: string;
};

const SKEU = "0px 1px 2px 0px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)";

function FilterLinesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h16M5 10h10M8 15h4" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" />
    </svg>
  );
}

function XCloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5L5 15M5 5l10 10" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

function SearchSmIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14L11.333 11.333M12.667 7.333a5.333 5.333 0 11-10.667 0 5.333 5.333 0 0110.667 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

function makeRow(fields: FilterField[]): InternalRow {
  const f = fields[0];
  return {
    id: Math.random().toString(36).slice(2),
    field: f?.key ?? "",
    operator: f?.operators[0] ?? "",
    value: f?.type === "multiselect" ? [] : "",
  };
}

// ── MultiSelectValue ──────────────────────────────────────────────────────────

function MultiSelectValue({
  field,
  value,
  onChange,
  open,
  onToggle,
}: {
  field: FilterField;
  value: string[];
  onChange: (val: string[]) => void;
  open: boolean;
  onToggle: () => void;
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const options = field.options ?? [];
  const filtered = search.trim()
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  function toggle(opt: string) {
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 bg-white rounded-[8px] pl-3 pr-[10px] py-2 text-sm"
        style={{
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          border: open ? "2px solid #1d1d16" : "1px solid #d4d4d4",
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          {value.length > 0 ? (
            <>
              <span className="font-medium text-[#171717] whitespace-nowrap">{value.length} selected</span>
              <span className="text-[#525252] truncate text-xs">{value.join(", ")}</span>
            </>
          ) : (
            <span className="text-[#737373]">Select options</span>
          )}
        </div>
        <span className="shrink-0"><ChevronDownIcon /></span>
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 left-0 min-w-full w-max max-w-[260px] bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] z-20 overflow-hidden"
          style={{ boxShadow: "0px 12px 16px -4px rgba(0,0,0,0.08), 0px 4px 6px -2px rgba(0,0,0,0.03)" }}
        >
          {/* Search */}
          <div className="border-b border-[#e5e5e5] p-1">
            <div className="flex items-center gap-2 px-3 py-2 text-[#737373]">
              <SearchSmIcon />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className="flex-1 text-sm text-[#171717] placeholder:text-[#737373] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-[272px] overflow-y-auto py-1">
            {filtered.map(opt => {
              const checked = value.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  className="w-full flex items-center gap-2 px-1 py-px hover:bg-[#fafafa] text-left"
                >
                  <div className="p-2 rounded-[6px] flex items-center">
                    <div
                      className="w-4 h-4 flex items-center justify-center rounded-[4px] shrink-0"
                      style={{
                        backgroundColor: checked ? "#0c0c09" : "white",
                        border: checked ? "1px solid #0c0c09" : "1px solid #d4d4d4",
                      }}
                    >
                      {checked && <CheckIcon />}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#171717]">{opt}</span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-[#737373]">No options match</p>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[rgba(0,0,0,0.1)] p-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onChange([])}
              className="bg-white rounded-[8px] px-[10px] py-[6px] text-sm font-semibold text-[#404040]"
              style={{ boxShadow: SKEU }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => onChange([...options])}
              className="bg-white rounded-[8px] px-[10px] py-[6px] text-sm font-semibold text-[#404040]"
              style={{ boxShadow: SKEU }}
            >
              Select all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FilterPanel ───────────────────────────────────────────────────────────────

export default function FilterPanel({ fields, maxRows = 3, onApply, className = "" }: Props) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [draftRows, setDraftRows] = useState<InternalRow[]>([]);
  const [applied, setApplied] = useState<InternalRow[]>([]);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const appliedCount = applied.filter(r => {
    const v = r.value;
    return Array.isArray(v) ? v.length > 0 : (v as string).trim() !== "";
  }).length;

  useEffect(() => {
    if (!panelOpen) return;
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
        setOpenSub(null);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [panelOpen]);

  function openPanel() {
    const init =
      applied.length > 0
        ? applied.map(r => ({ ...r, value: Array.isArray(r.value) ? [...r.value] : r.value }))
        : [makeRow(fields)];
    setDraftRows(init);
    setOpenSub(null);
    setPanelOpen(true);
  }

  function applyFilters() {
    const snapshot = draftRows.map(r => ({
      ...r,
      value: Array.isArray(r.value) ? [...r.value] : r.value,
    }));
    setApplied(snapshot);
    onApply(snapshot.map(r => ({ field: r.field, operator: r.operator, value: r.value })));
    setPanelOpen(false);
    setOpenSub(null);
  }

  function clearAll() {
    setDraftRows([makeRow(fields)]);
    setApplied([]);
    onApply([]);
    setPanelOpen(false);
    setOpenSub(null);
  }

  function addRow() {
    if (draftRows.length < maxRows) {
      setDraftRows(prev => [...prev, makeRow(fields)]);
    }
  }

  function removeRow(id: string) {
    setDraftRows(prev => {
      const next = prev.filter(r => r.id !== id);
      return next.length === 0 ? [makeRow(fields)] : next;
    });
    setOpenSub(null);
  }

  function updateField(id: string, fieldKey: string) {
    const f = fields.find(x => x.key === fieldKey);
    if (!f) return;
    setDraftRows(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, field: fieldKey, operator: f.operators[0] ?? "", value: f.type === "multiselect" ? [] : "" }
          : r
      )
    );
    setOpenSub(null);
  }

  function updateOperator(id: string, op: string) {
    setDraftRows(prev => prev.map(r => r.id === id ? { ...r, operator: op } : r));
    setOpenSub(null);
  }

  function updateValue(id: string, val: string | string[]) {
    setDraftRows(prev => prev.map(r => r.id === id ? { ...r, value: val } : r));
  }

  function toggleSub(key: string) {
    setOpenSub(prev => (prev === key ? null : key));
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => (panelOpen ? setPanelOpen(false) : openPanel())}
        className={`flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-sm font-semibold ${
          appliedCount > 0
            ? "bg-[#2b2b22] text-white btn-press-cta"
            : "bg-white text-[#404040] btn-press-nav"
        }`}
        style={{
          boxShadow: appliedCount > 0
            ? panelOpen
              ? "inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05), 0px 0px 0px 2px white, 0px 0px 0px 4px #abab9c"
              : "inset 0px 0px 0px 1px rgba(0,0,0,0.18), inset 0px -2px 0px 0px rgba(0,0,0,0.05)"
            : panelOpen
              ? `${SKEU}, 0px 0px 0px 2px white, 0px 0px 0px 4px #abab9c`
              : SKEU,
        }}
      >
        <FilterLinesIcon />
        Filters
        {appliedCount > 0 && (
          <span className="bg-white/20 rounded-[6px] px-1.5 py-0.5 text-xs font-medium text-white">
            {appliedCount}
          </span>
        )}
        <ChevronDownIcon />
      </button>

      {/* Panel */}
      {panelOpen && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] z-50"
          style={{
            width: "min(624px, calc(100vw - 32px))",
            boxShadow: "0px 12px 8px rgba(0,0,0,0.08), 0px 4px 3px rgba(0,0,0,0.03), 0px 2px 1px rgba(0,0,0,0.04)",
          }}
        >
          {/* Rows */}
          <div className="p-4 flex flex-col gap-3">
            {draftRows.map((row, index) => {
              const fieldDef = fields.find(f => f.key === row.field);
              const rowZ = draftRows.length - index + 5;
              return (
                <div key={row.id} className="flex gap-1 items-start" style={{ position: "relative", zIndex: rowZ }}>
                  {/* Field */}
                  <div className="relative min-w-0 max-w-[160px]" style={{ flex: "1 0 0" }}>
                    <button
                      type="button"
                      onClick={() => toggleSub(`${row.id}:field`)}
                      className="w-full flex items-center justify-between gap-2 bg-white border border-[#d4d4d4] rounded-[8px] pl-3 pr-[10px] py-2 text-sm font-medium text-[#171717]"
                      style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}
                    >
                      <span className="truncate">{fieldDef?.label ?? "Select"}</span>
                      <span className="shrink-0"><ChevronDownIcon /></span>
                    </button>
                    {openSub === `${row.id}:field` && (
                      <div
                        className="absolute top-full mt-1 left-0 w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] z-10 overflow-hidden"
                        style={{ boxShadow: "0px 4px 6px rgba(0,0,0,0.08)" }}
                      >
                        {fields.map(f => (
                          <button
                            key={f.key}
                            type="button"
                            onClick={() => updateField(row.id, f.key)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#fafafa] ${row.field === f.key ? "font-medium text-[#171717]" : "text-[#404040]"}`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Operator */}
                  <div className="relative min-w-0 max-w-[160px]" style={{ flex: "1 0 0" }}>
                    <button
                      type="button"
                      onClick={() => toggleSub(`${row.id}:op`)}
                      className="w-full flex items-center justify-between gap-2 bg-white border border-[#d4d4d4] rounded-[8px] pl-3 pr-[10px] py-2 text-sm font-medium text-[#171717]"
                      style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}
                    >
                      <span className="truncate">{row.operator || "Operator"}</span>
                      <span className="shrink-0"><ChevronDownIcon /></span>
                    </button>
                    {openSub === `${row.id}:op` && (
                      <div
                        className="absolute top-full mt-1 left-0 w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] z-10 overflow-hidden"
                        style={{ boxShadow: "0px 4px 6px rgba(0,0,0,0.08)" }}
                      >
                        {(fieldDef?.operators ?? []).map(op => (
                          <button
                            key={op}
                            type="button"
                            onClick={() => updateOperator(row.id, op)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#fafafa] ${row.operator === op ? "font-medium text-[#171717]" : "text-[#404040]"}`}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Value */}
                  <div className="flex-1 min-w-0">
                    {!fieldDef || fieldDef.type === "text" ? (
                      <input
                        type="text"
                        value={row.value as string}
                        onChange={e => updateValue(row.id, e.target.value)}
                        placeholder="Enter value…"
                        className="w-full bg-white border border-[#d4d4d4] rounded-[8px] px-3 py-2 text-sm text-[#171717] placeholder:text-[#737373] outline-none focus:border-[#abab9c]"
                        style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
                      />
                    ) : (
                      <MultiSelectValue
                        field={fieldDef}
                        value={row.value as string[]}
                        onChange={val => updateValue(row.id, val)}
                        open={openSub === `${row.id}:value`}
                        onToggle={() => toggleSub(`${row.id}:value`)}
                      />
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="shrink-0 w-9 h-9 flex items-center justify-center rounded-[8px] text-[#737373] hover:bg-[#f4f4f0] transition-colors"
                  >
                    <XCloseIcon />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-[#e5e5e5] px-4 py-3 flex items-center justify-between">
            <button
              type="button"
              onClick={addRow}
              disabled={draftRows.length >= maxRows}
              className="flex items-center gap-1.5 bg-white rounded-[8px] px-[10px] py-[6px] text-sm font-semibold text-[#404040] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ boxShadow: SKEU }}
            >
              <PlusIcon />
              Add filter
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="bg-white rounded-[8px] px-[10px] py-[6px] text-sm font-semibold text-[#404040]"
                style={{ boxShadow: SKEU }}
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="rounded-[8px] px-[10px] py-[6px] text-sm font-semibold text-white"
                style={{
                  backgroundColor: "#1d1d16",
                  boxShadow:
                    "0px 1px 2px rgba(0,0,0,0.05), inset 0px 0px 0px 1px rgba(255,255,255,0.12), inset 0px -2px 0px rgba(0,0,0,0.3)",
                }}
              >
                Apply filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
