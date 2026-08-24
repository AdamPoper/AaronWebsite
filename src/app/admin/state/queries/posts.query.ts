import { Injectable } from "@angular/core";
import { PAGE_SIZE, PostState, PostStore } from "../post.store";
import { Query } from "@datorama/akita";
import { combineLatest, map } from "rxjs";
import { Post } from "../../model/post.model";
import { Category } from "../../model/category.model";

@Injectable({
    providedIn: 'root'
})
export class PostsQuery extends Query<PostState> {

    readonly posts$ = this.select('posts');

    readonly currentPage$ = this.select('currentPage');

    readonly totalCount$ = this.select('totalCount');

    readonly categories$ = this.select('categories');

    readonly totalPages$ = this.totalCount$.pipe(
        map(totalCount => Math.ceil(totalCount / PAGE_SIZE))
    );

    readonly currentPagePosts$ = combineLatest([
        this.posts$,
        this.currentPage$
    ]).pipe(
        map(([posts, currentPage]) => posts[currentPage] || [])
    );

    constructor(private postStore: PostStore) {
        super(postStore);
    }

    public getCurrentPage(): number {
        return this.getValue().currentPage;
    }

    public getPosts(): Record<number, Post[]> {
        return this.store.getValue().posts;
    }
    
    public hasPage(pageNumber: number): boolean {
        return !!this.getPosts()[pageNumber];
    }

    public getCategories(): Category[] {
        return this.getValue().categories;
    }
}