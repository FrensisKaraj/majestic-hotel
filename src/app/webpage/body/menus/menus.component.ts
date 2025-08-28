import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenusService } from '../../../Services/menus.service';
import { UsersService } from '../../../Services/users.service';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-menus',
  standalone: false,
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent implements OnInit {
  router = inject(Router);

  usersService = inject(UsersService);

  show: boolean = false;

  user: User | null = null;

  ngOnInit(): void {
    this.usersService.userSubject.subscribe((newUser) => (this.user = newUser));
  }

  changePage(menu: string) {
    this.router.navigate([`menus/${menu}`]);
  }

  editAddProduct(value: boolean) {
    this.show = value;
  }
}
