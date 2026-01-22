import { message } from "antd";
import type { ApiResponse } from "@/types";

interface RequestConfig extends RequestInit {
  params?: Record<string, any>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function request<T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { params, ...init } = config;

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    url += `?${searchParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();

    if (result.code !== 0) {
      message.error(result.message || "请求失败");
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

export const api = {
  get: <T = any>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "GET" }),

  post: <T = any>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T = any>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T = any>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "DELETE" }),
};
