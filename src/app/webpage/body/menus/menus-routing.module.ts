import { RouterModule, Routes } from "@angular/router";
import { MenusComponent } from "./menus.component";
import { NgModule } from "@angular/core";
import { MorningComponent } from "./morning/morning.component";
import { MenuComponent } from "./menu/menu.component";
import { DrinksComponent } from "./drinks/drinks.component";

const routes: Routes = [
  {path: '', component: MenusComponent},
  {path: 'morning', component: MorningComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'drinks', component: DrinksComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenusRouterModule {}