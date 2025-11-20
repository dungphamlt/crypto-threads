export function CoinListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />

      {/* Name and Ticker */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Percentage Change and Price */}
      <div className="flex flex-col items-end gap-1">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

