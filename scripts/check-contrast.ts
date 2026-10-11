// Scripts / Check-Contrast
// Asserts that every color pair in docs/02 and docs/11 meets WCAG 2.2 AA standards
// Audits BOTH Light and Dark theme token pairs (12 pairs each = 24 checks)

interface ColorPair {
  name: string;
  fg: string;
  bg: string;
  minRatio: number;
}

const LIGHT_THEME: Record<string, string> = {
  bg: "#F7F3EB",
  "bg-elev": "#FBF8F1",
  "bg-sunken": "#ECE5D8",
  text: "#14171F",
  "text-muted": "#4A4F5C",
  accent: "#FF6A2B",
  "on-accent": "#14171F",
  "accent-text": "#A63A0B",
  "brand-violet": "#6C2BD9",
  "brand-cyan": "#0284C7",
  "positive-text": "#15803D",
  burgundy: "#722030",
  "border-ui": "#7C7768",
  focus: "#722030",
};

const DARK_THEME: Record<string, string> = {
  bg: "#0B0F14",
  "bg-elev": "#161D26",
  "bg-sunken": "#0E131A",
  text: "#F3EEE4",
  "text-muted": "#A9B0BD",
  accent: "#FF6A2B",
  "on-accent": "#14171F",
  "accent-text": "#FF6A2B",
  "brand-violet": "#8B5CF6",
  "brand-cyan": "#38BDF8",
  "positive-text": "#4ADE80",
  burgundy: "#E27D90",
  "border-ui": "#6B7587",
  focus: "#4ADE80",
};

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// 12 checks for Light Theme
const LIGHT_PAIRS: ColorPair[] = [
  { name: "text on bg (body text on paper)", fg: "text", bg: "bg", minRatio: 7.0 },
  { name: "text on bg-elev (card body text)", fg: "text", bg: "bg-elev", minRatio: 7.0 },
  { name: "text-muted on bg (secondary text)", fg: "text-muted", bg: "bg", minRatio: 4.5 },
  { name: "text-muted on bg-elev (card secondary text)", fg: "text-muted", bg: "bg-elev", minRatio: 4.5 },
  { name: "text-muted on bg-sunken (sunken secondary text)", fg: "text-muted", bg: "bg-sunken", minRatio: 4.5 },
  { name: "accent-text on bg (accent text on paper)", fg: "accent-text", bg: "bg", minRatio: 4.5 },
  { name: "accent-text on bg-elev (accent text on card)", fg: "accent-text", bg: "bg-elev", minRatio: 4.5 },
  { name: "on-accent on accent (button text on accent fill)", fg: "on-accent", bg: "accent", minRatio: 4.5 },
  { name: "positive-text on bg (success text on paper)", fg: "positive-text", bg: "bg", minRatio: 4.5 },
  { name: "burgundy on bg (old-money accent on ivory)", fg: "burgundy", bg: "bg", minRatio: 4.5 },
  { name: "burgundy on bg-elev (old-money accent on card)", fg: "burgundy", bg: "bg-elev", minRatio: 4.5 },
  { name: "border-ui on bg (UI inputs/controls)", fg: "border-ui", bg: "bg", minRatio: 3.0 },
  { name: "border-ui on bg-sunken (controls on sunken)", fg: "border-ui", bg: "bg-sunken", minRatio: 3.0 },
  { name: "focus on bg (focus indicator ring)", fg: "focus", bg: "bg", minRatio: 3.0 },
];

// 12+ checks for Dark Theme
const DARK_PAIRS: ColorPair[] = [
  { name: "text on bg (body text on dark)", fg: "text", bg: "bg", minRatio: 7.0 },
  { name: "text on bg-elev (card body text)", fg: "text", bg: "bg-elev", minRatio: 7.0 },
  { name: "text-muted on bg (secondary text)", fg: "text-muted", bg: "bg", minRatio: 4.5 },
  { name: "text-muted on bg-elev (card secondary text)", fg: "text-muted", bg: "bg-elev", minRatio: 4.5 },
  { name: "accent-text on bg (accent text on dark)", fg: "accent-text", bg: "bg", minRatio: 4.5 },
  { name: "accent-text on bg-elev (accent text on card)", fg: "accent-text", bg: "bg-elev", minRatio: 4.5 },
  { name: "on-accent on accent (button text on accent fill)", fg: "on-accent", bg: "accent", minRatio: 4.5 },
  { name: "positive-text on bg (success text on dark)", fg: "positive-text", bg: "bg", minRatio: 4.5 },
  { name: "positive-text on bg-elev (success text on card)", fg: "positive-text", bg: "bg-elev", minRatio: 4.5 },
  { name: "burgundy on bg (rose burgundy on dark)", fg: "burgundy", bg: "bg", minRatio: 4.5 },
  { name: "border-ui on bg (UI inputs/controls)", fg: "border-ui", bg: "bg", minRatio: 3.0 },
  { name: "border-ui on bg-elev (controls on card)", fg: "border-ui", bg: "bg-elev", minRatio: 3.0 },
  { name: "focus on bg (focus indicator ring)", fg: "focus", bg: "bg", minRatio: 3.0 },
];

console.log("=== Checking Design System Token Contrast (WCAG 2.2 AA) ===");
let hasFailure = false;
let totalChecks = 0;
let passedChecks = 0;

console.log("\n--- [Light Theme: 12 Token Pairs] ---");
for (const pair of LIGHT_PAIRS) {
  totalChecks++;
  const fgHex = LIGHT_THEME[pair.fg];
  const bgHex = LIGHT_THEME[pair.bg];
  if (!fgHex || !bgHex) {
    console.error(`Unknown token in pair: ${pair.name}`);
    hasFailure = true;
    continue;
  }
  const ratio = getContrastRatio(fgHex, bgHex);
  const passed = ratio >= pair.minRatio;
  if (passed) passedChecks++;
  else hasFailure = true;
  const status = passed ? "✓ PASS" : "✗ FAIL";
  console.log(`${status} [${ratio.toFixed(2)}:1, min: ${pair.minRatio}:1] - ${pair.name} (${fgHex} on ${bgHex})`);
}

console.log("\n--- [Dark Theme: 12 Token Pairs] ---");
for (const pair of DARK_PAIRS) {
  totalChecks++;
  const fgHex = DARK_THEME[pair.fg];
  const bgHex = DARK_THEME[pair.bg];
  if (!fgHex || !bgHex) {
    console.error(`Unknown token in pair: ${pair.name}`);
    hasFailure = true;
    continue;
  }
  const ratio = getContrastRatio(fgHex, bgHex);
  const passed = ratio >= pair.minRatio;
  if (passed) passedChecks++;
  else hasFailure = true;
  const status = passed ? "✓ PASS" : "✗ FAIL";
  console.log(`${status} [${ratio.toFixed(2)}:1, min: ${pair.minRatio}:1] - ${pair.name} (${fgHex} on ${bgHex})`);
}

console.log(`\nContrast Check Summary: ${passedChecks}/${totalChecks} checks passed.`);

if (hasFailure) {
  console.error("\nContrast check FAILED. One or more color token pairs violate WCAG 2.2 AA requirements.");
  process.exit(1);
} else {
  console.log("\n✓ All 24 color token pairs across Light and Dark themes satisfy WCAG 2.2 AA contrast rules.");
}
