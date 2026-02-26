import { describe, it, expect } from "vitest";
import { POST } from "../orchestrate/route";

describe("POST /api/orchestrate", () => {
  it("returns 200 and body with run id", async () => {
    const res = await POST();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("runId");
    expect(typeof data.runId).toBe("string");
  });
});
