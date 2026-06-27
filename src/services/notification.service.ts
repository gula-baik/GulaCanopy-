import { listStoredActivity } from './canopy.tx.service';

export interface NotificationRecord {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'repost';
  actor: string;
  message: string;
  createdAt: string;
}

export async function getNotifications(): Promise<NotificationRecord[]> {
  return listStoredActivity()
    .filter((activity) => ['follow', 'like', 'comment', 'repost'].includes(activity.type))
    .map((activity) => ({
      id: activity.id,
      type: activity.type as NotificationRecord['type'],
      actor: activity.author,
      message: `${activity.type.toUpperCase()}: ${activity.payload}`,
      createdAt: activity.createdAt,
    }));
}
