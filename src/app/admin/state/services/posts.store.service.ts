import { Injectable } from "@angular/core";
import { Post } from "../../model/post.model";
import { Observable, tap } from "rxjs";
import { PostStore } from "../post.store";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private postsService: PostsService,
        private postStore: PostStore,
    ) { }

    public fetchPosts(page: number, pageSize: number): Observable<Post[]> {
        return this.postsService.fetchPosts(page, pageSize)
            .pipe(
                tap(posts => {
                    this.postStore.update(state => {
                        const updatedPosts = { ...state.posts };
                        updatedPosts[page] = posts;
                        return { ...state, posts: updatedPosts };
                    });
                })
            );
    }
}