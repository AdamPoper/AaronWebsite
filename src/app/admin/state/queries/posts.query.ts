import { Injectable } from "@angular/core";
import { PostState, PostStore } from "../post.store";
import { Query } from "@datorama/akita";


@Injectable({
    providedIn: 'root'
})
export class PostsQuery extends Query<PostState> {

    readonly posts$ = this.select('posts');

    constructor(private postStore: PostStore) {
        super(postStore);
    }
}