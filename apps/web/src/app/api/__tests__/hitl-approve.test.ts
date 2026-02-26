import { describe, it, expect } from "vitest";
import { POST } from "../hitl/approve/route";

describe("POST /api/hitl/approve", () => {
  it("returns 400 when actionId missing", async () => {
    const res = await POST(new Request("http://x", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    }));
    expect(res.status).toBe(400);
  });

  it("returns 404 when pending action not found", async () => {
    const res = await POST(new Request("http://x", {
      method: "POST",
      body: JSON.stringify({ actionId: "nonexistent" }),
      headers: { "Content-Type": "application/json" },
    }));
    expect(res.status).toBe(404);
  });
});
