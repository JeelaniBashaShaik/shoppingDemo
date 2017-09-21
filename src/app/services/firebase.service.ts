import {AuthService} from './auth.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
@Injectable()
export class FirebaseService {
    af:AngularFireAuth;
    router:Router;
    requestToken:string;
    user:Observable<firebase.User>
_authService:AuthService=new AuthService(this.af,this.router);
    constructor(private http:Http,private afAuth:AngularFireAuth) {     
        this.user = this.afAuth.authState;
       /*  this.user.subscribe(data=>{
            data.getIdToken(true).then(token=>{
                this.requestToken = token;
                //console.log(this.requestToken);
            })
        }) */
        //console.log(this.requestToken);
       //console.log(this._authService.requestToken);
  /*      //console.log(this.http.get('http://push.cricbuzz.com/match-api/18462/commentary.json').map(res=>res.json()).subscribe(data=>{
           //console.log(data);
       })); */
         }


  fetchCategories(){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Lists/CategoriesList.json').map(res => res.json())
  }

  fetchDepartments(){   
     return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Lists/DepartmentsList.json').map(res => res.json())
  }

  fetchSubCategories(){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Lists/SubCategoriesList.json').map(res => res.json())
  }

   fetchClasses(){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Lists/ProductsList.json').map(res => res.json())
  }

  fetchSpecificDepartment(department){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Products_List/'+ department + '.json').map(res => res.json())
  }

    fetchSpecificCategory(department,category){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Products_List/'+ department + '/' + category + '/' + '.json').map(res => res.json())
  }

  fetchSpecificSubCategory(d,c,s){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/Products_List/'+ d + '/' + c + '/' + s + '/'+ '.json').map(res => res.json())
  }

  fetchTodaysDeals(){
      return this.http.get('https://shoppingdemo-e8235.firebaseio.com/TodaysDealsProductsList.json').map(res=>res.json())
  }

}
