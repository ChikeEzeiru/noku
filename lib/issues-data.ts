export type IssueStatus = "In review" | "Resolved";

export type Issue = {
  id: number;
  category: string;
  dotColor: string;
  subject: string;
  dateReported: string;
  dateLong: string;
  status: IssueStatus;
  description: string;
  attachment?: { name: string; fileType: string };
};

export const issues: Issue[] = [
  {
    id: 1,
    category: "Generator",
    dotColor: "#0ea5e9",
    subject: "Unusual noise from generator at night",
    dateReported: "Jun 28",
    dateLong: "Reported Jun 28",
    status: "In review",
    description:
      "The generator has been making loud knocking sounds after midnight. It starts suddenly around 12:30am and disrupts sleep. This has been happening for the past two weeks.",
  },
  {
    id: 2,
    category: "Billing",
    dotColor: "#f97316",
    subject: "My contribution amount seems incorrect",
    dateReported: "Jun 15",
    dateLong: "Reported Jun 15",
    status: "Resolved",
    description:
      "I removed my second AC in April but my June bill still shows 2 AC units. My bill should be lower.",
    attachment: { name: "AC picture.jpg", fileType: "JPG" },
  },
  {
    id: 3,
    category: "Payment",
    dotColor: "#6366f1",
    subject: "Made external payment but still showing unpaid",
    dateReported: "May 3",
    dateLong: "Reported May 3",
    status: "Resolved",
    description:
      "I made a bank transfer payment for May but the app still shows me as unpaid.",
    attachment: { name: "Payment receipt.jpg", fileType: "JPG" },
  },
];

export const activeIssues = issues.filter((i) => i.status !== "Resolved");
