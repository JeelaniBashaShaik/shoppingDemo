import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Http, HttpModule ,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

   @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;


    rows1 = [];
  columns1 = [];
column1:any;
  constructor(private http: Http, private router: Router) { }

ngOnInit(){
 // this.fetchData().subscribe(data => console.log(data));
 this.column1 = {cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl,name:'name'}
 this.columns1 = [{
      cellTemplate: this.editTmpl,
      headerTemplate: this.hdrTpl,
      name: 'Gender'
    }];
this.columns1.push(this.column1);    
this.column2 =  {cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl,name:'company'};
  //this.columns1.push(this.column2);
}
add(){
  console.log("im in");
 
this.columns1 = [];


}
add1(){
  this.columns1 = [
    { cellTemplate: this.editTmpl,headerTemplate: this.hdrTpl,name: 'Gender'}
  ];
    this.columns1.push(this.column1);
  
}

add2(){
  this.columns = [];
  this.columns1 = [
    { cellTemplate: this.editTmpl,headerTemplate: this.hdrTpl,name: 'Gender'}
  ];
    this.columns1.push(this.column1);
    this.columns1.push(this.column2);
}
 toggle(col) {
    const isChecked = this.isChecked(col);

    if(isChecked) {
      this.columns2 = this.columns2.filter(c => { 
        return c.name !== col.name; 
      });
    } else {
      this.columns2 = [...this.columns2, col];
    }
  }

  isChecked(col) {
    return this.columns2.find(c => {
      return c.name === col.name;
    });
  }

  columns2 = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  allColumns = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];


column2:any;
rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];


 createAuthorizationHeader(headers: Headers) {
   headers.append('Access-Control-Allow-Origin', 'true')
  }

fetchData():Observable<any>{
   let headers = new Headers();
    this.createAuthorizationHeader(headers);
  return this.http.get('http://push.cricbuzz.com/match-push?id=18366',{
      headers: headers
    }).map(data => data.json());

}

call(){
  this.router.navigateByUrl("login-page");
  
}
}
