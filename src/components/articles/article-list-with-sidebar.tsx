import { postService } from "@/services/posts-service";
import { SubscriptionCard } from "../subscription";
// import { StudioIntroCard } from "../studio/studio-intro-card";
// import { ArticleListWithViewAll } from "./article-list-with-view-all";
import { ArticleListItem } from "./article-list-item";

interface ArticleListWithSidebarProps {
  limit?: number;
  viewMoreHref?: string;
}

export async function ArticleListWithSidebar({
  limit = 8,
  viewMoreHref = "/articles",
}: ArticleListWithSidebarProps) {
  const posts = await postService.getLatestPosts(limit);

  if (posts.length === 0) {
    return null;
  }

  console.log(viewMoreHref, "viewMoreHref");

  return (
    <section className="my-12">
      {/* <ArticleListWithViewAll
        posts={posts}
        viewAllHref={`/articles`}
        limit={7}
      />

 
      <div className="space-y-6">
        <SubscriptionCard />
        <StudioIntroCard />
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 ">
        <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
        {posts.slice(2, 8).map((post) => (
          <ArticleListItem
            key={post.id}
            post={post}
            isShowExcerpt={true}
            isHotTopic={true}
          />
        ))}
      </div>
    </section>
  );
}
