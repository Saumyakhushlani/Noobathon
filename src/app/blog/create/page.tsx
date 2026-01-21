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
import { Loader2, Type, Upload } from "lucide-react";

import { BasicNodesKit } from "@/components/basic-nodes-kit";
import { BaseFontKit } from "@/components/font-base-kit";
import { MarkdownKit } from "@/components/markdown-kit";
import { Editor, EditorContainer } from "@/components/ui/editor";

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
    // Applies to selected text (mark). Requires BaseFontSizePlugin.
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
    <main className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-10 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Create blog post
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Write with the editor below. Your post is saved as <span className="font-mono">Markdown</span>.
          </p>
        </div>

        <button
          type="button"
          onClick={onPublish}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Publish
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
          <div className="border-b border-black/10 p-4">
            <label className="block text-sm font-semibold text-gray-900">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40"
              placeholder="Write a clear title…"
            />
          </div>

          <Plate editor={editor}>
            {/* Fixed toolbar */}
            <div className="sticky top-0 z-10 border-b border-black/10 bg-white px-3 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleMark("bold")}
                  className="rounded-lg border border-black/10 px-3 py-1.5 text-sm font-extrabold text-gray-900 hover:bg-gray-50"
                  aria-label="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleMark("italic")}
                  className="rounded-lg border border-black/10 px-3 py-1.5 text-sm font-extrabold italic text-gray-900 hover:bg-gray-50"
                  aria-label="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleMark("underline")}
                  className="rounded-lg border border-black/10 px-3 py-1.5 text-sm font-extrabold underline text-gray-900 hover:bg-gray-50"
                  aria-label="Underline"
                >
                  U
                </button>

                <div className="mx-1 h-6 w-px bg-black/10" />

                <label className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900">
                  <Type className="h-4 w-4 text-[var(--brand-purple)]" />
                  <select
                    value={fontSize}
                    onChange={(e) => applyFontSize(e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-transparent outline-none"
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

            <EditorContainer className="min-h-[600px]" variant="default">
              <Editor
                variant="none"
                className="px-6 py-5"
                placeholder="Start writing…"
              />
            </EditorContainer>
          </Plate>
        </div>

        <aside className="space-y-4">
          <div
            className="rounded-2xl border-2 p-4 bg-white"
            style={{ borderColor: "var(--brand-blue)" }}
          >
            <div className="text-sm font-extrabold text-gray-900">
              Cover image
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Optional. Upload an image and we’ll store the link.
            </p>

            <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50">
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
              <div className="mt-3 overflow-hidden rounded-xl border border-black/10">
                <img
                  src={coverUrl}
                  alt="Cover preview"
                  className="h-40 w-full object-cover"
                />
              </div>
            ) : null}
          </div>

          <div
            className="rounded-2xl border-2 p-4"
            style={{
              borderColor: "var(--brand-pink)",
              backgroundColor: "color-mix(in oklab, var(--brand-pink) 6%, white)",
            }}
          >
            <div className="text-sm font-extrabold text-gray-900">Shortcuts</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>
                <span className="font-mono">Ctrl/Cmd + B</span> bold
              </li>
              <li>
                <span className="font-mono">Ctrl/Cmd + I</span> italic
              </li>
              <li>Type <span className="font-mono">#</span> then space for headings</li>
              <li>Type <span className="font-mono">&gt;</span> then space for blockquote</li>
            </ul>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </aside>
      </div>
    </main>
  );
}

