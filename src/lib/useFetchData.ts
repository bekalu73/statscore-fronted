import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // centralised error handling — extend here (toasts, logging, etc.)
    return Promise.reject(error);
  },
);

export function useFetchData<T>(
  queryKey: string[],
  url: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    select?: (data: T) => T;
  },
) {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<T>(url);
      return response.data;
    },
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: options?.enabled,
    refetchInterval: options?.refetchInterval,
    select: options?.select,
  });
}
