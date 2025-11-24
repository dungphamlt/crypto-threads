"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArticleListMoreClientProps {
  posts: Post[];
}

export function ArticleListMoreClient({ posts }: ArticleListMoreClientProps) {
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    // Force autoplay to start after component mounts
    if (sliderRef.current && posts.length > 4) {
      // Small delay to ensure slider is fully initialized
      const timer = setTimeout(() => {
        sliderRef.current?.slickPlay();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [posts.length]);

  const ArticleCard = ({ post }: { post: Post }) => {
    return (
      <div className="px-2">
        <Link href={`/article/${post.slug}`}>
          <div className="cursor-pointer group">
            <div className="flex flex-col gap-3">
              {post.coverUrl ? (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    fill
                    className="w-full h-full object-cover rounded-lg dark:shadow-sm flex-shrink-0"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-2 min-h-12 group-hover:text-primary transition-all duration-300">
                  {post.title}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground group-hover:text-primary transition-all duration-300">
                  <span>By {post.creator.penName}</span>
                  <span>•</span>
                  <span>{formatDate(new Date(post.createdAt))}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: posts.length > 4,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: posts.length > 4,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      pauseOnFocus: false,
      pauseOnDotsHover: false,
      cssEase: "ease-in-out",
      arrows: false,
      waitForAnimate: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: posts.length > 3,
            autoplay: posts.length > 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: posts.length > 2,
            autoplay: posts.length > 2,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: posts.length > 1,
            autoplay: posts.length > 1,
          },
        },
      ],
    }),
    [posts.length]
  );

  return (
    <section className="space-y-6 my-20">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase text-foreground">
          More From Crypto threads
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevious}
            className="cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={handleNext}
            className="cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings} className="-mx-2">
        {posts.map((post) => (
          <ArticleCard key={post._id || post.id} post={post} />
        ))}
      </Slider>
    </section>
  );
}
