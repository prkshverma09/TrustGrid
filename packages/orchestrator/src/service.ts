import { runComplianceAudit } from "../../agents/src/compliance/run";
import { runRemediation } from "../../agents/src/remediation/run";
import type { Finding } from "../../agents/src/discovery/types";
import type { VendorProfile } from "../../agents/src/compliance/types";

export interface OrchestratorDeps {
  discoveryFetcher: () => Promise<Finding[]>;
  getVendorProfile: (vendorId: string) => Promise<VendorProfile>;
  policyEvaluator: (input: { vendorTier: number; action: string }) => { allowed: boolean; requiresHitl: boolean };
  iamAdapter: { severConnection: (vendorId: string, opts: { tier: number; hitlApproved: boolean }) => Promise<{ success: boolean }> };
  addPendingAction: (action: { vendorId: string; tier: number }) => void;
}

export interface Orchestrator {
  run(): Promise<{ runId: string }>;
}

export function createOrchestrator(deps: OrchestratorDeps): Orchestrator {
  return {
    async run(): Promise<{ runId: string }> {
      const findings = await deps.discoveryFetcher();
      for (const finding of findings) {
        const vendorId = "v1";
        const profile = await deps.getVendorProfile(vendorId);
        const audit = runComplianceAudit(finding, profile, { frameworks: ["EU_AI_ACT"] });
        const policy = deps.policyEvaluator({ vendorTier: profile.tier, action: "sever" });
        const remediation = runRemediation(audit, { vendorTier: profile.tier });
        if (remediation.requiresHitl || !remediation.allowedWithoutHitl) {
          deps.addPendingAction({ vendorId, tier: profile.tier });
        } else {
          await deps.iamAdapter.severConnection(vendorId, {
            tier: profile.tier,
            hitlApproved: false,
          });
        }
      }
      return { runId: `run-${Date.now()}` };
    },
  };
}
