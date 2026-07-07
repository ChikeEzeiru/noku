export type UpdateItem = {
  img: string;
  title: string;
  excerpt: string;
  body: string[];
  isNew: boolean;
  categoryColor: "purple" | "pink" | "orange";
  label: string;
  urgency: "Normal" | "Urgent";
  time: string;
};
