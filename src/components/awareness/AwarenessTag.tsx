"use client";

import * as React from "react";

type Tone = "blue" | "pink" | "purple";

const toneToAccent: Record<Tone, string> = {
  blue: "var(--brand-blue)",
  pink: "var(--brand-pink)",
  purple: "var(--brand-purple)",
};

export default function AwarenessTag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: Tone;
}) {
  const accent = toneToAccent[tone];

  return (
    <span
      className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium leading-none ring-1 ring-inset"
      style={{
        backgroundColor: `color-mix(in oklab, ${accent} 12%, white)`,
        color: "rgb(17 24 39)",
        borderColor: accent,
      }}
    >
      {children}
    </span>
  );
}

