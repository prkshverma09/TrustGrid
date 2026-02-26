import { describe, it, expect } from "vitest";
import { runComplianceAudit } from "../run";
import type { Finding } from "../../discovery/types";
import type { VendorProfile, RegulatoryContext } from "../types";

describe("runComplianceAudit", () => {
  const finding: Finding = {
    id: "CVE-2024-1234",
    source: "NVD",
    severity: "high",
    title: "Data processing vulnerability",
  };

  const vendorProfile: VendorProfile = {
    vendorId: "v1",
    tier: 2,
    statedPosture: ["ISO_42001"],
  };

  const regulations: RegulatoryContext = {
    frameworks: ["EU_AI_ACT", "ISO_42001"],
  };

  it("returns assessments and reportSummary", () => {
    const result = runComplianceAudit(finding, vendorProfile, regulations);
    expect(result.assessments).toBeDefined();
    expect(Array.isArray(result.assessments)).toBe(true);
    expect(result.reportSummary).toBeDefined();
    expect(typeof result.reportSummary).toBe("string");
  });

  it("includes framework identifiers in assessments", () => {
    const result = runComplianceAudit(finding, vendorProfile, regulations);
    expect(result.assessments.length).toBeGreaterThan(0);
    expect(result.assessments.some((a) => a.framework === "EU_AI_ACT" || a.framework === "ISO_42001")).toBe(true);
  });
});
