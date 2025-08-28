import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../Models/User';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Review } from '../Models/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  reviewsSubject: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient, private usersService: UsersService) {
    this.usersService.userSubject.subscribe((user) => {
      this.user = user;
    });
  }

  user: User | null = null;

  URL = 'https://ezaszpkcccegxlhbcgpw.supabase.co';
  APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YXN6cGtjY2NlZ3hsaGJjZ3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzI5MjEsImV4cCI6MjA3MTQ0ODkyMX0.CIVNnI1ZULLwVXUDhbyXajo8H32sPyXdriSqUcEyUNY';

  getReviews() {
    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.APIkey}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(`${this.URL}/rest/v1/reviews?select=id,stars,description,user_id,user_profiles(email)&user_profiles!inner&order=id.desc`, { headers }).pipe(
      map((reviews) =>
        reviews.map((r) => ({
          id: r.id,
          stars: r.stars,
          description: r.description,
          email: r.user_profiles.email,
          user_id: r.user_id,
        })),
      ),
      tap((rev) => {
        this.reviewsSubject.next(rev);
      }),
    );
  }

  addReview(stars: number, description: string | null) {
    const data: any = {
      stars,
      user_id: this.user?.user_id,
    };

    if (description !== null && description !== undefined) {
      data.description = description;
    }

    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.user?.access_token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.URL}/rest/v1/reviews`, data, { headers }).pipe(tap(() => this.getReviews().subscribe()));
  }

  deleteReview(id: number) {
    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.user?.access_token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.URL}/rest/v1/reviews?id=eq.${id}`, { headers }).pipe(
      tap((res) => {
        if (res) {
          this.getReviews().subscribe();
        } else {
          alert('Feature currently disabled as this page is used for demonstration purposes!');
        }
      }), //the ifelse is for when the app is on github and rls policies for this purpose are removed
    );
  }
}
