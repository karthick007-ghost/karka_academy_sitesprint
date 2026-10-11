import { test } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("UI Upgrade Baseline Screenshots", () => {
  const routes = [
    { name: "home", path: "/" },
    { name: "courses", path: "/courses" },
    { name: "course-detail", path: "/courses/mern-fullstack" },
    { name: "pap", path: "/pay-after-placement" },
    { name: "placements", path: "/placements" },
    { name: "internships", path: "/internships" },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
  ];

  const viewports = [
    { name: "mobile-360", width: 360, height: 740 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1440", width: 1440, height: 900 },
  ];

  test("captures baseline snapshots of all MVP routes across 360, 768, and 1440px", async ({ page }) => {
    test.setTimeout(120000);
    const outDir = path.resolve(process.cwd(), "docs/screenshots/baseline");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    for (const r of routes) {
      for (const vp of viewports) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(r.path, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(400);
        const filename = `${r.name}-${vp.name}.png`;
        await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
      }
    }
  });
});
