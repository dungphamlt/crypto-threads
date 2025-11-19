import { useQuery } from "@tanstack/react-query";
import { fetchCoins, type Coin, type CoinsQueryParams } from "@/services/coins-service";

export const coinsQueryKeys = {
  all: ["coins"] as const,
  lists: () => [...coinsQueryKeys.all, "list"] as const,
  list: (params: CoinsQueryParams) =>
    [...coinsQueryKeys.lists(), params] as const,
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

