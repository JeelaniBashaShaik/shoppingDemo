import { Injectable } from '@angular/core';
import { Customer } from './../models/Customer';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ProductService} from './../services/product.service';
declare var Materialize:any;
@Injectable()
export class CustomerService {

  customersList:FirebaseListObservable<any>;
  currentCustomer:Customer = new Customer();
email:string;
  constructor(private db:AngularFireDatabase,private _productService:ProductService, private afAuth:AngularFireAuth) { 
    this.customersList = this.db.list('/Customers_List');
    this.afAuth.authState.subscribe(data=>{
      if(data){
         this.email = data.email;
      var query= this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
         var y = query.once("value",(snapshot)=>{
     var data = snapshot.val();
     var xKeys = Object.keys(data);
     this.currentCustomer = data[xKeys[0]];
     //this.currentCustomer.cart.unshift();
     console.log(this.currentCustomer);
   })
      }else{
        console.log('still not logged in');
      }
     
    })
    
  }
  setCurrentCustomer(customer : Customer){
    this.currentCustomer = customer;
  }

updateCartCount(product){
  var x= [];
  x = this.currentCustomer.cart;
  for(var i=0;i<this.currentCustomer.cart.length;i++){
    if(product.productId === this.currentCustomer.cart[i].productId){
      x[i].quantity++;
      x[i].productTotalPrice = x[i].quantity * x[i].productCurrentPrice;
    }
  }
  var query = this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
   var y = query.once("child_added", function(snapshot) {
          snapshot.ref.update({'cart':x}).then(data=>{
            console.log(snapshot.val());
          });
        //console.log(snapshot.val());
})
}

decrementCartCount(product){
var x= [];
  x = this.currentCustomer.cart;
  for(var i=0;i<this.currentCustomer.cart.length;i++){
    if(product.productId === this.currentCustomer.cart[i].productId){
      x[i].quantity--;
      x[i].productTotalPrice = x[i].quantity * x[i].productCurrentPrice;
    }
  }
  var query = this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
   var y = query.once("child_added", function(snapshot) {
          snapshot.ref.update({'cart':x}).then(data=>{
            console.log(snapshot.val());
          });
        //console.log(snapshot.val());
})
}
  updateCart(product){
   var x=[];
   x = this.currentCustomer.cart;
   x.unshift(product);
   console.log(x);
   var query = this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
   var y = query.once("child_added", function(snapshot) {
          snapshot.ref.update({'cart':x}).then(data=>{
            console.log(snapshot.val());
          });
        //console.log(snapshot.val());
})
     


  }

  deleteFromCart(product){
    var x = this.currentCustomer.cart;
    if(this.currentCustomer.cart.length>=1){
      for(var i=0;i<this.currentCustomer.cart.length;i++){
        if(this.currentCustomer.cart[i].productId === product.productId){
            console.log('match found at',i);
            x.splice(i,1);
        }
      }
    }else{
      x.unshift('');
    }
    
         var query = this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
   var y = query.once("child_added", function(snapshot) {
          snapshot.ref.update({'cart':x}).then(data=>{
            console.log(snapshot.val());
          });
        //console.log(snapshot.val());
})
  }

  updateCustomerDetails(y){
   var query= this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
          var x = query.once("child_added", function(snapshot) {
          snapshot.ref.update(y).then(data=>{
              console.log(data);
              Materialize.toast('Details Updated Successfully', 2000);;
              //this.router.navigateByUrl('home-page');
              this.router.navigateByUrl('home-page');
          });
  })
}

  fetchProductInfo(productId):any{
   var query= this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.email);
          var x = query.once("child_added", function(snapshot) {
          console.log(snapshot.val());
  })
  }
}
