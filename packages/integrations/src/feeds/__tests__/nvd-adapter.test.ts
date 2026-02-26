import { describe, it, expect } from "vitest";
import { createNvdAdapter } from "../nvd-adapter";

describe("NVD adapter", () => {
  it("returns Finding[] with id, severity, source when MCP returns NVD-like response", async () => {
    const mockFetch = async () => ({
      vulnerabilities: [
        {
          cve: {
            id: "CVE-2024-1000",
            metrics: { cvssMetricV31: [{ cvssData: { baseSeverity: "HIGH" } }] },
          },
        },
      ],
    });
    const adapter = createNvdAdapter(mockFetch);
    const findings = await adapter.fetchFindings();
    expect(findings).toHaveLength(1);
    expect(findings[0].id).toBe("CVE-2024-1000");
    expect(findings[0].severity).toBe("high");
    expect(findings[0].source).toBe("NVD");
  });
});
