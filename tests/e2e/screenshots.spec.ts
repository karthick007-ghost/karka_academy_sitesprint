import { test } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Submission Screenshot Capture", () => {
  test("captures desktop, tablet, and mobile screenshots for competition submission", async ({ page }) => {
    const outDir = path.resolve(process.cwd(), "docs/screenshots");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // 1. Desktop 1440px Home
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(outDir, "desktop-home-1440px.png"), fullPage: false });

    // 2. Mobile 390px Home
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(outDir, "mobile-home-390px.png"), fullPage: false });

    // 3. Tablet 768px Home
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(outDir, "tablet-home-768px.png"), fullPage: false });

    // 4. Desktop Courses Page
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/courses");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(outDir, "desktop-courses-1440px.png"), fullPage: false });

    // 5. Desktop Pay After Placement Page
    await page.goto("/pay-after-placement");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(outDir, "desktop-pap-1440px.png"), fullPage: false });
  });
});
