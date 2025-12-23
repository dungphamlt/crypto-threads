import { NextRequest } from "next/server";
import { postService } from "@/services/posts-service";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q");
  const limit = searchParams.get("limit") ?? "5";

  if (!query || query.trim().length < 2) {
    return Response.json({ data: [] }, { status: 200 });
  }

  try {
    const posts = await postService.searchPosts(query, Number(limit));
    return Response.json({ data: posts }, { status: 200 });
  } catch (error) {
    console.error("Search API error:", error);
    return Response.json({ data: [], error: "Search failed" }, { status: 500 });
  }
}

