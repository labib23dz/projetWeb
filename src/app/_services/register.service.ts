import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs';
import {User} from '../_models/user';

@Injectable()
export class RegisterService {

  constructor(private http:Http ) { }
  register(user:User){
    let url = "http://localhost:3000/users";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, user, options);
  }
  

}
