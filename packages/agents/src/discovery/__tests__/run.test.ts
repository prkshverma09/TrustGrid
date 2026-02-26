import { describe, it, expect } from "vitest";
import { runDiscovery } from "../run";
import type { Finding } from "../types";

describe("runDiscovery", () => {
  it("returns findings empty when fetcher returns empty", async () => {
    const mockFetcher = async (): Promise<Finding[]> => [];
    const result = await runDiscovery({}, mockFetcher);
    expect(result.findings).toEqual([]);
  });

  it("returns one finding when fetcher returns one CVE", async () => {
    const mockFinding: Finding = {
      id: "CVE-2024-1234",
      source: "NVD",
      severity: "high",
      title: "Test vulnerability",
    };
    const mockFetcher = async (): Promise<Finding[]> => [mockFinding];
    const result = await runDiscovery({}, mockFetcher);
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0]).toEqual(mockFinding);
    expect(result.findings[0].id).toBe("CVE-2024-1234");
    expect(result.findings[0].source).toBe("NVD");
    expect(result.findings[0].severity).toBe("high");
  });
});
