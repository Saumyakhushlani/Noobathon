import Parser from "rss-parser";

export const runtime = "nodejs";

const FEED_URL = process.env.NEWS_API;

export async function GET() {
  try {
    if (!FEED_URL) {
      return Response.json(
        { success: false, error: "News API URL is not configured" },
        { status: 500 }
      );
    }

    const parser = new Parser();

    const feed = await parser.parseURL(FEED_URL);

    const items = (feed.items || []).slice(0, 21).map((item) => ({
      title: item.title ?? null,
      link: item.link ?? null,
      pubDate: item.pubDate ?? null,
      description: item.contentSnippet || item.content || "",
    }));

    return Response.json(
      { success: true, items },
      { headers: { "cache-control": "s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

