"use client";

import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import type { Post } from "@/types";
import { CategoryArticleCard } from "./category-article-card";
import { MainArticleCard } from "./main-article-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CategoryCardsSliderProps {
  posts: Post[];
  variant?: "category" | "main";
}

export function CategoryCardsSlider({ posts, variant = "category" }: CategoryCardsSliderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 450,
      slidesToShow: 1.12,
      slidesToScroll: 1,
      swipe: true,
      centerMode: false,
      touchThreshold: 6,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1.08,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1.04,
          },
        },
      ],
    }),
    []
  );

  if (!posts || posts.length === 0) return null;

  return (
    <div className="md:hidden -mx-2">
      {isMounted && (
        <Slider {...sliderSettings}>
          {posts.map((post) => (
            <div key={post.id || post._id} className="px-2 pb-3">
              {variant === "main" ? (
                <MainArticleCard post={post} />
              ) : (
                <CategoryArticleCard post={post} />
              )}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

