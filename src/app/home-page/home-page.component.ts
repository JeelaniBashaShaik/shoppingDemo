import { Component, OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import { Product } from './../models/product';
import {ProductService} from './../services/product.service';
import {AppComponent } from './../app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from './../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { CustomerService } from './../services/customer.service';
import { Customer } from './../models/Customer';
import { CheckOutProducts } from './../models/Customer';
declare var $:any;
declare var jQuery:any;
declare var window:any;
declare var ImageZoom:any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy,AfterViewInit {

countDownTimer(){
  console.log(this.todaysDelasExpiryTime);
  var countDownDate = new Date(this.todaysDelasExpiryTime).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML =  hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);
}

  ngAfterViewInit(){
  //  $('.owl-carousel').owlCarousel();
  }
  custCart:Array<CheckOutProducts> = new Array<CheckOutProducts>();
  currentProduct:Product = new Product();
  allDepartmentsList=[];
  specificCategoriesList=[];
  specificSubCategoriesList=[];
  productsToBeDisplayed:Array<any> = new Array<any>();
  currentDepartment:any;
  currentCategory:any;
  currentSubCategory:any;
  isDepartmentSelected:boolean;
  isCategorySelected:boolean;
  issubCategorySelected:boolean;
  isProductSelected:boolean;
  selectText:string;
  showRouterOutlet:boolean;
  displayAllProductsFlag:boolean;
  userName:string;
  photoUrl:string;
   user: Observable<firebase.User>;
  ProductsList:FirebaseListObservable<any[]>; 
  noProduct:string = 'There are no products available in this section yet!!'
  noProductsFlag:boolean;
  constructor(public afAuth: AngularFireAuth,private customerSerivce: CustomerService,private auth:AuthService,private router:Router,public db: AngularFireDatabase, private fb: FirebaseService,private _productService: ProductService) {
    this.ProductsList = this.db.list('/Products_List');
    ////console.log(this.db.database.ref('/Products_Lists'));
   }


   goToCustomer(){
     this.router.navigateByUrl('customer');
   }

   todaysDeals:Array<Product> = new Array<Product>();
   todaysDelasExpiryTime:string;
    fetchTodaysDeals(){
      this.fb.fetchTodaysDeals().subscribe(data=>{
        console.log(data);
        for(var i=0;i<data.a.list.length;i++){
          this.todaysDeals.unshift(data.a.list[i]);
        }
        this.todaysDelasExpiryTime = data.a.validUpto;
        console.log(this.todaysDelasExpiryTime);
      console.log(this.todaysDeals);
      //this.todaysDealsFlag = true;
      this.countDownTimer();
      })
      
  }
    todaysDealsFlag:boolean;
  ngOnInit() {
    this.todaysDealsFlag = true;
    $( document ).ready(function() {
      $(".button-collapse").sideNav();
      $('.carousel').carousel({
        noWrap:false ,
        indicators:true,
        duration:500,
        dist:0,
        shift:10
      });
       //jQuery(function($){$('.owl-carousel').owlCarousel();}); 
    });
    


    this.issubCategorySelected = false;
    this.isCategorySelected=false;
    this.isDepartmentSelected=false;
    this.isProductSelected=false;
    this.showRouterOutlet = false;
    this.displayAllProductsFlag = false;
    this.noProductsFlag=false;
    this.photoUrl = this.auth.photoUrl;
    this.userName = this.auth.userName;
    this.selectText = 'Select any Department to get Started';
    this.fb.fetchDepartments().subscribe(data=>{
      ////console.log(data);
      var x = Object.keys(data);
      ////console.log(Object.values(data));
      for(var i=0;i<x.length;i++){
        this.allDepartmentsList.push(data[x[i]]);
      }
      //////console.log(this.allDepartmentsList);
      
    })
console.log(    this.customerSerivce.currentCustomer);
  /*   var query = this.db.database.ref('/Customers_List').orderByChild("email").equalTo(this.customerSerivce.currentCustomer.email).once("child_added", (snapshot)=> {
 var userData = snapshot.val();
   console.log(Object.values(userData));
  
  
}) */
  this.fetchTodaysDeals();
  //this.countDownTimer();
  }
customerCart=[];

transferDataSuccess(event){
  console.log(event);
  this.addToCart(event.dragData,event.dragData.productInCarts);
  //this.customerCart.unshift(event.dragData);
}
totalCartPrice:number;
  logout() {
    this.afAuth.auth.signOut();
  /*   this.imageUrl = "";
    this.userName = "";
    this.isLoggedIn= false; */
   this.router.navigateByUrl("login-page");
}

incrementCount(product){
this.customerSerivce.updateCartCount(product);
this.totalCartPrice=0;
for(var i=0;i<this.customerCart.length;i++){
          this.totalCartPrice = this.totalCartPrice + Number(this.customerCart[i].productTotalPrice);
        } 
      var x = <HTMLInputElement>document.getElementById('totalMoney');
  x.style.color= 'green';
setTimeout(()=>{
  var x = <HTMLInputElement>document.getElementById('totalMoney');
  x.style.color= 'white';
},600)
}

decrementCount(product){
this.customerSerivce.decrementCartCount(product);
this.totalCartPrice=0;
for(var i=0;i<this.customerCart.length;i++){
          this.totalCartPrice = this.totalCartPrice + Number(this.customerCart[i].productTotalPrice);
        }
        var x = <HTMLInputElement>document.getElementById('totalMoney');
  x.style.color= 'red';
setTimeout(()=>{
  var x = <HTMLInputElement>document.getElementById('totalMoney');
  x.style.color= 'white';
},600)


}

cartProduct:CheckOutProducts = new CheckOutProducts();
addToCart(product,productInCarts){
  console.log(product,productInCarts);
  this.totalCartPrice = 0;
      product['productTotalPrice'] = product.productCurrentPrice;
      product['quantity']=1;
      product['addedDate'] = Date.now();
      delete product.productInCarts;
      delete product.productInWishLists;
      delete product.productLongDescription;
      delete product.productShortDescription;
      delete product.productFeatures;
      delete product.parentCategory;
      delete product.parentSubCategory;
      delete product.parentDepartment;
      this.customerSerivce.updateCart(product);
      this._productService.updateCartCount(this.currentDepartment,this.currentCategory,this.currentSubCategory,product.productId,productInCarts);
      for(var i=0;i<this.customerCart.length;i++){
          this.totalCartPrice = this.totalCartPrice + Number(this.customerCart[i].productTotalPrice);
        }   
      var x = <HTMLInputElement>document.getElementById('totalMoney');
  x.style.color= 'green';
setTimeout(()=>{
  var x = <HTMLInputElement>document.getElementById('totalMoney');
  x.style.color= 'white';
},600)
    }

    
        

  selectDepartment(value){
    this.todaysDealsFlag = false;
    this.isDepartmentSelected=true;
    this.currentDepartment = value;
    //////console.log(value);
     this.fb.fetchSpecificDepartment(value).subscribe(data=>{
      var x = Object.keys(data);
      ////console.log(Object.values(data));
      this.specificCategoriesList = [];
      this.specificCategoriesList = x;
      this.selectText = 'Select a Category';
    }) 
  }

    selectCategory(value){
      this.todaysDealsFlag = false;
      this.isCategorySelected=true;
      this.currentCategory = value;
      this.specificSubCategoriesList=[];
      this.fb.fetchSpecificCategory(this.currentDepartment,this.currentCategory).subscribe(data=>{
        var x = Object.keys(data);
        ////console.log(Object.values(data));
        for(var i=0;i<x.length;i++){
            if(data[x[i]]===''){
              continue;
            }else{
              this.specificSubCategoriesList.push(x[i]);
            }
        }
          this.selectText='Select a Sub Category';
      })
    }

    selectSubCategory(value){
      this.todaysDealsFlag = false;
      this.issubCategorySelected = true;
      this.noProductsFlag = false;
      this.displayAllProductsFlag = true;
      this.currentSubCategory=value;
      this.productsToBeDisplayed=[];
      this.fb.fetchSpecificSubCategory(this.currentDepartment,this.currentCategory,this.currentSubCategory).subscribe(data=>{
        for(var prop in data){
          this.productsToBeDisplayed.push(data[prop]); 
        }
         for(var i=0;i<this.productsToBeDisplayed.length;i++){
          if(this.productsToBeDisplayed[i] === ''){
            this.productsToBeDisplayed.splice(i,1) ;
          }
        }
        if(this.productsToBeDisplayed.length === 0){
          this.noProductsFlag=true;
        }else{
          this.noProductsFlag=false;
        }
        console.log(this.productsToBeDisplayed);
        this.selectText='Choose a Product';
        console.log(this.customerSerivce.currentCustomer.cart);
        /* for(var i=0;i<this.customerSerivce.currentCustomer.cart.length;i++){
          if(this.customerSerivce.currentCustomer.cart[i] != ''){
            this.customerCart.unshift(this.customerSerivce.currentCustomer.cart[i]);
          }
        } */
        this.totalCartPrice = 0;
        this.customerCart = this.customerSerivce.currentCustomer.cart;
        for(var i=0;i<this.customerCart.length;i++){
          this.totalCartPrice = this.totalCartPrice + Number(this.customerCart[i].productTotalPrice);
        }
      })
    }

    goToSpecificProduct(product){
      //////console.log(product);
      this.todaysDealsFlag = false;
      this.isDepartmentSelected=true;
       this.isCategorySelected=true;
      this.issubCategorySelected = true;
       //this.productsToBeDisplayed = [];
       this.selectText=null;
      this.displayAllProductsFlag = false;
      this.showRouterOutlet = true;
      this._productService.setProduct(product);
      this.currentProduct=this._productService.getProduct();
      this.isProductSelected = true;
      //this.router.navigateByUrl('home-page/specific-product');

     
      setTimeout(()=>{
          this.options.img = this.currentProduct.productImage;
    var container = document.getElementById('container');
    window.imageZoom = new ImageZoom(container, this.options);
    console.log(this.options);
      },100);

    }
bigImg(){
//console.log('im big');
this.imageHoverFlag = true;
}
imageHoverFlag:boolean;
normalImg(){
//console.log('im small');
this.imageHoverFlag = false;
}
   options = {
        width: 350,
        height: 350,
        img:'',
        offset: {vertical: 0, horizontal: 10},
	      scale:1
    };

    deleteFromCart(product){
      this.customerSerivce.deleteFromCart(product);
      this.totalCartPrice = 0;
      for(var i=0;i<this.customerCart.length;i++){
          this.totalCartPrice = this.totalCartPrice + Number(this.customerCart[i].productTotalPrice);
        }
    }

    shiftToDepartment(){
      this.isCategorySelected=false;
      this.issubCategorySelected = false;
      this.isDepartmentSelected=true;
      this.showRouterOutlet = false;
      this.displayAllProductsFlag = false;
      this.noProductsFlag=false;
      this.selectText = 'Select any Category';
      
    }

    shiftToCategory(){
      this.noProductsFlag=false;
      this.issubCategorySelected = false;
      this.isCategorySelected = true;
      this.showRouterOutlet = false;
      this.displayAllProductsFlag = false;
      this.selectText = 'Select a SubCategory';
    }

    shiftToSubCategory(){
      this.noProductsFlag=false;
      this.selectText='Choose a Product';
      this.showRouterOutlet = false;
      this.displayAllProductsFlag = true;
    }

    shiftToHome(){
      this.noProductsFlag=false;
      this.isDepartmentSelected=false;
      this.isCategorySelected=false;
      this.issubCategorySelected = false;
      this.showRouterOutlet = false;
      this.displayAllProductsFlag = false;
      this.selectText = 'Select any Department';
      this.todaysDealsFlag = true;
    }

    ngOnDestroy(){
      ////console.log('im leaving');
      this.isDepartmentSelected=true;
       this.isCategorySelected=true;
      this.issubCategorySelected = true;
    }
    
}
