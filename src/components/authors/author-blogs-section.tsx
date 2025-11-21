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
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
        Author blogs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedArticles.slice(0, 6).map((article) => (
          <CategoryArticleCard key={article.id} post={article} />
        ))}
      </div>
    </section>
  );
}

