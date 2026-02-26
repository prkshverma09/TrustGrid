import type { DiscoveryConfig, Finding, FindingFetcher } from "./types";

export interface DiscoveryResult {
  findings: Finding[];
}

export async function runDiscovery(
  config: DiscoveryConfig,
  fetcher: FindingFetcher
): Promise<DiscoveryResult> {
  const findings = await fetcher(config);
  return { findings };
}
