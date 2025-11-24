import { postService } from "@/services/posts-service";
import { ArticleSidebarClient } from "../client-components/article-sidebar-client";

export async function ArticleSidebar() {
  const [latestPosts, popularPosts] = await Promise.all([
    postService.getLatestPosts(5),
    postService.getPopularPosts(5),
  ]);

  return (
    <ArticleSidebarClient
      latestPosts={latestPosts}
      popularPosts={popularPosts}
    />
  );
}
