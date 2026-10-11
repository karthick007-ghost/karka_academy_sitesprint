"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";

export type Theme = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const COOKIE_NAME = "theme";
const COOKIE_MAX_AGE_DAYS = 365;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name: string, value: string, days = COOKIE_MAX_AGE_DAYS) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateDomTheme(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;

  // Update or insert meta theme-color tag
  let meta = document.querySelector('meta[name="theme-color"]');
  const targetColor = resolved === "dark" ? "#0B0F14" : "#F7F3EC";
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", targetColor);
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  initialResolvedTheme?: ResolvedTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  initialResolvedTheme,
}: ThemeProviderProps) {
  const [, startTransition] = useTransition();
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (initialResolvedTheme) return initialResolvedTheme;
    if (defaultTheme === "dark" || defaultTheme === "light") return defaultTheme;
    return "light";
  });
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount from cookie or attribute
  useEffect(() => {
    setMounted(true);
    const savedCookie = getCookie(COOKIE_NAME) as Theme | null;
    const initial = savedCookie || defaultTheme;
    setThemeState(initial);

    const resolved = initial === "system" ? getSystemTheme() : initial;
    setResolvedTheme(resolved);
    updateDomTheme(resolved);
  }, [defaultTheme]);

  // Listen to system theme changes when in 'system' mode
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const nextResolved: ResolvedTheme = e.matches ? "dark" : "light";
      startTransition(() => {
        setResolvedTheme(nextResolved);
        updateDomTheme(nextResolved);
      });
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setCookie(COOKIE_NAME, newTheme);

    const nextResolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(nextResolved);
    updateDomTheme(nextResolved);
  }, []);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | MouseEvent) => {
      const nextTheme: ResolvedTheme = resolvedTheme === "dark" ? "light" : "dark";

      // Check if user prefers reduced motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Circular View Transition if supported and not reduced motion
      if (
        !prefersReducedMotion &&
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        typeof (document as unknown as { startViewTransition: unknown }).startViewTransition ===
          "function"
      ) {
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        if (event && "clientX" in event && typeof event.clientX === "number") {
          x = event.clientX;
          y = event.clientY;
        }

        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const doc = document as unknown as {
          startViewTransition: (cb: () => void) => { ready: Promise<void> };
        };

        try {
          const transition = doc.startViewTransition(() => {
            setTheme(nextTheme);
          });

          transition.ready
            .then(() => {
              document.documentElement.animate(
                {
                  clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                  ],
                },
                {
                  duration: 400,
                  easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                  pseudoElement: "::view-transition-new(root)",
                }
              );
            })
            .catch(() => {
              setTheme(nextTheme);
            });
          return;
        } catch {
          setTheme(nextTheme);
          return;
        }
      }

      // Fallback crossfade (200ms) for browsers without startViewTransition
      if (!prefersReducedMotion && typeof document !== "undefined") {
        document.documentElement.classList.add("theme-transitioning");
        setTheme(nextTheme);
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
        }, 220);
        return;
      }

      // Instant switch for reduced motion
      setTheme(nextTheme);
    },
    [resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
