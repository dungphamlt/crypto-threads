"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface ArticleSidebarClientProps {
  latestPosts: Post[];
  popularPosts: Post[];
}

export function ArticleSidebarClient({
  latestPosts,
  popularPosts,
}: ArticleSidebarClientProps) {
  const [isLatest, setIsLatest] = useState(true);

  const ArticleCard = ({ post }: { post: Post }) => {
    return (
      <Link href={`/article/${post.slug}`}>
        <div className="p-3 rounded-xl border border-gray-300 dark:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between gap-3">
            {post.coverUrl ? (
              <Image
                src={post.coverUrl}
                alt={post.title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-lg dark:shadow-sm shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground line-clamp-2">
                {post.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>By {post.creator.penName}</span>
                <span>•</span>
                <span>{formatDate(new Date(post.createdAt))}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setIsLatest(true)}
          className={`flex-1 py-2 px-4 rounded-xl font-bold border transition-all duration-300 cursor-pointer hover:opacity-80 ${
            isLatest
              ? "bg-primary dark:bg-white text-white dark:text-black border-primary dark:border-white"
              : "bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          }`}
        >
          LATEST
        </button>
        <button
          onClick={() => setIsLatest(false)}
          className={`flex-1 py-2 px-4 rounded-xl font-bold border transition-all duration-300 cursor-pointer hover:opacity-80 ${
            !isLatest
              ? "bg-primary dark:bg-white text-white dark:text-black border-primary dark:border-white"
              : "bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          }`}
        >
          POPULAR
        </button>
      </div>
      <div className="space-y-4">
        {isLatest ? (
          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <ArticleCard key={post._id || post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {popularPosts.map((post) => (
              <ArticleCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
