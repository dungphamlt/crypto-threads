"use client";

import { ArticleCategoryColumn } from "./article-category-column";

const DEFAULT_CATEGORIES = [
  {
    title: "LEARN",
    categoryKey: "68bfb02154030824d87668d9",
    viewMoreHref: "/learn",
  },
  {
    title: "TRADING",
    categoryKey: "Trading",
    viewMoreHref: "/trading",
  },
  {
    title: "INSIGHT",
    categoryKey: "68bfd7ac7d326e44f8d9ade6",
    viewMoreHref: "/insight",
  },
];

interface ArticleCategoryColumnsSectionProps {
  categories?: typeof DEFAULT_CATEGORIES;
  limit?: number;
}

export function ArticleCategoryColumnsSection({
  categories = DEFAULT_CATEGORIES,
  limit = 3,
}: ArticleCategoryColumnsSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <ArticleCategoryColumn
          key={category.categoryKey}
          title={category.title}
          categoryKey={category.categoryKey}
          viewMoreHref={category.viewMoreHref}
          limit={limit}
        />
      ))}
    </section>
  );
}


