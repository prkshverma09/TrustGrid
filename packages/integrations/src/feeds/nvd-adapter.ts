export interface Finding {
  id: string;
  source: string;
  severity: string;
  title?: string;
}

export type NvdRawFetcher = () => Promise<{
  vulnerabilities?: Array<{
    cve?: { id?: string; metrics?: { cvssMetricV31?: Array<{ cvssData?: { baseSeverity?: string } }> } };
  }>;
}>;

export interface NvdAdapter {
  fetchFindings(): Promise<Finding[]>;
}

export function createNvdAdapter(fetchRaw: NvdRawFetcher): NvdAdapter {
  return {
    async fetchFindings(): Promise<Finding[]> {
      const data = await fetchRaw();
      const vulns = data.vulnerabilities ?? [];
      return vulns.map((v) => {
        const id = v.cve?.id ?? "unknown";
        const severity = (v.cve?.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity ?? "MEDIUM").toLowerCase();
        return { id, source: "NVD", severity, title: id };
      });
    },
  };
}
