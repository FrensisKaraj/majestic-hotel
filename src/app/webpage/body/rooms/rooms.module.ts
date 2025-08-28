import { NgModule } from "@angular/core";
import { RoomsComponent } from "./rooms.component";
import { SharedModule } from "../../../shared.module";
import { RoomsRouterModule } from "./rooms-routing.module";

@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    SharedModule,
    RoomsRouterModule
  ]
})

export class RoomsModule {}