export interface SeverConnectionOptions {
  tier: number;
  hitlApproved: boolean;
}

export interface SeverConnectionResult {
  success: boolean;
  blocked?: boolean;
}

export interface IamAdapter {
  severConnection(
    vendorId: string,
    options: SeverConnectionOptions
  ): Promise<SeverConnectionResult>;
}

export function createIamAdapter(): IamAdapter {
  return {
    async severConnection(
      _vendorId: string,
      options: SeverConnectionOptions
    ): Promise<SeverConnectionResult> {
      if (options.tier === 1 && !options.hitlApproved) {
        return { success: false, blocked: true };
      }
      return { success: true, blocked: false };
    },
  };
}
