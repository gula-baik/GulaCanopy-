import { bls12_381 } from '@noble/curves/bls12-381.js';
import { withRpcFallback } from '../config/network';
import { submitViaCanopyPlugin } from './canopy-plugin.service';
import { readStored, writeStored } from './storage';

export interface CanopyWallet {
  address: string;
  publicKey: string;
  privateKey: string;
}

export interface SocialActionRecord {
  id: string;
  type: 'post' | 'like' | 'repost' | 'comment' | 'follow' | 'profile';
  author: string;
  payload: string;
  createdAt: string;
  txHash?: string;
}

function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (normalized.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }

  const bytes = new Uint8Array(normalized.length / 2);
  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }

  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function encodeStringField(fieldNum: number, value: string): Uint8Array {
  if (!value) return new Uint8Array(0);
  const tag = new Uint8Array([fieldNum * 8 + 2]);
  const len = new Uint8Array([value.length]);
  const data = new TextEncoder().encode(value);
  const out = new Uint8Array(tag.length + len.length + data.length);
  out.set(tag, 0);
  out.set(len, tag.length);
  out.set(data, tag.length + len.length);
  return out;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

export function createLocalWallet(): CanopyWallet {
  const secretKey = bls12_381.longSignatures.keygen();
  const publicKey = bls12_381.longSignatures.getPublicKey(secretKey.secretKey);
  const key = {
    address: `0x${bytesToHex(new Uint8Array(20)).slice(0, 40)}`,
    publicKey: bytesToHex(publicKey.toBytes()),
    privateKey: bytesToHex(secretKey.secretKey),
  };

  writeStored('wallet', key);
  return key;
}

export function getStoredWallet(): CanopyWallet | null {
  return readStored<CanopyWallet | null>('wallet', null);
}

export async function submitSocialAction(action: Omit<SocialActionRecord, 'id' | 'createdAt'>): Promise<SocialActionRecord> {
  const wallet = getStoredWallet() ?? createLocalWallet();
  const payload = JSON.stringify({ type: action.type, author: action.author, payload: action.payload });
  const txPayload = concat([
    encodeStringField(1, wallet.address),
    encodeStringField(2, action.type),
    encodeStringField(3, action.payload),
    encodeStringField(4, action.author),
  ]);

  const signaturePoint = bls12_381.longSignatures.sign(
    bls12_381.longSignatures.hash(txPayload),
    hexToBytes(wallet.privateKey),
  );

  const body = {
    type: 'gula_log',
    msgTypeUrl: 'type.googleapis.com/types.MessageGulaLog',
    msgBytes: bytesToHex(txPayload),
    signature: {
      publicKey: wallet.publicKey,
      signature: bytesToHex(bls12_381.longSignatures.Signature.toBytes(signaturePoint)),
    },
    time: Date.now() * 1000,
    createdHeight: 1,
    fee: 0,
    memo: payload,
    networkID: 1,
    chainID: 1,
  };

  let txHash = String(crypto.randomUUID());

  try {
    const heightResponse = await withRpcFallback(async (rpc: string) => {
      const response = await fetch(`${rpc}/v1/query/height`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Height query failed on ${rpc}`);
      }

      return response.json() as Promise<{ height?: number }>;
    });

    const heightPayload = heightResponse as { height?: number };
    const createdHeight = typeof heightPayload.height === 'number' ? heightPayload.height : 1;
    const txBody = { ...body, createdHeight };
    const pluginResult = await submitViaCanopyPlugin(txBody);
    if (pluginResult.accepted && pluginResult.txHash) {
      txHash = pluginResult.txHash;
    }
  } catch (error) {
    console.warn('Canopy submission unavailable, storing locally:', error);
  }
  const record: SocialActionRecord = {
    id: crypto.randomUUID(),
    type: action.type,
    author: action.author,
    payload: action.payload,
    createdAt: new Date().toISOString(),
    txHash,
  };

  const history = readStored<SocialActionRecord[]>('activity-history', []);
  writeStored('activity-history', [record, ...history]);
  return record;
}

export function listStoredActivity(): SocialActionRecord[] {
  return readStored<SocialActionRecord[]>('activity-history', []);
}
