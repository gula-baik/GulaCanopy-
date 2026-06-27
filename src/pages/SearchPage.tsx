import { useState } from 'react';
import { searchPosts, searchUsers } from '../services/search.service';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<Array<{ id: string; name: string; handle: string }>>([]);
  const [posts, setPosts] = useState<Array<{ id: string; content: string }>>([]);

  async function handleSearch() {
    const [userResults, postResults] = await Promise.all([searchUsers(query), searchPosts(query)]);
    setUsers(userResults);
    setPosts(postResults);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
      <h2 className="text-xl font-semibold text-white">Search TAKUMI</h2>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white"
          placeholder="Search users or posts"
        />
        <button onClick={handleSearch} className="rounded-full bg-canopy-500 px-4 py-2 text-sm font-semibold text-white">
          Search
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-slate-400">Users</p>
          {users.map((user) => (
            <div key={user.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-300">
              {user.name} <span className="text-slate-500">{user.handle}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-400">Posts</p>
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-300">
              {post.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
