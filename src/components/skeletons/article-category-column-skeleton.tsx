"use client";

export function ArticleCategoryColumnSkeleton({ title }: { title: string }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-white dark:bg-gray-950/50 p-4 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      <div className="space-y-4">
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="border-t border-border/40 pt-3">
            <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}


