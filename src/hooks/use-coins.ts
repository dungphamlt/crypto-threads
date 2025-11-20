import { useQuery } from "@tanstack/react-query";
import { fetchCoins, fetchTrendingCoins, fetchTopGrowCoins, fetchNewCoins, type Coin, type CoinsQueryParams } from "@/services/coins-service";

export const coinsQueryKeys = {
  all: ["coins"] as const,
  lists: () => [...coinsQueryKeys.all, "list"] as const,
  list: (params: CoinsQueryParams) =>
    [...coinsQueryKeys.lists(), params] as const,
  trending: (limit: number) => [...coinsQueryKeys.all, "trending", limit] as const,
  topGrow: (limit: number) => [...coinsQueryKeys.all, "topGrow", limit] as const,
  new: (limit: number) => [...coinsQueryKeys.all, "new", limit] as const,
};

export function useCoins(params: CoinsQueryParams = {}) {
  return useQuery<Coin[], Error>({
    queryKey: coinsQueryKeys.list(params),
    queryFn: () => fetchCoins(params),
    staleTime: 30 * 1000, // 30 seconds - data is fresh for 30s
    gcTime: 5 * 60 * 1000, // 5 minutes - cache for 5 minutes
    refetchInterval: 60 * 1000, // Auto-refetch every 60 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch when network reconnects
    retry: 3, // Retry 3 times on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}

export function useTrendingCoins(limit: number = 5) {
  return useQuery<Coin[], Error>({
    queryKey: coinsQueryKeys.trending(limit),
    queryFn: () => fetchTrendingCoins(limit),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useTopGrowCoins(limit: number = 5) {
  return useQuery<Coin[], Error>({
    queryKey: coinsQueryKeys.topGrow(limit),
    queryFn: () => fetchTopGrowCoins(limit),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useNewCoins(limit: number = 5) {
  return useQuery<Coin[], Error>({
    queryKey: coinsQueryKeys.new(limit),
    queryFn: () => fetchNewCoins(limit),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

