import { useEffect, useState } from 'react';
import { getFeed, type FeedItem } from '../services/feed.service';
import { followUser } from '../services/follow.service';

export default function FeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    void (async () => {
      try {
        const feed = await getFeed();
        setItems(feed);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleFollow(author: string) {
    try {
      await followUser(author);
      setFollowed((state) => ({ ...state, [author]: true }));
    } catch {
      setFollowed((state) => ({ ...state, [author]: false }));
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold">Community Feed</p>
            <p className="text-sm text-slate-400">Latest on-chain social activity</p>
          </div>
          <button className="rounded-full border border-canopy-500/30 bg-canopy-500/10 px-3 py-2 text-sm text-canopy-400">
            Sync Feed
          </button>
        </div>
      </div>
      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-sm text-slate-400">Loading feed…</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-sm text-slate-400">No feed activity yet.</div>
      ) : (
        items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{item.author}</p>
                <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">Live</span>
                <button onClick={() => void handleFollow(item.author)} className="rounded-full border border-canopy-500/30 px-2 py-1 text-xs text-canopy-300">
                  {followed[item.author] ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">{item.content}</p>
            <div className="mt-4 flex gap-3 text-sm text-slate-400">
              <span>♥ {item.likes}</span>
              <span>↺ {item.reposts}</span>
              <span>💬 {item.comments}</span>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
