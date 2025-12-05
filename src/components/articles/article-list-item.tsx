import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { ArticleMeta } from "./article-meta";

interface ArticleListItemProps {
  post: Post;
  isShowExcerpt?: boolean;
}

export function ArticleListItem({ post, isShowExcerpt = false }: ArticleListItemProps) {
  const publishDate = post.publishTime
    ? new Date(post.publishTime)
    : new Date(post.createdAt);

  const excerpt = post.excerpt || post.metaDescription || "";
  return (
    <article className="group">
      <Link
        href={`/article/${post.slug}`}
        className="flex gap-3 sm:gap-4 hover:opacity-80 transition-opacity"
      >
        {/* Image */}
        <div className="relative w-28 h-20 sm:w-36 sm:h-24 md:w-48 md:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
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
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {isShowExcerpt && <p className="text-[10px] sm:text-sm text-muted-foreground mb-2 line-clamp-2">
            {excerpt}
          </p>}

          <ArticleMeta
            author={post.creator?.penName}
            avatarUrl={post.creator?.avatarUrl}
            authorId={post.creator?.id}
            isShowAvatar={false}
            date={publishDate}
          />
        </div>
      </Link>
    </article>
  );
}

