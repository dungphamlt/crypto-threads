import { postService } from "@/services/posts-service";
import { ArticleListWithSidebarClient } from "./client-components/article-list-with-sidebar-client";

interface ArticleListWithSidebarProps {
  limit?: number;
  // viewMoreHref?: string;
}

export async function ArticleListWithSidebar({
  limit = 20,
}: // viewMoreHref = "/articles",
ArticleListWithSidebarProps) {
  const posts = await postService.getLatestPosts(limit);

  return <ArticleListWithSidebarClient posts={posts} />;
}
