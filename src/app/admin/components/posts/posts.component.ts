import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostsStoreService } from '../../state/services/posts.store.service';
import { CategoriesStoreService } from '../../state/services/categories.store.service';
import { PostsQuery } from '../../state/queries/posts.query';
import { Post } from '../../model/post.model';

const EXCERPT_LENGTH = 160;
const UNCATEGORIZED_LABEL = 'Uncategorized';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

    readonly currentPagePosts$ = this.postsQuery.currentPagePosts$;

    readonly totalPages$ = this.postsQuery.totalPages$;

    readonly currentPageDisplay$ = this.postsQuery.currentPage$.pipe(
        map(currentPage => currentPage + 1)
    );

    constructor(private postsStoreService: PostsStoreService,
                private categoriesStoreService: CategoriesStoreService,
                private postsQuery: PostsQuery
    ) { }

    ngOnInit(): void {
        this.nextPage();
        this.categoriesStoreService.fetchCategories().subscribe();
    }

    ngOnDestroy(): void {
        this.postsStoreService.resetPosts();
    }

    nextPage(): void {
        this.postsStoreService.nextPage().subscribe();
    }

    previousPage(): void {
        this.postsStoreService.previousPage().subscribe();
    }

    postNow(post: Post): void {
        this.postsStoreService.postNow(post).subscribe();
    }

    unpost(post: Post): void {
        this.postsStoreService.unpost(post).subscribe();
    }

    getCategoryName(categoryId: number | null): string {
        if (categoryId === null || categoryId === undefined) {
            return UNCATEGORIZED_LABEL;
        }
        const category = this.postsQuery.getCategories().find(category => String(category.id) === String(categoryId));
        return category ? category.name : UNCATEGORIZED_LABEL;
    }

    excerpt(content: string): string {
        const plainText = this.stripHtml(content);
        if (plainText.length <= EXCERPT_LENGTH) {
            return plainText;
        }
        return plainText.slice(0, EXCERPT_LENGTH).trimEnd() + '…';
    }

    private stripHtml(html: string): string {
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
}
