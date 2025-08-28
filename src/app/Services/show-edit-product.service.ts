import { EventEmitter, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuProduct } from '../Models/MenuProduct';
import { MenusService } from './menus.service';

@Injectable({
  providedIn: 'root',
})
export class ShowEditProductService {
  productSubject: BehaviorSubject<MenuProduct | null> = new BehaviorSubject<MenuProduct | null>(null);

  menusService = inject(MenusService);

  constructor() {}

  changeValue(id: number | null) {
    if (id) {
      this.menusService.getSpecificProduct(id).subscribe((product) => this.productSubject.next(product));
    } else {
      this.productSubject.next(null);
    }
  }
}
