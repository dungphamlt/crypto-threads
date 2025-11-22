import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { CategoryNewsLayout } from '@/components/articles/category-news-layout';
import { ArticleListWithViewAll } from '@/components/articles/article-list-with-view-all';
import { postService } from '@/services/posts-service';
import { notFound } from 'next/navigation';
import { CoinListsSection } from '@/components/coins';
import { HotTopicSection } from '@/components/articles';

// Define valid categories and their subcategories
const categoryConfig: Record<string, {
  validSubcategories: string[];
  categoryInfoMap: Record<string, { title: string; description: string }>;
}> = {
  'daily-news': {
    validSubcategories: ['tradfi', 'releases', 'regulations', 'markets'],
    categoryInfoMap: {
      tradfi: {
        title: "DAILY NEWS - TRADFI",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      releases: {
        title: "DAILY NEWS - RELEASES",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      regulations: {
        title: "DAILY NEWS - REGULATIONS",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      markets: {
        title: "DAILY NEWS - MARKETS",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
    },
  },
  'insight': {
    validSubcategories: ['tradfi', 'regulations', 'markets'],
    categoryInfoMap: {
      tradfi: {
        title: "INSIGHT - TRADFI",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      regulations: {
        title: "INSIGHT - REGULATIONS",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      markets: {
        title: "INSIGHT - MARKETS",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
    },
  },
  'learn': {
    validSubcategories: ['hidden-gems', 'crypto-fundamental', 'market'],
    categoryInfoMap: {
      'hidden-gems': {
        title: "LEARN - HIDDEN GEMS",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      'crypto-fundamental': {
        title: "LEARN - CRYPTO FUNDAMENTAL",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      market: {
        title: "LEARN - MARKET",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
    },
  },
  'trading': {
    validSubcategories: ['strategy', 'crypto-analysis', 'dummies'],
    categoryInfoMap: {
      strategy: {
        title: "TRADING - STRATEGY",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      'crypto-analysis': {
        title: "TRADING - CRYPTO ANALYSIS",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
      dummies: {
        title: "TRADING - DUMMIES",
        description: "Powered by the community, for the community. Explore daily highlights and on-chain narratives defining the next chapter of crypto.",
      },
    },
  },
};

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];

  Object.entries(categoryConfig).forEach(([category, config]) => {
    config.validSubcategories.forEach((subcategory) => {
      params.push({ category, subcategory });
    });
  });

  return params;
}

interface CategorySubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default async function SubcategoryPage({
  params,
}: CategorySubcategoryPageProps) {
  const category = params.category.toLowerCase();
  const subcategory = params.subcategory.toLowerCase();

  // Validate category and subcategory
  const config = categoryConfig[category];
  if (!config || !config.validSubcategories.includes(subcategory)) {
    notFound();
  }

  const categoryInfo = config.categoryInfoMap[subcategory];
  if (!categoryInfo) {
    notFound();
  }

  // Capitalize first letter for API
  const subcategoryKey = subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');

  // Fetch posts filtered by subcategory
  const [featuredPosts, middlePosts, bottomPosts, gridPosts, listPosts] = await Promise.all([
    // postService.getPosts({ subCategory: subcategoryKey, pageSize: 1 }),
    // postService.getPosts({ subCategory: subcategoryKey, pageSize: 3 }),
    // postService.getPosts({ subCategory: subcategoryKey, pageSize: 5 }),
    // postService.getPosts({ subCategory: subcategoryKey, pageSize: 10 }),
    // postService.getPosts({ subCategory: subcategoryKey, pageSize: 7 }),
    postService.getFeaturedPosts(1), // 1 featured post
    postService.getLatestPosts(3), // 3 posts for middle row
    postService.getLatestPosts(5), // 5 posts, take 2 for bottom
    postService.getLatestPosts(10), // 10 posts for grid
    postService.getLatestPosts(7), // 7 posts for article list
  ]);

  const featuredPost = featuredPosts?.[0] || null;
  const middleRowPosts = middlePosts || [];
  const bottomRowPosts = bottomPosts?.slice(3, 5) || [];
  const gridPostsList = gridPosts?.slice(5) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16 max-w-7xl">
          <CategoryNewsLayout
            featuredPost={featuredPost}
            category={categoryInfo}
            middlePosts={middleRowPosts}
            bottomPosts={bottomRowPosts}
            gridPosts={gridPostsList}
            showViewMore={gridPostsList.length >= 10}
            viewMoreHref={`/${category}/${subcategory}?page=2`}
          />

          <HotTopicSection limit={3} />

          <CoinListsSection limit={5} />

          <div className="my-12">
            <ArticleListWithViewAll
              posts={listPosts}
              viewAllHref={`/${category}/${subcategory}?view=all`}
              limit={10}
              layout="grid"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

