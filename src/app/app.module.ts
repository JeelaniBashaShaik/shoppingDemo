import { BrowserModule} from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import {HttpModule} from "@angular/http";
import { MaterializeModule } from "angular2-materialize";
import { DragulaModule} from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { DragDropService,DragDropConfig } from 'ng2-dnd';
import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
//import { WebStorageModule } from 'angular2-localstorage';
//import { MdlModule } from '@angular-mdl/core';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AngularFireModule} from 'angularfire2';
import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CustomerComponent } from './customer/customer.component';

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
    HomePageComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,NgxDatatableModule,MaterializeModule,FormsModule,
    AppRoutingModule,HttpModule,    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,DndModule,
    AngularFireAuthModule,DragulaModule,AsyncLocalStorageModule
  ],
  providers: [AuthService,FirebaseService,ProductService,DragDropService,DragDropConfig,LocalStorageService,CustomerService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
