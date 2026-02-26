import { describe, it, expect } from "vitest";
import { runRemediation } from "../run";
import type { ComplianceAuditResult } from "../../compliance/types";

describe("runRemediation", () => {
  const assessment: ComplianceAuditResult = {
    assessments: [{ framework: "EU_AI_ACT", violated: true, summary: "Test" }],
    reportSummary: "Vulnerability found",
  };

  it("allows auto action for Tier-3", () => {
    const result = runRemediation(assessment, { vendorTier: 3 });
    expect(result.recommendedAction).toBeDefined();
    expect(result.allowedWithoutHitl).toBe(true);
  });

  it("blocks action and requires HITL for Tier-1", () => {
    const result = runRemediation(assessment, { vendorTier: 1 });
    expect(result.recommendedAction).toBeDefined();
    expect(result.allowedWithoutHitl).toBe(false);
    expect(result.requiresHitl).toBe(true);
  });
});
