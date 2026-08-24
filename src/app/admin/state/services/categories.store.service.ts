import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PostStore } from "../post.store";
import { CategoriesService } from "../../rest-services/categories.service";
import { Category } from "../../model/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriesStoreService {
    constructor(private categoriesService: CategoriesService,
                private postStore: PostStore
    ) { }

    public fetchCategories(): Observable<Category[]> {
        return this.categoriesService.fetchCategories().pipe(
            tap(categories => this.postStore.update({ categories }))
        );
    }

    public createCategory(name: string): Observable<Category> {
        return this.categoriesService.createCategory(name).pipe(
            tap(category => this.postStore.update(state => ({
                ...state,
                categories: [...state.categories, category]
            })))
        );
    }

    public deleteCategory(id: number): Observable<void> {
        return this.categoriesService.deleteCategory(id).pipe(
            tap(() => this.postStore.update(state => ({
                ...state,
                categories: state.categories.filter(category => category.id !== id)
            })))
        );
    }
}