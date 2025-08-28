import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebpageComponent } from './webpage/webpage.component';
import { HeaderComponent } from './webpage/header/header.component';
import { BodyComponent } from './webpage/body/body.component';
import { FooterComponent } from './webpage/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './webpage/body/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ErrorInterceptor } from './Interceptors/errors-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WebpageComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
