import { withRpcFallback } from '../config/network';

export interface WalletState {
  address: string;
  publicKey: string;
  privateKey: string;
}

export async function connectWallet(): Promise<WalletState> {
  const response = await withRpcFallback(async (rpc: string) => {
    const res = await fetch(`${rpc}/v1/query/height`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error(`Wallet connection failed on ${rpc}`);
    }

    return res.json();
  });

  const fallback = typeof response === 'object' && response && 'height' in response ? String((response as { height?: unknown }).height ?? 'takumi') : 'takumi';
  return {
    address: `0x${fallback}`.slice(0, 42),
    publicKey: '',
    privateKey: '',
  };
}
