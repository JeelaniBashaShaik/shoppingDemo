import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent }  from './login-page/login-page.component';

 
const routes: Routes = [
 
  { path: 'login-page',component: LoginPageComponent },
  { path: 'home-page',component: HomePageComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}