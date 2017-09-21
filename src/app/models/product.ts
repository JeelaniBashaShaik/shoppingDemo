import { ProductRating } from './productRating';

export class Product{
    productId:string;
    productImage:string;
    productCurrentPrice:number;
    productShortDescription:string;
    productLongDescription:string;
    productCategory:string;
    productViews:number;
    timeSpentViewing:number;
    productWishes:number;
    productFeatures:Array<string>=[];
    productBrand:string;
    productPriceArray:Array<number>=[];
    productComments:Array<string>=[];
    productRating:ProductRating;
    productInCarts:number=0;
    productInWishLists:number=0;

}