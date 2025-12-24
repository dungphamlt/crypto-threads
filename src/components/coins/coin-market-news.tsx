"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { ArticleMeta } from "@/components/articles/article-meta";

interface CoinMarketNewsProps {
  coinName: string;
  coinSymbol: string;
  posts: Post[];
}

type TabType = "Recommended" | "Insight" | "Analysis" | "Prediction";

export function CoinMarketNews({ coinName, coinSymbol, posts }: CoinMarketNewsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Recommended");

  // Filter posts based on active tab
  // For now, we'll use all posts. In the future, you can filter by tags or category
  const filteredPosts = posts.slice(0, 5);

  const tabs: TabType[] = ["Recommended", "Insight", "Analysis", "Prediction"];

  return (
    <section className="w-full py-8 rounded-2xl border bg-white dark:bg-gray-950/50 shadow-sm p-6">
      <div className="space-y-6">
        {/* Header with Title and Tabs */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground font-funnel">
            {coinName} market news
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-border/60">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm md:text-base font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-foreground border-primary font-semibold"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Article List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => {
              const publishDate = post.publishTime
                ? new Date(post.publishTime)
                : new Date(post.createdAt);
              const excerpt = post.excerpt || post.metaDescription || "";

              return (
                <article key={post.id || post._id} className="group">
                  <Link
                    href={`/article/${post.slug}`}
                    className="flex flex-col sm:flex-row gap-4 hover:opacity-80 transition-opacity"
                  >
                    {/* Image - Larger on left */}
                    <div className="relative w-full sm:w-80 sm:flex-shrink-0 h-48 sm:h-52 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                      {post.coverUrl ? (
                        <Image
                          src={post.coverUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 320px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-orange-500/10">
                          <span className="text-white">360px x 210px</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>

                      {/* Author and Date */}
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
            })}
          </div>
        )}

        {/* View more button */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center pt-4">
            <Link
              href={`/articles?search=${coinSymbol}`}
              className="px-6 py-2.5 border-2 border-primary text-primary bg-white dark:bg-transparent font-semibold rounded-full hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
            >
              View more post
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

