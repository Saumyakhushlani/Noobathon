import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | Cybersecurity Insights & Expert Learnings",
  description: "Explore our collection of cybersecurity insights, security tips, threat analysis, and expert learnings. Stay informed with the latest in information security and cyber awareness.",
  keywords: ["cybersecurity", "information security", "cyber awareness", "security tips", "threat analysis", "cybersecurity blog", "security insights"],
  openGraph: {
    title: "Blog | Cybersecurity Insights & Expert Learnings",
    description: "Explore our collection of cybersecurity insights, security tips, threat analysis, and expert learnings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Cybersecurity Insights & Expert Learnings",
    description: "Explore our collection of cybersecurity insights, security tips, threat analysis, and expert learnings.",
  },
};

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
      <main className="min-h-screen bg-background dark:bg-black relative">
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-10 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-10 py-12">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-6 md:p-8">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Blog
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
              Sign in to read and create posts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-extrabold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-white/20 bg-transparent px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                Create account
              </Link>
            </div>
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Cybersecurity Blog",
    description: "Explore our collection of cybersecurity insights, security tips, threat analysis, and expert learnings.",
    url: `${siteUrl}/blog`,
    ...(posts.length > 0 && {
      blogPost: posts.slice(0, 10).map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${siteUrl}/blog/${p.id}`,
        datePublished: p.createdAt.toISOString(),
        author: {
          "@type": "Person",
          name: p.authorName,
        },
        ...(p.imageUrl && { image: p.imageUrl }),
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <main className="min-h-screen bg-background dark:bg-black relative">
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      <div 
        className="absolute inset-0 opacity-10 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-16 py-12 mt-12">
        <div className="mb-12 relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-sm">
          <div className="absolute inset-0 overflow-hidden">
            <InteractiveGridBackground />
          </div>
          <div className="relative z-10 flex items-start justify-between gap-4 flex-wrap p-8 md:p-12">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                All Blogs
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                Explore our collection of cybersecurity insights, security tips, threat analysis, and expert learnings. 
                Stay informed with the latest in information security and cyber awareness.
              </p>
            </div>

            <Link
              href="/blog/create"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-6 py-3 text-sm font-extrabold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors whitespace-nowrap relative z-10"
            >
              Write Post
            </Link>
          </div>
        </div>

        {dbError ? (
          <div className="mt-8 rounded-2xl border border-red-500/50 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm p-4 text-sm text-red-700 dark:text-red-300">
            Database error: {dbError}
            <div className="mt-2 text-red-600 dark:text-red-300/80">
              If you just added the model, run <span className="font-mono bg-gray-200 dark:bg-black/50 px-2 py-1 rounded">npx prisma migrate dev</span> to create the table.
            </div>
          </div>
        ) : null}

        {!dbError && posts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-8 text-center">
            <div className="text-lg font-extrabold text-gray-900 dark:text-white">No posts yet</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Create your first post to get started.
            </div>
            <div className="mt-6">
              <Link
                href="/blog/create"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-extrabold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Create post
              </Link>
            </div>
          </div>
        ) : null}

        {!dbError && posts.length > 0 ? (
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => {
                const excerpt = stripMarkdown(p.content).slice(0, 100);
                const readTime = Math.ceil(stripMarkdown(p.content).split(' ').length / 200);
                return (
                  <Link
                    key={p.id}
                    href={`/blog/${p.id}`}
                    className="group block hover:opacity-90 transition-all duration-300"
                  >
                    <div className="h-full rounded-xl border border-gray-300/20 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_4px_12px_rgb(0,0,0,0.5)] transition-all flex flex-col">
                      <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div
                              className="w-full h-full rounded-t-xl"
                              style={{ backgroundColor: "var(--brand-purple)" }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-5 flex flex-col">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                          by {p.authorName} • {formatDate(p.createdAt)} • {readTime} min read
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:underline underline-offset-2 line-clamp-2">
                          {p.title}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 flex-1">
                          {excerpt || "—"}
                          {stripMarkdown(p.content).length > 100 ? "…" : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </main>
    </>
  );
}
