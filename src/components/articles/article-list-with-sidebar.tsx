import Link from "next/link";
import { postService } from "@/services/posts-service";
import { SubscriptionCard } from "../subscription";
import { StudioIntroCard } from "../studio/studio-intro-card";
import { ArticleListItem } from "./article-list-item";

interface ArticleListWithSidebarProps {
  limit?: number;
  viewMoreHref?: string;
}

export async function ArticleListWithSidebar({
  limit = 10,
  viewMoreHref = "/articles",
}: ArticleListWithSidebarProps) {
  const posts = await postService.getLatestPosts(limit);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Article List */}
      <div className="lg:col-span-2 space-y-6 rounded-2xl border border-border/60 bg-white dark:bg-gray-950/50 p-6 shadow-sm">
        {posts.map((post) => (
          <ArticleListItem key={post._id || post.id} post={post} isShowExcerpt={true} />
        ))}

        {/* View More Button */}
        <div className="flex justify-center pt-4">
          <Link
            href={viewMoreHref}
            className="px-6 py-2 bg-primary text-white dark:text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            VIEW MORE
          </Link>
        </div>
      </div>

      {/* Right Column - Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <SubscriptionCard />
        <StudioIntroCard />
      </div>
    </section>
  );
}

