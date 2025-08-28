import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private refreshTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  URL = 'https://ezaszpkcccegxlhbcgpw.supabase.co';
  APIkey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YXN6cGtjY2NlZ3hsaGJjZ3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzI5MjEsImV4cCI6MjA3MTQ0ODkyMX0.CIVNnI1ZULLwVXUDhbyXajo8H32sPyXdriSqUcEyUNY';
  createUser(email: string, password: string) {
    const body = { email, password };

    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.APIkey}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.URL}/auth/v1/signup`, body, { headers });
  }

  login(email: string, password: string) {
    const body = { email, password };

    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.APIkey}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<User>(`${this.URL}/auth/v1/token?grant_type=password`, body, {
        headers,
      })
      .pipe(
        map((res: any) => ({
          access_token: res.access_token,
          expires_at: res.expires_at,
          expires_in: res.expires_in,
          refresh_token: res.refresh_token,
          user_id: res.user.id,
        })),
        switchMap((user) => this.addRole(user)),
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));
        }),
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  autologin(user: User | null) {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!user) {
      const saved = localStorage.getItem('user');
      if (!saved) {
        return;
      } else {
        user = JSON.parse(saved) as User;
        this.userSubject.next(user);
      }
    }

    const ExpiresInMs = user.expires_at * 1000 - Date.now();

    if (ExpiresInMs <= 0) {
      this.refreshToken(user.refresh_token).subscribe({
        next: (newUser) => {
          localStorage.setItem('user', JSON.stringify(newUser));
          this.userSubject.next(newUser);
        },
        error: () => this.logout(),
      });
    } else {
      this.refreshTimer = setTimeout(() => {
        this.refreshToken(user.refresh_token).subscribe({
          next: (newUser) => {
            localStorage.setItem('user', JSON.stringify(newUser));
            this.userSubject.next(newUser);
          },
          error: () => this.logout(),
        });
      }, ExpiresInMs);
    }
  }

  refreshToken(token: string) {
    const body = { refresh_token: token };

    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.APIkey}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<User>(`${this.URL}/auth/v1/token?grant_type=refresh_token`, body, {
        headers,
      })
      .pipe(
        map((res: any) => ({
          access_token: res.access_token,
          expires_at: res.expires_at,
          expires_in: res.expires_in,
          refresh_token: res.refresh_token,
          user_id: res.user.id,
        })),
        switchMap((user) => this.addRole(user)),
      );
  }

  addRole(user: any) {
    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${user.access_token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .get<any[]>(`${this.URL}/rest/v1/user_roles?select=role&user_id=eq.${user.user_id}`, { headers })
      .pipe(
        map((res) => {
          const role = res.length > 0 ? res[0].role : null;
          return {
            ...user,
            role: role,
          };
        }),
      );
  }
}
