import { Post } from './post.model';

export interface PostResponse {
    posts: Post[];
    pageNumber: number;
    pageSize: number;
    total: number;
}