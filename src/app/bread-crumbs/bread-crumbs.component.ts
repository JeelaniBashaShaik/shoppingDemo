import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent implements OnInit {

  currentDepartment:string;
  currentCategory:string;
  currentSubCategory:string;
  currentProduct:string;
  isDepartmentSelected:boolean;
  isCategorySelected:boolean;
  isSubCategorySelected:boolean;
  isProductSelected:boolean;
  constructor() { }

  ngOnInit() {
      this.isDepartmentSelected = false;
    this.isCategorySelected = false;
    this.isSubCategorySelected = false;
    this.isProductSelected =false;  
  }

  setDepartment(){
    setTimeout(()=>{
      this.isDepartmentSelected=true;
      this.currentDepartment = 'asdf';
      console.log('im inside');
    },1000)
  }  

  shiftToDepartment(){
    this.isDepartmentSelected = true;
    this.isCategorySelected = false;
    this.isSubCategorySelected = false;
    this.isProductSelected =false;
  }

  shiftToCategory(){
    this.isDepartmentSelected = true;
    this.isCategorySelected = true;
    this.isSubCategorySelected = false;
    this.isProductSelected =false;
  }

  shiftToSubCategory(){
    this.isDepartmentSelected = true;
    this.isCategorySelected = true;
    this.isSubCategorySelected = true;
    this.isProductSelected =false;

  }

  shiftToHome(){
    this.isDepartmentSelected = false;
    this.isCategorySelected = false;
    this.isSubCategorySelected = false;
    this.isProductSelected =false;
  }

  help(){
    console.log('im in');
    console.log('dept:',this.isDepartmentSelected,this.currentDepartment);
    console.log('cat:',this.isCategorySelected);
    console.log('sub:',this.isSubCategorySelected);
  }
}
