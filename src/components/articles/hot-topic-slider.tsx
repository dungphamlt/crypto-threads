"use client";

import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import type { Post } from "@/types";
import { MainArticleCard } from "./main-article-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HotTopicSliderProps {
  posts: Post[];
}

export function HotTopicSlider({ posts }: HotTopicSliderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 450,
      slidesToShow: 1.4,
      slidesToScroll: 1,
      swipe: true,
      centerMode: false,
      touchThreshold: 6,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1.1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1.4,
          },
        },
      ],
    }),
    []
  );

  if (!posts || posts.length === 0) return null;

  return (
    <div className="lg:hidden -mx-2">
      {isMounted && (
        <Slider {...sliderSettings}>
          {posts.map((post) => (
            <div key={post._id || post.id} className="px-2 pb-2">
              <MainArticleCard post={post} isHotTopic={true} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
