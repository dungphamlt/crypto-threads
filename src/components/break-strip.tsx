"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BreakStripItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
  tag?: string;
}

interface BreakStripProps {
  items?: BreakStripItem[];
}

const defaultItems: BreakStripItem[] = [
  {
    id: "studio",
    title: "KHOẢNG NGHỈ",
    subtitle: "Studio & Ads",
    description:
      "Không gian để giới thiệu studio, campaign quảng cáo hoặc đối tác nổi bật của bạn.",
    imageUrl:
      "https://images.pexels.com/photos/2516418/pexels-photo-2516418.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaLabel: "Xem Studio",
    ctaHref: "/studio",
    tag: "Studio Highlight",
  },
  {
    id: "partner",
    title: "PARTNER SPOTLIGHT",
    subtitle: "Quảng cáo / Tài trợ",
    description:
      "Vị trí lý tưởng cho banner tài trợ, chiến dịch quảng bá hay sản phẩm chiến lược.",
    imageUrl:
      "https://images.pexels.com/photos/6801645/pexels-photo-6801645.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaLabel: "Liên hệ hợp tác",
    ctaHref: "/contact",
    tag: "Sponsored",
  },
];

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 600,
  swipe: true,
  draggable: true,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function BreakStrip({ items = defaultItems }: BreakStripProps) {
  if (!items.length) return null;

  const renderItem = (item: BreakStripItem) => (
    <div key={item.id} className="px-1 sm:px-2">
      <div className="relative h-32 sm:h-40 md:h-48 rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
          {item.tag && (
            <span className="mb-2 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/80 backdrop-blur">
              {item.tag}
            </span>
          )}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1">
            {item.title}
          </h2>
          {item.subtitle && (
            <p className="text-xs sm:text-sm text-white/80 mb-1">
              {item.subtitle}
            </p>
          )}
          {item.description && (
            <p className="hidden sm:block text-xs sm:text-sm text-white/80 max-w-2xl">
              {item.description}
            </p>
          )}
          {item.ctaHref && item.ctaLabel && (
            <a
              href={item.ctaHref}
              className="mt-3 inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-900 hover:bg-white"
            >
              {item.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (items.length === 1) {
    return <section className="my-8 sm:my-10">{renderItem(items[0])}</section>;
  }

  return (
    <section className="my-8 sm:my-10">
      <Slider {...sliderSettings}>{items.map(renderItem)}</Slider>
    </section>
  );
}


