import Link from "next/link";
import type { Post } from "@/types";
import { CategoryNewsHeroSection } from "./category-news-hero-section";
import { MainArticleCard } from "./main-article-card";
import { CategoryArticleCard } from "./category-article-card";

interface CategoryNewsLayoutProps {
  featuredPost: Post | null;
  category: {
    title: string;
    description: string;
  };
  middlePosts?: Post[]; // 3 posts for middle row
  bottomPosts?: Post[]; // 2 posts for bottom row
  gridPosts?: Post[];
  showViewMore?: boolean;
  viewMoreHref?: string;
  onViewMore?: () => void;
}

export function CategoryNewsLayout({
  featuredPost,
  category,
  middlePosts = [],
  bottomPosts = [],
  gridPosts = [],
  showViewMore = false,
  viewMoreHref,
  onViewMore,
}: CategoryNewsLayoutProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <CategoryNewsHeroSection featuredPost={featuredPost} category={category} />

      {/* Articles */}
      {middlePosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {middlePosts.slice(0, 3).map((post) => (
            <CategoryArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Large Articles */}
      {bottomPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {bottomPosts.slice(0, 2).map((post) => (
            <MainArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Additional Grid Posts */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {gridPosts.map((post) => (
            <CategoryArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* View more */}
      {showViewMore && (
        <div className="flex justify-center">
          {viewMoreHref ? (
            <Link
              href={viewMoreHref}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              View more
            </Link>
          ) : (
            <button
              type="button"
              onClick={onViewMore}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              View more
            </button>
          )}
        </div>
      )}
    </div>
  );
}

