export interface VendorProfile {
  vendorId: string;
  tier: number;
  statedPosture: string[];
}

export type ProcurementFetcher = (vendorId: string) => Promise<{
  vendorId: string;
  tier: number;
  statedPosture: string[];
}>;

export interface ProcurementAdapter {
  getVendorProfile(vendorId: string): Promise<VendorProfile>;
}

export function createProcurementAdapter(fetchProfile: ProcurementFetcher): ProcurementAdapter {
  return {
    async getVendorProfile(vendorId: string): Promise<VendorProfile> {
      return fetchProfile(vendorId);
    },
  };
}
