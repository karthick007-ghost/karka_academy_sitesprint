import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Pay After Placement", path: "/pay-after-placement" },
  { name: "Internships", path: "/internships" },
  { name: "Placements", path: "/placements" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "For College Students", path: "/for/college" },
  { name: "For Recent Graduates", path: "/for/graduates" },
  { name: "For Career Switchers", path: "/for/switchers" },
];

test.describe("WCAG 2.2 AA Accessibility Audit", () => {
  for (const route of routes) {
    test(`verifies ${route.name} route (${route.path}) has zero critical/serious a11y violations`, async ({
      page,
    }) => {
      test.setTimeout(60000);
      await page.emulateMedia({ colorScheme: "light" });
      await page.context().addCookies([
        { name: "theme", value: "light", domain: "localhost", path: "/" },
      ]);
      await page.goto(route.path);
      // Wait for content and hydration
      await page.waitForLoadState("networkidle");

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude("canvas")
        .analyze();

      // Filter out non-critical or harmless third-party iframe notices if any
      const severeViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      expect(severeViolations).toEqual([]);
    });
  }
});
