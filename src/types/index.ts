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
