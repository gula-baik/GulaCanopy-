import { FormEvent, useState } from 'react';
import { createPost } from '../services/post.service';

export default function CreatePage() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) return;

    setBusy(true);
    setStatus('Submitting your post to Canopy…');

    try {
      await createPost({ content, author: 'guest' });
      setStatus('Post submitted through the Canopy RPC plugin.');
      setContent('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Submission failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
      <h2 className="text-xl font-semibold text-white">Create On-chain Post</h2>
      <p className="mt-1 text-sm text-slate-400">Compose a post that will be persisted on Canopy.</p>
      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-32 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0"
          placeholder="Share your perspective on-chain…"
        />
        <button type="submit" disabled={busy} className="rounded-full bg-canopy-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? 'Publishing…' : 'Publish to Canopy'}
        </button>
      </form>
      {status ? <p className="mt-3 text-sm text-emerald-400">{status}</p> : null}
    </div>
  );
}
