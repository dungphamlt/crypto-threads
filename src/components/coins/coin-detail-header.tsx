"use client";

import Image from "next/image";
import type { CoinDetail } from "@/services/coins-service";
import { formatCoinPrice } from "@/lib/utils";

interface CoinDetailHeaderProps {
  coin: CoinDetail;
}

export function CoinDetailHeader({ coin }: CoinDetailHeaderProps) {
  const priceChange = coin.market_data?.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;
  const currentPrice = coin.market_data?.current_price?.usd || 0;

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Logo */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {coin.image?.large ? (
          <Image
            src={coin.image.large}
            alt={coin.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg text-gray-400">
            {coin.symbol?.[0]?.toUpperCase() || "?"}
          </div>
        )}
      </div>

      {/* Name and Symbol */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          {coin.name}
        </h1>
        <p className="text-lg text-muted-foreground uppercase">
          {coin.symbol}
        </p>
      </div>

      {/* Price and Change */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-3">
          <span
            className={`text-lg font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
          <span className="text-3xl font-bold text-foreground">
            {formatCoinPrice(currentPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

