import { describe, it, expect, vi } from "vitest";
import { createOrchestrator } from "../service";
import type { Finding } from "../../../agents/src/discovery/types";

describe("orchestrator", () => {
  it("creates pending action for Tier-1 and does not call IAM", async () => {
    const mockIam = { severConnection: vi.fn() };
    const pending: Array<{ vendorId: string; tier: number }> = [];
    const orchestrator = createOrchestrator({
      discoveryFetcher: async () => [
        { id: "CVE-1", source: "NVD", severity: "high" } as Finding,
      ],
      getVendorProfile: async () => ({ vendorId: "v1", tier: 1, statedPosture: [] }),
      policyEvaluator: () => ({ allowed: false, requiresHitl: true }),
      iamAdapter: mockIam as any,
      addPendingAction: (a) => pending.push(a),
    });
    await orchestrator.run();
    expect(pending).toHaveLength(1);
    expect(pending[0].tier).toBe(1);
    expect(mockIam.severConnection).not.toHaveBeenCalled();
  });

  it("calls IAM for Tier-3", async () => {
    const mockIam = { severConnection: vi.fn().mockResolvedValue({ success: true }) };
    const orchestrator = createOrchestrator({
      discoveryFetcher: async () => [
        { id: "CVE-2", source: "NVD", severity: "medium" } as Finding,
      ],
      getVendorProfile: async () => ({ vendorId: "v2", tier: 3, statedPosture: [] }),
      policyEvaluator: () => ({ allowed: true, requiresHitl: false }),
      iamAdapter: mockIam as any,
      addPendingAction: () => {},
    });
    await orchestrator.run();
    expect(mockIam.severConnection).toHaveBeenCalled();
  });
});
