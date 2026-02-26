import React from "react";
import { VendorList } from "@/components/VendorList";
import { PendingActionsCard } from "@/components/PendingActionsCard";

export default function DashboardPage() {
  const [vendors] = React.useState([
    { id: "v1", name: "Vendor One", tier: 1 },
  ]);
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
      <h2>Dashboard</h2>
      <VendorList vendors={vendors} />
      <PendingActionsCard pending={pending} onApprove={handleApprove} />
    </div>
  );
}
