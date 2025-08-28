import { Component, inject, OnInit } from '@angular/core';
import { MenusService } from '../../../../Services/menus.service';
import { MenuProduct } from '../../../../Models/MenuProduct';
import { User } from '../../../../Models/User';
import { UsersService } from '../../../../Services/users.service';
import { ShowEditProductService } from '../../../../Services/show-edit-product.service';

@Component({
  selector: 'app-morning',
  standalone: false,
  templateUrl: './morning.component.html',
  styleUrl: './morning.component.css',
})
export class MorningComponent implements OnInit {
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
    this.menusService.morningMenu.subscribe((menu) => {
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
