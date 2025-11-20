"use client";

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { ArticleMeta } from "./article-meta";

interface CategoryArticleCardProps {
  post: Post;
  href?: string;
}

export function CategoryArticleCard({
  post,
  href = `/article/${post.slug}`,
}: CategoryArticleCardProps) {
  const publishDate = post.publishTime || post.createdAt;

  return (
    <Link
      href={href}
      className="flex flex-col gap-4 group overflow-hidden"
    >
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold mb-4 text-foreground group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>
        <ArticleMeta 
          author={post.creator?.penName} 
          avatarUrl={post.creator?.avatarUrl}
          date={publishDate} 
        />
      </div>
    </Link>
  );
}

interface CategoryArticleListItemProps {
  post: Post;
  href?: string;
}

export function CategoryArticleListItem({
  post,
  href = `/article/${post.slug}`,
}: CategoryArticleListItemProps) {
  const publishDate = post.publishTime || post.createdAt;

  return (
    <Link
      href={href}
      className="block py-3 border-t border-border/60 first-of-type:border-t-0 group"
    >
      <h4 className="text-sm font-medium text-foreground mb-4 group-hover:text-primary line-clamp-2">
        {post.title}
      </h4>
      <ArticleMeta
        author={post.creator?.penName}
        avatarUrl={post.creator?.avatarUrl}
        date={publishDate}
        className="mt-1 text-xs"
      />
    </Link>
  );
}


