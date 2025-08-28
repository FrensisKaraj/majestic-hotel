import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MenuProduct } from '../../../../Models/MenuProduct';
import { MenusService } from '../../../../Services/menus.service';
import { UsersService } from '../../../../Services/users.service';
import { User } from '../../../../Models/User';
import { ShowEditProductService } from '../../../../Services/show-edit-product.service';

@Component({
  selector: 'app-drinks',
  standalone: false,
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.css',
})
export class DrinksComponent implements OnInit {
  menusService = inject(MenusService);

  usersService = inject(UsersService);

  showEditProductService = inject(ShowEditProductService);

  showEditProduct: boolean = false;

  user: User | null = null;

  menu: MenuProduct[] | null = [];

  cocktails: MenuProduct[] = [];
  hotDrinks: MenuProduct[] = [];
  coldDrinks: MenuProduct[] = [];

  ngOnInit(): void {
    this.menusService.drinks.subscribe((menu) => {
      this.cocktails = [];
      this.hotDrinks = [];
      this.coldDrinks = [];

      if (menu) {
        menu.forEach((element) => {
          switch (element.product_type) {
            case 'cocktail':
              this.cocktails.push(element);
              break;
            case 'hot_drink':
              this.hotDrinks.push(element);
              break;
            case 'cold_drink':
              this.coldDrinks.push(element);
              break;
          }
        });
      }
    });

    this.usersService.userSubject.subscribe((user) => (this.user = user));

    this.showEditProductService.productSubject.subscribe((product) => {
      if (product) {
        this.showEditProduct = true;
      } else {
        this.showEditProduct = false;
      }
    });
  }

  onDelete(id: number) {
    const confirmation = confirm('Do you really want to delete this product?');
    if (confirmation) {
      this.menusService.deleteProduct(id).subscribe();
    }
  }

  onEdit(id: number) {
    this.showEditProductService.changeValue(id);
  }
}
