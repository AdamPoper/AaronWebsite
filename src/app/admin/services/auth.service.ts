import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { EnvService } from "../../services/env.service";

type AuthResponse = {
    authenticated: boolean;
}

const AUTH_TOKEN_KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient,
                private envService: EnvService
    ) { }

    public login(username: string, password: string): Observable<boolean> {
        const token = this.buildAuthToken(username, password);
        return this.http.get<AuthResponse>(`${this.envService.apiBaseUrl}/auth/check`, {
            headers: {
                Authorization: `Basic ${token}`
            }
        }).pipe(map((response: AuthResponse) => {
            if (response.authenticated) {
                sessionStorage.setItem(AUTH_TOKEN_KEY, token);
            }
            return response.authenticated;
        }));
    }

    public buildAuthToken(username: string, password: string): string {
        return btoa(`${username}:${password}`);
    }

    public getAuthToken(): string | null {
        return sessionStorage.getItem(AUTH_TOKEN_KEY);
    }

    public isAuthenticated(): boolean {
        return !!sessionStorage.getItem(AUTH_TOKEN_KEY);
    }

    public logout(): void {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
}