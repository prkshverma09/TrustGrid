import { test, expect } from "@playwright/test";

test("Tier-1 block and HITL approval flow", async ({ request, page }) => {
  await request.post("/api/orchestrate");
  let pendingRes = await request.get("/api/pending-actions");
  let pending = await pendingRes.json();
  expect(pending.length).toBeGreaterThanOrEqual(1);

  await page.goto("/governance");
  await expect(page.getByRole("heading", { name: /Governance/i })).toBeVisible();

  const actionId = pending[0].actionId;
  const approveRes = await request.post("/api/hitl/approve", {
    data: { actionId },
  });
  expect(approveRes.ok()).toBeTruthy();

  pendingRes = await request.get("/api/pending-actions");
  pending = await pendingRes.json();
  expect(pending.find((a: { actionId: string }) => a.actionId === actionId)).toBeUndefined();
});
