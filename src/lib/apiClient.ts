import axios, { AxiosRequestConfig } from "axios";
import { TableData } from "@/types";
import { CardData, WeeklyData } from "@/types";
import { revalidateTag } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummy-1.hiublue.com/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// API Client
async function apiClient<T>(
  endpoint: string,
  method: "GET" | "POST",
  body: any = null,
  cacheTag?: string
): Promise<T | null> {
  const token = getAuthToken();
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers,
    data: body ? JSON.stringify(body) : undefined,
  };

  // if (!body) {
  //   config.params = { cache: "force-cache", next: { revalidate: 3600 } };
  // }

  try {
    const { data } = await apiInstance.request<T>(config);
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    return null;
  }
}

// API Endpoints
export const getSummary = async (query: string): Promise<CardData | null> => {
  return apiClient(`/dashboard/summary${query}`, "GET", null, "dashboard");
};

export const getStats = async (query: string): Promise<WeeklyData | null> => {
  return apiClient(`/dashboard/stat${query}`, "GET", null, "dashboard");
};

export const getOfferList = async (
  params: string
): Promise<TableData | null> => {
  return apiClient(`/offers?${params}`, "GET", null, "offerList");
};

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
  return apiClient(`/users?${params}`, "GET");
};

export default apiClient;
