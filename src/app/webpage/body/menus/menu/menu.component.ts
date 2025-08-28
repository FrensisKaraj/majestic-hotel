import { Component, inject, OnInit } from '@angular/core';
import { MenusService } from '../../../../Services/menus.service';
import { MenuProduct } from '../../../../Models/MenuProduct';
import { UsersService } from '../../../../Services/users.service';
import { User } from '../../../../Models/User';
import { ShowEditProductService } from '../../../../Services/show-edit-product.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  menusService = inject(MenusService);

  usersService = inject(UsersService);

  showEditProductService = inject(ShowEditProductService);

  showEditProduct: boolean = false;

  user: User | null = null;

  menu: MenuProduct[] | null = [];

  salads: MenuProduct[] = [];
  foods: MenuProduct[] = [];
  deserts: MenuProduct[] = [];

  ngOnInit(): void {
    this.menusService.menu.subscribe((menu) => {
      this.salads = [];
      this.foods = [];
      this.deserts = [];

      if (menu) {
        menu.forEach((element) => {
          switch (element.product_type) {
            case 'salad':
              this.salads.push(element);
              break;
            case 'food':
              this.foods.push(element);
              break;
            case 'desert':
              this.deserts.push(element);
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
