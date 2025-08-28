import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReviwsComponent } from "./reviws.component";

const routes: Routes = [
  {path: '', component: ReviwsComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReviewsRouterModule {}