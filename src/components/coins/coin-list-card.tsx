"use client";

import type { Coin } from "@/services/coins-service";
import { CoinListItem } from "./coin-list-item";
import { CoinListItemSkeleton } from "../skeletons/coin-list-item-skeleton";

interface CoinListCardProps {
  title: string;
  coins?: Coin[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  limit?: number;
}

export function CoinListCard({
  title,
  coins = [],
  isLoading,
  isError,
  errorMessage,
  limit = 5,
}: CoinListCardProps) {

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-4 uppercase">
        {title}
      </h3>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: limit }).map((_, index) => (
            <CoinListItemSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-red-500 py-4 text-center">
          {errorMessage || `Failed to load ${title.toLowerCase()} coins`}
        </div>
      ) : coins.length === 0 ? (
        <div className="text-sm text-muted-foreground py-4 text-center">
          No {title.toLowerCase()} coins available
        </div>
      ) : (
        <div className="space-y-2">
          {coins.map((coin) => (
            <CoinListItem key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
}

