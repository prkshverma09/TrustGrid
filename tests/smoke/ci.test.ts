import { describe, it, expect } from "vitest";

describe("CI smoke", () => {
  it("trivial assertion for CI", () => {
    expect(1 + 1).toBe(2);
  });
});
