import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        "night-2": "var(--night-2)",
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
