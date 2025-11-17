"use client";

import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function CoinSlider() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "/api/coins?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coins: ${response.statusText}`);
        }

        const data: Coin[] = await response.json();

        if (isSubscribed) {
          setCoins(data);
          setHasError(false);
        }
      } catch (error) {
        console.error("Coin slider fetch error:", error);
        if (isSubscribed) {
          setHasError(true);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchCoins();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 12000,
      cssEase: "linear",
      slidesToShow: Math.min(coins.length, 6),
      slidesToScroll: 1,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(coins.length, 4),
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(coins.length, 3),
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: Math.min(coins.length, 2),
          },
        },
      ],
    }),
    [coins.length]
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-3 text-sm text-gray-500 dark:text-gray-400">
          Đang tải dữ liệu coin...
        </div>
      );
    }

    if (hasError || coins.length === 0) {
      return (
        <div className="flex items-center justify-center py-3 text-sm text-red-500">
          Không thể tải dữ liệu coin. Vui lòng thử lại sau.
        </div>
      );
    }

    return (
      <Slider {...sliderSettings}>
        {coins.map((coin) => {
          const priceChange = coin.price_change_percentage_24h;
          const isPositive = priceChange >= 0;
          const changeColor = isPositive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400";

          return (
            <div key={coin.id} className="px-3 py-2">
              <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-900/70 rounded-md px-4 py-2 shadow-sm backdrop-blur">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="h-6 w-6"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
                    {coin.symbol}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {numberFormatter.format(coin.current_price)}
                  </span>
                </div>
                <span
                  className={`ml-auto text-sm font-medium ${changeColor}`}
                >{`${isPositive ? "+" : ""}${
                  priceChange ? priceChange.toFixed(2) : "0.00"
                }%`}</span>
              </div>
            </div>
          );
        })}
      </Slider>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2 border-y border-gray-200 dark:border-gray-700">
      {renderContent()}
    </div>
  );
}
