export function MainArticleCardSkeleton() {
  return (
    <article className="animate-pulse">
      {/* Image */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800" />

      {/* Content */}
      <div className="relative">
        {/* Title */}
        <div className="mb-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          {/* Author Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />

          {/* Author Name and Date */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}

