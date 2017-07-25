import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule }     from './app-routing.module';
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,NgxDatatableModule,
    AppRoutingModule,
        HttpModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
