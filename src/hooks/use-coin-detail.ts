import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetail, fetchCoinMarketChart, type CoinDetail, type MarketChartData } from "@/services/coins-service";

export const coinDetailQueryKeys = {
  all: ["coin-detail"] as const,
  detail: (id: string) => [...coinDetailQueryKeys.all, id] as const,
  marketChart: (id: string, days: number) => [...coinDetailQueryKeys.detail(id), "market-chart", days] as const,
};

export function useCoinDetail(id: string) {
  return useQuery<CoinDetail, Error>({
    queryKey: coinDetailQueryKeys.detail(id),
    queryFn: () => fetchCoinDetail(id),
    enabled: !!id,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useCoinMarketChart(id: string, days: number = 7) {
  return useQuery<MarketChartData, Error>({
    queryKey: coinDetailQueryKeys.marketChart(id, days),
    queryFn: () => fetchCoinMarketChart(id, days),
    enabled: !!id,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

