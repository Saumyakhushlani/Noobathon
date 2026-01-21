import { create } from "zustand";
import { THEME_STORAGE_KEY } from "@/store/theme-constants";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
};

function safeReadStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "dark" || v === "light") return v;
    return null;
  } catch {
    return null;
  }
}

function applyThemeClass(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  setTheme: (t) => {
    set({ theme: t });
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, t);
      } catch {
        // ignore
      }
    }
    applyThemeClass(t);
  },
  toggleTheme: () => {
    const next: ThemeMode = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));

// Call once on client to sync from storage and ensure <html> class is set.
export function initThemeFromStorage() {
  const stored = safeReadStoredTheme();
  const theme = stored ?? "light";
  useThemeStore.setState({ theme });
  applyThemeClass(theme);
}

