import { describe, it, expect, vi } from "vitest";
import { createMcpClient } from "../client";
import type { McpClientConfig } from "../types";

describe("MCP Gateway client", () => {
  it("listTools returns array of tool descriptors when mock gateway responds", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        tools: [
          { name: "nvd_fetch", description: "Fetch NVD data" },
        ],
      }),
    });
    const client = createMcpClient({
      baseUrl: "https://mcp.example.com",
      getToken: async () => "test-token",
      fetch: mockFetch,
    } as McpClientConfig);
    const tools = await client.listTools();
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("nvd_fetch");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/tools"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });

  it("passes auth token in headers", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ tools: [] }) });
    const client = createMcpClient({
      baseUrl: "https://gateway.example.com",
      getToken: async () => "secret-token",
      fetch: mockFetch,
    } as McpClientConfig);
    await client.listTools();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer secret-token" }),
      })
    );
  });
});
