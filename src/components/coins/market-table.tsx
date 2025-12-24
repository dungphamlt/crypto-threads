"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCoinPrice } from "@/lib/utils";
import { Sparkline } from "./sparkline";
import { useCoins } from "@/hooks/use-coins";
import { CoinListItemSkeleton } from "../skeletons/coin-list-item-skeleton";

interface MarketTableProps {
  limit?: number;
}

export function MarketTable({ limit = 6 }: MarketTableProps) {
  const { data: coins, isLoading, isError } = useCoins({
    per_page: limit,
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6 uppercase">MARKET</h2>
        <div className="space-y-4">
          {Array.from({ length: limit }).map((_, index) => (
            <CoinListItemSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !coins || coins.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6 uppercase">MARKET</h2>
        <div className="text-sm text-red-500 py-4 text-center">
          Failed to load market data
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm my-10">
      {/* Title */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 font-funnel">Market</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm md:text-lg font-normal text-foreground">
                Currency
              </th>
              <th className="text-left py-3 px-4 text-sm md:text-lg font-normal text-foreground">
                Price
              </th>
              <th className="text-left py-3 px-4 text-sm md:text-lg font-normal text-foreground">
                7 Days Market
              </th>
              <th className="text-right py-3 px-4 text-sm md:text-lg font-normal text-foreground">
                24H Change
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const priceChange = coin.price_change_percentage_24h || 0;
              const isPositive = priceChange >= 0;
              const sparklineData = coin.sparkline_in_7d?.price || [];
              const hasPositiveTrend = sparklineData.length > 1 
                ? sparklineData[sparklineData.length - 1] >= sparklineData[0]
                : isPositive;

              return (
                <tr
                  key={coin.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <Link
                      href={`/coins/${coin.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        {coin.image ? (
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-medium text-xs md:text-base text-foreground">
                            {coin.symbol?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                        {coin.symbol?.toUpperCase() || coin.name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm md:text-base font-medium text-foreground">
                      {formatCoinPrice(coin.current_price)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 h-8">
                      <Sparkline 
                        data={sparklineData} 
                        isPositive={hasPositiveTrend}
                        width={96}
                        height={32}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {isPositive ? (
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                      <span
                        className={`text-sm md:text-base font-medium ${
                          isPositive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {priceChange.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

