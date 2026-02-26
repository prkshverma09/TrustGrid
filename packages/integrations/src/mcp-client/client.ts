import type { McpClientConfig, ToolDescriptor } from "./types";

export interface McpClient {
  listTools(): Promise<ToolDescriptor[]>;
}

export function createMcpClient(config: McpClientConfig): McpClient {
  const fetcher = config.fetch ?? globalThis.fetch;
  const baseUrl = config.baseUrl.replace(/\/$/, "");

  return {
    async listTools(): Promise<ToolDescriptor[]> {
      const token = await config.getToken();
      const res = await fetcher(`${baseUrl}/tools`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`MCP listTools failed: ${res.status}`);
      const data = (await res.json()) as { tools?: ToolDescriptor[] };
      return data.tools ?? [];
    },
  };
}
