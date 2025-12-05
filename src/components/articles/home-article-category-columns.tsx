import { ArticleCategoryColumnContent } from "./article-category-column";
import { ArticleCategoryColumnsSlider } from "./article-category-columns-slider";
import { postService } from "@/services/posts-service";
import type { Post } from "@/types";

const DEFAULT_CATEGORIES = [
  {
    title: "LEARN",
    categoryKey: "68bfb02154030824d87668d9",
    viewMoreHref: "/learn",
  },
  {
    title: "TRADING",
    categoryKey: "68bfd7ac7d326e44f8d9ade6",
    viewMoreHref: "/trading",
  },
  {
    title: "INSIGHT",
    categoryKey: "68bfd3487d326e44f8d9ad60",
    viewMoreHref: "/insight",
  },
];

interface ArticleCategoryColumnsSectionProps {
  categories?: typeof DEFAULT_CATEGORIES;
  limit?: number;
}

export async function ArticleCategoryColumnsSection({
  categories = DEFAULT_CATEGORIES,
  limit = 3,
}: ArticleCategoryColumnsSectionProps) {
  const categoriesWithPosts = await Promise.all(
    categories.map(async (category) => {
      const posts = (await postService.getPostsByCategory(category.categoryKey, limit)) as Post[];
      return { ...category, posts };
    })
  );

  return (
    <section className="space-y-6">
      {/* Desktop / laptop grid */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categoriesWithPosts.map((category) => (
          <ArticleCategoryColumnContent
            key={category.categoryKey}
            title={category.title}
            viewMoreHref={category.viewMoreHref}
            posts={category.posts}
          />
        ))}
      </div>

      {/* Tablet + mobile slider */}
      <ArticleCategoryColumnsSlider items={categoriesWithPosts} />
    </section>
  );
}

