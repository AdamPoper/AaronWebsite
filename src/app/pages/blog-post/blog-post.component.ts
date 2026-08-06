import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
	styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
	post$: Observable<BlogPost | null> = this.blogService.currentPost$;

	constructor(
		private route: ActivatedRoute,
		private blogService: BlogService
	) { }

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get('slug');
		if (slug) {
			this.blogService.fetchPost(slug).subscribe();
		}
	}
}
