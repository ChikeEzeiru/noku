type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  tooltip?: string;
};

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5.333v.007M8 7.333v3.334" />
    </svg>
  );
}

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-6" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-[#525252] leading-5">{title}</p>
        <span className="shrink-0 mt-0.5" style={{ color: "#ABAB9C" }}>
          <InfoIcon />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[28px] font-bold leading-tight text-noku-heading tracking-tight">{value}</p>
        <p className="text-xs text-[#737373]">{subtitle}</p>
      </div>
    </div>
  );
}
