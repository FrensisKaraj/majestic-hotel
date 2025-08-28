import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { WebpageComponent } from './webpage/webpage.component';
import { HomeComponent } from './webpage/body/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: '', component: WebpageComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'reviews', loadChildren: () => import('./webpage/body/reviws/reviews.module').then(m => m.ReviewsModule) },
    {path: 'menus', loadChildren: () => import('./webpage/body/menus/menus.module').then(m => m.MenusModule)},
    {path: 'rooms', loadChildren: () => import('./webpage/body/rooms/rooms.module').then(m => m.RoomsModule)},
  ]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
