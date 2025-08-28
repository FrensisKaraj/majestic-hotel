import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usersService = inject(UsersService);

  loggedIn = false

  ngOnInit(): void {
    this.usersService.userSubject.subscribe(user => {
      if(user !== null){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  onLogout(){
    this.usersService.logout();
  }
}
