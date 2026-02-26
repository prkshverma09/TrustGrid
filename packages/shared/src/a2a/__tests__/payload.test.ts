import { describe, it, expect } from "vitest";
import {
  encodeDiscoveryToCompliancePayload,
  decodeCompliancePayload,
} from "../payload";

describe("A2A payload", () => {
  const finding = {
    id: "CVE-2024-1234",
    source: "NVD",
    severity: "high",
    title: "Test vuln",
  };

  it("encodeDiscoveryToCompliancePayload produces object with required fields", () => {
    const encoded = encodeDiscoveryToCompliancePayload(finding);
    expect(encoded).toHaveProperty("finding");
    expect(encoded.finding).toEqual(finding);
    expect(encoded).toHaveProperty("timestamp");
    expect(encoded).toHaveProperty("source", "discovery");
  });

  it("decodeCompliancePayload round-trips", () => {
    const encoded = encodeDiscoveryToCompliancePayload(finding);
    const decoded = decodeCompliancePayload(encoded);
    expect(decoded.finding).toEqual(finding);
  });
});
