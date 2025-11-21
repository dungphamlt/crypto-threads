"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IntroImageSliderProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export function IntroImageSlider({
  images,
  interval = 3500,
}: IntroImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) {
    return <div className="w-full h-full rounded-lg bg-muted" />;
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-muted">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === currentIndex}
            sizes="(max-width: 1024px) 100vw, 520px"
          />
        </div>
      ))}
    </div>
  );
}


