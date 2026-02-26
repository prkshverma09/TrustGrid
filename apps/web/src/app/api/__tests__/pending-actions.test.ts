import { describe, it, expect } from "vitest";
import { GET } from "../pending-actions/route";

describe("GET /api/pending-actions", () => {
  it("returns list", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
