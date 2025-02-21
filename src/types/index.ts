export interface CardData {
  current: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  previous: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
}

export interface Visits {
  desktop: number;
  mobile: number;
}

export interface WebsiteVisitType {
  [day: string]: Visits;
}

export interface OffersSentType {
  [day: string]: number;
}
export interface WeeklyData {
  website_visits: WebsiteVisitType;
  offers_sent: OffersSentType;
}

export type UserDataType = {
  id: number;
  name: string;
  email: string;
};

//Offer table Types
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
  status: "all" | "accepted" | "rejected" | "pending";
}
