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
import { categoryService, SubCategory } from "@/services/categories-service";
import { Post } from "@/types";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  const slug = `${category}/${subcategory}`;
  const subcategoryInfo: SubCategory | null =
    await categoryService.getSubCategoryBySlug(slug);
  console.log(subcategoryInfo, "subcategoryInfo");
  if (!subcategoryInfo) {
    notFound();
  }

  // Fetch posts from category and filter by subcategory
  const allPosts: Post[] = await postService.getPostsByCategory(
    subcategoryInfo.id
  );

  // Filter posts by subcategory key
  const posts: Post[] = allPosts.filter(
    (post) => post.subCategory?.key === subcategoryInfo.key
  );

  // Duplicate posts to have enough for layout (similar to category page)
  const newPosts = [...posts, ...posts, ...posts, ...posts, ...posts];
  const middlePosts = newPosts.slice(0, 3);
  const featuredPost = newPosts[0] || null;
  const bottomRowPosts = newPosts.slice(3, 5);
  const gridPostsList = newPosts.slice(5);

  return (
    <>
      <Header />
      <main className="container ">
        <section className="py-8 md:py-16">
          {/* Hero Section with Featured Post and Category Info */}
          <CategoryNewsLayout
            featuredPost={featuredPost}
            category={subcategoryInfo}
            middlePosts={middlePosts}
            bottomPosts={bottomRowPosts}
            gridPosts={gridPostsList}
            showViewMore={gridPostsList.length >= 10}
            viewMoreHref={`/${subcategory}?page=2`}
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
              viewAllHref={`/${category}/${subcategory}?view=all`}
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
