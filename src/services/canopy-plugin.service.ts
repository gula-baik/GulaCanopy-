import { NETWORK_CONFIG } from '../config/network';

export interface PluginSubmissionResult {
  accepted: boolean;
  txHash?: string;
  endpoint: string;
  error?: string;
}

export async function submitViaCanopyPlugin(payload: unknown): Promise<PluginSubmissionResult> {
  const endpoint = `${NETWORK_CONFIG.primaryRpc}/v1/tx`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        accepted: false,
        endpoint,
        error: `HTTP ${response.status}`,
      };
    }

    return {
      accepted: true,
      txHash: (await response.text()) || undefined,
      endpoint,
    };
  } catch (error) {
    return {
      accepted: false,
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
