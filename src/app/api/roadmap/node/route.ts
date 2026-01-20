import { NextResponse } from "next/server";

import type { RoadmapNodeContent } from "@/lib/roadmap";
import { slugifyRoadmapName } from "@/lib/roadmap";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roadmapSlug = searchParams.get("roadmapSlug")?.trim() ?? "";
  const nodeId = searchParams.get("nodeId")?.trim() ?? "";
  const name = searchParams.get("name")?.trim() ?? "";

  if (!roadmapSlug || !nodeId || !name) {
    return NextResponse.json(
      { error: "Missing roadmapSlug, nodeId, or name" },
      { status: 400 }
    );
  }

  // Basic allowlist-ish validation (avoid weird URLs)
  if (!/^[a-z0-9-]+$/i.test(roadmapSlug)) {
    return NextResponse.json({ error: "Invalid roadmapSlug" }, { status: 400 });
  }
  if (!/^[A-Za-z0-9_-]+$/.test(nodeId)) {
    return NextResponse.json({ error: "Invalid nodeId" }, { status: 400 });
  }

  const safeName = slugifyRoadmapName(name);
  const url = `https://roadmap.sh/${roadmapSlug}/${safeName}@${nodeId}.json`;

  const res = await fetch(url, {
    // cache on server for a bit; hackathon friendly
    next: { revalidate: 60 * 60 },
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    return NextResponse.json(
      { error: `Upstream error (${res.status})`, details: txt.slice(0, 500) },
      { status: 502 }
    );
  }

  const data = (await res.json()) as RoadmapNodeContent;
  return NextResponse.json(data);
}

