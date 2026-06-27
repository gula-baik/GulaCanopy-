import { useEffect, useState } from 'react';
import { createProfile, type ProfileRecord } from '../services/profile.service';
import { getReputation, type ReputationSnapshot } from '../services/reputation.service';

export default function ProfilePage() {
  const [reputation, setReputation] = useState<ReputationSnapshot | null>(null);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [name, setName] = useState('Guest Builder');
  const [bio, setBio] = useState('Building SocialFi on Canopy.');
  const [handle, setHandle] = useState('guest');

  useEffect(() => {
    void (async () => {
      try {
        const snapshot = await getReputation();
        setReputation(snapshot);
        const nextProfile = await createProfile({
          name,
          bio,
          handle,
          avatar: 'T',
          reputation: snapshot.score,
          followers: snapshot.followers,
          following: snapshot.following,
        });
        setProfile(nextProfile);
      } catch (error) {
        setProfile({
          id: crypto.randomUUID(),
          name,
          bio,
          handle,
          avatar: 'T',
          reputation: 0,
          followers: 0,
          following: 0,
          joinedAt: new Date().toISOString(),
        });
        console.warn('Profile sync skipped:', error);
      }
    })();
  }, [bio, handle, name]);

  async function handleSave() {
    if (!profile) return;
    const nextProfile = await createProfile({
      name,
      bio,
      handle,
      avatar: 'T',
      reputation: reputation?.score ?? 0,
      followers: reputation?.followers ?? 0,
      following: reputation?.following ?? 0,
    });
    setProfile(nextProfile);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold text-white">TAKUMI Profile</p>
            <p className="mt-1 text-sm text-slate-400">Your on-chain reputation, timeline, and social graph.</p>
          </div>
          <div className="rounded-full border border-canopy-500/30 bg-canopy-500/10 px-3 py-2 text-sm text-canopy-400">
            Reputation Score: {reputation?.score ?? 0}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-400">Activity</p>
          <p className="mt-2 text-2xl font-semibold text-white">{reputation?.activity ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-400">Followers</p>
          <p className="mt-2 text-2xl font-semibold text-white">{reputation?.followers ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-400">Following</p>
          <p className="mt-2 text-2xl font-semibold text-white">{reputation?.following ?? 0}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h3 className="text-lg font-semibold text-white">Profile Editor</h3>
        <div className="mt-4 space-y-3">
          <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" placeholder="Display name" />
          <input value={handle} onChange={(event) => setHandle(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" placeholder="Handle" />
          <textarea value={bio} onChange={(event) => setBio(event.target.value)} className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" placeholder="Bio" />
          <button onClick={() => void handleSave()} className="rounded-full bg-canopy-500 px-4 py-2 text-sm font-semibold text-white">Save profile on-chain</button>
        </div>
        {profile ? <p className="mt-3 text-sm text-emerald-400">Saved as {profile.handle} via the Canopy RPC plugin</p> : null}
      </div>
    </div>
  );
}
