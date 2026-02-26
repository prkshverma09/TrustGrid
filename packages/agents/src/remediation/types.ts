export interface RemediationPolicy {
  vendorTier: number;
}

export interface RemediationResult {
  recommendedAction: "quarantine" | "sever";
  allowedWithoutHitl: boolean;
  requiresHitl: boolean;
}
