export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinsQueryParams {
  vs_currency?: string;
  order?: string;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
  ids?: string[];
  category?: "trending" | "top_grow" | "new" | string;
}

export async function fetchCoins(
  params: CoinsQueryParams = {}
): Promise<Coin[]> {
  const {
    vs_currency = "usd",
    order = "market_cap_desc",
    per_page = 15,
    page = 1,
    sparkline = true,
    price_change_percentage = "24h",
    ids,
    category,
  } = params;

  const queryParams = new URLSearchParams({
    vs_currency,
    order,
    per_page: per_page.toString(),
    page: page.toString(),
    sparkline: sparkline.toString(),
    price_change_percentage,
  });

  if (ids && ids.length > 0) {
    queryParams.set("ids", ids.join(","));
  }

  if (category) {
    queryParams.set("category", category);
  }

  const response = await fetch(`/api/coins?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch coins: ${response.statusText}`);
  }

  const data: Coin[] = await response.json();
  return data;
}

export async function fetchTrendingCoins(limit: number = 5): Promise<Coin[]> {
  const response = await fetch(`/api/coins?category=trending&per_page=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
  }

  const data: Coin[] = await response.json();
  return data;
}

export async function fetchTopGrowCoins(limit: number = 5): Promise<Coin[]> {
  return fetchCoins({
    vs_currency: "usd",
    per_page: limit,
    page: 1,
    sparkline: false,
    price_change_percentage: "24h",
    category: "top_grow",
  });
}

export async function fetchNewCoins(limit: number = 5): Promise<Coin[]> {
  return fetchCoins({
    vs_currency: "usd",
    per_page: limit,
    page: 1,
    sparkline: false,
    price_change_percentage: "24h",
    category: "new",
  });
}

