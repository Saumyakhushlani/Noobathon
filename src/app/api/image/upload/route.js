import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import imagekit from "@/lib/imagekit";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const formData = await req.formData();

    // Accept both field names: `file` (our client) or `image` (your snippet)
    const file = formData.get("file") ?? formData.get("image");
    const folder = String(formData.get("folder") ?? "/blog").trim();
    const fileNameRaw = formData.get("fileName");
    const fileName =
      (typeof fileNameRaw === "string" && fileNameRaw.trim()) ||
      `${(file && typeof file === "object" && "name" in file && file.name) || "upload"}-${Date.now()}`;

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided (send multipart field 'file' or 'image')." },
        { status: 400 }
      );
    }

    if (!file.type?.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    // 10MB soft limit
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json({ error: "File too large (max 10MB)." }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await imagekit.upload({
      file: buffer,
      fileName,
      folder,
      useUniqueFileName: true,
      tags: ["blog", `user:${userId}`],
    });

    return NextResponse.json(
      {
        success: true,
        url: uploaded.url,
        fileId: uploaded.fileId,
        fileName: uploaded.name,
        height: uploaded.height,
        width: uploaded.width,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : "Failed to upload image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

