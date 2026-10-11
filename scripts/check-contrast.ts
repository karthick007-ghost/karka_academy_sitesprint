// Scripts / Check-Contrast
// Asserts that every color pair in docs/02 meets WCAG 2.2 AA standards

interface ColorPair {
  name: string;
  fg: string;
  bg: string;
  minRatio: number;
}

const HEX_COLORS: Record<string, string> = {
  paper: "#F7F3EC",
  "paper-2": "#EFE8DB",
  ink: "#14171F",
  "ink-2": "#4A4F5C",
  "ink-3": "#6B6F7B",
  saffron: "#FF6A2B",
  "saffron-ink": "#A63A0B",
  forest: "#0F3D2E",
  gold: "#B8964E",
  "gold-ink": "#7A5F24",
  night: "#0B0F14",
  "night-2": "#121821",
  "night-text": "#F3EEE4",
  "night-muted": "#A9B0BD",
  mint: "#7BE0AD",
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

const REQUIRED_PAIRS: ColorPair[] = [
  { name: "ink on paper (body text)", fg: "ink", bg: "paper", minRatio: 7.0 },
  { name: "ink-2 on paper (secondary text)", fg: "ink-2", bg: "paper", minRatio: 4.5 },
  { name: "ink-3 on paper (captions >= 14px)", fg: "ink-3", bg: "paper", minRatio: 4.5 },
  { name: "ink-2 on paper-2", fg: "ink-2", bg: "paper-2", minRatio: 4.5 },
  { name: "saffron-ink on paper (accent text)", fg: "saffron-ink", bg: "paper", minRatio: 4.5 },
  { name: "ink on saffron (primary button text)", fg: "ink", bg: "saffron", minRatio: 4.5 },
  { name: "forest on paper", fg: "forest", bg: "paper", minRatio: 7.0 },
  { name: "gold-ink on paper", fg: "gold-ink", bg: "paper", minRatio: 4.5 },
  { name: "night-text on night", fg: "night-text", bg: "night", minRatio: 7.0 },
  { name: "night-muted on night", fg: "night-muted", bg: "night", minRatio: 4.5 },
  { name: "saffron on night (accent text on dark)", fg: "saffron", bg: "night", minRatio: 4.5 },
  { name: "mint on night", fg: "mint", bg: "night", minRatio: 4.5 },
];

console.log("=== Checking Design System Token Contrast (WCAG 2.2 AA) ===");
let hasFailure = false;

for (const pair of REQUIRED_PAIRS) {
  const fgHex = HEX_COLORS[pair.fg];
  const bgHex = HEX_COLORS[pair.bg];
  if (!fgHex || !bgHex) {
    console.error(`Unknown token in pair: ${pair.name}`);
    hasFailure = true;
    continue;
  }
  const ratio = getContrastRatio(fgHex, bgHex);
  const passed = ratio >= pair.minRatio;
  const status = passed ? "✓ PASS" : "✗ FAIL";
  console.log(`${status} [${ratio.toFixed(2)}:1, min: ${pair.minRatio}:1] - ${pair.name} (${fgHex} on ${bgHex})`);
  if (!passed) hasFailure = true;
}

if (hasFailure) {
  console.error("\nContrast check FAILED. One or more color token pairs violate WCAG 2.2 AA requirements.");
  process.exit(1);
} else {
  console.log("\nAll color token pairs satisfy WCAG 2.2 AA contrast rules.");
}
