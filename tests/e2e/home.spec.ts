import { test, expect } from "@playwright/test";

test.describe("Home Page User Journeys", () => {
  test("loads home page with brand elements, Tamil hook, and navigation", async ({ page }) => {
    await page.goto("/");

    // Title verification
    await expect(page).toHaveTitle(/Karka AI & Tech Academy/);

    // Header & Brand
    const brand = page.locator("header");
    await expect(brand).toBeVisible();
    await expect(page.getByText("KARKA AI")).toBeVisible();
    await expect(page.getByText("கற்க").first()).toBeVisible();

    // Proof bar metrics
    await expect(page.getByText("₹0", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Amazon").first()).toBeVisible();
    await expect(page.getByText("Tata Consultancy Services").first()).toBeVisible();

    // Verify PAP section
    const papHeading = page.getByRole("heading", { name: /Learn First\. Pay When Hired\./i });
    await expect(papHeading).toBeVisible();
  });

  test("interacts with Track Finder Quiz to receive personalized recommendation", async ({ page }) => {
    await page.goto("/");

    // Scroll to Track Finder Quiz
    const quizHeading = page.getByText("Where are you currently at in your journey?");
    await quizHeading.scrollIntoViewIfNeeded();
    await expect(quizHeading).toBeVisible();

    // Step 1: Click Recent Graduate
    await page.getByRole("button", { name: /Recent Graduate/i }).click();

    // Step 2: Click Building Web & Mobile Apps
    await page.getByRole("button", { name: /Building Web & Mobile Apps/i }).click();

    // Step 3: Click Total Beginner
    await page.getByRole("button", { name: /Total Beginner/i }).click();

    // Step 4: Click Land My First Tech Job
    await page.getByRole("button", { name: /Land My First Tech Job/i }).click();

    // Verify Result Card
    await expect(page.getByText("Recommended For You")).toBeVisible();
    await expect(page.getByText("Full-Stack Development (PAP Eligible)")).toBeVisible();
    await expect(page.getByRole("button", { name: /Apply for this Track/i })).toBeVisible();
  });

  test("expands FAQ accordion on click", async ({ page }) => {
    await page.goto("/");

    const faqQuestion = page.getByRole("button", { name: /What is the Pay After Placement \(PAP\) model\?/i });
    await faqQuestion.scrollIntoViewIfNeeded();
    await expect(faqQuestion).toBeVisible();

    // Click to toggle
    await faqQuestion.click();

    // Verify answer content
    await expect(page.getByText(/Under our Pay After Placement agreement, you begin learning with ₹0 upfront/i)).toBeVisible();
  });
});
