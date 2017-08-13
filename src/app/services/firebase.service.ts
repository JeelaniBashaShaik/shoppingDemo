import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
@Injectable()
@Injectable()
export class FirebaseService {

    constructor(private http:Http) { }

  fetchCategories(){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/CategoriesList.json').map(res => res.json())
  }

  fetchDepartments(){
     return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/DepartmentsList.json').map(res => res.json())
  }

  fetchSubCategories(){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/SubCategoriesList.json').map(res => res.json())
  }

   fetchClasses(){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/ProductsList.json').map(res => res.json())
  }

  fetchSpecificDepartment(department){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Products_List/'+ department + '.json').map(res => res.json())
  }

    fetchSpecificCategory(department,category){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Products_List/'+ department + '/' + category + '/' + '.json').map(res => res.json())
  }

  fetchSpecificSubCategory(d,c,s){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Products_List/'+ d + '/' + c + '/' + s + '/'+ '.json').map(res => res.json())
  }


}
