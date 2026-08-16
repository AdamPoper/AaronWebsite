import { Injectable } from "@angular/core";
import { Post } from "../model/post.model";
import { Store, StoreConfig } from "@datorama/akita";

export const PAGE_SIZE = 10;

export interface PostState {
    posts: Record<number, Post[]>;
    currentPage: number;
    totalCount: number;
}

export function createInitialState() {
    return {
        posts: {},
        currentPage: -1,
        totalCount: 0
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'post', resettable: true })
export class PostStore extends Store<PostState> {
    constructor() {
        super(createInitialState());
    }
}