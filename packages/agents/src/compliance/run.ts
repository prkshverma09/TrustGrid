import type { Finding } from "../discovery/types";
import type {
  VendorProfile,
  RegulatoryContext,
  ComplianceAssessment,
  ComplianceAuditResult,
} from "./types";

export function runComplianceAudit(
  finding: Finding,
  vendorProfile: VendorProfile,
  regulations: RegulatoryContext
): ComplianceAuditResult {
  const assessments: ComplianceAssessment[] = regulations.frameworks.map(
    (framework) => ({
      framework,
      violated: finding.severity === "high" || finding.severity === "critical",
      summary: `Vendor ${vendorProfile.vendorId} finding ${finding.id} (${finding.severity}) assessed against ${framework}.`,
    })
  );
  const reportSummary = `Compliance audit for finding ${finding.id}: ${assessments.filter((a) => a.violated).length} framework(s) violated.`;
  return { assessments, reportSummary };
}
