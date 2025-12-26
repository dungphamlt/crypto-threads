import type { Post } from "@/types";
import { CategoryNewsHeroSection } from "./category-news-hero-section";
import { MainArticleCard } from "./main-article-card";
import { CategoryArticleCard } from "./category-article-card";
import { ArticleListItem } from "./article-list-item";
import { Category } from "@/services/categories-service";

interface CategoryNewsLayoutProps {
  featuredPost: Post | null;
  category: Category;
  middlePosts?: Post[]; // 3 posts for middle row
  bottomPosts?: Post[]; // 2 posts for bottom row
  gridPosts?: Post[];
}

export function CategoryNewsLayout({
  featuredPost,
  category,
  middlePosts = [],
  bottomPosts = [],
  gridPosts = [],
}: CategoryNewsLayoutProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <CategoryNewsHeroSection
        featuredPost={featuredPost}
        category={category}
      />

      {/* Articles */}
      {middlePosts.length > 0 && (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {middlePosts.slice(0, 3).map((post) => (
            <CategoryArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Large Articles */}
      {bottomPosts.length > 0 && (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {bottomPosts.slice(0, 2).map((post) => (
            <MainArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Additional Grid Posts */}
      {gridPosts.length > 0 && (
        <>
          {/* <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gridPosts.slice(4).map((post) => (
              <CategoryArticleCard key={post.id} post={post} />
            ))}
          </div> */}
          <div className="md:hidden space-y-4">
            {gridPosts.slice(0, 5).map((post) => (
              <ArticleListItem
                key={post.id}
                post={post}
                isShowExcerpt={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
