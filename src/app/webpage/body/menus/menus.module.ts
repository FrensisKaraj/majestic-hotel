import { NgModule } from "@angular/core";
import { MenusComponent } from "./menus.component";
import { MorningComponent } from "./morning/morning.component";
import { MenuComponent } from "./menu/menu.component";
import { DrinksComponent } from "./drinks/drinks.component";
import { AddproductComponent } from "./addproduct/addproduct.component";
import { SharedModule } from "../../../shared.module";
import { MenusRouterModule } from "./menus-routing.module";

@NgModule({
  declarations: [
    MenusComponent,
    MorningComponent,
    MenuComponent,
    DrinksComponent,
    AddproductComponent
  ],
  imports: [
    SharedModule,
    MenusRouterModule
  ]
})

export class MenusModule {}