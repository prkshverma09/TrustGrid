export interface HandoffValidationResult {
  valid: boolean;
  errors: string[];
}

function hasFinding(payload: Record<string, unknown>): payload is { finding: unknown } {
  return payload != null && "finding" in payload && payload.finding != null;
}

export function validateHandoff(
  payload: Record<string, unknown>
): HandoffValidationResult {
  const errors: string[] = [];
  if (!payload.source || payload.source !== "discovery") {
    errors.push("source must be 'discovery'");
  }
  if (!payload.timestamp || typeof payload.timestamp !== "string") {
    errors.push("timestamp is required and must be a string");
  }
  if (!hasFinding(payload)) {
    errors.push("finding is required");
  } else {
    const f = payload.finding as Record<string, unknown>;
    if (!f.id || !f.source || !f.severity) {
      errors.push("finding must have id, source, and severity");
    }
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}
