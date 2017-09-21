import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent }  from './login-page/login-page.component';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthService} from './services/auth.service';
 
const routes: Routes = [
   { path: '',component: LoginPageComponent },
  { path: 'login-page',component: LoginPageComponent },
  { path: 'home-page',component: HomePageComponent,canActivate:[AuthService] },
    { path: 'customer',component: CustomerComponent,canActivate:[AuthService] },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}