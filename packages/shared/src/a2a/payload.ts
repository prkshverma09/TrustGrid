export interface FindingPayload {
  id: string;
  source: string;
  severity: string;
  title?: string;
}

export interface DiscoveryToCompliancePayload {
  source: "discovery";
  timestamp: string;
  finding: FindingPayload;
}

export function encodeDiscoveryToCompliancePayload(
  finding: FindingPayload
): DiscoveryToCompliancePayload {
  return {
    source: "discovery",
    timestamp: new Date().toISOString(),
    finding,
  };
}

export function decodeCompliancePayload(
  encoded: DiscoveryToCompliancePayload
): DiscoveryToCompliancePayload {
  return {
    source: encoded.source,
    timestamp: encoded.timestamp,
    finding: { ...encoded.finding },
  };
}
