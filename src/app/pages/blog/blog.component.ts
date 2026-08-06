import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

	private stripHtml(html: string): string {
		return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	}
}
