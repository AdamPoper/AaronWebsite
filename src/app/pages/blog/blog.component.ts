import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../models/blog-post.model';

const EXCERPT_LENGTH = 160;

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
	posts$: Observable<BlogPost[]> = this.blogService.posts$;
	totalCount$: Observable<number> = this.blogService.totalCount$;

	isTotalCountReached$: Observable<boolean> = combineLatest([this.posts$, this.totalCount$]).pipe(
		map(([posts, totalCount]) => posts.length >= totalCount)
	);

	hasNoPosts$: Observable<boolean> = combineLatest([this.posts$, this.totalCount$]).pipe(
		map(([posts, totalCount]) => posts.length === 0 && totalCount === 0)
	);

	constructor(private blogService: BlogService) { }

	ngOnInit(): void {
		this.blogService.loadMore().subscribe();
	}

	excerpt(content: string): string {
		const plainText = this.stripHtml(content);
		if (plainText.length <= EXCERPT_LENGTH) {
			return plainText;
		}
		return plainText.slice(0, EXCERPT_LENGTH).trimEnd() + '…';
	}

	loadMore(): void {
		this.blogService.loadMore().subscribe();
	}

	private stripHtml(html: string): string {
		return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	}
}
