import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../../Services/reviews.service';
import { Review } from '../../../Models/Review';
import { UsersService } from '../../../Services/users.service';

@Component({
  selector: 'app-reviws',
  standalone: false,
  templateUrl: './reviws.component.html',
  styleUrl: './reviws.component.css',
})
export class ReviwsComponent implements OnInit {
  reviewsService = inject(ReviewsService);

  usersService = inject(UsersService);

  user_id: string | null = null;

  reviews: Review[] = [];

  starValue = 0;

  submitWrong = false;

  starClick(value: number) {
    this.starValue = value;
  }

  reviewForm!: FormGroup;

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      stars: new FormControl(0, [Validators.required, Validators.min(1)]),
      description: new FormControl(''),
    });

    this.reviewsService.getReviews().subscribe();

    this.reviewsService.reviewsSubject.subscribe((rev) => {
      this.reviews = rev;
    });

    this.usersService.userSubject.subscribe((user) => {
      if (user) {
        this.user_id = user.user_id;
      } else {
        this.user_id = null;
      }
    });
  }

  onSubmit() {
    this.reviewForm.patchValue({
      stars: this.starValue,
    });

    if (this.reviewForm.valid) {
      this.submitWrong = false;
      this.reviewsService.addReview(this.reviewForm.value.stars, this.reviewForm.value.description).subscribe(() => {
        this.starValue = 0;
        this.reviewForm.reset();
      });
    } else {
      this.submitWrong = true;
    }
  }

  deleteReview(id: number) {
    const result = confirm('Do you really want to delete this review?');

    if (result) {
      this.reviewsService.deleteReview(id).subscribe();
    }
  }
}
