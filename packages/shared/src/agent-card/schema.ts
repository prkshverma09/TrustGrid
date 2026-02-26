/**
 * Agent Card schema per A2A (/.well-known/agent.json)
 * @see https://api.airia.ai/docs
 */
export interface AgentCard {
  name: string;
  endpoint: string;
  capabilities: string[];
  schemaVersion: string;
  description?: string;
}
