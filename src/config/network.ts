export const RPC_PRIMARY = import.meta.env.VITE_RPC_PRIMARY ?? 'http://127.0.0.1:50002';
export const RPC_SECONDARY = import.meta.env.VITE_RPC_SECONDARY ?? 'http://127.0.0.1:50003';

export interface NetworkConfig {
  primaryRpc: string;
  secondaryRpc: string;
  retries: number;
  retryDelayMs: number;
}

export const NETWORK_CONFIG: NetworkConfig = {
  primaryRpc: RPC_PRIMARY,
  secondaryRpc: RPC_SECONDARY,
  retries: 2,
  retryDelayMs: 1000,
};

export async function withRpcFallback<T>(operation: unknown): Promise<T> {
  const call = async (rpc: string): Promise<T> => {
    const runner = operation as unknown;
    // eslint-disable-next-line no-unused-vars
    return (runner as (...args: string[]) => Promise<T>)(rpc);
  };

  try {
    return await call(NETWORK_CONFIG.primaryRpc);
  } catch (error) {
    return call(NETWORK_CONFIG.secondaryRpc);
  }
}
