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
  per_page?: number;
}

interface ApiCoin {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: number;
  price_change_percentage_24h: number;
  chart?: {
    price: number[];
  };
}

interface ApiCoinsResponse {
  trending: ApiCoin[];
  topGrowing: ApiCoin[];
  new: ApiCoin[];
}

export interface CoinDetail {
  id?: string;
  symbol: string;
  name: string;
  logoUrl: string;
  price?: number;
  price_change_percentage_24h?: number;
  keyMetrics: {
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    totalSupply: number;
    ytdRetrun: number;
    openPrice24h: number;
    high24h: number;
    low24h: number;
    ath: number;
  };
  about?: string;
}

export interface MarketChartData {
  prices: [number, number][];
}

const API_BASE =
  process.env.NEXT_PUBLIC_COIN_API_BASE_URL ||
  "https://crypto-threads-be-production.up.railway.app";

function mapApiCoinToCoin(apiCoin: ApiCoin): Coin {
  return {
    id: apiCoin.id,
    name: apiCoin.name,
    symbol: apiCoin.symbol,
    image: apiCoin.iconUrl,
    current_price: apiCoin.price,
    price_change_percentage_24h: apiCoin.price_change_percentage_24h,
    sparkline_in_7d: apiCoin.chart ? { price: apiCoin.chart.price } : undefined,
  };
}

export async function fetchCoins(
  params: CoinsQueryParams = {}
): Promise<Coin[]> {
  const { per_page = 15 } = params;
  const response = await fetch(
    `${API_BASE}/api/v1/stats/coin-list?limit=${per_page}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch coins: ${response.statusText}`);
  }

  const data: ApiCoin[] = await response.json();
  return data.map(mapApiCoinToCoin);
}

export async function fetchTrendingCoins(limit: number = 5): Promise<Coin[]> {
  const response = await fetch(`${API_BASE}/api/v1/stats/coins?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
  }

  const data: ApiCoinsResponse = await response.json();
  return (data.trending || []).map(mapApiCoinToCoin);
}

export async function fetchTopGrowCoins(limit: number = 5): Promise<Coin[]> {
  const response = await fetch(`${API_BASE}/api/v1/stats/coins?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch top grow coins: ${response.statusText}`);
  }

  const data: ApiCoinsResponse = await response.json();
  return (data.topGrowing || []).map(mapApiCoinToCoin);
}

export async function fetchNewCoins(limit: number = 5): Promise<Coin[]> {
  const response = await fetch(`${API_BASE}/api/v1/stats/coins?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch new coins: ${response.statusText}`);
  }

  const data: ApiCoinsResponse = await response.json();
  return (data.new || []).map(mapApiCoinToCoin);
}

export async function fetchCoinDetail(
  id: string,
  options?: {
    price?: number;
    price_change_percentage_24h?: number;
  }
): Promise<CoinDetail> {
  const response = await fetch(`${API_BASE}/api/v1/stats/coin/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch coin detail: ${response.statusText}`);
  }

  const data = await response.json();

  // Use provided price and price change from options (passed from URL params or coin slider)
  const finalPrice = options?.price ?? data.keyMetrics?.openPrice24h ?? data.keyMetrics?.price;
  const finalPriceChange = options?.price_change_percentage_24h ?? data.keyMetrics?.price_change_percentage_24h;

  return {
    id,
    name: data.name,
    symbol: data.symbol,
    logoUrl: data.logoUrl,
    price: data.keyMetrics?.openPrice24h ?? data.keyMetrics?.price ?? finalPrice,
    price_change_percentage_24h: data.keyMetrics?.price_change_percentage_24h ?? finalPriceChange,
    keyMetrics: data.keyMetrics,
    about: data.about,
  };
}

export async function fetchCoinMarketChart(id: string): Promise<MarketChartData | null> {
  // The new API does not expose a dedicated chart endpoint per coin.
  // We approximate using the coin-list data if available.
  const response = await fetch(`${API_BASE}/api/v1/stats/coin-list?limit=50`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data: ApiCoin[] = await response.json();
  const match = data.find((c) => c.id === id);
  if (!match?.chart?.price?.length) {
    return null;
  }

  const now = Date.now();
  const intervalMs = 60 * 60 * 1000; // 1h spacing for synthetic timestamps
  const prices: [number, number][] = match.chart.price.map((p, idx, arr) => [
    now - (arr.length - 1 - idx) * intervalMs,
    p,
  ]);

  return { prices };
}

