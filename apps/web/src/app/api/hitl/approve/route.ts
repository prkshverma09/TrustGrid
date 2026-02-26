import { NextRequest, NextResponse } from "next/server";
import { getPendingActions, removePendingAction } from "@/lib/store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { actionId } = body as { actionId?: string };
  if (!actionId) {
    return NextResponse.json(
      { error: "actionId required" },
      { status: 400 }
    );
  }
  const pending = getPendingActions();
  const action = pending.find((a) => a.actionId === actionId);
  if (!action) {
    return NextResponse.json(
      { error: "Pending action not found" },
      { status: 404 }
    );
  }
  removePendingAction(actionId);
  return NextResponse.json({ success: true });
}
