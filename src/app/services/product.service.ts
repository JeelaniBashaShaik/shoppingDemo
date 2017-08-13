import { Injectable } from '@angular/core';
import { Product } from './../models/product';

@Injectable()
export class ProductService {

  selectedDepartment:string;
  selectedCategory:string;
  selectedSubCategory:string;
  selectedProduct:string;
  productToBeLoaded:Product;
  constructor() { }

  setProduct(product){
    this.productToBeLoaded = product;
  }

  getProduct(){
    return this.productToBeLoaded;
  }

}
