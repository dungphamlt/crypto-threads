"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TeamIntroSliderProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export function TeamIntroSlider({
  images,
  interval = 4000,
}: TeamIntroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) {
    return <div className="w-full h-64 md:h-80 lg:h-96 bg-muted" />;
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-muted rounded-4xl">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === currentIndex}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}

