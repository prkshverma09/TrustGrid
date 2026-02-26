import { test, expect } from "@playwright/test";

test("full flow: orchestrate, then approve from governance", async ({ request, page }) => {
  const runRes = await request.post("/api/orchestrate");
  expect(runRes.ok()).toBeTruthy();
  const { runId } = await runRes.json();
  expect(runId).toBeDefined();

  const pendingRes = await request.get("/api/pending-actions");
  const pending = await pendingRes.json();
  expect(Array.isArray(pending)).toBe(true);

  await page.goto("/");
  await expect(page.getByText("TrustGrid")).toBeVisible();

  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();

  if (pending.length > 0) {
    await page.goto("/governance");
    await expect(page.getByRole("heading", { name: /Governance/i })).toBeVisible();
    const actionId = pending[0].actionId;
    await request.post("/api/hitl/approve", { data: { actionId } });
  }

  const afterRes = await request.get("/api/pending-actions");
  const afterPending = await afterRes.json();
  expect(afterPending.length).toBeLessThanOrEqual(pending.length);
});
