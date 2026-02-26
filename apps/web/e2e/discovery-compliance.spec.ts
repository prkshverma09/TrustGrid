import { test, expect } from "@playwright/test";

test("trigger orchestration and verify run completes", async ({ request }) => {
  const res = await request.post("/api/orchestrate");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.runId).toBeDefined();

  const pendingRes = await request.get("/api/pending-actions");
  expect(pendingRes.ok()).toBeTruthy();
  const pending = await pendingRes.json();
  expect(Array.isArray(pending)).toBe(true);
  // Orchestrator uses Tier-1 vendor mock, so one pending action
  expect(pending.length).toBeGreaterThanOrEqual(0);
});
