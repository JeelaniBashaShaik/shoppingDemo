import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {

    this.fetchData().subscribe(data => console.log(data));
  }


fetchData():Observable<any>{
  return this.http.get('http://push.cricbuzz.com/match-push?id=18366').map(data => data.json());

}
}
