function TrendUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
      <path d="M18.333 4.167L11.25 11.25l-3.333-3.333L1.667 14.167M18.333 4.167H13.333M18.333 4.167V9.167" />
    </svg>
  );
}

function CoinsHandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
      <path d="M10.833 3.333a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM1.667 17.5c0-3.452 3.358-5.833 6.666-5.833M13.75 12.5l4.583 1.667-2.916 2.916-1.667-4.583z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
      <path d="M10.488 2.012l7.5 7.5a1.667 1.667 0 010 2.357l-5 5a1.667 1.667 0 01-2.357 0l-7.5-7.5A1.667 1.667 0 012.5 8.19V3.333A1.333 1.333 0 013.833 2h4.857c.442 0 .866.176 1.178.488v0zM5.833 5.833h.009" />
    </svg>
  );
}

function PiggyBankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
      <path d="M16.667 9.167H15.5A5.833 5.833 0 104.333 13.75L3.333 17.5h2.5l.833-2.5h5.668l.833 2.5h2.5l-.834-3.183a5.81 5.81 0 001.5-2.317h.834a.833.833 0 00.833-.833V10a.833.833 0 00-.833-.833zM7.5 10a.833.833 0 110-1.667A.833.833 0 017.5 10z" />
    </svg>
  );
}

const rows = [
  {
    icon: <TrendUpIcon />,
    label: "Total estimated",
    sub: "for all 24 apartment units",
    amount: "₦2,470,000",
    amountClass: "text-noku-heading",
  },
  {
    icon: <CoinsHandIcon />,
    label: "Total collected",
    sub: "from residents",
    amount: "₦2,280,000",
    amountClass: "text-noku-heading",
  },
  {
    icon: <TagIcon />,
    label: "Total spent",
    sub: "Fuel, maintenance, etc",
    amount: "₦2,240,000",
    amountClass: "text-noku-heading",
  },
  {
    icon: <PiggyBankIcon />,
    label: "Net Result",
    sub: "surplus to be carried forward",
    amount: "₦40,000",
    amountClass: "text-noku-green font-semibold",
  },
];

export default function ReconciliationCard() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 flex flex-col gap-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-noku-heading">Monthly Reconciliation</p>
        <p className="text-sm text-[#525252] leading-5">Summary of estimated, collected, and spent funds for the month.</p>
      </div>

      <div className="flex flex-col divide-y divide-[#e5e5e5]">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3 py-3.5">
            <div className="w-9 h-9 rounded-lg border border-[#e5e5e5] flex items-center justify-center text-[#404040] shrink-0" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              {row.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717]">{row.label}</p>
              <p className="text-xs text-[#737373]">{row.sub}</p>
            </div>
            <p className={`text-sm shrink-0 ${row.amountClass}`}>{row.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
