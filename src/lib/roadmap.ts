export type CyberSecurityNodeIndexEntry = {
  nodeId: string;
  text: string;
  subjects?: string[];
  guides?: string[];
  isOptional?: boolean;
  _id?: string;
};

export type RoadmapTopic = {
  /** Human readable label (e.g. "Fundamental IT Skills") */
  label: string;
  /** URL segment (e.g. "fundamental-it-skills") */
  nameSlug: string;
  /** Roadmap.sh node id */
  nodeId: string;
};

export type RoadmapNodeContent = {
  _id: string;
  roadmapSlug: string;
  nodeId: string;
  createdAt?: string;
  updatedAt?: string;
  description: string;
  resources?: { type: string; title: string; url: string; _id?: string }[];
  paidResources?: { type: string; title: string; url: string; _id?: string }[];
  contribution?: string;
};

export function slugifyRoadmapName(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Extract top-level topics from the roadmap index.
 * We treat entries with exactly: "Cyber Security > <Topic>"
 */
export function extractTopLevelTopics(
  entries: CyberSecurityNodeIndexEntry[],
  rootLabel = "Cyber Security"
): RoadmapTopic[] {
  const topics: RoadmapTopic[] = [];
  const seen = new Set<string>();

  for (const e of entries) {
    const parts = String(e.text ?? "").split(" > ").map((s) => s.trim());
    if (parts.length !== 2) continue;
    if (parts[0] !== rootLabel) continue;
    if (!e.nodeId) continue;

    const label = parts[1];
    const nameSlug = slugifyRoadmapName(label);
    const key = `${nameSlug}@${e.nodeId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    topics.push({ label, nameSlug, nodeId: e.nodeId });
  }

  // Keep a stable, readable order
  topics.sort((a, b) => a.label.localeCompare(b.label));
  return topics;
}

