import { describe, it, expect } from "vitest";
import { createIamAdapter } from "../iam-adapter";

describe("IAM adapter", () => {
  it("returns blocked: true for Tier-1 without HITL approval", async () => {
    const adapter = createIamAdapter();
    const result = await adapter.severConnection("v1", { tier: 1, hitlApproved: false });
    expect(result.blocked).toBe(true);
    expect(result.success).toBe(false);
  });

  it("returns success: true for Tier-1 with HITL approval", async () => {
    const adapter = createIamAdapter();
    const result = await adapter.severConnection("v1", { tier: 1, hitlApproved: true });
    expect(result.success).toBe(true);
    expect(result.blocked).toBe(false);
  });
});
