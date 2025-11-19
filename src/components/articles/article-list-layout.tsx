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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Article - Left Column */}
      <div className="lg:col-span-2">
        <MainArticleCard post={mainPost} />
      </div>

      {/* Side Articles - Right Column */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          {sidePosts.map((post) => (
            <ArticleListItem key={post._id || post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

