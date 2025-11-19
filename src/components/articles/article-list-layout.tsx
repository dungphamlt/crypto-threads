import type { Post } from "@/types";
import { MainArticleCard } from "./main-article-card";
import { ArticleListItem } from "./article-list-item";

interface ArticleListLayoutProps {
  mainPost: Post;
  sidePosts: Post[];
}

export function ArticleListLayout({
  mainPost,
  sidePosts,
}: ArticleListLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <MainArticleCard post={mainPost} />
      </div>

      <div className="lg:col-span-2">
        <div className="space-y-6">
          {sidePosts.map((post) => (
            <ArticleListItem key={post._id || post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

