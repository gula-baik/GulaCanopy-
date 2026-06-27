import { listStoredActivity } from './canopy.tx.service';

export async function searchUsers(query: string): Promise<Array<{ id: string; name: string; handle: string }>> {
  if (!query) return [];
  const activity = listStoredActivity();
  if (!activity.length) {
    return [{ id: crypto.randomUUID(), name: 'Canopy Explorer', handle: '@explorer' }];
  }

  return activity.slice(0, 3).map((item) => ({
    id: item.id,
    name: item.author,
    handle: `@${item.author.toLowerCase().replace(/\s+/g, '')}`,
  }));
}

export async function searchPosts(query: string): Promise<Array<{ id: string; content: string }>> {
  if (!query) return [];
  const activity = listStoredActivity();
  return activity
    .filter((item) => item.payload.toLowerCase().includes(query.toLowerCase()) || item.author.toLowerCase().includes(query.toLowerCase()))
    .map((item) => ({ id: item.id, content: `${item.type}: ${item.payload}` }));
}
