import { Component, OnInit } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Customer } from './../models/Customer';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { CustomerService } from './../services/customer.service';
import * as firebase from 'firebase/app';
import { SuccessfulCheckOuts } from './../models/SuccessfulCheckOuts';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @LocalStorage() public username:string = 'hello world';
customersList:FirebaseListObservable<any[]>;
customer:Customer = new Customer();
 user: Observable<firebase.User>;
imageUrl:string;
userName:string;
isLoggedIn:boolean;
isNewCustomerFlag:boolean;
checkOuts:SuccessfulCheckOuts = new SuccessfulCheckOuts();
  constructor(protected storage: AsyncLocalStorage,private customerService: CustomerService, public afAuth: AngularFireAuth, public db: AngularFireDatabase,private auth:AuthService, private router:Router) {
    this.user = this.afAuth.authState;
    this.customersList = this.db.list('/Customers_List');
   /*  console.log(this.customersList.subscribe(data=>{
      console.log(data);
    })) */
    this.afAuth.authState.subscribe(auth=>{
      if(auth){
        this.customerService.currentCustomer.email = auth.email;
        this.customerService.currentCustomer.displayName = auth.displayName;
        this.router.navigateByUrl('home-page');
      }
    })
    
       // this.ProductsList = this.db.list('/Products_List');
  }
ngOnInit() {
    console.log(this.username);
    this.storage.setItem('lang', 'fr').subscribe(() => {
      // Done
    });
    this.storage.getItem('lang').subscribe((data) => {
  data; // null
  console.log(data);
}, () => {
  // Not called
});

  }


login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
let fireBaseUser = firebase.auth().currentUser;
var y:any;

this.user.subscribe(data =>{
  //console.log(data);
  if(data != null){
 this.imageUrl = data.photoURL;
 this.userName = data.displayName;
 this.customer.email = data.email;
 this.customer.displayName = data.displayName;
this.auth.userName = data.displayName;
this.auth.photoUrl = data.photoURL;
this.auth.requestToken = data.getIdToken(true).then(token=>{
  this.auth.requestToken = token;
  //console.log(data.toJSON())
  //console.log(this.auth.requestToken);
});

 this.customersList = this.db.list('/Customers_List');
    this.customersList.subscribe(data=>{
      console.log(data);
    })
 var query = this.db.database.ref('/Customers_List').orderByChild("email").equalTo(data.email).once("value", (snapshot)=> {
 var userData = snapshot.val();
    if (userData){
      console.log('user already exists');
    }else{
      console.log('user doesnt exits');
      this.checkOuts.checkOutDate='';
      this.checkOuts.checkOutPrice=0;
      this.checkOuts.itemId='';
      this.checkOuts.itemImage='';
      this.customer.cart=[''];
      this.customer.interests=[''];
      this.customer.viewedItems=[''];
      this.customer.wishList=[''];
      this.customer.checkOutsDone[0] = this.checkOuts;
      console.log(this.customer);
      this.customersList.push(this.customer);
    }
   console.log(userData);
  /* this.customerService.currentCustomer.email = data.email;
  this.customerService.currentCustomer.displayName = data.displayName; */
  this.customerService.currentCustomer = this.customer;
  
})
  /* if(y === true){
       console.log('i exist in db');
     }else if(y === false){
       console.log('i dont exist in db');
       //this.customersList.push('123')
     } */
 this.isLoggedIn = true;
 this.router.navigateByUrl('home-page');
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
    this.isLoggedIn= false;
   this.router.navigateByUrl("login-page");
}
 /* sample text */
}
