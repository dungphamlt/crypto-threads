"use client";

import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useTrendingCoins, useTopGrowCoins, useNewCoins } from "@/hooks/use-coins";
import { CoinListCard } from "./coin-list-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CoinListsSectionProps {
  limit?: number;
}

export function CoinListsSection(props: CoinListsSectionProps = {}) {
  const { limit = 5 } = props;
  const trending = useTrendingCoins(limit);
  const topGrow = useTopGrowCoins(limit);
  const newlyListed = useNewCoins(limit);

  // react-slick needs a client-only render to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => setIsMounted(true), []);

  const cards = useMemo(
    () => [
      { title: "TRENDING", state: trending },
      { title: "TOP GROW", state: topGrow },
      { title: "NEW", state: newlyListed },
    ],
    [trending, topGrow, newlyListed]
  );

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 450,
      slidesToShow: 1, // center each card; padding adds slight peek
      slidesToScroll: 1,
      swipe: true,
      centerMode: true,
      centerPadding: "10%",
      autoplay: true,
      autoplaySpeed: 3800,
      pauseOnHover: true,
      touchThreshold: 6,
      beforeChange: (_: number, next: number) => setActiveSlide(next),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "6%",
          },
        },
      ],
    }),
    []
  );

  return (
    <>
      {/* Desktop / laptop grid */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CoinListCard
          title="TRENDING"
          coins={trending.data}
          isLoading={trending.isLoading}
          isError={trending.isError}
          errorMessage={trending.error?.message}
          limit={limit}
        />
        <CoinListCard
          title="TOP GROW"
          coins={topGrow.data}
          isLoading={topGrow.isLoading}
          isError={topGrow.isError}
          errorMessage={topGrow.error?.message}
          limit={limit}
        />
        <CoinListCard
          title="NEW"
          coins={newlyListed.data}
          isLoading={newlyListed.isLoading}
          isError={newlyListed.isError}
          errorMessage={newlyListed.error?.message}
          limit={limit}
        />
      </div>

      {/* Tablet + mobile slider */}
      <div className="lg:hidden">
        {isMounted && (
          <Slider {...sliderSettings}>
            {cards.map((card, idx) => (
              <div key={card.title} className="px-2 pb-4">
                <motion.div
                  initial={{ y: 18, opacity: 0.6 }}
                  animate={{
                    y: idx === activeSlide ? 0 : 12,
                    opacity: idx === activeSlide ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-full"
                >
                  <CoinListCard
                    title={card.title}
                    coins={card.state.data}
                    isLoading={card.state.isLoading}
                    isError={card.state.isError}
                    errorMessage={card.state.error?.message}
                    limit={limit}
                  />
                </motion.div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}

