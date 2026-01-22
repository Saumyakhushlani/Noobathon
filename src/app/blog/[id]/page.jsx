import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { prisma } from "@/lib/prisma";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";

export const dynamic = "force-dynamic";

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

export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id;
  
  if (!id) {
    return {
      title: "Blog Post Not Found",
    };
  }

  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      select: {
        title: true,
        content: true,
        authorName: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    if (!post) {
      return {
        title: "Blog Post Not Found",
      };
    }

    const description = stripMarkdown(post.content).slice(0, 160);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
    const postUrl = `${siteUrl}/blog/${id}`;

    return {
      title: `${post.title} | Cybersecurity Blog`,
      description: description || `Read ${post.title} by ${post.authorName} on our cybersecurity blog.`,
      keywords: ["cybersecurity", "information security", "cyber awareness", post.title],
      authors: [{ name: post.authorName }],
      openGraph: {
        title: post.title,
        description: description || `Read ${post.title} by ${post.authorName}`,
        type: "article",
        publishedTime: post.createdAt.toISOString(),
        authors: [post.authorName],
        url: postUrl,
        ...(post.imageUrl && {
          images: [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: description || `Read ${post.title} by ${post.authorName}`,
        ...(post.imageUrl && {
          images: [post.imageUrl],
        }),
      },
    };
  } catch (e) {
    return {
      title: "Blog Post",
      description: "Read our latest cybersecurity blog post.",
    };
  }
}

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
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-16 py-12">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 md:p-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Sign in required
            </h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Please sign in to view blog posts.
            </p>
            <div className="mt-6">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-extrabold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Sign in
              </Link>
            </div>
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
      <main className="min-h-screen bg-background dark:bg-black relative">
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 md:px-8 lg:px-10 py-12">
          <div className="rounded-2xl border border-red-500/50 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm p-6 md:p-8">
            <div className="text-lg font-extrabold text-gray-900 dark:text-white">
              Database not ready
            </div>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              Create the blog table first (Prisma migration) then reload.
            </div>
            <div className="mt-4">
              <Link
                href="/blog"
                className="text-sm font-semibold text-white hover:underline underline-offset-4"
              >
                Back to blog
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const postUrl = `${siteUrl}/blog/${id}`;
  const description = stripMarkdown(post.content).slice(0, 160);
  const readTime = Math.ceil(stripMarkdown(post.content).split(' ').length / 200);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: description || `Read ${post.title} by ${post.authorName}`,
    image: post.imageUrl ? [post.imageUrl] : undefined,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.createdAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Cybersecurity Blog",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    ...(readTime && { timeRequired: `PT${readTime}M` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
      
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-16 py-12 mt-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline underline-offset-4"
              >
                ← Back to blog
              </Link>
            </div>

            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-6 md:p-8 lg:p-12">
              <div className="border-b border-gray-200 dark:border-white/10 pb-6">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  In Blog • {post.authorName}
                </div>
                <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {post.title}
                </h1>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</div>
              </div>

              {post.imageUrl ? (
                <div className="mt-8 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900/50">
                  <div className="flex items-center justify-center aspect-[16/9] max-w-3xl mx-auto">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-8 h-2 w-full rounded-full" style={{ backgroundColor: "var(--brand-blue)" }} />
              )}

              <div className="mt-10">
                <div className="prose prose-sm md:prose-base max-w-none 
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-code:text-gray-900 dark:prose-code:text-gray-300
                  prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900/50
                  prose-blockquote:border-l-purple-500 dark:prose-blockquote:border-l-purple-400
                  prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                  prose-a:text-white dark:prose-a:text-white
                  prose-a:underline prose-a:underline-offset-4
                  prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                  prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                  prose-li:text-gray-700 dark:prose-li:text-gray-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          </div>

          <aside className="hidden lg:block space-y-6">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white mb-4">Article Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Author</span>
                  <p className="text-gray-900 dark:text-white font-semibold mt-1">{post.authorName}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Published</span>
                  <p className="text-gray-900 dark:text-white font-semibold mt-1">{formatDate(post.createdAt)}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <Link
                href="/blog"
                className="block text-sm text-white hover:underline underline-offset-4 mb-2"
              >
                ← All Posts
              </Link>
              <Link
                href="/blog/create"
                className="block text-sm text-white hover:underline underline-offset-4"
              >
                Write New Post
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
    </>
  );
}
