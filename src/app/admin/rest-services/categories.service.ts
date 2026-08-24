import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnvService } from "src/app/services/env.service";
import { Category } from "../model/category.model";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient,
                private env: EnvService,
                private authService: AuthService
    ) { }

    public fetchCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.env.apiBaseUrl}/categories`, {
            headers: this.authHeaders()
        });
    }

    public createCategory(name: string): Observable<Category> {
        return this.http.post<Category>(`${this.env.apiBaseUrl}/categories/create`, { name }, {
            headers: this.authHeaders()
        });
    }

    public deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.env.apiBaseUrl}/categories/${id}`, {
            headers: this.authHeaders()
        });
    }

    private authHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Basic ${this.authService.getAuthToken()}`
        });
    }
}