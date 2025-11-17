import { postService } from "@/services/posts-service";
import { categoryService } from "@/services/categories-service";
import FeaturedPosts from "@/components/server/featured-posts";
import PostList from "@/components/server/post-list";
import TrendingSidebar from "@/components/server/trending-sidebar";
import FeatureCards from "@/components/server/featured-card";

export default async function HomePage() {
  const [featuredPosts, latestPosts, categories] = await Promise.all([
    postService.getFeaturedPosts(5),
    postService.getLatestPosts(12),
    categoryService.getAllCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <section className="container mx-auto py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedPosts posts={featuredPosts} />
          </div>
          <div>
            <TrendingSidebar posts={latestPosts.slice(0, 5)} />
          </div>
        </div>
      </section>

      <FeatureCards />

      <section className="container mx-auto py-8">
        <PostList posts={latestPosts} title="Latest News" />
      </section>
    </div>
  );
}
