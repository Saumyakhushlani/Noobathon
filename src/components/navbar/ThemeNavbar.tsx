"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { initThemeFromStorage, useThemeStore } from "@/store/theme";

export default function ThemeNavbar() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  React.useEffect(() => {
    initThemeFromStorage();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            Noobathon
          </Link>
          <nav className="hidden md:flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-white/80">
            <Link className="hover:underline underline-offset-4" href="/news">
              News
            </Link>
            <Link className="hover:underline underline-offset-4" href="/roadmap">
              Roadmap
            </Link>
            <Link className="hover:underline underline-offset-4" href="/awareness">
              Awareness
            </Link>
            <Link className="hover:underline underline-offset-4" href="/blog">
              Blog
            </Link>
          </nav>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark" ? (
            <>
              <Moon className="h-4 w-4" />
              Dark
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              Light
            </>
          )}
        </button>
      </div>
    </header>
  );
}

