import { Component, OnInit } from '@angular/core';
import { Product } from './../models/product';
import {ProductService} from './../services/product.service';
@Component({
  selector: 'app-specific-prodcut',
  templateUrl: './specific-prodcut.component.html',
  styleUrls: ['./specific-prodcut.component.css']
})
export class SpecificProdcutComponent implements OnInit {
  currentProduct:Product;
  constructor(private _productService:ProductService ) { }

  ngOnInit() {
    this.currentProduct=this._productService.getProduct();
    console.log(this.currentProduct);
  }

}
