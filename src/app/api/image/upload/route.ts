"use server";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import imagekit from "@/lib/imagekit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure ImageKit env is configured
  if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    !process.env.IMAGEKIT_URL_ENDPOINT
  ) {
    return NextResponse.json(
      {
        error:
          "ImageKit env not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT.",
      },
      { status: 500 }
    );
  }

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "/blog").trim();
  const fileNameRaw = formData.get("fileName");
  const fileName =
    (typeof fileNameRaw === "string" && fileNameRaw.trim()) ||
    `upload-${Date.now()}`;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file. Send multipart field 'file'." }, { status: 400 });
  }

  if (!file.type?.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  // 10MB soft limit
  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "File too large (max 10MB)." }, { status: 413 });
  }

  const buf = Buffer.from(await file.arrayBuffer());

  const res = await imagekit.upload({
    file: buf,
    fileName,
    folder,
    useUniqueFileName: true,
    tags: ["blog", "user:" + userId],
  });

  return NextResponse.json({
    url: res.url,
    fileId: res.fileId,
    name: res.name,
    height: res.height,
    width: res.width,
  });
}

