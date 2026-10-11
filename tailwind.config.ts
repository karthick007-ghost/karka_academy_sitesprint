import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Tokens (Direct CSS variable bindings)
        bg: "var(--bg)",
        "bg-base": "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        "bg-sunken": "var(--bg-sunken)",
        text: "var(--text)",
        "text-primary": "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "on-accent": "var(--on-accent)",
        "accent-text": "var(--accent-text)",
        "positive-text": "var(--positive-text)",
        burgundy: "var(--burgundy)",
        "burgundy-subtle": "var(--burgundy-subtle)",
        "brand-violet": "var(--brand-violet)",
        "brand-cyan": "var(--brand-cyan)",
        border: "var(--border-soft)",
        "border-border-soft": "var(--border-soft)",
        "border-ui": "var(--border-ui)",
        "border-soft": "var(--border-soft)",
        "focus-ring": "var(--focus)",

        // Ergonomic short aliases
        elev: "var(--bg-elev)",
        sunken: "var(--bg-sunken)",
        primary: "var(--text)",
        muted: "var(--text-muted)",
        ui: "var(--border-ui)",
        soft: "var(--border-soft)",

        // Legacy tokens (backward compatibility)
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        saffron: "var(--saffron)",
        "saffron-ink": "var(--saffron-ink)",
        forest: "var(--forest)",
        gold: "var(--gold)",
        "gold-ink": "var(--gold-ink)",
        night: "var(--night)",
        "night-1": "var(--night-1)",
        "night-2": "var(--night-2)",
        "night-3": "var(--night-3)",
        "night-text": "var(--night-text)",
        "night-muted": "var(--night-muted)",
        mint: "var(--mint)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-instrument)", "sans-serif"],
        tamil: ["var(--font-noto-tamil)", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "28px",
        pill: "999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(20,23,31,0.06), 0 12px 32px -12px rgba(20,23,31,0.18)",
        glass: "0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
