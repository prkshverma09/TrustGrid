import { NextResponse } from "next/server";
import { createOrchestrator } from "orchestrator";
import { addPendingAction } from "@/lib/store";

export async function POST() {
  const orchestrator = createOrchestrator({
    discoveryFetcher: async () => [
      { id: "CVE-2024-demo", source: "NVD", severity: "high", title: "Demo" },
    ],
    getVendorProfile: async () => ({
      vendorId: "v1",
      tier: 1,
      statedPosture: ["ISO_42001"],
    }),
    policyEvaluator: ({ vendorTier }) =>
      vendorTier === 1
        ? { allowed: false, requiresHitl: true }
        : { allowed: true, requiresHitl: false },
    iamAdapter: {
      severConnection: async () => ({ success: true }),
    },
    addPendingAction,
  });
  const result = await orchestrator.run();
  return NextResponse.json({ runId: result.runId });
}
