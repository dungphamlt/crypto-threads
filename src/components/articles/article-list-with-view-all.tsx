import type { Post } from "@/types";
import { ArticleListItem } from "./article-list-item";
import Link from "next/link";

interface ArticleListWithViewAllProps {
  posts: Post[];
  viewAllHref?: string;
  limit?: number;
  layout?: "list" | "grid";
}

export function ArticleListWithViewAll({
  posts,
  viewAllHref,
  limit = 7,
  layout = "list",
}: ArticleListWithViewAllProps) {
  const displayPosts = posts.slice(0, limit);

  if (displayPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className="space-y-6 rounded-2xl border bg-white dark:bg-gray-950/50 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPosts.map((post) => (
            <ArticleListItem key={post.id} post={post} isShowExcerpt={true} />
          ))}
        </div>
        {viewAllHref && (
          <div className="flex justify-center pt-4">
            <Link
              href={viewAllHref}
              className="px-6 py-2 bg-primary text-white dark:text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border bg-white dark:bg-gray-950/50 p-6 shadow-sm">
      {displayPosts.map((post) => (
        <ArticleListItem key={post.id} post={post} isShowExcerpt={true} />
      ))}
      {viewAllHref && (
        <div className="flex justify-center pt-4">
          <Link
            href={viewAllHref}
            className="px-6 py-2 bg-primary text-white dark:text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            VIEW ALL
          </Link>
        </div>
      )}
    </div>
  );
}

