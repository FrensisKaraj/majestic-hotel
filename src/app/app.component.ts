import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './Services/users.service';
import { User } from './Models/User';
import { MenusService } from './Services/menus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  usersService = inject(UsersService);

  menusService = inject(MenusService);

  ngOnInit(): void {
    this.usersService.userSubject.subscribe(user => this.usersService.autologin(user));

    this.menusService.getMenus().subscribe();

    alert("Please read the README.md file before browsing the page!")
  }
}