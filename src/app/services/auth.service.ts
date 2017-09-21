import * as firebase from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService implements CanActivate {
    user: Observable<firebase.User>;
    userName:string;
    photoUrl:string;
    requestToken:any;
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
constructor(private auth: AngularFireAuth, private router:Router) {

}

canActivate():Observable<boolean>{
  return Observable.from(this.auth.authState).take(1).map(state => !!state).do(authenticated =>{
    if(!authenticated) this.router.navigateByUrl('login-page');
  })
}

}