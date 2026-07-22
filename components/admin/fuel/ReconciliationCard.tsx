type RowData = {
  icon: string;
  label: string;
  sub: string;
  amount: string;
  green?: boolean;
};

const ROWS: RowData[] = [
  {
    icon: "/icons/reconciliation-total_estimated-icon.svg",
    label: "Total estimated",
    sub: "for all 24 apartment units",
    amount: "₦2,470,000",
  },
  {
    icon: "/icons/reconciliation-total_collected-icon.svg",
    label: "Total collected",
    sub: "from residents",
    amount: "₦2,280,000",
  },
  {
    icon: "/icons/reconciliation-total_spent-icon.svg",
    label: "Total spent",
    sub: "Fuel, maintenance, etc",
    amount: "₦2,240,000",
  },
];

const NET: RowData = {
  icon: "/icons/reconciliation-net_result icon.svg",
  label: "Net Result",
  sub: "surplus to be carried forward",
  amount: "₦40,000",
  green: true,
};

function IconBox({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="shrink-0 w-10 h-10 rounded-lg border border-noku-border-primary flex items-center justify-center"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <img src={src} width={20} height={20} alt={alt} />
    </div>
  );
}

function Row({ icon, label, sub, amount, green }: RowData) {
  return (
    <div className="flex items-center justify-between pr-6 py-[6px]">
      <div className="flex items-center gap-3">
        <IconBox src={icon} alt={label} />
        <div className="flex flex-col gap-0">
          <p className="text-sm font-medium text-[#474739] leading-5 whitespace-nowrap">{label}</p>
          <p className="text-xs text-[#7c7c67] leading-[18px] whitespace-nowrap">{sub}</p>
        </div>
      </div>
      <p className={`text-sm whitespace-nowrap ${green ? "text-[#16803c]" : "text-[#525252]"}`}>
        {amount}
      </p>
    </div>
  );
}

export default function ReconciliationCard() {
  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden h-full flex flex-col"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-col gap-5 p-6">
        {/* Header */}
        <div className="py-[6px] flex flex-col gap-0.5">
          <p className="text-base font-semibold text-[#474739]">Monthly Reconciliation</p>
          <p className="text-sm text-[#7c7c67] leading-5">
            Summary of estimated, collected, and spent funds for the month.
          </p>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-[4px]">
          {ROWS.map((row) => (
            <Row key={row.label} {...row} />
          ))}

          {/* Divider + Net Result */}
          <div className="flex flex-col gap-3 pt-3">
            <div className="h-px bg-[#e5e5e5] w-full" />
            <Row {...NET} />
          </div>
        </div>
      </div>
    </div>
  );
}
