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

 

  constructor(private http: Http, private router: Router) { }

ngOnInit(){

  //this.columns1.push(this.column2);
}



/* sample text */






call(){
  this.router.navigateByUrl("login-page");
}
}
