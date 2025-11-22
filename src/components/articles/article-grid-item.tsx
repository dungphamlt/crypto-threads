import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { ArticleMeta } from "./article-meta";

interface ArticleGridItemProps {
  post: Post;
}

export function ArticleGridItem({ post }: ArticleGridItemProps) {
  const publishDate = post.publishTime || post.createdAt;

  return (
    <Link
      href={`/article/${post.slug}`}
      className="flex gap-4 md:gap-6 group"
    >
      {/* Image */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <ArticleMeta
          author={post.creator?.penName}
          avatarUrl={post.creator?.avatarUrl}
          authorId={post.creator?.id}
          date={publishDate}
          isShowAvatar={false}
        />
      </div>
    </Link>
  );
}

