import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnvService } from "src/app/services/env.service";
import { CreatePostRequest, Post } from "../model/post.model";
import { PostResponse } from "../model/post-response.model";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient,
                private env: EnvService,
                private authService: AuthService
    ) { }

    public fetchPosts(page: number, pageSize: number): Observable<PostResponse> {
        const params = new HttpParams()
            .set('pageNumber', page)
            .set('status', 'all')
            .set('pageSize', pageSize);

        return this.http.get<PostResponse>(`${this.env.apiBaseUrl}/posts/get`, {
            params,
            headers: this.authHeaders()
        });
    }

    public createPost(post: CreatePostRequest): Observable<Post> {
        return this.http.post<Post>(`${this.env.apiBaseUrl}/posts/create`, post, {
            headers: this.authHeaders()
        });
    }

    public fetchPostBySlug(slug: string): Observable<Post> {
        return this.http.get<Post>(`${this.env.apiBaseUrl}/posts/${slug}`, {
            headers: this.authHeaders()
        });
    }

    public updatePost(slug: string, post: CreatePostRequest): Observable<Post> {
        return this.http.put<Post>(`${this.env.apiBaseUrl}/posts/${slug}`, post, {
            headers: this.authHeaders()
        });
    }

    private authHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Basic ${this.authService.getAuthToken()}`
        });
    }
}