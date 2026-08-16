export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: number;
    slug: string;
    post_status: PostStatus;
}

export type PostStatus = 'draft' | 'posted';

export type CreatePostRequest = Pick<Post, 'title' | 'content' | 'post_status'>;