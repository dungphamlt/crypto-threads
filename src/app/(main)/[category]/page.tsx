import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoryNewsLayout } from "@/components/articles/category-news-layout";
import { HotTopicSection } from "@/components/articles/hot-topic-section";
import { CoinListsSection } from "@/components/coins/coin-lists-section";
// import { ArticleListWithViewAll } from "@/components/articles/article-list-with-view-all";
import { postService } from "@/services/posts-service";
import { notFound } from "next/navigation";
import { SubscriptionCard } from "@/components/subscription";
import { StudioIntroCard } from "@/components/studio/studio-intro-card";
import { categoryService, Category } from "@/services/categories-service";
import { Post } from "@/types";
// import Image from "next/image";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo: Category | null = await categoryService.getCategoryBySlug(
    category
  );
  if (!categoryInfo) {
    notFound();
  }

  // Fetch posts for different sections
  const posts: Post[] = await postService.getPostsByCategory(categoryInfo.id);
  const newPosts = [...posts, ...posts, ...posts, ...posts, ...posts];
  const middlePosts = newPosts.slice(0, 3);
  const featuredPost = newPosts[0] || null;
  const bottomRowPosts = newPosts.slice(3, 5); // Skip first 3, take next 2
  const gridPostsList = newPosts.slice(5); // Skip first 5 for grid

  return (
    <>
      <Header />
      <main className="container ">
        <section className="py-8 md:py-16">
          {/* Hero Section with Featured Post and Category Info */}
          <CategoryNewsLayout
            featuredPost={featuredPost}
            category={categoryInfo as unknown as Category}
            middlePosts={middlePosts}
            bottomPosts={bottomRowPosts}
            gridPosts={gridPostsList}
            showViewMore={gridPostsList.length >= 10}
            viewMoreHref={`/${category}?page=2`}
          />
          {/* Hot Topic Section */}
          <HotTopicSection limit={3} />

          {/* Coin Lists Section */}
          <CoinListsSection limit={5} />

          {/* Bottom Section: Article List + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 my-12">
            {/* Left: Article List with View All */}
            {/* <ArticleListWithViewAll
              posts={gridPostsList}
              viewAllHref={`/${category}?view=all`}
              limit={7}
            /> */}

            {/* Exclusive Read + Studio Intro */}
            <div className="space-y-12">
              <SubscriptionCard />
              <StudioIntroCard />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
