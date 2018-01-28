import { Injectable } from '@angular/core';
import { Http, Headers,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GetFilesService {

  constructor(private http:Http) { }


  get_files(username:String){
   
   return this.http.get('http://localhost:3000/account/files/'+username)
    .map((response: Response)=>
      response.json()

    );
  
  }
}