import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Feed' },
  { to: '/search', label: 'Search' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="mb-4 rounded-2xl border border-canopy-500/30 bg-canopy-500/10 p-4">
        <p className="text-sm font-semibold text-canopy-400">On-chain SocialFi</p>
        <p className="mt-1 text-sm text-slate-300">Every interaction is recorded on Canopy.</p>
      </div>
      <div className="space-y-2">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${active ? 'bg-canopy-500/20 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <span>{link.label}</span>
              {active ? <span className="text-canopy-400">↗</span> : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
