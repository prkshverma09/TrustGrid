import { describe, it, expect } from "vitest";
import { sum } from "./sum";

describe("sum", () => {
  it("returns 2 for sum(1, 1)", () => {
    expect(sum(1, 1)).toBe(2);
  });
});
