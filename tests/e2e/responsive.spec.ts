import { test, expect } from "@playwright/test";

test.describe("Responsive Layout & Mobile Action Bar", () => {
  test("displays fixed mobile action bar on mobile viewport", async ({ page }) => {
    // Mobile Viewport (iPhone 14 / 390px)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // Fixed mobile bar
    const mobileBar = page.locator("aside[aria-label='Quick Actions']");
    await expect(mobileBar).toBeVisible();

    // Verify WhatsApp and Apply button in bottom bar
    await expect(mobileBar.getByRole("link", { name: /WhatsApp/i })).toBeVisible();
    await expect(mobileBar.getByRole("button", { name: /Apply \/ Call/i })).toBeVisible();

    // Mobile Hamburger button
    const menuBtn = page.getByRole("button", { name: /Open menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Drawer should open
    await expect(page.getByRole("dialog", { name: /Mobile Navigation/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Pay After Placement/i })).toBeVisible();

    // Close menu
    await page.getByRole("button", { name: /Close menu/i }).click();
    await expect(page.getByRole("dialog", { name: /Mobile Navigation/i })).not.toBeVisible();
  });

  test("displays desktop navigation bar on wide viewports without mobile action bar", async ({ page }) => {
    // Desktop Viewport (1440px)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Desktop nav visible
    const desktopNav = page.locator("nav[aria-label='Main Navigation']");
    await expect(desktopNav).toBeVisible();

    // Mobile bar should be hidden
    const mobileBar = page.locator("aside[aria-label='Quick Actions']");
    await expect(mobileBar).not.toBeVisible();
  });
});
