import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { CategoryNewsLayout } from '@/components/articles/category-news-layout';
import { HotTopicSection } from '@/components/articles/hot-topic-section';
import { CoinListsSection } from '@/components/coins/coin-lists-section';
import { ArticleListWithViewAll } from '@/components/articles/article-list-with-view-all';
import { postService } from '@/services/posts-service';
import { notFound } from 'next/navigation';
import { SubscriptionCard } from '@/components/subscription';
import { StudioIntroCard } from '@/components/studio/studio-intro-card';

const validCategories = ['daily-news', 'insight', 'learn', 'trading'];

const categoryInfoMap: Record<string, { title: string; description: string }> = {
  'daily-news': {
    title: "DAILY NEWS",
    description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
  },
  'insight': {
    title: "INSIGHT",
    description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
  },
  'learn': {
    title: "LEARN",
    description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
  },
  'trading': {
    title: "TRADING",
    description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
  },
};

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const category = categoryParam.toLowerCase();

  // Validate category
  if (!validCategories.includes(category)) {
    notFound();
  }

  const categoryInfo = categoryInfoMap[category];

  // Fetch posts for different sections
  const [featuredPosts, middlePosts, bottomPosts, gridPosts, listPosts] = await Promise.all([
    postService.getFeaturedPosts(1), // 1 featured post
    postService.getLatestPosts(3), // 3 posts for middle row
    postService.getLatestPosts(5), // 5 posts, take 2 for bottom
    postService.getLatestPosts(10), // 10 posts for grid
    postService.getLatestPosts(7), // 7 posts for article list
  ]);

  const featuredPost = featuredPosts[0] || null;
  const bottomRowPosts = bottomPosts.slice(3, 5); // Skip first 3, take next 2
  const gridPostsList = gridPosts.slice(5); // Skip first 5 for grid

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16 max-w-7xl">
          {/* Hero Section with Featured Post and Category Info */}
          <CategoryNewsLayout
            featuredPost={featuredPost}
            category={categoryInfo}
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
            <ArticleListWithViewAll
              posts={listPosts}
              viewAllHref={`/${category}?view=all`}
              limit={7}
            />

            {/* Exclusive Read + Studio Intro */}
            <div className="space-y-12">
              <SubscriptionCard />
              <StudioIntroCard />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
