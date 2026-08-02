import { Injectable } from "@angular/core";
import { Post } from "../model/post.model";
import { Store, StoreConfig } from "@datorama/akita";

export interface PostState {
    posts: Record<number, Post[]>;
}

export function createInitialState() {
    return {
        posts: {}
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'post' })
export class PostStore extends Store<PostState> {
    constructor() {
        super(createInitialState());
    }
}