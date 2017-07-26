import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule }     from './app-routing.module';
import {HttpModule} from "@angular/http";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AngularFireModule} from 'angularfire2';
import { AuthService } from './services/auth.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyCYozTNiEyOyUKVl_1DLoY9hJPgddlxKVE",
    authDomain: "shoppingdemo-e8235.firebaseapp.com",
    databaseURL: "https://shoppingdemo-e8235.firebaseio.com",
    storageBucket: "shoppingdemo-e8235",
    messagingSenderId: "383193231090"
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,NgxDatatableModule,
    AppRoutingModule,HttpModule,    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
