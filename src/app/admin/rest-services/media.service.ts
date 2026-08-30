import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnvService } from "src/app/services/env.service";
import { AuthService } from "../services/auth.service";
import { UploadResponse } from "../model/media.model";

@Injectable({
    providedIn: 'root'
})
export class MediaService {
    constructor(private http: HttpClient,
                private env: EnvService,
                private authService: AuthService
    ) { }

    public uploadImage(file: File): Observable<UploadResponse> {
        const formData = new FormData();
        formData.append('image', file);

        return this.http.post<UploadResponse>(`${this.env.apiBaseUrl}/media/upload`, formData, {
            headers: this.authHeaders()
        });
    }

    private authHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Basic ${this.authService.getAuthToken()}`
        });
    }
}