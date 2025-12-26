import Link from "next/link";
import type { Post } from "@/types";
import { postService } from "@/services/posts-service";
import {
  CategoryArticleCard,
  CategoryArticleListItem,
} from "./category-article-card";
import { SimpleLine } from "../line";

interface ArticleCategoryColumnProps {
  title: string;
  categoryKey: string;
  viewMoreHref?: string;
  limit?: number;
}

interface ArticleCategoryColumnContentProps {
  title: string;
  viewMoreHref?: string;
  posts: Post[];
}

export function ArticleCategoryColumnContent({
  title,
  viewMoreHref = "#",
  posts,
}: ArticleCategoryColumnContentProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <Link
            href={viewMoreHref}
            className="text-xs font-medium text-primary hover:underline"
          >
            View more
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          No articles available at the moment.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="rounded-3xl border border-border/60 bg-white dark:bg-gray-950/50 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <Link
          href={viewMoreHref}
          className="text-xs font-semibold text-primary hover:underline"
        >
          View more
        </Link>
      </div>

      {featured && (
        <CategoryArticleCard
          post={featured as Post}
          href={`/article/${featured.slug}`}
        />
      )}

      {featured && rest.length > 0 && <SimpleLine />}

      <div>
        {rest.map((post) => (
          <CategoryArticleListItem
            key={post._id || post.id}
            post={post as Post}
            href={`/article/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export async function ArticleCategoryColumn({
  title,
  categoryKey,
  viewMoreHref = "#",
  limit = 3,
}: ArticleCategoryColumnProps) {
  const posts = await postService.getPostsByCategory(categoryKey, limit);
  return (
    <ArticleCategoryColumnContent
      title={title}
      viewMoreHref={viewMoreHref}
      posts={posts as Post[]}
    />
  );
}
