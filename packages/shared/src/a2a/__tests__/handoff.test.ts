import { describe, it, expect } from "vitest";
import { validateHandoff } from "../handoff";

describe("validateHandoff", () => {
  it("rejects payload with missing required fields", () => {
    const result = validateHandoff({} as Record<string, unknown>);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects tampered payload missing finding", () => {
    const result = validateHandoff({
      source: "discovery",
      timestamp: new Date().toISOString(),
    } as Record<string, unknown>);
    expect(result.valid).toBe(false);
  });

  it("accepts valid handoff payload", () => {
    const payload = {
      source: "discovery",
      timestamp: new Date().toISOString(),
      finding: { id: "CVE-1", source: "NVD", severity: "high" },
    };
    const result = validateHandoff(payload);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
