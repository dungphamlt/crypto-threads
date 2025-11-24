import { NextRequest } from "next/server";

const COINGECKO_COIN_DETAIL_ENDPOINT = "https://api.coingecko.com/api/v3/coins";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = req.nextUrl;

  const localization = searchParams.get("localization") ?? "false";
  const tickers = searchParams.get("tickers") ?? "false";
  const marketData = searchParams.get("market_data") ?? "true";
  const communityData = searchParams.get("community_data") ?? "false";
  const developerData = searchParams.get("developer_data") ?? "false";
  const sparkline = searchParams.get("sparkline") ?? "false";

  try {
    const response = await fetch(
      `${COINGECKO_COIN_DETAIL_ENDPOINT}/${id}?localization=${localization}&tickers=${tickers}&market_data=${marketData}&community_data=${communityData}&developer_data=${developerData}&sparkline=${sparkline}`,
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
  } catch (error) {
    console.error("Coin detail error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

