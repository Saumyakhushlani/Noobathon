"use client";

import * as React from "react";

import Modal from "@/components/ui/modal";
import type { RoadmapNodeContent } from "@/lib/roadmap";
import { slugifyRoadmapName } from "@/lib/roadmap";

import cyberSecurityIndex from "@/data/cyber-security.json";

type Entry = {
  nodeId: string;
  text: string;
};

type BoxItem = {
  label: string;
  nodeId: string;
  nameSlug: string;
};

function parsePath(text: string) {
  return String(text).split(" > ").map((s) => s.trim());
}

type TreeNode = {
  label: string;
  nodeId?: string;
  children: Map<string, TreeNode>;
};

function buildTree(entries: Entry[], rootLabel = "Cyber Security") {
  const root: TreeNode = { label: rootLabel, children: new Map() };
  for (const e of entries) {
    const parts = parsePath(e.text);
    if (!parts.length) continue;
    if (parts[0] !== rootLabel) continue;

    let cur = root;
    for (let i = 1; i < parts.length; i++) {
      const label = parts[i];
      const key = label;
      let child = cur.children.get(key);
      if (!child) {
        child = { label, children: new Map() };
        cur.children.set(key, child);
      }
      cur = child;
    }
    // attach nodeId to the node represented by the full path
    cur.nodeId = e.nodeId;
  }
  return root;
}

function nodeToBoxItem(n: TreeNode): BoxItem | null {
  if (!n.nodeId) return null;
  return { label: n.label, nodeId: n.nodeId, nameSlug: slugifyRoadmapName(n.label) };
}

function Box({
  label,
  onClick,
  accent = "var(--brand-blue)",
  variant = "soft",
  className,
}: {
  label: string;
  onClick?: () => void;
  accent?: string;
  variant?: "soft" | "outline";
  className?: string;
}) {
  const base =
    variant === "outline"
      ? "bg-white hover:bg-gray-50"
      : "bg-white hover:bg-gray-50";
  const Comp: any = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      role={onClick ? undefined : "group"}
      className={[
        "inline-flex max-w-full items-center justify-center rounded-md border-2 px-4 py-2 text-sm font-semibold shadow-sm",
        "whitespace-normal break-words text-center",
        "transition-colors",
        base,
        className ?? "",
      ].join(" ")}
      style={{
        borderColor: accent,
        color: "rgb(17 24 39)", // gray-900
        backgroundColor:
          variant === "soft"
            ? // a subtle tint using the theme color
              `color-mix(in oklab, ${accent} 12%, white)`
            : "white",
      }}
    >
      {label}
    </Comp>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-gray-900">{children}</div>;
}

function TreeSection({
  node,
  depth = 0,
  onOpen,
}: {
  node: TreeNode;
  depth?: number;
  onOpen: (item: BoxItem) => void;
}) {
  const box = nodeToBoxItem(node);
  const children = Array.from(node.children.values());
  const hasChildren = children.length > 0;

  const dotColor =
    depth % 3 === 0
      ? "bg-[var(--brand-purple)]"
      : depth % 3 === 1
        ? "bg-[var(--brand-pink)]"
        : "bg-[var(--brand-blue)]";
  const accentVar =
    depth % 3 === 0
      ? "var(--brand-purple)"
      : depth % 3 === 1
        ? "var(--brand-pink)"
        : "var(--brand-blue)";

  // Leaf: just render a box
  if (!hasChildren) {
    return (
      <div className={depth ? "ml-4" : ""}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
          <Box
            label={node.label}
            onClick={box ? () => onOpen(box) : undefined}
            className="text-left"
            accent={accentVar}
            variant="outline"
          />
        </div>
      </div>
    );
  }

  // Category: render a box for the subcategory + children under it
  return (
    <div className={depth ? "ml-4" : ""}>
      <details open className="group">
        <summary className="cursor-pointer list-none">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
            <Box
              label={node.label}
              onClick={
                box
                  ? () => onOpen(box)
                  : undefined
              }
              className="text-left"
              accent={accentVar}
              variant="soft"
            />
          </div>
          <div className="mt-2 block pl-6 text-xs text-gray-500">
            {children.length} subtopics
          </div>
        </summary>

        <div className="mt-5 flex flex-wrap gap-3">
          {children.map((c) => (
            <TreeSection
              key={`${c.label}-${c.nodeId ?? "x"}`}
              node={c}
              depth={depth + 1}
              onOpen={onOpen}
            />
          ))}
        </div>
      </details>
    </div>
  );
}

export default function CyberSecurityRoadmapDiagram() {
  const entries = React.useMemo(() => cyberSecurityIndex as unknown as Entry[], []);
  const tree = React.useMemo(() => buildTree(entries, "Cyber Security"), [entries]);
  const topLevel = React.useMemo(() => Array.from(tree.children.values()), [tree]);

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<BoxItem | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<RoadmapNodeContent | null>(null);

  async function openTopic(item: BoxItem) {
    setOpen(true);
    setActive(item);
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const qs = new URLSearchParams({
        roadmapSlug: "cyber-security",
        nodeId: item.nodeId,
        name: item.nameSlug,
      });
      const res = await fetch(`/api/roadmap/node?${qs.toString()}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed (${res.status})`);
      }
      const j = (await res.json()) as RoadmapNodeContent;
      setData(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load topic");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 pb-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Cyber Security Roadmap (Full)
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Full dataset from your `cyber-security.json`. Click any node to open details in a modal.
          </p>
        </div>
        <div className="text-xs font-semibold text-gray-500">
          Theme:{" "}
          <span className="text-[var(--brand-blue)]">blue</span> ·{" "}
          <span className="text-[var(--brand-pink)]">pink</span> ·{" "}
          <span className="text-[var(--brand-purple)]">purple</span>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {topLevel.map((section) => (
          <div
            key={`${section.label}-${section.nodeId ?? "x"}`}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
          >
            <div className="mt-4 space-y-3">
              <TreeSection node={section} onOpen={openTopic} />
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={
          active ? (
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-blue)]" />
              <span>{active.label}</span>
            </div>
          ) : (
            "Details"
          )
        }
      >
        {loading && <div className="text-sm text-gray-600">Loading…</div>}
        {!loading && error && (
          <div className="text-sm text-red-600">Error: {error}</div>
        )}
        {!loading && !error && data && (
          <div className="space-y-4">
            <div className="text-xs text-gray-500">
              nodeId: <span className="font-mono">{data.nodeId}</span>
            </div>

            <div className="rounded-xl border border-black/10 bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                {data.description}
              </pre>
            </div>

            {data.resources?.length ? (
              <div>
                <div className="text-sm font-bold text-gray-900 mb-2">Resources</div>
                <div className="space-y-2">
                  {data.resources.map((r) => (
                    <a
                      key={`${r.type}-${r.url}`}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm text-[var(--brand-purple)] hover:underline underline-offset-4"
                    >
                      [{r.type}] {r.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {data.contribution ? (
              <a
                href={data.contribution}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm text-[var(--brand-pink)] hover:underline underline-offset-4"
              >
                View source / contribute
              </a>
            ) : null}
          </div>
        )}
      </Modal>
    </section>
  );
}

