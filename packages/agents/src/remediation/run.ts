import type { ComplianceAuditResult } from "../compliance/types";
import type { RemediationPolicy, RemediationResult } from "./types";

export function runRemediation(
  assessment: ComplianceAuditResult,
  policy: RemediationPolicy
): RemediationResult {
  const hasViolation = assessment.assessments.some((a) => a.violated);
  const recommendedAction = hasViolation ? "sever" : "quarantine";
  const requiresHitl = policy.vendorTier === 1;
  const allowedWithoutHitl = policy.vendorTier >= 3;
  return {
    recommendedAction,
    allowedWithoutHitl: requiresHitl ? false : allowedWithoutHitl,
    requiresHitl,
  };
}
