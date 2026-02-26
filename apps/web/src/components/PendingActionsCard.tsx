import React from "react";

export interface PendingItem {
  actionId: string;
  vendorId: string;
  tier: number;
}

export function PendingActionsCard({
  pending,
  onApprove,
}: {
  pending: PendingItem[];
  onApprove: (actionId: string) => void;
}) {
  return (
    <div>
      <span>{pending.length} pending</span>
      {pending.length > 0 && (
        <button type="button" onClick={() => onApprove(pending[0].actionId)}>
          Approve
        </button>
      )}
    </div>
  );
}
