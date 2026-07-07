export type PaymentRecord = {
  amount: string;   // e.g. "₦95,000"
  period: string;   // e.g. "June 2026"
  datePaid: string; // e.g. "Jun 4, 2026"
  channel: string;  // e.g. "In app" | "External"
};
