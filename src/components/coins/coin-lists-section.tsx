"use client";

import { useTrendingCoins, useTopGrowCoins, useNewCoins } from "@/hooks/use-coins";
import { CoinListCard } from "./coin-list-card";

interface CoinListsSectionProps {
  limit?: number;
}

export function CoinListsSection(props: CoinListsSectionProps = {}) {
  const { limit = 5 } = props;
  const trending = useTrendingCoins(limit);
  const topGrow = useTopGrowCoins(limit);
  const newlyListed = useNewCoins(limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <CoinListCard
        title="TRENDING"
        coins={trending.data}
        isLoading={trending.isLoading}
        isError={trending.isError}
        errorMessage={trending.error?.message}
        limit={limit}
      />
      <CoinListCard
        title="TOP GROW"
        coins={topGrow.data}
        isLoading={topGrow.isLoading}
        isError={topGrow.isError}
        errorMessage={topGrow.error?.message}
        limit={limit}
      />
      <CoinListCard
        title="NEW"
        coins={newlyListed.data}
        isLoading={newlyListed.isLoading}
        isError={newlyListed.isError}
        errorMessage={newlyListed.error?.message}
        limit={limit}
      />
    </div>
  );
}

