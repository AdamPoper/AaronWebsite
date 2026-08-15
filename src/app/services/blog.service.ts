import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { EnvService } from "./env.service";
import { BlogPost } from "../pages/models/blog-post.model";
import { BlogPostResponse } from "../pages/models/blog-post-response.model";

const PAGE_SIZE = 5;

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private postsSubject = new BehaviorSubject<BlogPost[]>([]);
    readonly posts$ = this.postsSubject.asObservable();

    private currentPageSubject = new BehaviorSubject<number>(0);
    readonly currentPage$ = this.currentPageSubject.asObservable();

    private currentPostSubject = new BehaviorSubject<BlogPost | null>(null);
    readonly currentPost$ = this.currentPostSubject.asObservable();

    private totalCountSubject = new BehaviorSubject<number>(0);
    readonly totalCount$ = this.totalCountSubject.asObservable();

    constructor(private http: HttpClient, private envService: EnvService) { }

    public loadMore(): Observable<BlogPost[]> {
        const page = this.currentPageSubject.value;

        return this.fetchPosts(page, PAGE_SIZE).pipe(
            map((response: BlogPostResponse) => {
                this.postsSubject.next([...this.postsSubject.value, ...response.posts]);
                this.currentPageSubject.next(page + 1);
                this.totalCountSubject.next(response.total);
                return response.posts;
            })
        );
    }

    public fetchPost(slug: string): Observable<BlogPost> {
        return this.http.get<BlogPost>(`${this.envService.apiBaseUrl}/posts/${slug}`).pipe(
            tap(post => this.currentPostSubject.next(post))
        );
    }

    private fetchPosts(page: number, pageSize: number): Observable<BlogPostResponse> {
        const params = new HttpParams()
            .set('pageNumber', page)
            .set('pageSize', pageSize);

        return this.http.get<BlogPostResponse>(`${this.envService.apiBaseUrl}/posts/get`, { params });
    }
}
