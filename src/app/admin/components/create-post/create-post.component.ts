import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsStoreService } from '../../state/services/posts.store.service';
import { CategoriesStoreService } from '../../state/services/categories.store.service';
import { PostsQuery } from '../../state/queries/posts.query';
import { Post, PostStatus } from '../../model/post.model';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
	readonly categories$ = this.postsQuery.categories$;

	title = '';
	content = '';
	category_id: number | null = null;

	private editingSlug: string | null = null;

	compareCategoryIds(a: number | null, b: number | null): boolean {
		return String(a) === String(b);
	}

	constructor(
		private postsStoreService: PostsStoreService,
		private categoriesStoreService: CategoriesStoreService,
		private postsQuery: PostsQuery,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.categoriesStoreService.fetchCategories().subscribe();

		this.editingSlug = this.route.snapshot.paramMap.get('slug');
		if (this.editingSlug) {
			this.postsStoreService.fetchPostBySlug(this.editingSlug).subscribe(post => {
				this.title = post.title;
				this.content = post.content;
				this.category_id = post.category_id;
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
		const payload = {
			title: this.title,
			content: this.content,
			category_id: this.category_id,
			post_status
		};

		const request$: Observable<Post> = this.editingSlug
			? this.postsStoreService.updatePost(this.editingSlug, payload)
			: this.postsStoreService.createPost(payload);

		request$.subscribe(() => this.router.navigate(['/admin']));
	}
}