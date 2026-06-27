import { submitSocialAction } from './canopy.tx.service';

export interface ProfileRecord {
  id: string;
  name: string;
  bio: string;
  handle: string;
  avatar: string;
  reputation: number;
  followers: number;
  following: number;
  joinedAt: string;
}

export async function createProfile(profile: Omit<ProfileRecord, 'id' | 'joinedAt'>): Promise<ProfileRecord> {
  await submitSocialAction({ type: 'profile', author: profile.handle, payload: `${profile.name}::${profile.bio}` });

  return {
    id: crypto.randomUUID(),
    joinedAt: new Date().toISOString(),
    ...profile,
  };
}

export async function updateProfile(profile: ProfileRecord): Promise<ProfileRecord> {
  await submitSocialAction({ type: 'profile', author: profile.handle, payload: `${profile.name}::${profile.bio}` });
  return profile;
}
