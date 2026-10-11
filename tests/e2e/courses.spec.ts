import { test, expect } from "@playwright/test";

test.describe("Courses Directory & Detail Journey", () => {
  test("browses course catalog, filters by search, and navigates to detail", async ({ page }) => {
    await page.goto("/courses");

    // Heading
    await expect(page.getByRole("heading", { name: /All 37 Career Programs/i })).toBeVisible();

    // Verify initial course cards
    await expect(page.getByText("Showing 37 of 37 courses")).toBeVisible();

    // Search filter
    const searchInput = page.getByPlaceholder(/Search by skill, topic, or technology/i);
    await searchInput.fill("React");

    // Results should narrow down
    await expect(page.getByText("MERN Full Stack")).toBeVisible();

    // Click on MERN Full Stack
    await page.getByRole("link", { name: /View Curriculum & Projects/i }).first().click();

    // Should navigate to /courses/mern-fullstack
    await expect(page).toHaveURL(/\/courses\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Verify syllabus accordion exists
    await expect(page.getByText("Curriculum & Syllabus Modules")).toBeVisible();

    // Verify Agile Tribers client deliverables mention
    await expect(page.getByText("Real Commercial Project Portfolio")).toBeVisible();

    // Verify quick facts sidebar
    await expect(page.getByText("Tuition Fee Structure")).toBeVisible();
  });
});
