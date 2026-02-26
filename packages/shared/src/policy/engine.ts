export interface PolicyInput {
  vendorTier: number;
  action: string;
}

export interface PolicyResult {
  allowed: boolean;
  requiresHitl: boolean;
}

export function evaluatePolicy(input: PolicyInput): PolicyResult {
  if (input.vendorTier === 1) {
    return { allowed: false, requiresHitl: true };
  }
  return { allowed: true, requiresHitl: false };
}
