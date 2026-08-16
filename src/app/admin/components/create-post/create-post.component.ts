import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsStoreService } from '../../state/services/posts.store.service';
import { Post, PostStatus } from '../../model/post.model';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
	title = '';
	content = '';

	private editingSlug: string | null = null;

	constructor(
		private postsStoreService: PostsStoreService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.editingSlug = this.route.snapshot.paramMap.get('slug');
		if (this.editingSlug) {
			this.postsStoreService.fetchPostBySlug(this.editingSlug).subscribe(post => {
				this.title = post.title;
				this.content = post.content;
			});
		}
	}

	saveDraft(): void {
		this.save('draft');
	}

	postNow(): void {
		this.save('posted');
	}

	private save(post_status: PostStatus): void {
		const payload = { title: this.title, content: this.content, post_status };

		const request$: Observable<Post> = this.editingSlug
			? this.postsStoreService.updatePost(this.editingSlug, payload)
			: this.postsStoreService.createPost(payload);

		request$.subscribe(() => this.router.navigate(['/admin']));
	}
}