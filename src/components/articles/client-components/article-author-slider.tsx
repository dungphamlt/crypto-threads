"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Post } from "@/types";
import { useRef, useMemo } from "react";
import { ArticleAuthorCard } from "./article-author-card";

interface ArticleAuthorSliderProps {
  posts: Post[];
}

export function ArticleAuthorSlider({ posts }: ArticleAuthorSliderProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = useMemo(
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

  return (
    <section className="space-y-6">
      <Slider ref={sliderRef} {...settings} className="-mx-2">
        {posts.map((post) => (
          <div key={post._id || post.id} className="px-2">
            <ArticleAuthorCard post={post} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
