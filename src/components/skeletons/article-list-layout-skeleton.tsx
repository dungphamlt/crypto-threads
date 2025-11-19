import { MainArticleCardSkeleton } from "./main-article-card-skeleton";
import { ArticleListItemSkeleton } from "./article-list-item-skeleton";

interface ArticleListLayoutSkeletonProps {
  sidePostsCount?: number;
}

export function ArticleListLayoutSkeleton({
  sidePostsCount = 4,
}: ArticleListLayoutSkeletonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Article - Left Column */}
      <div className="lg:col-span-2">
        <MainArticleCardSkeleton />
      </div>

      {/* Side Articles - Right Column */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          {Array.from({ length: sidePostsCount }).map((_, index) => (
            <ArticleListItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

