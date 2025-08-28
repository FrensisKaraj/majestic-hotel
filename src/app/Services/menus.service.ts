import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { MenuProduct } from '../Models/MenuProduct';
import { UsersService } from './users.service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  morningMenu: BehaviorSubject<MenuProduct[] | null> = new BehaviorSubject<MenuProduct[] | null>(null);
  menu: BehaviorSubject<MenuProduct[] | null> = new BehaviorSubject<MenuProduct[] | null>(null);
  drinks: BehaviorSubject<MenuProduct[] | null> = new BehaviorSubject<MenuProduct[] | null>(null);

  user: User | null = null;

  constructor(private http: HttpClient, private usersService: UsersService) {
    this.usersService.userSubject.subscribe((u) => (this.user = u));
  }

  URL = 'https://ezaszpkcccegxlhbcgpw.supabase.co';
  APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YXN6cGtjY2NlZ3hsaGJjZ3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzI5MjEsImV4cCI6MjA3MTQ0ODkyMX0.CIVNnI1ZULLwVXUDhbyXajo8H32sPyXdriSqUcEyUNY';

  getMenus() {
    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.APIkey}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(`${this.URL}/rest/v1/menu_products?select=id,name,image,description,price,menu_type(menu_type),product_type(product_type)`, { headers }).pipe(
      map((res) =>
        res.map((r) => ({
          id: r.id,
          image: r.image,
          name: r.name,
          description: r.description,
          menu_type: r.menu_type.menu_type,
          product_type: r.product_type.product_type,
          price: r.price,
        })),
      ),
      tap((res) => {
        this.populateMorningMenu(res);
        this.populateMenu(res);
        this.populateDrinks(res);
      }),
    );
  }

  populateMorningMenu(menu: MenuProduct[]) {
    let newMenu: MenuProduct[] = [];

    menu.forEach((product) => {
      if (product.menu_type === 'morning') {
        newMenu.push(product);
      }
      this.morningMenu.next(newMenu);
    });
  }

  populateMenu(menu: MenuProduct[]) {
    let newMenu: MenuProduct[] = [];

    menu.forEach((product) => {
      if (product.menu_type === 'menu') {
        newMenu.push(product);
      }
      this.menu.next(newMenu);
    });
  }

  populateDrinks(menu: MenuProduct[]) {
    let newMenu: MenuProduct[] = [];

    menu.forEach((product) => {
      if (product.menu_type === 'drinks') {
        newMenu.push(product);
      }
      this.drinks.next(newMenu);
    });
  }

  addProduct(product: MenuProduct) {
    const body = this.convertProduct(product);

    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.user?.access_token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.URL}/rest/v1/menu_products`, body, { headers }).pipe(tap(() => this.getMenus().subscribe()));
  }

  convertProduct(product: MenuProduct) {
    switch (product.menu_type) {
      case 'morning':
        product.menu_type = 1;
        break;
      case 'menu':
        product.menu_type = 2;
        break;
      case 'drinks':
        product.menu_type = 3;
        break;
    }

    switch (product.product_type) {
      case 'salad':
        product.product_type = 1;
        break;
      case 'food':
        product.product_type = 2;
        break;
      case 'desert':
        product.product_type = 3;
        break;
      case 'cocktail':
        product.product_type = 4;
        break;
      case 'cold_drink':
        product.product_type = 5;
        break;
      case 'hot_drink':
        product.product_type = 6;
        break;
    }

    return {
      image: product.image,
      name: product.name,
      description: product.description,
      menu_type: product.menu_type,
      product_type: product.product_type,
      price: product.price,
    };
  }

  deleteProduct(id: number) {
    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.user?.access_token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.URL}/rest/v1/menu_products?id=eq.${id}`, { headers }).pipe(
      tap((res) => {
        if (res) {
          this.getMenus().subscribe();
        } else {
          alert('Feature currently disabled as this page is used for demonstration purposes!');
        }
      }),
    ); //the ifelse is for when the app is on github and rls policies for this purpose are removed
  }

  getSpecificProduct(id: number) {
    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.APIkey}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(`${this.URL}/rest/v1/menu_products?select=id,name,image,description,price,menu_type(menu_type),product_type(product_type)&id=eq.${id}`, { headers }).pipe(
      map((res) => {
        const r = res[0];
        return {
          id: r.id,
          image: r.image,
          name: r.name,
          description: r.description,
          menu_type: r.menu_type.menu_type,
          product_type: r.product_type.product_type,
          price: r.price,
        };
      }),
    );
  }

  editProduct(product: any, id: number) {
    const body = this.convertProduct(product);

    const headers = new HttpHeaders({
      apikey: this.APIkey,
      Authorization: `Bearer ${this.user?.access_token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch(`${this.URL}/rest/v1/menu_products?id=eq.${id}`, body, { headers }).pipe(
      tap((res) => {
        if (res) {
          this.getMenus().subscribe();
        } else {
          alert('Feature currently disabled as this page is used for demonstration purposes!');
        }
      }),
    ); //the ifelse is for when the app is on github and rls policies for this purpose are removed
  }
}
