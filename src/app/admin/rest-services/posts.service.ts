import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../model/post.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    public fetchPosts(page: number, pageSize: number): Observable<Post[]> {
        const params = new HttpParams()
            .set('pageNumber', page)
            .set('pageSize', pageSize);

        return this.http.get<Post[]>(`/api/posts`, { params });
    }
}