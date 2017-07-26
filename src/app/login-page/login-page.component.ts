import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

 user: Observable<firebase.User>;
imageUrl:string;
userName:string;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router:Router) {
    this.user = this.afAuth.authState;
  }
ngOnInit() {
    
  }
login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
let fireBaseUser = firebase.auth().currentUser;

this.user.subscribe(data =>{
  console.log(data);
  if(data != null){
 this.imageUrl = data.photoURL;
 this.userName = data.displayName;
 console.log('Im in');
  }
 
  /* this.imageUrl = this.afAuth.auth.currentUser.photoURL; */
});
}
fetch(){
  console.log(this.afAuth.auth.currentUser);
  this.imageUrl = this.afAuth.auth.currentUser.photoURL;
}
logout() {
    this.afAuth.auth.signOut();
    this.imageUrl = "";
    this.userName = "";
   this.router.navigateByUrl("home-page");
}
 /* sample text */
}
