export interface Finding {
  id: string;
  source: string;
  severity: string;
  title?: string;
}

export interface DiscoveryConfig {
  lastRunTime?: string;
}

export type FindingFetcher = (config: DiscoveryConfig) => Promise<Finding[]>;
