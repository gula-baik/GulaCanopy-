import { submitSocialAction } from './canopy.tx.service';

export async function followUser(target: string): Promise<{ target: string; following: boolean }> {
  await submitSocialAction({ type: 'follow', author: 'guest', payload: target });
  return { target, following: true };
}

export async function unfollowUser(target: string): Promise<{ target: string; following: boolean }> {
  await submitSocialAction({ type: 'follow', author: 'guest', payload: `unfollow:${target}` });
  return { target, following: false };
}
