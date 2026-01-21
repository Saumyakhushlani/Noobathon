"use server";

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  // For now: authenticated users only (secure-by-default).
  // If you want public reading later, we can relax this.
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      content: true,
      authorId: true,
      authorName: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { title?: unknown; content?: unknown; imageUrl?: unknown }
    | null;

  if (!body || typeof body.title !== "string" || typeof body.content !== "string") {
    return NextResponse.json(
      { error: "Invalid body. Expected { title: string, content: string, imageUrl?: string }" },
      { status: 400 }
    );
  }

  const title = body.title.trim();
  const content = body.content.trim();
  const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : null;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const u = await currentUser();
  const authorName =
    [u?.firstName, u?.lastName].filter(Boolean).join(" ") ||
    u?.username ||
    u?.primaryEmailAddress?.emailAddress ||
    "Unknown";

  const post = await prisma.blogPost.create({
    data: {
      title,
      content,
      imageUrl: imageUrl || null,
      authorId: userId,
      authorName,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      content: true,
      authorId: true,
      authorName: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}

