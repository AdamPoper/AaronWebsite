import { Component, OnInit } from '@angular/core';
import { CategoriesStoreService } from '../../state/services/categories.store.service';
import { PostsQuery } from '../../state/queries/posts.query';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	readonly categories$ = this.postsQuery.categories$;

	newCategoryName = '';

	constructor(
		private categoriesStoreService: CategoriesStoreService,
		private postsQuery: PostsQuery
	) { }

	ngOnInit(): void {
		this.categoriesStoreService.fetchCategories().subscribe();
	}

	createCategory(): void {
		const name = this.newCategoryName.trim();
		if (!name) {
			return;
		}

		this.categoriesStoreService.createCategory(name).subscribe(() => {
			this.newCategoryName = '';
		});
	}

	deleteCategory(id: number): void {
		this.categoriesStoreService.deleteCategory(id).subscribe();
	}
}