"use client";

import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import type { Post } from "@/types";
import { ArticleCategoryColumnContent } from "./article-category-column";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ColumnItem {
  title: string;
  viewMoreHref?: string;
  posts: Post[];
}

interface ArticleCategoryColumnsSliderProps {
  items: ColumnItem[];
}

export function ArticleCategoryColumnsSlider({ items }: ArticleCategoryColumnsSliderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => setIsMounted(true), []);

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 450,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      centerMode: true,
      centerPadding: "10%",
      autoplay: true,
      autoplaySpeed: 4200,
      pauseOnHover: true,
      touchThreshold: 6,
      beforeChange: (_: number, next: number) => setActiveSlide(next),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "8%",
          },
        },
      ],
    }),
    []
  );

  if (!items || items.length === 0) return null;

  return (
    <div className="lg:hidden">
      {isMounted && (
        <Slider {...sliderSettings}>
          {items.map((item, idx) => (
            <div key={item.title} className="px-2 pb-4">
              <motion.div
                initial={{ y: 18, opacity: 0.6 }}
                animate={{
                  y: idx === activeSlide ? 0 : 12,
                  opacity: idx === activeSlide ? 1 : 0.85,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full"
              >
                <ArticleCategoryColumnContent
                  title={item.title}
                  viewMoreHref={item.viewMoreHref}
                  posts={item.posts}
                />
              </motion.div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}


