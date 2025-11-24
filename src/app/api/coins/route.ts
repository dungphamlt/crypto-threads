import { NextRequest } from "next/server";

const COINGECKO_MARKETS_ENDPOINT =
  "https://api.coingecko.com/api/v3/coins/markets";
const COINGECKO_TRENDING_ENDPOINT =
  "https://api.coingecko.com/api/v3/search/trending";

interface TrendingCoinItem {
  id: string;
  name?: string;
  symbol?: string;
}

interface TrendingCoin {
  item: TrendingCoinItem;
}

interface TrendingResponse {
  coins?: TrendingCoin[];
}

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h?: number;
  price_change_percentage_24h_in_currency?: number;
  [key: string]: unknown;
}

async function fetchMarkets(params: URLSearchParams) {
  const response = await fetch(
    `${COINGECKO_MARKETS_ENDPOINT}?${params.toString()}`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    return Response.json(
      { error: "Failed to fetch coin data" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return Response.json(data, { status: 200 });
}

async function fetchMarketsData(
  params: URLSearchParams
): Promise<MarketData[]> {
  const res = await fetch(
    `${COINGECKO_MARKETS_ENDPOINT}?${params.toString()}`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`CoinGecko error: ${res.status} ${text}`);
  }

  return res.json() as Promise<MarketData[]>;
}

async function handleTrending(per_page: string) {
  try {
    const trendingResponse = await fetch(COINGECKO_TRENDING_ENDPOINT, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!trendingResponse.ok) {
      return Response.json(
        { error: "Failed to fetch trending coins" },
        { status: trendingResponse.status }
      );
    }

    const trendingData = (await trendingResponse.json()) as TrendingResponse;
    const ids: string[] =
      trendingData?.coins
        ?.map((coin: TrendingCoin) => coin?.item?.id)
        .filter(Boolean) ?? [];

    const limit = Number(per_page ?? "7") || 7;
    const limitedIds = ids.slice(0, limit);

    if (limitedIds.length === 0) {
      return Response.json([], { status: 200 });
    }

    const params = new URLSearchParams({
      vs_currency: "usd",
      ids: limitedIds.join(","),
      order: "market_cap_desc",
      sparkline: "false",
      price_change_percentage: "24h",
    });

    return fetchMarkets(params);
  } catch (error) {
    console.error("Trending coins error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");

  if (category === "trending") {
    const perPage = searchParams.get("per_page") ?? "7";
    return handleTrending(perPage);
  }

  // default params
  const params = new URLSearchParams({
    vs_currency: searchParams.get("vs_currency") ?? "usd",
    order: searchParams.get("order") ?? "market_cap_desc",
    per_page: searchParams.get("per_page") ?? "10",
    page: searchParams.get("page") ?? "1",
    sparkline: searchParams.get("sparkline") ?? "true",
    price_change_percentage:
      searchParams.get("price_change_percentage") ?? "24h",
  });

  const ids = searchParams.get("ids");
  if (ids) {
    params.set("ids", ids);
  }

  const perPageParam = searchParams.get("per_page") ?? "10";

  if (category === "top_grow") {
    try {
      params.set("per_page", "250");
      params.set("page", "1");
      params.set("sparkline", "false");
      params.set("price_change_percentage", "24h");

      const data = await fetchMarketsData(params);

      const sorted = data
        .map((d) => ({
          ...d,
          _pct:
            d.price_change_percentage_24h_in_currency ??
            d.price_change_percentage_24h ??
            0,
        }))
        .sort((a, b) => (b._pct ?? 0) - (a._pct ?? 0));

      const limit = Number(perPageParam) || 10;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const top = sorted.slice(0, limit).map(({ _pct, ...rest }) => rest);

      return Response.json(top, { status: 200 });
    } catch (error) {
      console.error("Top grow error:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  if (category === "new") {
    params.set("order", "market_cap_asc");
    params.set("sparkline", "false");
  }

  try {
    return await fetchMarkets(params);
  } catch (error) {
    console.error("Coin proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
