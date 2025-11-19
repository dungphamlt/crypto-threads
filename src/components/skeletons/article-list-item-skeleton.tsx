export function ArticleListItemSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-64 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="mb-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          </div>

          {/* Author and Date */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}

