import type { Post } from "@/types";
import { ArticleGridItem } from "./article-grid-item";

interface ArticleGridLayoutProps {
  posts: Post[];
  columns?: 2 | 3;
}

export function ArticleGridLayout({
  posts,
  columns = 2,
}: ArticleGridLayoutProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  const gridCols = columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`grid ${gridCols} gap-6 md:gap-8`}>
      {posts.map((post) => (
        <ArticleGridItem key={post.id} post={post} />
      ))}
    </div>
  );
}

