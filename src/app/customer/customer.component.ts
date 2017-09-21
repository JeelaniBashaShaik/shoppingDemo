import { Component, OnInit,ViewChild,TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import { Customer } from './../models/Customer';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Address} from './../models/address';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { CustomerService } from './../services/customer.service';
import { CheckOutProducts } from './../models/Customer';
import { Product } from './../models/product';
declare var $:any;
declare var Materialize:any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    @ViewChild('quantity') quantity:TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl:TemplateRef<any>;
    @ViewChild('checkout') checkoutGrid:any;
checkOutProducts:Array<CheckOutProducts>=new Array<CheckOutProducts>();
query:any;
email:any;
photoUrl:string;
noAddressFlag:boolean;
noGenderFlag:boolean;
    customersList:FirebaseListObservable<any[]>;
    address:Address = new Address();
  constructor(private _customerService: CustomerService,private router:Router, private db:AngularFireDatabase,private afAuth:AngularFireAuth) { 
          //  this.availableProducts.push(new Product('Blue Shoes', 3, 35));
      ////  this.availableProducts.push(new Product('Good Jacket', 1, 90));
      //  this.availableProducts.push(new Product('Red Shirt', 5, 12));
      //  this.availableProducts.push(new Product('Blue Jeans', 4, 60));
         this.customersList = this.db.list('/Customers_List');
           this.afAuth.authState.subscribe(data=>{
            this.customer.displayName = data.displayName;
            this.customer.email = data.email;
            this.photoUrl = data.photoURL;
        })     
    

     
    
  }
dat:any;
customerToUpdate:Customer = new Customer();
  customer:Customer = new Customer();
  allGenders=['Male','Female','Others'];
@LocalStorage() public username:string = 'asfd';
  selectGender(gender){
      //console.log(gender);
  }

  setGender(value){
      console.log(value);
      this.customerToUpdate.gender = value;
    console.log(this.customerToUpdate);
  }
  ngOnInit() {
      this.checkoutGrid.messages.emptyMessage = 'Drag N Drop Items Here';
     console.log(this.username);
         this.address.city='';
    this.address.flat_HouseNo='';
    this.address.pincode='';
    this.address.street='';
    this.address.state='';
    var query = this.db.database.ref('/Customers_List').orderByChild('email').equalTo(this.customer.email);
    var x = query.once("value",(snapshot)=>{
        //console.log(snapshot.val());
        this.dat = snapshot.val();
        var xKeys = Object.keys(this.dat);
        this.customerToUpdate  = this.dat[xKeys[0]];
        //this.noAddressFlag = true;
        console.log(this.customerToUpdate);
        
        if(!this.customerToUpdate.hasOwnProperty('address')){
            this.noAddressFlag = true;
        }
        if(this.customerToUpdate.hasOwnProperty('address')){
            this.address = this.customerToUpdate.address[0];
        }
        if(!this.customerToUpdate.hasOwnProperty('gender')){
            this.noGenderFlag = true;
        }
        if(this.customerToUpdate.hasOwnProperty('gender')){
            this.noGenderFlag = false;
        }
        this.fetchCart();
    })
    this.jqueryDependencies();
    
  }


  jqueryDependencies(){
      $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  }
      availableProducts: Array<Product> = [];
    shoppingBasket: Array<Product> = [];

  goToHome(){
    this.router.navigateByUrl('home-page');
  }

  updateCustomer(){
       var y:Customer;
      this.customerToUpdate.address = [];
      this.customerToUpdate.address.unshift(this.address);
      y = this.customerToUpdate;
      this._customerService.updateCustomerDetails(y);
    this.router.navigateByUrl('home-page');
  }
list1=[];
customerCart=[];
fetchCart(){
    console.log(this.customerToUpdate.cart);
    this.customerCart=[];
       // var x = this._customerService.fetchProductInfo(this.customerToUpdate.cart);
    //console.log(customerCart);
    /* for(var i=0;i<this.customerToUpdate.cart.length;i++){
        if(this.customerToUpdate.cart[i] === ''){
            continue;
        }else{
            this.customerCart.push(this.customerToUpdate.cart[i]);
            this.list1.push(this.customerToUpdate.cart[i].productId);    
        }
           } */
    this.customerCart= this._customerService.currentCustomer.cart;
    console.log(this.list1);
    console.log(this.customerCart);
   // this._customerService.customerCart= this.customerCart;
}
    /* orderedProduct($event: any) {
        let orderedProduct: Product = $event.dragData;
        orderedProduct.quantity--;
    } */

   /*  addToBasket($event: any) {
        let newProduct: Product = $event.dragData;
        for (let indx in this.shoppingBasket) {
            let product: Product = this.shoppingBasket[indx];
            if (product.name === newProduct.name) {
                product.quantity++;
                return;
            }
        }
        this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
        this.shoppingBasket.sort((a: Product, b: Product) => {
            return a.name.localeCompare(b.name);
        });
    } */

    /* totalCost(): number {
        let cost: number = 0;
        for (let indx in this.shoppingBasket) {
            let product: Product = this.shoppingBasket[indx];
            cost += (product.cost * product.quantity);
        }
        return cost;
    } */

    deleteFromCart(product){
        this._customerService.deleteFromCart(product);
    }
    

    incrementCartCount(product){
        this._customerService.updateCartCount(product);
    }

    decrementCartCount(product){
        this._customerService.decrementCartCount(product);
    }
transferDataSuccess(event){
    setTimeout(()=>{
        this.checkoutGrid.recalculate();
    },100);
    console.log(event);
    this.totalOrderCost=0
    this.totalCheckoutCartCount=0;
    var x:CheckOutProducts = new CheckOutProducts();;
    var y:any = event.dragData;
    x.productId = y.productId;
    x.productName = y.productBrand;
    x.productUnitPrice = y.productCurrentPrice;
    x.quantity = y.quantity;
    x.productTotalPrice = y.productTotalPrice;
    this.checkOutProducts.unshift(x);
    for(var i=0;i<this.checkOutProducts.length;i++){
        this.checkOutProducts[i]['count'] = i+1;
        this.totalOrderCost = this.totalOrderCost + Number(this.checkOutProducts[i].productTotalPrice);
        this.totalCheckoutCartCount = this.totalCheckoutCartCount + Number(this.checkOutProducts[i].quantity);
        //console.log(this.totalOrderCost);
    }
    //console.log(this.totalOrderCost);
}
addToCheckOut(product){
    var event = {dragData:product};
    this.transferDataSuccess(event);
}
incrementCount(item){

 for(var i=0;i<this.checkOutProducts.length;i++){
    if(item.productId === this.checkOutProducts[i].productId){
        this.checkOutProducts[i].quantity++;
        this.checkOutProducts[i].productTotalPrice = this.checkOutProducts[i].productUnitPrice * this.checkOutProducts[i].quantity;
    }
    this.checkOutProducts[i]['count']=i+1;
} 
console.log(this.checkOutProducts);
}
Columns1=[
    {name:'No',prop:'count',width:50},
    {name:'Product Id',prop:'productId',width:150},
    {name:'Product Name',prop:'productName',width:150},
    {name:'Quantity',prop:'quantity',width:150,cellTemplate:this.quantity,headerTemplate: this.hdrTpl},
    {name:'Unit Price',prop:'productUnitPrice',width:100},
    {name:'Total Price',prop:'productTotalPrice',width:150},

];
decrementCount(item){
console.log(item);
}
totalCheckoutCartCount:number = 0;
totalUniqueProductsCount:number= 0;
totalOrderCost:number = 0;
updateValue(event,row){
    //console.log(event.target.value,row);
    this.editing[row]= false;
    this.totalOrderCost=0;
    this.totalCheckoutCartCount = 0;
    this.checkOutProducts[row].quantity = event.target.value;
    this.checkOutProducts[row].productTotalPrice = this.checkOutProducts[row].quantity * this.checkOutProducts[row].productUnitPrice;
    for(var i=0;i<this.checkOutProducts.length;i++){
        this.totalOrderCost = this.totalOrderCost + Number(this.checkOutProducts[i].productTotalPrice);
        this.totalCheckoutCartCount = this.totalCheckoutCartCount + Number(this.checkOutProducts[i].quantity);
    }
    console.log(this.totalOrderCost,this.totalCheckoutCartCount);
    setTimeout(()=>{
        console.log('inside recalculate');
        this.checkoutGrid.recalculate();
    },200);
}
editing = {};

removeItem(index){
    //console.log(index);
   // console.log(this.checkOutProducts);
    
setTimeout(()=>{
    console.log('inside delete recalculate');
    var price:number;
    price = this.checkOutProducts[index].productTotalPrice;
    this.totalOrderCost = this.totalOrderCost - Number(price);
    this.totalCheckoutCartCount = this.totalCheckoutCartCount - Number(this.checkOutProducts[index].quantity);
this.checkOutProducts.splice(index,1);

for(var i=0;i<this.checkOutProducts.length;i++){
    this.checkOutProducts[i]['count'] = i+1;
}
console.log(this.totalOrderCost, this.totalCheckoutCartCount);
    this.checkoutGrid.recalculate();
},200);
}
increment(prop,index){
    this.totalOrderCost = this.totalOrderCost-this.checkOutProducts[index].productTotalPrice;
    this.checkOutProducts[index]['quantity']++;
    this.checkOutProducts[index].productTotalPrice = this.checkOutProducts[index].quantity * this.checkOutProducts[index].productUnitPrice;
    this.totalOrderCost = this.totalOrderCost + this.checkOutProducts[index].productTotalPrice;
    console.log(this.totalOrderCost);
    setTimeout(()=>{
        this.checkoutGrid.recalculate();
    },100);
}
decrement(prop,index){
    this.checkOutProducts[index][prop]--;
    this.checkOutProducts[index].productTotalPrice = this.checkOutProducts[index].quantity * this.checkOutProducts[index].productUnitPrice;
    setTimeout(()=>{
        this.checkoutGrid.recalculate();
    },100);
}
    logout(){
        this.afAuth.auth.signOut();
        this.router.navigateByUrl("login-page");
    }
}


/* class Product {
  constructor(public name: string, public quantity: number, public cost: number) {}
} */

