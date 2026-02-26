import type { Finding } from "../discovery/types";

export interface VendorProfile {
  vendorId: string;
  tier: number;
  statedPosture: string[];
}

export interface RegulatoryContext {
  frameworks: string[];
}

export interface ComplianceAssessment {
  framework: string;
  violated: boolean;
  summary: string;
}

export interface ComplianceAuditResult {
  assessments: ComplianceAssessment[];
  reportSummary: string;
}
