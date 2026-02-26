import { describe, it, expect, vi } from "vitest";
import { createHitlGate } from "../gate";

describe("HITL gate", () => {
  it("calls IAM adapter when executed with valid approval", async () => {
    const mockIam = {
      severConnection: vi.fn().mockResolvedValue({ success: true }),
    };
    const gate = createHitlGate(mockIam as any, () => true);
    await gate.executePendingAction(
      { actionId: "a1", vendorId: "v1", tier: 1 },
      { approved: true }
    );
    expect(mockIam.severConnection).toHaveBeenCalledWith("v1", expect.any(Object));
  });

  it("does not call IAM adapter for Tier-1 without approval", async () => {
    const mockIam = { severConnection: vi.fn() };
    const gate = createHitlGate(mockIam as any, () => false);
    await expect(
      gate.executePendingAction(
        { actionId: "a1", vendorId: "v1", tier: 1 },
        { approved: false }
      )
    ).rejects.toThrow();
    expect(mockIam.severConnection).not.toHaveBeenCalled();
  });
});
