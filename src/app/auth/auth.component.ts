import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../Services/users.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  login = true;

  title = 'Login';
  description = "Don't have an account? Create one ";

  wrongSubmit = false;

  changeForm() {
    if (this.login === true) {
      this.loginForm.reset();
      this.title = 'Create Account';
      this.description = 'Already have an account? Login ';
      this.login = false;
    } else {
      this.loginForm.reset();
      this.title = 'Login';
      this.description = "Don't have an account? Create one ";
      this.login = true;
    }
  }

  loginForm!: FormGroup;

  router = inject(Router);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.usersService.userSubject.subscribe((user) => {
      if (user !== null) {
        this.router.navigate(['/home']);
      }
    });
  }

  usersService = inject(UsersService);

  onSubmit() {
    if (!this.loginForm.valid) {
      this.wrongSubmit = true;
      return;
    } else {
      if (this.login) {
        this.wrongSubmit = false;
        this.usersService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((user) => {
          console.log(user);
          this.usersService.userSubject.next(user);
          this.loginForm.reset();
        });
      } else {
        this.wrongSubmit = false;
        this.usersService.createUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(() => {
          this.loginForm.reset();
        });
      }
    }
  }
}
