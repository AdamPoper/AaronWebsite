import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BlogPostResponse } from "src/app/pages/models/blog-post-response.model";
import { EnvService } from "src/app/services/env.service";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient, private env: EnvService) { }

    public fetchPosts(page: number, pageSize: number): Observable<BlogPostResponse> {
        const params = new HttpParams()
            .set('pageNumber', page)
            .set('pageSize', pageSize);

        return this.http.get<BlogPostResponse>(`${this.env.apiBaseUrl}/posts/get`, { params });
    }
}