import { NextResponse } from "next/server";
import { getPendingActions } from "@/lib/store";

export async function GET() {
  const actions = getPendingActions();
  return NextResponse.json(actions);
}
