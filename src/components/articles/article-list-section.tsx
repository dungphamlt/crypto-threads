// "use client";

import { useLatestPosts } from "@/hooks/use-posts";
import { ArticleListLayout } from "./article-list-layout";
import { ArticleListLayoutSkeleton } from "@/components/skeletons";
import { postService } from "@/services/posts-service";

interface ArticleListSectionProps {
  mainPostLimit?: number;
  sidePostsLimit?: number;
}

export async function ArticleListSection({
  mainPostLimit = 1,
  sidePostsLimit = 4,
}: ArticleListSectionProps) {
  // const { data: posts = [], isLoading, isError, error } = useLatestPosts(
  //   mainPostLimit + sidePostsLimit
  // );

  const posts = await postService.getLatestPosts(
    mainPostLimit + sidePostsLimit
  );

  // if (isLoading) {
  //   return <ArticleListLayoutSkeleton sidePostsCount={sidePostsLimit} />;
  // }

  // if (isError) {
  //   return (
  //     <div className="flex items-center justify-center py-12">
  //       <div className="text-red-500">
  //         Error loading articles: {error?.message || "Unknown error"}
  //       </div>
  //     </div>
  //   );
  // }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">No articles found.</div>
      </div>
    );
  }

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, sidePostsLimit + 1);

  if (!mainPost) {
    return null;
  }

  return <ArticleListLayout mainPost={mainPost} sidePosts={sidePosts} />;
}
