import { getOfferList } from "@/lib/apiClient";
export interface TableData {
  data: DataItem[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
export interface DataItem {
  id: number;
  phone: string;
  company: string;
  jobTitle: string;
  price: number;
  user_name: string;
  email: string;
  type: "yearly" | "monthly";
  status: "all" | "accepted" | "rejected" | "pending"; // Add status property
}

export const columns: { id: keyof DataItem | "action"; label: string }[] = [
  { id: "user_name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "company", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "type", label: "Type" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
];
