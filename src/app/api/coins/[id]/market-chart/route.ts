import { NextRequest } from "next/server";

const COINGECKO_MARKET_CHART_ENDPOINT = "https://api.coingecko.com/api/v3/coins";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = req.nextUrl;

  const vs_currency = searchParams.get("vs_currency") ?? "usd";
  const days = searchParams.get("days") ?? "7";
  const interval = searchParams.get("interval") ?? "daily";

  try {
    const response = await fetch(
      `${COINGECKO_MARKET_CHART_ENDPOINT}/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${interval}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch market chart data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Market chart error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

