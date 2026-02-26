import { describe, it, expect } from "vitest";
import { evaluatePolicy } from "../engine";

describe("evaluatePolicy", () => {
  it("returns allowed: false, requiresHitl: true for Tier-1 sever", () => {
    const result = evaluatePolicy({ vendorTier: 1, action: "sever" });
    expect(result.allowed).toBe(false);
    expect(result.requiresHitl).toBe(true);
  });

  it("returns allowed: true, requiresHitl: false for Tier-3", () => {
    const result = evaluatePolicy({ vendorTier: 3, action: "sever" });
    expect(result.allowed).toBe(true);
    expect(result.requiresHitl).toBe(false);
  });
});
