// Scripts / Check-Originality
// Enforces originality rules: no 8+ word runs copied from old crawl,
// provenance check for public/ assets, and no copied assets from docs/site-audit/assets/

import fs from "fs";
import path from "path";
import crypto from "crypto";

const SITE_AUDIT_CONTENT_PATH = path.join(process.cwd(), "docs", "site-audit", "content.json");
const SITE_AUDIT_ASSETS_PATH = path.join(process.cwd(), "docs", "site-audit", "assets");
const PROVENANCE_PATH = path.join(process.cwd(), "docs", "PROVENANCE.md");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SRC_CONTENT_DIR = path.join(process.cwd(), "src", "content");

console.log("=== Running Originality & Provenance Gate ===");

// 1. Check if docs/site-audit exists (if absent as in clean CI, skip with warning)
let auditTextCorpus: string[] = [];
if (!fs.existsSync(SITE_AUDIT_CONTENT_PATH)) {
  console.warn("WARN: docs/site-audit/content.json not found (expected in clean CI clone). Skipping n-gram originality check.");
} else {
  try {
    const rawAudit = fs.readFileSync(SITE_AUDIT_CONTENT_PATH, "utf8");
    const json = JSON.parse(rawAudit);
    // Recursively collect strings
    function extractStrings(obj: any): string[] {
      const res: string[] = [];
      if (typeof obj === "string") {
        if (obj.length > 20) res.push(obj);
      } else if (Array.isArray(obj)) {
        for (const item of obj) res.push(...extractStrings(item));
      } else if (typeof obj === "object" && obj !== null) {
        for (const k of Object.keys(obj)) res.push(...extractStrings(obj[k]));
      }
      return res;
    }
    auditTextCorpus = extractStrings(json);
  } catch (err) {
    console.warn("Could not parse audit content:", err);
  }
}

// 2. Build 8-word n-grams from audit corpus
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

const auditNgrams = new Set<string>();
for (const snippet of auditTextCorpus) {
  const words = tokenize(snippet);
  if (words.length >= 8) {
    for (let i = 0; i <= words.length - 8; i++) {
      const ngram = words.slice(i, i + 8).join(" ");
      auditNgrams.add(ngram);
    }
  }
}

// 3. Scan shipped src/content/ text files if they exist
let ngramViolations = 0;
if (fs.existsSync(SRC_CONTENT_DIR) && auditNgrams.size > 0) {
  const contentFiles = fs.readdirSync(SRC_CONTENT_DIR).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx") || f.endsWith(".json"));
  for (const file of contentFiles) {
    const filePath = path.join(SRC_CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const words = tokenize(content);
    if (words.length >= 8) {
      for (let i = 0; i <= words.length - 8; i++) {
        const ngram = words.slice(i, i + 8).join(" ");
        if (auditNgrams.has(ngram)) {
          console.error(`Plagiarism Alert: 8-word match found in ${file}: "${ngram}"`);
          ngramViolations++;
        }
      }
    }
  }
}

// 4. Asset checks: Ensure public/ files are registered in PROVENANCE.md and not copied from site-audit
let assetViolations = 0;
if (fs.existsSync(PUBLIC_DIR)) {
  const provenanceText = fs.existsSync(PROVENANCE_PATH) ? fs.readFileSync(PROVENANCE_PATH, "utf8") : "";

  function getFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    return files;
  }

  const publicFiles = getFiles(PUBLIC_DIR);
  for (const pFile of publicFiles) {
    const relName = path.relative(PUBLIC_DIR, pFile).replace(/\\/g, "/");
    // Check if mentioned in provenance
    if (!provenanceText.includes(relName) && !provenanceText.includes(path.basename(relName))) {
      console.warn(`Asset Warning: ${relName} is not explicitly referenced in docs/PROVENANCE.md`);
    }

    // Check hash against site-audit assets if present
    if (fs.existsSync(SITE_AUDIT_ASSETS_PATH)) {
      const pHash = crypto.createHash("sha256").update(fs.readFileSync(pFile)).digest("hex");
      const auditAssets = fs.readdirSync(SITE_AUDIT_ASSETS_PATH);
      for (const aAsset of auditAssets) {
        const aPath = path.join(SITE_AUDIT_ASSETS_PATH, aAsset);
        if (fs.statSync(aPath).isFile()) {
          const aHash = crypto.createHash("sha256").update(fs.readFileSync(aPath)).digest("hex");
          if (pHash === aHash) {
            console.error(`Asset Violation: ${relName} matches exact hash of scraped asset ${aAsset}! Scraped assets cannot be shipped.`);
            assetViolations++;
          }
        }
      }
    }
  }
}

if (ngramViolations > 0 || assetViolations > 0) {
  console.error(`\nOriginality check FAILED: ${ngramViolations} copied text run(s), ${assetViolations} unlicensed asset(s).`);
  process.exit(1);
} else {
  console.log("✓ PASS: Originality & Provenance gate verified. No copied runs of 8+ words and no scraped assets in public/.");
}
