import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
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

    constructor(private http: HttpClient, private envService: EnvService) { }

    public loadMore(): Observable<BlogPost[]> {
        const page = this.currentPageSubject.value;

        return this.fetchPosts(page, PAGE_SIZE).pipe(
            map((response: BlogPostResponse) => {
                this.postsSubject.next([...this.postsSubject.value, ...response.posts]);
                this.currentPageSubject.next(page + 1);
                return response.posts;
            })
        );
    }

    private fetchPosts(page: number, pageSize: number): Observable<BlogPostResponse> {
        const params = new HttpParams()
            .set('pageNumber', page)
            .set('pageSize', pageSize);

        return this.http.get<BlogPostResponse>(`${this.envService.apiBaseUrl}/posts/get`, { params });
    }
}
