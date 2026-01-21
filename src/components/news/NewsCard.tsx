"use client";

import * as React from "react";

import { motion } from "motion/react";
import { ExternalLink, Heart, Share2, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme";

export type NewsItem = {
  title: string | null;
  link: string | null;
  pubDate: string | null;
  description: string;
};

function formatDate(d: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function hostname(url: string | null) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function NewsCard({
  item,
  index = 0,
  className,
}: {
  item: NewsItem;
  index?: number;
  className?: string;
}) {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";
  
  // Use light paper color in light mode, dark color in dark mode
  const paper = isDark ? "hsl(0 0% 12%)" : "var(--news-card-paper)";
  // Use theme-aware shadow color: white shadow in dark mode, black in light mode
  const shadowColor = isDark ? "var(--hard-shadow)" : "#111111";
  // Use theme-aware border color: lighter in dark mode for visibility
  const borderColor = isDark ? "rgba(255, 255, 255, 0.2)" : "#111111";
  const ink = "#111111";
  const yellow = "#ffd900";
  const red = "var(--brand-pink)";
  const blue = "var(--brand-blue)";

  const src = hostname(item.link) || "TheHackersNews";
  const date = formatDate(item.pubDate);

  const [shared, setShared] = React.useState(false);

  async function handleShare() {
    if (!item.link) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title ?? "Cybersecurity news",
          url: item.link,
          text: item.title ?? undefined,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(item.link);
        setShared(true);
        window.setTimeout(() => setShared(false), 1200);
      } else {
        // last resort
        window.open(item.link, "_blank", "noopener,noreferrer");
      }
    } catch {
      // user cancelled or blocked: ignore
    }
  }

  return (
    <motion.article
      role="article"
      aria-label={item.title ?? "News item"}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 18, stiffness: 220, delay: Math.min(index * 0.03, 0.25) }}
      whileHover={{ y: -10, rotate: -1.5 }}
      className={cn("w-full h-full", className)}
      style={{ transformOrigin: "bottom left" }}
    >
      <div
        className="relative flex h-full w-full min-h-[340px] flex-col rounded-xl border-2 p-4 shadow-[10px_10px_0_0_var(--shadow-color)] transition-shadow"
        style={
          {
            borderColor: borderColor,
            backgroundColor: paper,
            backgroundImage:
              "linear-gradient(180deg, var(--news-card-shade), rgba(0,0,0,0) 55%)",
            ["--shadow-color" as any]: shadowColor,
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 place-items-center rounded-full border-2"
            style={{
              borderColor: ink,
              background: `linear-gradient(45deg, ${blue}, #6ba9e4)`,
            }}
            aria-hidden="true"
          >
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <div
              className="inline-block px-3 py-1 text-sm font-extrabold uppercase tracking-wide"
              style={{
                backgroundColor: yellow,
                color: ink,
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
              }}
              title={src}
            >
              {src}
            </div>
            <div 
              className="mt-1 text-xs font-semibold tracking-widest"
              style={{ color: isDark ? "rgba(255, 255, 255, 0.7)" : "#374151" }}
            >
              {date || "Latest"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <a
            href={item.link ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <h3 
              className="text-lg font-black leading-snug hover:underline underline-offset-4"
              style={{ color: isDark ? "#ffffff" : "#111827" }}
            >
              {item.title ?? "Untitled"}
            </h3>
          </a>

          <div
            className="relative mt-3 rounded-xl border-2 px-4 py-3 text-[15px] leading-relaxed"
            style={{ 
              borderColor: borderColor, 
              backgroundColor: paper,
              color: isDark ? "rgba(255, 255, 255, 0.8)" : "#374151"
            }}
          >
            <p className="line-clamp-5">{item.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-xs font-extrabold uppercase tracking-wider shadow-[4px_4px_0_0_#111] transition-colors hover:underline underline-offset-4"
              style={{
                borderColor: ink,
                backgroundColor: yellow,
                color: ink,
              }}
              aria-label="View article"
            >
              View article <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <div 
              className="text-xs font-semibold"
              style={{ color: isDark ? "rgba(255, 255, 255, 0.6)" : "#4B5563" }}
            >
              No link
            </div>
          )}

          <div className="flex items-center gap-2">
            <ActionButton label="Like" accent={red} isDark={isDark}>
              <Heart className="h-4 w-4" />
            </ActionButton>
            <ActionButton
              label={shared ? "Copied!" : "Share"}
              accent={blue}
              onClick={handleShare}
              disabled={!item.link}
              isDark={isDark}
            >
              <Share2 className="h-4 w-4" />
            </ActionButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ActionButton({
  children,
  label,
  accent,
  onClick,
  disabled,
  isDark = false,
}: {
  children: React.ReactNode;
  label: string;
  accent: string;
  onClick?: () => void;
  disabled?: boolean;
  isDark?: boolean;
}) {
  const ink = "#111111";
  const yellow = "#ffd900";

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95, y: 1 }}
      whileHover={{ y: -1 }}
      className="grid h-9 w-9 place-items-center rounded-lg border-2 shadow-[4px_4px_0_0_#111] transition-colors"
      style={{
        borderColor: ink,
        backgroundColor: yellow,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = String(accent);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = yellow;
      }}
    >
      <span style={{ color: isDark ? "#111827" : "#111827" }}>{children}</span>
    </motion.button>
  );
}

