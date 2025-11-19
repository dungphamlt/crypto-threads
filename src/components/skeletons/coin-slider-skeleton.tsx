export function CoinSliderSkeleton() {
  const items = Array.from({ length: 7 });
  
  return (
    <div className="py-4 mt-12">
      <div className="container mx-auto px-1 sm:px-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3">
          {items.map((_, index) => {
            let hiddenClasses = "";
            if (index >= 3) {
              hiddenClasses += "hidden md:block ";
            }
            if (index >= 4) {
              hiddenClasses += "md:hidden lg:block ";
            }
            if (index >= 5) {
              hiddenClasses += "lg:hidden xl:block ";
            }

            return (
              <div key={index} className={`px-1 sm:px-3 ${hiddenClasses.trim()}`}>
                <div
                  className="relative rounded-xl px-4 py-2 overflow-hidden border bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-800 animate-pulse"
                  style={{ minHeight: "80px" }}
                >
                  {/* Header: Icon + Symbol */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>

                  {/* Price and Change */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-2 mb-4">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>

                  {/* Mini Chart */}
                  <div className="relative h-8 w-full">
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

