import { ProductRating } from './productRating';

export class Product{
    productId:string;
    productImage:String;
    productCurrentPrice:Number;
    productShortDescription:String;
    productLongDescription:String;
    productCategory:String;
    productViews:Number;
    timeSpentViewing:Number;
    productWishes:Number;
    productFeatures:Array<String>=[];
    productBrand:String;
    productPriceArray:Array<Number>=[];
    productComments:Array<String>=[];
    productRating:ProductRating;
    productInCarts:number;
    productInWishLists:number=0;

}