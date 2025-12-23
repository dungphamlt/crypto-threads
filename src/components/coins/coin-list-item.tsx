"use client";

import Image from "next/image";
import Link from "next/link";
import type { Coin } from "@/services/coins-service";
import { formatCoinPrice } from "@/lib/utils";

interface CoinListItemProps {
  coin: Coin;
}

export function CoinListItem({ coin }: CoinListItemProps) {
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <Link
      href={`/coins/${coin.id}`}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
    >
      {/* Icon */}
      <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {coin.image ? (
          <Image
            src={coin.image}
            alt={coin.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            {coin.symbol?.[0]?.toUpperCase() || "?"}
          </div>
        )}
      </div>

      {/* Name and Ticker */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
          {coin.name}
        </div>
        <div className="text-xs text-muted-foreground uppercase">
          {coin.symbol}
        </div>
      </div>

      {/* Percentage Change and Price */}
      <div className="flex flex-col items-end gap-1">
        <div className="text-sm font-semibold text-foreground">
          {formatCoinPrice(coin.current_price)}
        </div>
        <div
          className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"
            }`}
        >
          {isPositive ? "+" : ""}
          {priceChange.toFixed(2)}%
        </div>

      </div>
    </Link>
  );
}

