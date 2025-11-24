import { postService } from "@/services/posts-service";
import { SubscriptionCard } from "../subscription";
import { StudioIntroCard } from "../studio/studio-intro-card";
import { ArticleListWithViewAll } from "./article-list-with-view-all";

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

  console.log(viewMoreHref, "viewMoreHref");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 my-12">
      {/* Article List */}
      <ArticleListWithViewAll
        posts={posts}
        viewAllHref={`/articles`}
        limit={7}
      />

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <SubscriptionCard />
        <StudioIntroCard />
      </div>
    </section>
  );
}
