/**
 * AiriaKit setup placeholder.
 * Configure with AIRIA_API_KEY and pipeline config when ready.
 */
export const airiaConfig = {
  apiKey: process.env.AIRIA_API_KEY ?? "",
  pipelineId: process.env.AIRIA_PIPELINE_ID ?? "",
};

export function initAiria() {
  if (airiaConfig.apiKey) {
    // AiriaKit.setup(config) when SDK is available
  }
}
