import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(d) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return "";
  }
}

export default async function Page({ params }) {
  const { userId } = await auth();
  if (!userId) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-16 py-12">
        <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Sign in required
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Please sign in to view blog posts.
          </p>
          <div className="mt-6">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-extrabold text-white"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id;
  if (!id) notFound();

  let post = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        content: true,
        authorName: true,
        createdAt: true,
      },
    });
  } catch (e) {
    // If table doesn't exist yet, show a friendly message instead of crashing.
    return (
      <main className="mx-auto w-full max-w-4xl px-4 md:px-8 lg:px-10 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
          <div className="text-lg font-extrabold text-gray-900">
            Database not ready
          </div>
          <div className="mt-2 text-sm text-red-700">
            Create the blog table first (Prisma migration) then reload.
          </div>
          <div className="mt-4">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--brand-purple)] hover:underline underline-offset-4"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-16 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="mb-6">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--brand-purple)] hover:underline underline-offset-4"
            >
              ← Back to blog
            </Link>
          </div>

          <article>
            <div className="border-b border-black/10 pb-6 md:w-5xl">
              <div className="text-sm font-semibold text-gray-600">
                In Blog • {post.authorName}
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {post.title}
              </h1>
              <div className="mt-4 text-sm text-gray-500">{formatDate(post.createdAt)}</div>
            </div>

            {post.imageUrl ? (
              <div className="mt-4 w-full overflow-hidden rounded-xl  bg-transparent">
                <div className="flex items-center justify-center ">
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="h-auto w-full max-h-[200px] object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-8 h-2 w-full" style={{ backgroundColor: "var(--brand-blue)" }} />
            )}

            <div className="mt-10">
              <div className="prose prose-sm md:prose-base max-w-none prose-a:text-[var(--brand-purple)] prose-a:underline prose-a:underline-offset-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>

        {/* Keep right side empty like Medium */}
        <aside className="hidden lg:block" aria-hidden />
      </div>
    </main>
  );
}
