import { describe, it, expect } from "vitest";
import { createProcurementAdapter } from "../procurement-adapter";

describe("Procurement adapter", () => {
  it("returns vendor profile with tier and regulations when MCP returns mock response", async () => {
    const mockFetch = async () => ({
      vendorId: "v1",
      tier: 2,
      statedPosture: ["ISO_42001", "SOC2"],
    });
    const adapter = createProcurementAdapter(mockFetch);
    const profile = await adapter.getVendorProfile("v1");
    expect(profile.vendorId).toBe("v1");
    expect(profile.tier).toBe(2);
    expect(profile.statedPosture).toEqual(["ISO_42001", "SOC2"]);
  });
});
