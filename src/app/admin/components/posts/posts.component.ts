import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostsStoreService } from '../../state/services/posts.store.service';
import { PostsQuery } from '../../state/queries/posts.query';

const EXCERPT_LENGTH = 160;

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    readonly currentPagePosts$ = this.postsQuery.currentPagePosts$;

    readonly totalPages$ = this.postsQuery.totalPages$;

    readonly currentPageDisplay$ = this.postsQuery.currentPage$.pipe(
        map(currentPage => currentPage + 1)
    );

    constructor(private postsStoreService: PostsStoreService,
                private postsQuery: PostsQuery
    ) { }

    ngOnInit(): void {
        this.nextPage();
    }

    nextPage(): void {
        this.postsStoreService.nextPage().subscribe();
    }

    previousPage(): void {
        this.postsStoreService.previousPage().subscribe();
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
