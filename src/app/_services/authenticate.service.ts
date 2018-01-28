import { Injectable } from '@angular/core';
import { Http, Headers,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {User} from '../_models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {

  constructor(private http:Http) { }

  login(username:string, password:string){    
    return this.http.post('http://localhost:3000/users/authenticate',{username: username, password: password})
            .map((response: Response)=>{
              //login successful if there is a jwt in the response
              let user=response.json();
              if (user && user.token){
              //store user details and jwt token in local storage to keep user logged in between page refreshes 
              localStorage.setItem('currentUser', JSON.stringify(user));  
            }                        
            return user;
            });  
  }

  logout(){
    //// remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}