import { useEffect, useState } from 'react';
import { createLocalWallet, getStoredWallet } from '../services/canopy.tx.service';

export default function SettingsPage() {
  const [wallet, setWallet] = useState(() => getStoredWallet());

  useEffect(() => {
    if (!wallet) {
      setWallet(createLocalWallet());
    }
  }, [wallet]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
      <h2 className="text-xl font-semibold text-white">Network Settings</h2>
      <div className="mt-4 space-y-3 text-sm text-slate-300">
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <p className="font-medium text-white">Primary RPC</p>
          <p>{import.meta.env.VITE_RPC_PRIMARY ?? 'http://127.0.0.1:50002'}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <p className="font-medium text-white">Secondary RPC</p>
          <p>{import.meta.env.VITE_RPC_SECONDARY ?? 'http://127.0.0.1:50003'}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <p className="font-medium text-white">Wallet</p>
          <p className="break-all text-xs text-slate-400">{wallet?.address ?? 'No wallet yet'}</p>
          <button onClick={() => setWallet(createLocalWallet())} className="mt-3 rounded-full bg-canopy-500 px-3 py-2 text-sm font-semibold text-white">Generate wallet</button>
        </div>
      </div>
    </div>
  );
}
