import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canopy-500 font-semibold text-white">
            T
          </div>
          <div>
            <p className="text-lg font-semibold">TAKUMI</p>
            <p className="text-xs text-slate-400">Social Reputation on Canopy</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Canopy RPC Online
        </div>
      </div>
    </header>
  );
}
