import React from "react";

export interface PendingActionItem {
  actionId: string;
  vendorId: string;
  tier: number;
}

export function HitlApprovalFlow({
  pending,
  onApprove,
}: {
  pending: PendingActionItem[];
  onApprove: (actionId: string) => void;
}) {
  return (
    <div>
      {pending.map((a) => (
        <div key={a.actionId}>
          <span>Vendor {a.vendorId} (Tier {a.tier})</span>
          <button type="button" onClick={() => onApprove(a.actionId)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
