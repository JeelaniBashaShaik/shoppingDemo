import { Injectable } from '@angular/core';
import { Product } from './../models/product';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
declare var  Materialize:any;
@Injectable()
export class ProductService {

  selectedDepartment:string;
  selectedCategory:string;
  selectedSubCategory:string;
  selectedProduct:string;
  productToBeLoaded:Product;
  isDepartmentSelected:boolean;
  isCategorySelected:boolean;
  isSubCategorySelected:boolean;
  selectedProduct1:Product;
  constructor(private db:AngularFireDatabase) {
   }

  setProduct(product){
    this.productToBeLoaded = product;
  }

  getProduct(){
    return this.productToBeLoaded;
  }

  updateCartCount(d,c,s,productId,previousCartCount){
    previousCartCount++;
    console.log(previousCartCount);
   var query = this.db.database.ref('/Products_List/'+d+'/'+c+'/'+s).orderByChild('productId').equalTo(productId);
   var y = query.once("child_added", function(snapshot) {
          snapshot.ref.update({'productInCarts':previousCartCount}).then(data=>{
            
             Materialize.toast('Product added in Cart', 2000);
          });
})
        var query1 = this.db.database.ref('/EnitreProductsList').orderByChild('productId').equalTo(productId);
         var x = query.once("child_added", function(snapshot) {
          snapshot.ref.update({'productInCarts':previousCartCount}).then(data=>{
          });
          })
  }
productToReturn:Product = new Product();
  fetchProductInfo(productId):any{
    console.log(productId);
    var query = this.db.database.ref('/EntireProductsList').orderByChild('productId').equalTo(productId);
    var y = query.once("value",(snapshot)=>{
      var x = snapshot.val();
      this.productToReturn = x;
      
    })
    console.log(this.productToReturn);
    return this.productToReturn;
  }



}
