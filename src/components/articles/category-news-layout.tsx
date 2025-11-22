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
  gridPosts?: Post[]; // Posts for grid layout
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
    </div>
  );
}

