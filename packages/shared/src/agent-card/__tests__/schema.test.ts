import { describe, it, expect } from "vitest";
import type { AgentCard } from "../schema";

describe("AgentCard schema", () => {
  it("has required fields: name, endpoint, capabilities, schemaVersion", () => {
    const card: AgentCard = {
      name: "Test Agent",
      endpoint: "https://example.com/agent",
      capabilities: ["test"],
      schemaVersion: "1.0",
    };
    expect(card.name).toBe("Test Agent");
    expect(card.endpoint).toBe("https://example.com/agent");
    expect(card.capabilities).toEqual(["test"]);
    expect(card.schemaVersion).toBe("1.0");
  });

  it("allows optional description", () => {
    const card: AgentCard = {
      name: "Test",
      endpoint: "https://example.com",
      capabilities: [],
      schemaVersion: "1.0",
      description: "Optional description",
    };
    expect(card.description).toBe("Optional description");
  });
});
