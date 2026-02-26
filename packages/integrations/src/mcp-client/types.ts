export interface McpClientConfig {
  baseUrl: string;
  getToken: () => Promise<string>;
  fetch?: typeof globalThis.fetch;
}

export interface ToolDescriptor {
  name: string;
  description?: string;
}
