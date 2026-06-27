import { listStoredActivity } from './canopy.tx.service';

export interface ReputationSnapshot {
  score: number;
  activity: number;
  joinedAt: string;
  followers: number;
  following: number;
}

export async function getReputation(): Promise<ReputationSnapshot> {
  const activity = listStoredActivity();
  return {
    score: 128 + activity.length * 4,
    activity: activity.length,
    joinedAt: new Date().toISOString(),
    followers: 42 + Math.min(activity.length, 8),
    following: 58 + Math.min(Math.floor(activity.length / 2), 6),
  };
}
