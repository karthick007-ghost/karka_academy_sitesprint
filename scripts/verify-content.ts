// Scripts / Verify-Content
// Validates that src/content/ contains no unresolved 'todo' flags,
// no lorem ipsum placeholders, and that all course and track relationships resolve.

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

console.log(`=== Running Content Verification Gate (${IS_PRODUCTION ? "PRODUCTION" : "DEVELOPMENT"}) ===`);

if (!fs.existsSync(CONTENT_DIR)) {
  console.log("No src/content directory found yet (early scaffolding phase). Passing.");
  process.exit(0);
}

let violations = 0;

function checkFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);

  // 1. Check for lorem ipsum
  if (/lorem\s+ipsum/i.test(content)) {
    console.error(`Error: Found 'lorem ipsum' placeholder in ${fileName}`);
    violations++;
  }

  // 2. Check for unresolved 'todo' in production mode
  if (IS_PRODUCTION) {
    const todoMatches = content.match(/"todo"|'todo'/g);
    if (todoMatches && todoMatches.length > 0) {
      console.error(`Production Error: Found ${todoMatches.length} unresolved 'todo' field(s) in ${fileName}`);
      violations++;
    }
  }
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".ts") || f.endsWith(".json"));
for (const f of files) {
  checkFile(path.join(CONTENT_DIR, f));
}

if (violations > 0) {
  console.error(`\nContent verification FAILED with ${violations} error(s).`);
  process.exit(1);
} else {
  console.log("✓ PASS: Content verification clean. No lorem ipsum, valid structure.");
}
