// lib/api-client.ts

import { TableData } from "@/components/Tables/OfferList/data";
import { CardData, WeeklyData } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummy-1.hiublue.com/api"; // Fallback to default

// Function to get token from localStorage (avoiding useAuth())
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); // Retrieve token from localStorage
  }
  return null;
};

// Generic function to make API requests
async function apiClient<T>(
  endpoint: string,
  method: string = "GET",
  body: any = null,
  headers: Record<string, string> = {}
): Promise<T> {
  const token = localStorage.getItem("token") || null; // Get token from localStorage

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json", // Default content type
      ...headers, // Merge additional headers
    },
  };

  if (body) {
    if (typeof body === "object") {
      options.body = JSON.stringify(body);
    } else {
      options.body = body; // For sending FormData or other non-JSON data
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    return (await response.json()) as T;
  } catch (error: any) {
    console.error(`API request failed: ${error.message}`);
    throw error;
  }
}

export const loginApi = async (credentials: any): Promise<any> => {
  return apiClient("/login", "POST", credentials);
};

export const getDashboardSummary = async (
  query: string
): Promise<CardData | null> => {
  return apiClient("/dashboard/summary" + query, "GET");
};

export const getDashboardStats = async (
  query: string
): Promise<WeeklyData | null> => {
  return apiClient("/dashboard/stat" + query, "GET");
};

export const createOffer = async (offerData: any) => {
  return apiClient("/offers", "POST", offerData);
};

export const getUsers = async (params: string): Promise<any> => {
  return apiClient("/users?" + params, "GET");
};

export const getOfferList = async (params: string): Promise<TableData> => {
  return apiClient("/offers" + "?" + params, "GET");
};
export default apiClient;
