import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import CreatePage from './pages/CreatePage';
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const location = useLocation();

  const view = useMemo(() => {
    if (location.pathname.startsWith('/profile')) return 'profile';
    if (location.pathname === '/create') return 'create';
    if (location.pathname === '/search') return 'search';
    if (location.pathname === '/notifications') return 'notifications';
    if (location.pathname === '/settings') return 'settings';
    return 'feed';
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <aside className="lg:w-72">
          <Sidebar />
        </aside>
        <main className="flex-1">
          {view === 'feed' && <FeedPage />}
          {view === 'profile' && <ProfilePage />}
          {view === 'create' && <CreatePage />}
          {view === 'search' && <SearchPage />}
          {view === 'notifications' && <NotificationsPage />}
          {view === 'settings' && <SettingsPage />}
        </main>
      </div>
      <div className="fixed bottom-4 right-4 rounded-full bg-canopy-500 p-3 shadow-lg shadow-canopy-500/30 lg:hidden">
        <Link to="/create" className="text-xl font-semibold text-white">
          +
        </Link>
      </div>
    </div>
  );
}

export default App;
