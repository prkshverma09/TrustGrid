export interface PendingAction {
  actionId: string;
  vendorId: string;
  tier: number;
}

const pendingActions: PendingAction[] = [];

export function getPendingActions(): PendingAction[] {
  return [...pendingActions];
}

export function addPendingAction(action: Omit<PendingAction, "actionId">): void {
  pendingActions.push({
    ...action,
    actionId: `action-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  });
}

export function removePendingAction(actionId: string): boolean {
  const i = pendingActions.findIndex((a) => a.actionId === actionId);
  if (i === -1) return false;
  pendingActions.splice(i, 1);
  return true;
}
