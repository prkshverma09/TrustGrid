import React from "react";

export interface VendorRow {
  id: string;
  name: string;
  tier: number;
}

export function VendorList({ vendors }: { vendors: VendorRow[] }) {
  return (
    <ul>
      {vendors.map((v) => (
        <li key={v.id}>{v.name}</li>
      ))}
    </ul>
  );
}
