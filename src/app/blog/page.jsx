import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

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

function stripMarkdown(md = "") {
  return String(md)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/[#>*_~\-]{1,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-10 py-12">
        <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Blog
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
            Sign in to read and create posts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-extrabold text-white"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Create account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  let posts = [];
  let dbError = null;
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
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
    dbError = e instanceof Error ? e.message : "Failed to load posts.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-16 py-12">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Blog
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
            Cybersecurity-only blogs — write and share security tips, scams, tools, and learnings.
          </p>
        </div>

        <Link
          href="/blog/create"
          className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-extrabold text-white"
        >
          Write
        </Link>
      </div>

      {dbError ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Database error: {dbError}
          <div className="mt-2 text-red-700/80">
            If you just added the model, run <span className="font-mono">npx prisma migrate dev</span> to create the table.
          </div>
        </div>
      ) : null}

      {!dbError && posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-8 text-center">
          <div className="text-lg font-extrabold text-gray-900">No posts yet</div>
          <div className="mt-2 text-sm text-gray-600">
            Create your first post to get started.
          </div>
          <div className="mt-6">
            <Link
              href="/blog/create"
              className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-extrabold text-white"
            >
              Create post
            </Link>
          </div>
        </div>
      ) : null}

      {!dbError && posts.length > 0 ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0">
            <div className="border-b border-black/10 pb-3 md:w-5xl" />

            {(() => {
              const [featured, ...rest] = posts;
              const featuredExcerpt = stripMarkdown(featured.content).slice(0, 160);

              return (
                <>
                  {/* Featured */}
                  <Link
                    href={`/blog/${featured.id}`}
                    className="group block border-b border-black/10 py-10 md:w-5xl"
                  >
                    <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-6">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-600">
                          In Blog • {featured.authorName}
                        </div>
                        <div className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 group-hover:underline underline-offset-4">
                          {featured.title}
                        </div>
                        <div className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                          {featuredExcerpt || "—"}
                          {stripMarkdown(featured.content).length > 160 ? "…" : ""}
                        </div>
                        <div className="mt-5 text-sm text-gray-500">
                          {formatDate(featured.createdAt)}
                        </div>
                      </div>

                      <div className="w-full md:w-[240px] shrink-0">
                        <div className="w-full overflow-hidden rounded-xl   bg-transparent">
                          {featured.imageUrl ? (
                            <div className="flex items-center justify-center p-2">
                              <img
                                src={featured.imageUrl}
                                alt=""
                                className="h-auto w-full max-h-[150px] object-contain"
                              />
                            </div>
                          ) : (
                            <div
                              className="h-2 w-full"
                              style={{ backgroundColor: "var(--brand-purple)" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Feed rows */}
                  <div className="divide-y divide-black/10">
                    {rest.map((p) => {
                      const excerpt = stripMarkdown(p.content).slice(0, 140);
                      return (
                        <Link
                          key={p.id}
                          href={`/blog/${p.id}`}
                          className="group block py-8"
                        >
                          <div className="flex items-start justify-between gap-5">
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-gray-600">
                                {p.authorName} • {formatDate(p.createdAt)}
                              </div>
                              <div className="mt-2 text-lg md:text-xl font-extrabold text-gray-900 group-hover:underline underline-offset-4">
                                {p.title}
                              </div>
                              <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {excerpt || "—"}
                                {stripMarkdown(p.content).length > 140 ? "…" : ""}
                              </div>
                            </div>

                            <div className="hidden sm:block w-[160px] shrink-0">
                              <div className="w-full overflow-hidden rounded-lg border border-black/10 bg-transparent">
                                {p.imageUrl ? (
                                  <div className="flex items-center justify-center p-2">
                                    <img
                                      src={p.imageUrl}
                                      alt=""
                                      className="h-auto w-full max-h-[96px] object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="h-2 w-full"
                                    style={{ backgroundColor: "var(--brand-blue)" }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          <aside className="hidden lg:block" aria-hidden />
        </div>
      ) : null}
    </main>
  );
}
