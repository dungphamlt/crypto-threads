"use client";

import type { CoinDetail } from "@/services/coins-service";
import { formatCoinPrice } from "@/lib/utils";

interface CoinKeyMetricsProps {
  coin: CoinDetail;
}

export function CoinKeyMetrics({ coin }: CoinKeyMetricsProps) {
  const metrics = coin.keyMetrics || ({} as CoinDetail["keyMetrics"]);

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num?.toFixed(2) ?? "0";
  };

  const formatSupply = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(num || 0);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 py-4 px-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2 font-funnel">Key metrics</h3>
        
        <div className="space-y-4 border-t border-foreground/10 pt-4">
          {/* Market Stats */}
          <div className="space-y-2">
            <div className="text-sm md:text-base font-semibold text-muted-foreground mb-2">
              Market stat
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">Market Cap:</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                ${formatNumber(metrics?.marketCap || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">Volume (24h):</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                ${formatNumber(metrics?.volume24h || 0)}
              </span>
            </div>
          </div>

          {/* Supply */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            {/* <div className="text-sm md:text-base font-semibold text-muted-foreground mb-2">
              Supply
            </div> */}
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">Circulating Supply:</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {formatSupply(metrics?.circulatingSupply || 0)} {coin.symbol?.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">Total Supply:</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {formatSupply(metrics?.totalSupply || 0)} {coin.symbol?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            {/* <div className="text-sm md:text-base font-semibold text-muted-foreground mb-2">
              Performance
            </div> */}
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">YTD Return:</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {(metrics?.ytdRetrun ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm md:text-base font-semibold text-muted-foreground mb-2">
              {coin.name} Price
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">Open Price (24h):</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {formatCoinPrice(metrics?.openPrice24h || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">High (24h):</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {formatCoinPrice(metrics?.high24h || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">Low (24h):</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {formatCoinPrice(metrics?.low24h || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs md:text-base text-muted-foreground font-medium">All-Time High:</span>
              <span className="text-xs md:text-base font-semibold text-foreground">
                {formatCoinPrice(metrics?.ath || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Placeholder */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center min-h-[200px]">
        <span className="text-xl font-bold text-muted-foreground uppercase">
          BANNER
        </span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center min-h-[200px]">
        <span className="text-xl font-bold text-muted-foreground uppercase">
          BANNER
        </span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center min-h-[200px]">
        <span className="text-xl font-bold text-muted-foreground uppercase">
          BANNER
        </span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center min-h-[200px]">
        <span className="text-xl font-bold text-muted-foreground uppercase">
          BANNER
        </span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 p-12 flex items-center justify-center min-h-[200px]">
        <span className="text-xl font-bold text-muted-foreground uppercase">
          BANNER
        </span>
      </div>
    </div>
  );
}

