export type IssueBadgeType = "Power Issue" | "Bill Issue" | "Payment Issue";

export type ReportedIssue = {
  building: string;
  resident: string;
  preview: string;
  message: string;
  type: IssueBadgeType;
  date: string;
  resolved: boolean;
};

export const issues: ReportedIssue[] = [
  // ── June 2026 ────────────────────────────────────────────────────────────────
  {
    building: "Building C, Unit 6",
    resident: "Aminu Eze",
    preview: "Complete power outage since yesterday evening…",
    message:
      "There has been a complete power outage in my unit since yesterday evening around 7 PM. I have checked my circuit breaker and it appears to be fine. Other units in my building seem to have power. Please can someone look into this as soon as possible — my refrigerator has been off for over 12 hours.",
    type: "Power Issue",
    date: "Jun 27",
    resolved: false,
  },
  {
    building: "Building A, Unit 2",
    resident: "Aisha Bello",
    preview: "AC was removed last month but contribution unchanged…",
    message:
      "I had my air conditioner removed from the apartment at the start of the month and informed the estate office, but my monthly contribution has not changed. My neighbor in Unit 1 has three ACs and pays the same as me. Please review my contribution calculation and adjust accordingly.",
    type: "Bill Issue",
    date: "Jun 26",
    resolved: false,
  },
  {
    building: "Building D, Unit 3",
    resident: "Tunde Okafor",
    preview: "Bill jumped from ₦72,000 to ₦95,000 with no changes…",
    message:
      "My bill for this month seems significantly higher than usual. I have not added any new appliances and my household size has not changed. Last month I paid ₦72,000 but this month I am being asked for ₦95,000. I would appreciate a breakdown of how my contribution was calculated.",
    type: "Bill Issue",
    date: "Jun 24",
    resolved: false,
  },
  {
    building: "Building B, Unit 5",
    resident: "Funke Adeyemi",
    preview: "Payment confirmed on my end but still showing unpaid…",
    message:
      "I made my levy payment via bank transfer on June 20th and have the receipt to prove it. However the app still shows my status as unpaid. I have sent the transfer receipt to the estate WhatsApp group but nothing has been updated. Please fix this before any reminders are sent to me.",
    type: "Payment Issue",
    date: "Jun 22",
    resolved: true,
  },
  {
    building: "Building C, Unit 3",
    resident: "Obinna Amos",
    preview: "Generator cuts out every 20 minutes throughout the night…",
    message:
      "We have been experiencing intermittent power supply — the generator comes on for about 20 minutes then goes off for 10 minutes throughout the night. This has been happening for the past week. It is affecting sleep and my work-from-home setup significantly.",
    type: "Power Issue",
    date: "Jun 21",
    resolved: true,
  },
  {
    building: "Building B, Unit 4",
    resident: "Ciroma Adekunle",
    preview: "Card payment fails after entering details, tried two cards…",
    message:
      "I have been trying to make my levy payment through the app for the past three days but keep getting an error after I enter my card details. I have tried two different cards and the issue persists. Please advise on an alternative payment method or fix the issue on your end.",
    type: "Payment Issue",
    date: "Jun 12",
    resolved: true,
  },
  {
    building: "Building A, Unit 4",
    resident: "Emeka Nwosu",
    preview: "No power in the building since 6 AM, generator not starting…",
    message:
      "There has been no generator power in the entire building since 6 AM this morning. It seems the generator is not starting at all. NEPA (grid) power has also been out since last night. The situation is critical as several residents work from home and children have school online today.",
    type: "Power Issue",
    date: "Jun 10",
    resolved: true,
  },
  {
    building: "Building D, Unit 1",
    resident: "Ngozi Eze",
    preview: "Charged for 2 bedrooms but I have a 1-bedroom unit…",
    message:
      "Looking at the contribution formula on the estate portal, it appears I am being charged for a 2-bedroom apartment. I have lived in a 1-bedroom unit since I moved in. I believe there may have been a data entry error when my unit was registered. Please correct this and refund the difference.",
    type: "Bill Issue",
    date: "Jun 7",
    resolved: false,
  },
  {
    building: "Building B, Unit 2",
    resident: "David Nwankwo",
    preview: "App showing wrong payment amount — ₦115,000 instead of ₦95,000…",
    message:
      "The app is displaying a payment amount of ₦115,000 for my unit this month. This is different from all my neighbours who are showing ₦95,000. I have not changed any household details. It may be a calculation error on the backend. Please check and correct before the payment deadline.",
    type: "Bill Issue",
    date: "Jun 5",
    resolved: true,
  },
  {
    building: "Building C, Unit 1",
    resident: "Chioma Obi",
    preview: "Transfer payment confirmed by bank but not reflected in app…",
    message:
      "I completed a bank transfer for my June levy on June 2nd. My bank confirmed the transaction and deducted the funds. However the app is still showing me as unpaid and I received a reminder SMS. Please find the payment: Transaction ref TRF/2026/06/02/0047821. Amount: ₦95,000.",
    type: "Payment Issue",
    date: "Jun 3",
    resolved: true,
  },
  // ── May 2026 ─────────────────────────────────────────────────────────────────
  {
    building: "Building A, Unit 3",
    resident: "Fatima Balogun",
    preview: "Voltage fluctuations damaging appliances in the unit…",
    message:
      "For the past two weeks, we have been experiencing serious voltage fluctuations when the generator is running. My microwave stopped working on Saturday and I suspect the fluctuations are responsible. I am worried about damage to my television and refrigerator as well. Please have an electrician check the generator output.",
    type: "Power Issue",
    date: "May 29",
    resolved: true,
  },
  {
    building: "Building D, Unit 5",
    resident: "Bayo Adeleke",
    preview: "Repeated payment failures — bank is charging me fees each time…",
    message:
      "I have attempted to pay my levy through the app four times over the past week. Each time the payment fails at the final step, but my bank is still charging a transaction fee of ₦52 per attempt. I have now lost over ₦200 in failed transaction fees. Please fix the payment gateway urgently.",
    type: "Payment Issue",
    date: "May 27",
    resolved: true,
  },
  {
    building: "Building B, Unit 1",
    resident: "Halima Yusuf",
    preview: "New occupant moved in — need bill updated to include extra person…",
    message:
      "My sister moved in with me at the beginning of May, bringing my household to 3 occupants instead of 2. I want to make sure my contribution is updated correctly to reflect this. I also registered her as an occupant through the portal but the contribution figure has not changed on the app.",
    type: "Bill Issue",
    date: "May 24",
    resolved: true,
  },
  {
    building: "Building C, Unit 4",
    resident: "Uche Okonkwo",
    preview: "Generator completely off during scheduled hours since Monday…",
    message:
      "The generator has been completely off since Monday morning despite being within scheduled running hours (7 AM – 11 PM). NEPA power has also been unavailable. I have been working from a cafe this week because I cannot power my laptop and external monitors at home. Please provide an update on when this will be resolved.",
    type: "Power Issue",
    date: "May 22",
    resolved: true,
  },
  {
    building: "Building A, Unit 5",
    resident: "Sade Coker",
    preview: "Paid via app but receipt shows wrong levy period (May instead of June)…",
    message:
      "I made a payment through the app yesterday and received a receipt, but the receipt shows the payment is for May 2026 when I intended it for June 2026. My June balance is still showing as outstanding. Please adjust the payment allocation or let me know the correct procedure to ensure June is marked as paid.",
    type: "Payment Issue",
    date: "May 19",
    resolved: true,
  },
  {
    building: "Building D, Unit 2",
    resident: "Musa Garba",
    preview: "Being billed for 2 ACs but the second one has been sold…",
    message:
      "I sold one of my air conditioners in April and updated the estate records at the office. However my May contribution still reflects 2 ACs instead of 1. The difference amounts to roughly ₦18,000. Please update my household data and adjust my June bill accordingly. I can provide the disposal receipt.",
    type: "Bill Issue",
    date: "May 16",
    resolved: true,
  },
  {
    building: "Building B, Unit 3",
    resident: "Tunde Okafor",
    preview: "Generator noise level has increased significantly — possible fault…",
    message:
      "The generator has become much louder over the past 10 days. The noise level at night is affecting sleep for residents in the B block ground floor. A similar noise issue last year turned out to be a faulty silencer. Please have a technician inspect it before it becomes a bigger problem.",
    type: "Power Issue",
    date: "May 12",
    resolved: true,
  },
  {
    building: "Building C, Unit 2",
    resident: "Amaka Osei",
    preview: "Double-charged for April — two ₦95,000 deductions in same month…",
    message:
      "My bank statement shows two deductions of ₦95,000 to the estate in April — one on April 3rd and another on April 28th. I only authorised a single payment. I believe there may have been a duplicate charge. Please investigate and refund the duplicate amount as soon as possible.",
    type: "Payment Issue",
    date: "May 8",
    resolved: true,
  },
  {
    building: "Building A, Unit 1",
    resident: "Emeka Nwosu",
    preview: "Power supply cuts off every time NEPA comes on (inverter conflict?)…",
    message:
      "Every time the NEPA grid power is restored, the generator goes off but the transition takes 5–10 seconds, during which my unit loses power completely. I believe there may be an issue with the changeover switch or the inverter. My desktop computer has crashed three times this month due to this. Can an electrician look at the changeover?",
    type: "Power Issue",
    date: "May 5",
    resolved: true,
  },
  {
    building: "Building D, Unit 4",
    resident: "Kemi Olatunji",
    preview: "Unable to access levy history — app crashes on payment history screen…",
    message:
      "Every time I tap on Payment History in the app, the screen freezes and then the app crashes. I have uninstalled and reinstalled the app twice with no improvement. I need to access my payment history to confirm a dispute with the estate records. I am using an iPhone 13 with iOS 17.4.",
    type: "Payment Issue",
    date: "May 2",
    resolved: true,
  },
];

export function issuesForUnit(buildingUnit: string): ReportedIssue[] {
  return issues.filter((i) => i.building === buildingUnit);
}
