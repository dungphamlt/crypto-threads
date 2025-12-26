import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoryNewsLayout } from "@/components/articles/category-news-layout";
import { HotTopicSection } from "@/components/articles/hot-topic-section";
import { CoinListsSection } from "@/components/coins/coin-lists-section";
import { postService } from "@/services/posts-service";
import { notFound } from "next/navigation";
import { categoryService, Category } from "@/services/categories-service";
import { Post } from "@/types";
import { ArticleListWithSidebar } from "@/components/articles/article-list-with-sidebar";
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
  const gridPostsList = newPosts.slice(1);

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
          />
          {/* Hot Topic Section */}
          <HotTopicSection limit={3} />

          {/* Coin Lists Section */}
          <CoinListsSection limit={5} />
          <ArticleListWithSidebar limit={10} categoryPosts={posts.slice(5)} />
        </section>
      </main>
      <Footer />
    </>
  );
}
