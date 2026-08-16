import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { PAGE_SIZE, PostStore } from "../post.store";
import { PostsService } from "../../rest-services/posts.service";
import { BlogPostResponse } from "src/app/pages/models/blog-post-response.model";
import { PostsQuery } from "../queries/posts.query";
import { Post } from "../../model/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsStoreService {
    constructor(private postsService: PostsService,
                private postStore: PostStore,
                private postsQuery: PostsQuery
    ) { }

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
            .pipe(map((response: BlogPostResponse) => response.posts))
    }

    private fetchPosts(page: number, pageSize: number): Observable<BlogPostResponse> {
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