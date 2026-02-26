import { test, expect } from "@playwright/test";

test("placeholder e2e", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toContainText("TrustGrid");
});
