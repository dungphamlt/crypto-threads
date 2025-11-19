import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface ArticleListItemProps {
  post: Post;
}

export function ArticleListItem({ post }: ArticleListItemProps) {
  const publishDate = post.publishTime
    ? new Date(post.publishTime)
    : new Date(post.createdAt);

  return (
    <article className="group">
      <Link
        href={`/article/${post.slug}`}
        className="flex gap-4 hover:opacity-80 transition-opacity"
      >
        {/* Image */}
        <div className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          {post.coverUrl ? (
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="256px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Author and Date */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
            <span className="text-muted-foreground/60">
              By <span className="font-semibold text-foreground">{post.creator?.penName || "Unknown Author"}</span>
            </span>
            <span className="hidden sm:inline text-muted-foreground">·</span>
            <span className="text-muted-foreground opacity-80">{formatDate(publishDate)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

