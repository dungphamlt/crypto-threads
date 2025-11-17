import { NextRequest } from "next/server";

const COINGECKO_ENDPOINT = "https://api.coingecko.com/api/v3/coins/markets";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const params = new URLSearchParams({
    vs_currency: searchParams.get("vs_currency") ?? "usd",
    order: searchParams.get("order") ?? "market_cap_desc",
    per_page: searchParams.get("per_page") ?? "10",
    page: searchParams.get("page") ?? "1",
    sparkline: searchParams.get("sparkline") ?? "false",
    price_change_percentage:
      searchParams.get("price_change_percentage") ?? "24h",
  });

  try {
    const response = await fetch(`${COINGECKO_ENDPOINT}?${params.toString()}`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch coin data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Coin proxy error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
