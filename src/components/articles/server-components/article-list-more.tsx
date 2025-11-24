import { postService } from "@/services/posts-service";
import { ArticleListMoreClient } from "@/components/articles/client-components/article-list-more-client";

export async function ArticleListMore() {
  const posts = await postService.getLatestPosts(10);

  if (posts.length === 0) {
    return null;
  }

  return <ArticleListMoreClient posts={posts} />;
}
