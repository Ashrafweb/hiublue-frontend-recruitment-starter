import { TableData } from "@/types";
import { CardData, WeeklyData } from "@/types";
import { cache } from "react";
import { revalidateTag } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummy-1.hiublue.com/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

async function apiClient<T>(
  endpoint: string,
  method: string = "GET",
  body: any = null,
  headers: Record<string, string> = {},
  cacheTag?: string
): Promise<T | null> {
  const token = await getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  } else {
    (options.next = {
      tags: cacheTag ? [cacheTag] : undefined,
      revalidate: 60,
    }),
      (options.cache = "force-cache");
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
    });

    // if (!res.ok) {
    //   throw new Error(`API error: ${res.status}`);
    // }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    return null;
  }
}

export const getSummary = cache(
  async (query: string): Promise<CardData | null> => {
    return apiClient(
      `/dashboard/summary${query}`,
      "GET",
      null,
      {},
      "dashboard"
    );
  }
);

export const getStats = cache(
  async (query: string): Promise<WeeklyData | null> => {
    return apiClient(`/dashboard/stat${query}`, "GET", null, {}, "dashboard");
  }
);

export const getOfferList = cache(
  async (params: string): Promise<TableData | null> => {
    return apiClient("/offers?" + params, "GET", null, {}, "offerList");
  }
);

export const revalidateDashboard = async () => {
  await revalidateTag("dashboard");
};

export const revalidateOfferList = async () => {
  await revalidateTag("offerList");
};

export const loginApi = async (credentials: any): Promise<any> => {
  return apiClient("/login", "POST", credentials);
};

export const createOffer = async (
  offerData: any
): Promise<{ message: string; data?: {}; errors?: {} } | null> => {
  return apiClient("/offers", "POST", offerData);
};

export const getUsers = async (params: string): Promise<any> => {
  return apiClient("/users?" + params, "GET");
};

export default apiClient;
