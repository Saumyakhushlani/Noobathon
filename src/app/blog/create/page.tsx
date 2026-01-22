"use client";

import * as React from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { serializeMd } from "@platejs/markdown";
import { normalizeNodeId } from "platejs";
import { Plate, usePlateEditor } from "platejs/react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Editor as SlateEditor } from "slate";
import { Loader2, Type, Upload, ArrowLeft, BookOpen, Lightbulb } from "lucide-react";
import Link from "next/link";

import { BasicNodesKit } from "@/components/basic-nodes-kit";
import { BaseFontKit } from "@/components/font-base-kit";
import { MarkdownKit } from "@/components/markdown-kit";
import { Editor, EditorContainer } from "@/components/ui/editor";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";

export default function BlogCreatePage() {
  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [coverUrl, setCoverUrl] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fontSize, setFontSize] = React.useState("16px");

  const editor = usePlateEditor(
    {
      plugins: [...BasicNodesKit, ...BaseFontKit, ...MarkdownKit],
      value: normalizeNodeId([
        {
          type: "p",
          children: [{ text: "" }],
        },
      ]),
    },
    []
  );

  function toggleMark(key: string) {
    const marks = SlateEditor.marks(editor as any) as Record<string, any> | null;
    const isActive = !!marks?.[key];
    if (isActive) {
      (editor as any).removeMark(key);
    } else {
      (editor as any).addMark(key, true);
    }
  }

  function applyFontSize(value: string) {
    setFontSize(value);
    (editor as any).addMark("fontSize", value);
  }

  async function uploadCover(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "/blog/covers");
      fd.append("fileName", `cover-${Date.now()}`);

      const { data } = await axios.post("/api/image/upload", fd);
      setCoverUrl(String(data.url));
    } catch (e) {
      const msg =
        axios.isAxiosError(e)
          ? (e.response?.data as any)?.error || e.message
          : e instanceof Error
            ? e.message
            : "Upload failed";
      setError(String(msg));
    } finally {
      setUploading(false);
    }
  }

  async function onPublish() {
    setSaving(true);
    setError(null);

    try {
      const cleanTitle = title.trim();
      if (!cleanTitle) throw new Error("Title is required.");

      const markdown = serializeMd(editor as any, {
        remarkPlugins: [remarkMath as any, remarkGfm as any],
      });

      if (!markdown.trim()) throw new Error("Content is required.");

      await axios.post("/api/blog/posts", {
        title: cleanTitle,
        content: markdown,
        imageUrl: coverUrl,
      });

      router.push("/blog");
    } catch (e) {
      const msg =
        axios.isAxiosError(e)
          ? (e.response?.data as any)?.error || e.message
          : e instanceof Error
            ? e.message
            : "Failed to publish";
      setError(String(msg));
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-background dark:bg-black relative">
      {/* Static Grid Background */}
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
      
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-10 py-10">
        <div className="mb-8 relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-sm">
          <div className="absolute inset-0 overflow-hidden">
            <InteractiveGridBackground />
          </div>
          <div className="relative z-10 flex items-start justify-between gap-4 flex-wrap p-6 md:p-8">
            <div className="min-w-0 flex-1">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-purple)] dark:text-purple-400 hover:underline underline-offset-4 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Create blog post
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                Write with the editor below. Your post is saved as <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Markdown</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={onPublish}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-6 py-3 text-sm font-extrabold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-60 whitespace-nowrap relative z-10"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Publish
            </button>
          </div>
        </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm overflow-hidden shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.3)]">
          <div className="border-b border-gray-200 dark:border-white/10 p-4 bg-white/50 dark:bg-black/30">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40 dark:focus:ring-purple-400/40"
              placeholder="Write a clear title…"
            />
          </div>

          <Plate editor={editor}>
            <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-3 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleMark("bold")}
                  className="rounded-lg border border-gray-200 dark:border-white/10 px-3 py-1.5 text-sm font-extrabold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleMark("italic")}
                  className="rounded-lg border border-gray-200 dark:border-white/10 px-3 py-1.5 text-sm font-extrabold italic text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleMark("underline")}
                  className="rounded-lg border border-gray-200 dark:border-white/10 px-3 py-1.5 text-sm font-extrabold underline text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Underline"
                >
                  U
                </button>

                <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-white/10" />

                <label className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                  <Type className="h-4 w-4 text-[var(--brand-purple)] dark:text-purple-400" />
                  <select
                    value={fontSize}
                    onChange={(e) => applyFontSize(e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-transparent outline-none text-gray-900 dark:text-white"
                    aria-label="Font size"
                  >
                    <option value="12px">12</option>
                    <option value="14px">14</option>
                    <option value="16px">16</option>
                    <option value="18px">18</option>
                    <option value="20px">20</option>
                    <option value="24px">24</option>
                    <option value="32px">32</option>
                  </select>
                </label>
              </div>
            </div>

            <EditorContainer className="min-h-[600px] bg-white dark:bg-gray-900/30" variant="default">
              <Editor
                variant="none"
                className="px-6 py-5 text-gray-900 dark:text-white"
                placeholder="Start writing…"
              />
            </EditorContainer>
          </Plate>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-6 shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-3">
              <Upload className="h-5 w-5 text-[var(--brand-blue)] dark:text-blue-400" />
              <div className="text-sm font-extrabold text-gray-900 dark:text-white">
                Cover image
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              Optional. Upload an image and we'll store the link.
            </p>

            <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 px-3 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Uploading…" : "Upload cover"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadCover(f);
                }}
              />
            </label>

            {coverUrl ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                <img
                  src={coverUrl}
                  alt="Cover preview"
                  className="h-40 w-full object-cover"
                />
              </div>
            ) : (
              <div className="mt-4 h-32 w-full rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">No cover image</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-6 shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-[var(--brand-pink)] dark:text-pink-400" />
              <div className="text-sm font-extrabold text-gray-900 dark:text-white">Keyboard Shortcuts</div>
            </div>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">Ctrl/Cmd + B</span>
                <span className="text-gray-600 dark:text-gray-400">Bold text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">Ctrl/Cmd + I</span>
                <span className="text-gray-600 dark:text-gray-400">Italic text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">#</span>
                <span className="text-gray-600 dark:text-gray-400">Heading (type # then space)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">&gt;</span>
                <span className="text-gray-600 dark:text-gray-400">Blockquote (type &gt; then space)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-6 shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-[var(--brand-purple)] dark:text-purple-400" />
              <div className="text-sm font-extrabold text-gray-900 dark:text-white">Writing Tips</div>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Use clear, descriptive titles</li>
              <li>• Add a cover image for better engagement</li>
              <li>• Break up content with headings</li>
              <li>• Preview your markdown before publishing</li>
            </ul>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/50 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm p-4 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          ) : null}
        </aside>
      </div>
      </div>
    </main>
  );
}
