import { test, expect } from "@playwright/test";

test.describe("Lead Capture & Contact Flow", () => {
  test("validates required inputs and submits lead form successfully", async ({ page }) => {
    await page.goto("/contact");

    // Locate the contact lead form
    const formHeading = page.getByRole("heading", { name: /Send an Admissions Message/i });
    await formHeading.scrollIntoViewIfNeeded();

    const nameInput = page.locator("#lead-name");
    const phoneInput = page.locator("#lead-phone");
    const submitBtn = page.getByRole("button", { name: /Book Free Career Counselling/i });

    // 1. Submit empty -> should show error
    await submitBtn.click();
    await expect(page.getByText(/Please enter your full name/i)).toBeVisible();

    // 2. Fill valid details
    await nameInput.fill("Anand Kumar");
    await phoneInput.fill("9876543210");
    await submitBtn.click();

    // 3. Verify success feedback
    await expect(page.getByRole("heading", { name: /Application Received!/i })).toBeVisible();
    await expect(page.getByText(/Our admissions mentor in Nagercoil will connect with you/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Chat with Mentor on WhatsApp/i })).toBeVisible();
  });
});
