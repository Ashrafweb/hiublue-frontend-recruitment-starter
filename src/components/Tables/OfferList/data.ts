import { DataItem } from "@/types";

export const columns: { id: keyof DataItem | "action"; label: string }[] = [
  { id: "user_name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "company", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "type", label: "Type" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
];
