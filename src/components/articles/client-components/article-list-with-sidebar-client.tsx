"use client";

import { useState } from "react";
import { SubscriptionCard } from "../../subscription";
import { ArticleListItem } from "../article-list-item";
import type { Post } from "@/types";

interface ArticleListWithSidebarClientProps {
  posts: Post[];
}

export function ArticleListWithSidebarClient({
  posts,
}: ArticleListWithSidebarClientProps) {
  const [visibleCountMobile, setVisibleCountMobile] = useState(6);
  const [visibleCountDesktop, setVisibleCountDesktop] = useState(6);

  if (posts.length === 0) {
    return null;
  }

  // Mobile: posts from index 0
  const mobilePosts = posts.slice(0, visibleCountMobile);
  const canLoadMoreMobile = visibleCountMobile < posts.length;

  // Desktop: posts from index 2
  const desktopStartIndex = 2;
  const desktopPosts = posts.slice(
    desktopStartIndex,
    desktopStartIndex + visibleCountDesktop
  );
  const canLoadMoreDesktop =
    desktopStartIndex + visibleCountDesktop < posts.length;

  const handleLoadMoreMobile = () => {
    setVisibleCountMobile((prev) => prev + 6);
  };

  const handleLoadMoreDesktop = () => {
    setVisibleCountDesktop((prev) => prev + 6);
  };

  return (
    <section className="my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-6 hidden md:block">
          {posts.slice(0, 2).map((post) => (
            <ArticleListItem
              key={post.id}
              post={post}
              isShowExcerpt={true}
              isHotTopic={true}
            />
          ))}
        </div>
        <SubscriptionCard />
      </div>

      {/* Mobile: show posts from index 0 */}
      <div className="md:hidden mt-6">
        <div className="space-y-4">
          {mobilePosts.map((post) => (
            <ArticleListItem
              key={post.id}
              post={post}
              isShowExcerpt={true}
              isHotTopic={true}
            />
          ))}
        </div>
        {canLoadMoreMobile && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleLoadMoreMobile}
              className="px-6 py-1.5 border-1 border-primary text-primary bg-white dark:bg-transparent font-medium rounded-full hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Desktop: show posts from index 2 in grid */}
      <div className="hidden md:block mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {desktopPosts.map((post) => (
            <ArticleListItem
              key={post.id}
              post={post}
              isShowExcerpt={true}
              isHotTopic={true}
            />
          ))}
        </div>
        {canLoadMoreDesktop && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleLoadMoreDesktop}
              className="px-6 py-1.5 border-1 border-primary text-primary bg-white dark:bg-transparent font-medium rounded-full hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
