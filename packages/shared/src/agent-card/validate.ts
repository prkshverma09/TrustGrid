import type { AgentCard } from "./schema";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateAgentCard(card: AgentCard): ValidationResult {
  const errors: string[] = [];

  if (!card.name || typeof card.name !== "string") {
    errors.push("name is required and must be a string");
  }
  if (!card.endpoint || typeof card.endpoint !== "string") {
    errors.push("endpoint is required and must be a string");
  } else if (!isValidUrl(card.endpoint)) {
    errors.push("endpoint must be a valid URL");
  }
  if (!Array.isArray(card.capabilities)) {
    errors.push("capabilities is required and must be an array");
  }
  if (!card.schemaVersion || typeof card.schemaVersion !== "string") {
    errors.push("schemaVersion is required and must be a string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
