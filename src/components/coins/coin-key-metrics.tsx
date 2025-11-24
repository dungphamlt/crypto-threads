"use client";

import type { CoinDetail } from "@/services/coins-service";
import { formatCoinPrice } from "@/lib/utils";

interface CoinKeyMetricsProps {
  coin: CoinDetail;
}

export function CoinKeyMetrics({ coin }: CoinKeyMetricsProps) {
  const marketData = coin.market_data;

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatSupply = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Key metrics</h3>
        
        <div className="space-y-4">
          {/* Market Stats */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              Market stat
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Market Cap:</span>
              <span className="text-sm font-semibold text-foreground">
                ${formatNumber(marketData?.market_cap?.usd || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Volume (24h):</span>
              <span className="text-sm font-semibold text-foreground">
                ${formatNumber(marketData?.total_volume?.usd || 0)}
              </span>
            </div>
          </div>

          {/* Supply */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              Supply
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Circulating Supply:</span>
              <span className="text-sm font-semibold text-foreground">
                {formatSupply(marketData?.circulating_supply || 0)} {coin.symbol?.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Total Supply:</span>
              <span className="text-sm font-semibold text-foreground">
                {formatSupply(marketData?.total_supply || 0)} {coin.symbol?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              Performance
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">YTD Return:</span>
              <span className="text-sm font-semibold text-foreground">
                {marketData?.price_change_percentage_24h?.toFixed(1) || "0.0"}%
              </span>
            </div>
          </div>

          {/* Bitcoin Price */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              {coin.name} Price
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Open Price (24h):</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCoinPrice(marketData?.current_price?.usd || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">High (24h):</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCoinPrice(marketData?.high_24h?.usd || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Low (24h):</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCoinPrice(marketData?.low_24h?.usd || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">High (52w):</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCoinPrice(marketData?.high_52w?.usd || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">Low (52w):</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCoinPrice(marketData?.low_52w?.usd || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">All-Time High:</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCoinPrice(marketData?.ath?.usd || 0)}
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
    </div>
  );
}

