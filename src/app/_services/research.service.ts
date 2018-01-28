import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import{ User } from '../_models/index'; 

@Injectable()
export class ResearchService {

  constructor(private http: Http) { }
  

  getSeqs(parametres : String) : Observable<any> {
  	console.log(parametres);
  	
	let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));	
	  let url = "http://localhost:3000/account/"+parametres+"/"+currentUser.username;
  	let observ: Observable<any> = this.http.get(url).map((res:Response) => res.json());
  	return observ;
  }
  getSeqsFromFile(parametres: String) : Observable<any>{
	let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));	
	console.log(parametres+" "+currentUser.username);
	let url = "http://localhost:3000/account/getseqFile/"+parametres+"/"+currentUser.username;
	let observ: Observable<any> = this.http.get(url).map((res:Response) => res.json());
	return observ;

  }

}
