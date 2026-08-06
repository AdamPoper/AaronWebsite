import { BlogPost } from "./blog-post.model";

export interface BlogPostResponse {
    posts: BlogPost[];
    pageNumber: number;
    pageSize: number;
}