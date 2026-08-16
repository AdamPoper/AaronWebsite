import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { PAGE_SIZE, PostStore } from "../post.store";
import { PostsService } from "../../rest-services/posts.service";
import { PostResponse } from "../../model/post-response.model";
import { PostsQuery } from "../queries/posts.query";
import { CreatePostRequest, Post, PostStatus } from "../../model/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsStoreService {
    constructor(private postsService: PostsService,
                private postStore: PostStore,
                private postsQuery: PostsQuery
    ) { }

    public createPost(post: CreatePostRequest): Observable<Post> {
        return this.postsService.createPost(post);
    }

    public fetchPostBySlug(slug: string): Observable<Post> {
        return this.postsService.fetchPostBySlug(slug);
    }

    public updatePost(slug: string, post: CreatePostRequest): Observable<Post> {
        return this.postsService.updatePost(slug, post);
    }

    public postNow(post: Post): Observable<Post> {
        return this.setStatus(post, 'posted');
    }

    public unpost(post: Post): Observable<Post> {
        return this.setStatus(post, 'draft');
    }

    private setStatus(post: Post, post_status: PostStatus): Observable<Post> {
        return this.updatePost(post.slug, {
            title: post.title,
            content: post.content,
            post_status
        }).pipe(
            tap(updatedPost => this.replacePostInCache(updatedPost))
        );
    }

    private replacePostInCache(updatedPost: Post): void {
        this.postStore.update(state => {
            const updatedPosts = { ...state.posts };
            for (const page of Object.keys(updatedPosts)) {
                const pageNumber = Number(page);
                updatedPosts[pageNumber] = updatedPosts[pageNumber].map(post =>
                    post.slug === updatedPost.slug ? updatedPost : post
                );
            }
            return { ...state, posts: updatedPosts };
        });
    }

    public resetPosts(): void {
        this.postStore.reset();
    }

    public nextPage(): Observable<Post[]> {
        return this.goToPage(this.postsQuery.getCurrentPage() + 1);
    }

    public previousPage(): Observable<Post[]> {
        return this.goToPage(this.postsQuery.getCurrentPage() - 1);
    }

    private goToPage(page: number): Observable<Post[]> {
        if (page < 0) {
            return of(this.postsQuery.getPosts()[this.postsQuery.getCurrentPage()] || []);
        }

        if (this.postsQuery.hasPage(page)) {
            this.postStore.update({ currentPage: page });
            return of(this.postsQuery.getPosts()[page]);
        }

        return this.fetchPosts(page, PAGE_SIZE)
            .pipe(map((response: PostResponse) => response.posts))
    }

    private fetchPosts(page: number, pageSize: number): Observable<PostResponse> {
        return this.postsService.fetchPosts(page, pageSize)
            .pipe(
                tap(response => {
                    this.postStore.update(state => {
                        const updatedPosts = { ...state.posts };
                        updatedPosts[page] = response.posts;
                        return { 
                            ...state,
                            totalCount: response.total,
                            currentPage: page,
                            posts: updatedPosts 
                        };
                    });
                })
            );
    }
}