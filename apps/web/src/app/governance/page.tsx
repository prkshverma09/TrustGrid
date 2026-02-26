import React from "react";
import { HitlApprovalFlow } from "@/components/HitlApprovalFlow";

export default function GovernancePage() {
  const [pending, setPending] = React.useState<Array<{ actionId: string; vendorId: string; tier: number }>>([]);

  React.useEffect(() => {
    fetch("/api/pending-actions")
      .then((r) => r.json())
      .then(setPending)
      .catch(() => {});
  }, []);

  const handleApprove = (actionId: string) => {
    fetch("/api/hitl/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actionId }),
    }).then(() => setPending((p) => p.filter((a) => a.actionId !== actionId)));
  };

  return (
    <div>
      <h2>Governance</h2>
      <HitlApprovalFlow pending={pending} onApprove={handleApprove} />
    </div>
  );
}
