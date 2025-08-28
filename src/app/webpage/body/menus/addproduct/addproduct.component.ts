import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { notDefaultValidator } from '../../../../Validators/notDefaultValidator';
import { MenusService } from '../../../../Services/menus.service';
import { ShowEditProductService } from '../../../../Services/show-edit-product.service';
import { MenuProduct } from '../../../../Models/MenuProduct';

@Component({
  selector: 'app-addproduct',
  standalone: false,
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent implements OnInit {
  showEditProductService = inject(ShowEditProductService);

  editMode: boolean = false;

  selectedProduct: MenuProduct | null = null;

  productForm!: FormGroup;

  menusService = inject(MenusService);

  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  wrongSubmit: boolean = false;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]),
      menu_type: new FormControl('default', [Validators.required, notDefaultValidator('default')]),
      product_type: new FormControl('default', [Validators.required, notDefaultValidator('default')]),
    });

    this.showEditProductService.productSubject.subscribe((product) => {
      if (product) {
        this.editMode = true;

        this.selectedProduct = product;

        this.productForm.patchValue({
          name: product.name,
          image: product.image,
          description: product.description,
          price: product.price,
          menu_type: product.menu_type,
          product_type: product.product_type,
        });
      } else {
        this.editMode = false;

        this.productForm.reset({
          name: '',
          image: '',
          description: '',
          price: '',
          menu_type: 'default',
          product_type: 'default',
        });

        this.selectedProduct = null;
      }
    });
  }

  closeAddProduct() {
    if (this.editMode) {
      this.showEditProductService.changeValue(null);
    } else {
      this.closeEvent.emit(false);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.wrongSubmit = false;

      if (this.editMode) {
        this.menusService.editProduct(this.productForm.value, this.selectedProduct?.id!).subscribe(() => {
          this.closeAddProduct();
        });
      } else {
        this.menusService.addProduct(this.productForm.value).subscribe(() => {
          this.productForm.reset();
          this.closeAddProduct();
        });
      }
    } else {
      this.wrongSubmit = true;
    }
  }
}
