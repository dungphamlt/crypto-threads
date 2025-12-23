"use client";

import { useState } from "react";
import { CategoryArticleCard } from "@/components/articles/category-article-card";
import type { Post } from "@/types";

interface AuthorBlogsSectionProps {
  articles: Post[];
}

export function AuthorBlogsSection({ articles }: AuthorBlogsSectionProps) {
  // Filter only published articles and map to Post type
  const publishedArticles = articles
    .filter((article) => article.status === "published")
    .map((article) => ({
      ...article,
      _id: article.id, // Ensure _id exists for Post type
    })) as Post[];

  const [visibleCount, setVisibleCount] = useState(6);
  const visibleArticles = publishedArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < publishedArticles.length;

  if (publishedArticles.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
          Author blogs
        </h2>
        <div className="text-center py-12 text-muted-foreground">
          No published articles found.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto py-12">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-foreground font-funnel">
        Author blogs
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleArticles.map((article) => (
          <CategoryArticleCard key={article.id} post={article} />
        ))}
      </div>
      {canLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + 6)}
            className="px-6 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            View more
          </button>
        </div>
      )}
    </section>
  );
}

