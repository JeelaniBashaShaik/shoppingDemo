import { SuccessfulCheckOuts } from './SuccessfulCheckOuts';
import { Address } from './address';
import { Product } from './product';

export class Customer{
    fullName:string;
    displayName:string;
    password:string;
    gender:string;
    age:number;
    dob:any;
    email:string;
    interests:Array<string>=[];
    cart:Array<any>=[];
    checkOutsDone:Array<SuccessfulCheckOuts>=[];
    phoneNumber:Number;
    viewedItems:Array<string>=[];
    wishList:Array<string>=[];
    address:Array<Address>=[];
}

export class ShippingLabel extends Address{
    FullName:string;
    phoneNumber:string;
     
}

export class cartProducts{
productId:string;
quantity:number;
}

export class CheckOutProducts{
    productId:string;
    productImage:string;
    productName:string;
    productBrand:string;
    productUnitPrice:number;
    quantity:number;
    productTotalPrice:number;
}