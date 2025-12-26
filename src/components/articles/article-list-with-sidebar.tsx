import { postService } from "@/services/posts-service";
import { ArticleListWithSidebarClient } from "./client-components/article-list-with-sidebar-client";
import { Post } from "@/types";

interface ArticleListWithSidebarProps {
  limit?: number;
  // viewMoreHref?: string;
  categoryPosts?: Post[];
}

export async function ArticleListWithSidebar({
  limit = 20,
  categoryPosts = [],
}: // viewMoreHref = "/articles",
ArticleListWithSidebarProps) {
  const posts = await postService.getLatestPosts(limit);

  return (
    <ArticleListWithSidebarClient posts={posts} categoryPosts={categoryPosts} />
  );
}
