"use client";

import * as React from "react";

import DynamicScrollIslandTOC, {
  type TOC_INTERFACE,
} from "@/components/ui/dynamic-scroll-island-toc";
import type {
  CyberSecurityNodeIndexEntry,
  RoadmapNodeContent,
} from "@/lib/roadmap";
import { extractTopLevelTopics } from "@/lib/roadmap";

import cyberSecurityIndex from "@/data/cyber-security.json";

type TopicContentState =
  | { status: "idle" }
  | { status: "loading"; topic: TOC_INTERFACE }
  | { status: "error"; topic: TOC_INTERFACE; message: string }
  | { status: "success"; topic: TOC_INTERFACE; data: RoadmapNodeContent };

const themeCycle = [
  {
    bg: "bg-[var(--brand-purple)]",
    ring: "ring-[var(--brand-purple)]/30",
    accent: "var(--brand-purple)",
  },
  {
    bg: "bg-[var(--brand-pink)]",
    ring: "ring-[var(--brand-pink)]/30",
    accent: "var(--brand-pink)",
  },
  {
    bg: "bg-[var(--brand-blue)]",
    ring: "ring-[var(--brand-blue)]/30",
    accent: "var(--brand-blue)",
  },
] as const;

export default function CyberSecurityTopicButtons() {
  const topics = React.useMemo(() => {
    const entries = cyberSecurityIndex as unknown as CyberSecurityNodeIndexEntry[];
    return extractTopLevelTopics(entries, "Cyber Security").map((t) => ({
      name: t.label,
      value: `${t.nameSlug}@${t.nodeId}`,
      nodeId: t.nodeId,
      nameSlug: t.nameSlug,
    })) satisfies TOC_INTERFACE[];
  }, []);

  const [selected, setSelected] = React.useState<TOC_INTERFACE>(
    topics[0] ?? { name: "All" }
  );
  const [state, setState] = React.useState<TopicContentState>({ status: "idle" });

  async function fetchTopic(topic: TOC_INTERFACE) {
    if (!topic?.nodeId || !topic?.nameSlug) return;

    setSelected(topic);
    setState({ status: "loading", topic });

    try {
      const qs = new URLSearchParams({
        roadmapSlug: "cyber-security",
        nodeId: topic.nodeId,
        name: topic.nameSlug,
      });
      const res = await fetch(`/api/roadmap/node?${qs.toString()}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as RoadmapNodeContent;
      setState({ status: "success", topic, data });
    } catch (e) {
      setState({
        status: "error",
        topic,
        message: e instanceof Error ? e.message : "Failed to load topic",
      });
    }
  }

  // Load first topic by default
  React.useEffect(() => {
    if (topics.length && selected?.nodeId && state.status === "idle") {
      fetchTopic(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics.length]);

  const content =
    state.status === "success"
      ? {
          title: state.data.roadmapSlug,
          description: state.data.description,
          resources: state.data.resources ?? [],
          contribution: state.data.contribution,
        }
      : undefined;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 pb-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Explore Topics
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Tap a topic to fetch its detailed guide from roadmap.sh (name@id) and
            view it in the floating panel.
          </p>
        </div>

        <div className="shrink-0">
          <DynamicScrollIslandTOC
            data={topics}
            value={selected}
            setValue={(t) => fetchTopic(t)}
            lPrefix="roadmap-topic"
            className="text-black"
            loading={state.status === "loading"}
            error={state.status === "error" ? state.message : null}
            content={content}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {topics.map((t, idx) => {
          const palette = themeCycle[idx % themeCycle.length];
          const isActive = t.value && t.value === selected?.value;
          return (
            <button
              key={t.value ?? t.name}
              onClick={() => fetchTopic(t)}
              className={[
                "rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold text-white",
                "shadow-[4px_4px_0_0_var(--hard-shadow)] transition-transform transition-shadow hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_var(--hard-shadow-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                palette.ring,
                isActive ? "ring-2 ring-offset-2" : "",
              ].join(" ")}
              style={{
                borderColor: "#111",
                // "/90" look (opaque): 90% theme color mixed with white
                backgroundColor: `color-mix(in oklab, ${palette.accent} 90%, white)`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                <span className="line-clamp-2">{t.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

