import { submitSocialAction } from './canopy.tx.service';

export interface PostRecord {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  reposts: number;
  comments: number;
  tags: string[];
}

export async function createPost(payload: { content: string; author: string }): Promise<PostRecord> {
  const record = await submitSocialAction({
    type: 'post',
    author: payload.author,
    payload: payload.content,
  });

  return {
    id: record.id,
    author: payload.author,
    content: payload.content,
    createdAt: record.createdAt,
    likes: 0,
    reposts: 0,
    comments: 0,
    tags: [],
  };
}

export async function likePost(postId: string): Promise<{ postId: string; likes: number }> {
  await submitSocialAction({ type: 'like', author: 'guest', payload: postId });
  return { postId, likes: 1 };
}

export async function repostPost(postId: string): Promise<{ postId: string; reposts: number }> {
  await submitSocialAction({ type: 'repost', author: 'guest', payload: postId });
  return { postId, reposts: 1 };
}

export async function commentPost(postId: string, content: string): Promise<{ postId: string; comment: string }> {
  await submitSocialAction({ type: 'comment', author: 'guest', payload: `${postId}:${content}` });
  return { postId, comment: content };
}
