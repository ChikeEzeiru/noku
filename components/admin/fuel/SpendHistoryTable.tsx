function DotsVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="3" r="0.75" fill="currentColor" />
      <circle cx="8" cy="8" r="0.75" fill="currentColor" />
      <circle cx="8" cy="13" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ReceiptCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7C7C67" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.333 6.333L6.667 7.667l3-3M11.333 13.333V5.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C9.813 2 9.253 2 8.133 2H4.867c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C1.667 3.52 1.667 4.08 1.667 5.2v8.133l1.5-1.166 1.5 1.166 1.5-1.166 1.5 1.166 1.5-1.166 1.166.9" />
    </svg>
  );
}

const entries = [
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,233", total: "₦616,500", supplier: "ABC Fuel Services",  method: "In app",   loggedBy: "Chijioke Adebayo" },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services",  method: "In app",   loggedBy: "Ireti Omoregbe"   },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services",  method: "In app",   loggedBy: "Chijioke Adebayo" },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services",  method: "Transfer", loggedBy: "Chijioke Adebayo" },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "EcoFuel Solutions",  method: "In app",   loggedBy: "Ireti Omoregbe"   },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,315", total: "₦657,500", supplier: "ABC Fuel Services",  method: "Transfer", loggedBy: "Chijioke Adebayo" },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,290", total: "₦645,000", supplier: "ABC Fuel Services",  method: "Transfer", loggedBy: "Chijioke Adebayo" },
  { date: "Jun 15, 2026", qty: 500, unitPrice: "₦1,290", total: "₦645,000", supplier: "EcoFuel Solutions",  method: "Transfer", loggedBy: "Ireti Omoregbe"   },
];

export default function SpendHistoryTable() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
        <p className="text-base font-semibold text-noku-heading">Fund Expenditure (Spend) History</p>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#fafafa] text-[#737373] transition-colors">
          <DotsVerticalIcon />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5]">
              {["Date", "Qty (Litres)", "Unit Price (₦/Litre)", "Total Cost", "Supplier", "Payment Method", "Logged By", "Receipt"].map((col) => (
                <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-[#737373] uppercase tracking-wide whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            {entries.map((row, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-5 py-3.5 text-sm text-[#171717] whitespace-nowrap">{row.date}</td>
                <td className="px-5 py-3.5 text-sm text-[#404040]">{row.qty}</td>
                <td className="px-5 py-3.5 text-sm text-[#404040]">{row.unitPrice}</td>
                <td className="px-5 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.total}</td>
                <td className="px-5 py-3.5 text-sm text-[#404040] whitespace-nowrap">{row.supplier}</td>
                <td className="px-5 py-3.5 text-sm text-[#525252]">{row.method}</td>
                <td className="px-5 py-3.5 text-sm text-[#525252] whitespace-nowrap">{row.loggedBy}</td>
                <td className="px-5 py-3.5">
                  <ReceiptCheckIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
