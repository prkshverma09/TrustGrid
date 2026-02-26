export interface PendingAction {
  actionId: string;
  vendorId: string;
  tier: number;
}

export interface ApprovalSignal {
  approved: boolean;
}

export interface IamAdapterLike {
  severConnection(vendorId: string, options: { tier: number; hitlApproved: boolean }): Promise<{ success: boolean }>;
}

export type ApprovalChecker = (actionId: string) => boolean;

export interface HitlGate {
  executePendingAction(action: PendingAction, signal: ApprovalSignal): Promise<void>;
}

export function createHitlGate(
  iam: IamAdapterLike,
  isApproved: ApprovalChecker
): HitlGate {
  return {
    async executePendingAction(action: PendingAction, signal: ApprovalSignal): Promise<void> {
      if (action.tier === 1 && !signal.approved) {
        throw new Error("Tier-1 action requires HITL approval");
      }
      if (!signal.approved || !isApproved(action.actionId)) {
        throw new Error("Action not approved");
      }
      await iam.severConnection(action.vendorId, {
        tier: action.tier,
        hitlApproved: true,
      });
    },
  };
}
