"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useCoins } from "@/hooks/use-coins";
// import type { Coin } from "@/services/coins-service";
import { CoinSliderSkeleton } from "@/components/skeletons";
import { formatCoinPrice } from "@/lib/utils";
import Image from "next/image";

// Mini Chart Component
function MiniChart({
  prices,
  isPositive,
  coinId,
}: {
  prices: number[];
  isPositive: boolean;
  coinId: string;
}) {
  if (!prices || prices.length === 0) {
    return null;
  }

  const width = 100;
  const height = 40;
  const padding = 4;

  // Normalize prices to fit within chart area
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const points = prices.map((price, index) => {
    const x =
      padding + (index / (prices.length - 1 || 1)) * (width - padding * 2);
    const normalizedPrice = (price - minPrice) / priceRange;
    const y = height - padding - normalizedPrice * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;

  // Create area path for fill
  const areaPath = `${pathData} L ${
    width - padding
  },${height} L ${padding},${height} Z`;

  // Colors optimized for dark background
  const lineColor = isPositive
    ? "#4ade80" // green-400
    : "#f87171"; // red-400
  const fillColor = isPositive
    ? "rgba(74, 222, 128, 0.2)" // green-400 with opacity
    : "rgba(248, 113, 113, 0.2)"; // red-400 with opacity
  const gradientId = `gradient-${coinId}-${isPositive ? "green" : "red"}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute bottom-0 left-0 right-0"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fillColor} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path
        d={pathData}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CoinSlider() {
  const router = useRouter();
  const {
    data: coins = [],
    isLoading,
    isError,
    error,
  } = useCoins({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 15,
    page: 1,
    sparkline: true,
    price_change_percentage: "24h",
  });

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: true,

      // Autoplay settings
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 500,
      cssEase: "ease-in-out",
      rtl: false,

      // Slide settings
      slidesToShow: Math.min(coins.length, 7),
      slidesToScroll: 1,

      // Pause settings
      pauseOnHover: true,
      pauseOnFocus: true,
      pauseOnDotsHover: true,

      // Touch/Swipe settings
      swipe: true,
      draggable: true,
      touchMove: true,
      swipeToSlide: true,
      touchThreshold: 5,

      // Autoplay
      waitForAnimate: true,

      // Accessibility
      accessibility: true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: Math.min(coins.length, 5),
            swipe: true,
            draggable: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(coins.length, 4),
            swipe: true,
            draggable: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(coins.length, 3),
            swipe: true,
            draggable: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: Math.min(coins.length, 3), // Minimum 3 coins on small screens
            swipe: true,
            draggable: true,
          },
        },
      ],
    }),
    [coins.length]
  );

  const renderContent = () => {
    if (isLoading) {
      return <CoinSliderSkeleton />;
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center py-3 text-sm text-red-400">
          Failed to load coin data.{" "}
          {error?.message || "Please try again later."}
        </div>
      );
    }

    if (coins.length === 0) {
      return (
        <div className="flex items-center justify-center py-3 text-sm text-gray-400">
          No coin data available.
        </div>
      );
    }

    return (
      <Slider {...sliderSettings}>
        {coins.map((coin) => {
          const priceChange = coin.price_change_percentage_24h || 0;
          const isPositive = priceChange >= 0;
          const sparklinePrices = coin.sparkline_in_7d?.price || [];

          return (
            <div key={coin.id} className="px-1 sm:px-3">
              <div
                onClick={() => router.push(`/coin/${coin.id}`)}
                className={`
                  relative rounded-xl px-4 py-2 overflow-hidden border cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]
                  ${
                    isPositive
                      ? `
                      dark:bg-gradient-to-b dark:from-green-900/40 dark:via-green-900/30 dark:to-gray-900 dark:border-green-800/50
                      bg-gradient-to-b from-green-200 via-green-100 to-white border-green-300
                    `
                      : `
                      dark:bg-gradient-to-b dark:from-red-900/40 dark:via-red-900/30 dark:to-gray-900 dark:border-red-800/50
                      bg-gradient-to-b from-red-200 via-red-100 to-white border-red-300
                    `
                  }
                `}
                style={{
                  minHeight: "80px",
                }}
              >
                {/* Header: Icon + Symbol */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-6 h-6  rounded-full bg-gray-500">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white uppercase">
                    {coin.symbol}
                  </span>
                </div>

                {/* Price and Change: Vertical on mobile, Horizontal on desktop */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-2 mb-4">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCoinPrice(coin.current_price)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {isPositive ? (
                      <ArrowUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-red-400" />
                    )}
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {priceChange.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Mini Chart */}
                {sparklinePrices.length > 0 && (
                  <div className="relative h-8 w-full">
                    <MiniChart
                      prices={sparklinePrices}
                      isPositive={isPositive}
                      coinId={coin.id}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    );
  };

  return <div className="mt-18">{renderContent()}</div>;
}
