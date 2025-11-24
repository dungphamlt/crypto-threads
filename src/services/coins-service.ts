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

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    high_52w: {
      usd: number;
    };
    low_52w: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    ath_date: {
      usd: string;
    };
  };
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// Helper function to get base URL for API calls
function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: use current origin
    return window.location.origin;
  }
  // Server-side: use environment variable or default
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export async function fetchCoinDetail(id: string): Promise<CoinDetail> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/coins/${id}?market_data=true`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch coin detail: ${response.statusText}`);
  }

  const data: CoinDetail = await response.json();
  return data;
}

export async function fetchCoinMarketChart(
  id: string,
  days: number = 7,
  vs_currency: string = "usd"
): Promise<MarketChartData> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/coins/${id}/market-chart?days=${days}&vs_currency=${vs_currency}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch market chart: ${response.statusText}`);
  }

  const data: MarketChartData = await response.json();
  return data;
}

