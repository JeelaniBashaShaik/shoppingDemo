import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Http, HttpModule ,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
imageUrl:string;
userName:string;
isLoggedIn:boolean;
currentDepartment:string;
currentCategory:string;
currentSubCategory:string;
isDepartmentSelected:boolean;
  isCategorySelected:boolean;
  issubCategorySelected:boolean;
  isProductSelected:boolean;
 user: Observable<firebase.User>;
 

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,private _productService:ProductService, private router:Router) {
        this.user = this.afAuth.authState;
   }

ngOnInit(){
this.issubCategorySelected = false;
    this.isCategorySelected=false;
    this.isDepartmentSelected=false;
    this.isProductSelected=false;
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
 this.isLoggedIn = true;
 this.router.navigateByUrl('home-page');
  }
 
  /* this.imageUrl = this.afAuth.auth.currentUser.photoURL; */
});
}

setDepartment(){
  this.currentDepartment = this._productService.selectedDepartment;
  this.isDepartmentSelected = true;
  this.isCategorySelected = false;
  this.issubCategorySelected=false;
}

setCategory(){
  this.currentCategory = this._productService.selectedCategory;
  this.isCategorySelected = true;
  this.issubCategorySelected =false;
}

setSubCategory(){
  this.currentSubCategory = this._productService.selectedSubCategory;
  this.issubCategorySelected = true;
}

setProduct(){

}

shiftToDepartment(){
      this.isCategorySelected=false;
      this.issubCategorySelected = false;
      this.isDepartmentSelected=true;
      
    }

    shiftToCategory(){
      this.issubCategorySelected = false;
      this.isCategorySelected = true;
    }

    shiftToSubCategory(){
    }

    shiftToHome(){
      this.isDepartmentSelected=false;
    }

logout() {
    this.afAuth.auth.signOut();
    this.imageUrl = "";
    this.userName = "";
    this.isLoggedIn= false;
   this.router.navigateByUrl("home-page");
}
  
call(){
  this.router.navigateByUrl("login-page");
}

goToHomePage(){
  this.router.navigateByUrl('home-page');
}
}
