import { listStoredActivity } from './canopy.tx.service';

export interface FeedItem {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  reposts: number;
  comments: number;
}

export async function getFeed(): Promise<FeedItem[]> {
  return listStoredActivity().map((activity) => ({
    id: activity.id,
    author: activity.author,
    content: `${activity.type}: ${activity.payload}`,
    createdAt: activity.createdAt,
    likes: activity.type === 'like' ? 1 : 0,
    reposts: activity.type === 'repost' ? 1 : 0,
    comments: activity.type === 'comment' ? 1 : 0,
  }));
}

export async function getUserTimeline(): Promise<FeedItem[]> {
  return getFeed();
}

export async function getTrendingPosts(): Promise<FeedItem[]> {
  const feed = await getFeed();
  return feed.slice(0, 3);
}
