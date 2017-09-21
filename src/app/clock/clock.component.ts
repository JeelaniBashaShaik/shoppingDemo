import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

a1:Array<string>=["1","2","3","4","5"];
a2:Array<string>=[];
a3:Array<string>=[];


  constructor() { }
  ngOnInit() {
this.load();
  }

load(){
  for(var i=0;i<this.a1.length;i++){
  this.a2.push(this.a1[i]);
  this.a3.push(this.a1[i]);
}
}
myCall1(value){
  console.log(value);

  this.a2=[];
  this.a3=[];
  this.load();
  var ind = this.a1.indexOf(value);

  this.a2.splice(ind,1);
  console.log("a2:" +this.a2);

  this.a3.splice(ind,1);
  console.log("a3:" +this.a3);
}

load1(){
  for(var i=0;i<this.a2.length;i++){
    this.a3.push(this.a2[i]);
  }
}
myCall2(value){

this.a3=[];
this.load1();
var ind = this.a2.indexOf(value);

this.a3.splice(ind,1);
}

myCall3(value){
var ind = this.a3.indexOf(value);

/*this.a1.splice(ind,0);

this.a2.splice(ind,0);*/
}
}
