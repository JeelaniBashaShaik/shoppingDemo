import { Component, OnInit,OnDestroy } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ProductService} from './../services/product.service';
import {AppComponent } from './../app.component';
import { BreadCrumbsComponent } from './../bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy {

  bc:BreadCrumbsComponent = new BreadCrumbsComponent();
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
  ProductsList:FirebaseListObservable<any[]>; 
  noProduct:string = 'There are no products available in this section yet!!'
  noProductsFlag:boolean;
  constructor(private router:Router,public db: AngularFireDatabase, private fb: FirebaseService,private _productService: ProductService) {
    this.ProductsList = this.db.list('/Products_List');
    console.log(this.db.database.ref('/Products_Lists'));
   }

  ngOnInit() {
    this.issubCategorySelected = false;
    this.isCategorySelected=false;
    this.isDepartmentSelected=false;
    this.isProductSelected=false;
    this.showRouterOutlet = true;
    this.displayAllProductsFlag = false;
    this.noProductsFlag=false;
    this.selectText = 'Select any Department to get Started';
    this.fb.fetchDepartments().subscribe(data=>{
      console.log(data);
      var x = Object.keys(data);
      for(var i=0;i<x.length;i++){
        this.allDepartmentsList.push(data[x[i]]);
      }
      //console.log(this.allDepartmentsList);
    })
    
  }

  selectDepartment(value){
    this.isDepartmentSelected=true;
    this.currentDepartment = value;
    //console.log(value);
     this.fb.fetchSpecificDepartment(value).subscribe(data=>{
      var x = Object.keys(data);
      this.specificCategoriesList = [];
      this.specificCategoriesList = x;
    /*   this.bc.isDepartmentSelected =true;
      this.bc.currentDepartment = value;
      this.bc.setDepartment(); */
      //console.log(this.specificCategoriesList);
      this.selectText = 'Select a Category';
    }) 
  }

    selectCategory(value){
      this.isCategorySelected=true;
      this.currentCategory = value;
      this.specificSubCategoriesList=[];
     /*  this.bc.isCategorySelected=true;
      this.bc.currentCategory = value;
      this.bc.help(); */
      this.fb.fetchSpecificCategory(this.currentDepartment,this.currentCategory).subscribe(data=>{
        var x = Object.keys(data);
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
      })
    }

    goToSpecificProduct(product){
      //console.log(product);
      this.showRouterOutlet = true;
        this.isCategorySelected=true;
      this.issubCategorySelected = true;
      this.isDepartmentSelected=true;
      this.displayAllProductsFlag = false;
      this.productsToBeDisplayed = [];
      this._productService.setProduct(product);
      this.router.navigateByUrl('home-page/specific-product');

    }

    shiftToDepartment(){
      this.isCategorySelected=false;
      this.issubCategorySelected = false;
      this.isDepartmentSelected=true;
      this.showRouterOutlet = false;
      this.selectText = 'Select any Department to get Started';
    }

    shiftToCategory(){
      this.issubCategorySelected = false;
      this.isCategorySelected = true;
      this.showRouterOutlet = false;
      this.selectText = 'Select a Category';
    }

    shiftToSubCategory(){
      this.selectText='Select a Sub Category';
      this.showRouterOutlet = false;
    }

    shiftToHome(){
      this.isDepartmentSelected=false;
      this.showRouterOutlet = false;
    }

    ngOnDestroy(){
      console.log('im leaving');
    }
    
}
