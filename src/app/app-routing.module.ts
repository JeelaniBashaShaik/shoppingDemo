import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent }  from './login-page/login-page.component';
import { AppComponent } from './app.component';
import { SpecificProdcutComponent } from './specific-prodcut/specific-prodcut.component';

 
const routes: Routes = [
   { path: '',component: HomePageComponent },
  { path: 'login-page',component: LoginPageComponent },
  { path: 'home-page',component: HomePageComponent ,
    children: [
      { path: 'specific-product',component:SpecificProdcutComponent },
    ]
  },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}