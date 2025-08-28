import { NgModule } from "@angular/core";
import { ReviwsComponent } from "./reviws.component";
import { SharedModule } from "../../../shared.module";
import { ReviewsRouterModule } from "./reviews-routing.module";

@NgModule({
  declarations: [
    ReviwsComponent
  ],
  imports: [
    SharedModule,
    ReviewsRouterModule
  ]
})

export class ReviewsModule {}