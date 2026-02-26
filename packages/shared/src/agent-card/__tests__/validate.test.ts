import { describe, it, expect } from "vitest";
import { validateAgentCard } from "../validate";
import type { AgentCard } from "../schema";

describe("validateAgentCard", () => {
  it("returns valid: false and errors for empty object", () => {
    const result = validateAgentCard({} as AgentCard);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(Array.isArray(result.errors)).toBe(true);
    expect((result.errors as string[]).length).toBeGreaterThan(0);
  });

  it("returns valid: false for missing required fields", () => {
    const result = validateAgentCard({ name: "Test" } as AgentCard);
    expect(result.valid).toBe(false);
    expect((result.errors as string[]).length).toBeGreaterThan(0);
  });

  it("returns valid: false for invalid endpoint URL", () => {
    const result = validateAgentCard({
      name: "Discovery",
      endpoint: "not-a-url",
      capabilities: [],
      schemaVersion: "1.0",
    } as AgentCard);
    expect(result.valid).toBe(false);
  });

  it("returns valid: true for valid Discovery agent card", () => {
    const card = {
      name: "TrustGrid Discovery Agent",
      endpoint: "https://api.example.com/discovery",
      capabilities: ["vulnerability-scan"],
      schemaVersion: "1.0",
    };
    const result = validateAgentCard(card as AgentCard);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("returns valid: true for valid Compliance agent card", () => {
    const result = validateAgentCard({
      name: "TrustGrid Compliance Agent",
      endpoint: "https://api.example.com/compliance",
      capabilities: ["compliance-audit"],
      schemaVersion: "1.0",
    } as AgentCard);
    expect(result.valid).toBe(true);
  });

  it("returns valid: true for valid Remediation agent card", () => {
    const result = validateAgentCard({
      name: "TrustGrid Remediation Agent",
      endpoint: "https://api.example.com/remediation",
      capabilities: ["remediation-action"],
      schemaVersion: "1.0",
    } as AgentCard);
    expect(result.valid).toBe(true);
  });
});
