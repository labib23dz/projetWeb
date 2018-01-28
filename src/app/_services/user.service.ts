import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  create(user: User) {     
    return this.http.post('http://localhost:3000/users/register', user);
  }

  getById(_id: string) {
    return this.http.get('/users/' + _id).map((response: Response) => response.json());
  }

}
