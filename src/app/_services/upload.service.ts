import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs';


@Injectable()
export class UploadService {

  constructor(private http:Http) { }

  upload(sequence:any)
  {
    let username = JSON.parse(localStorage.getItem('currentUser')).username;
  console.log("objet envoye");
  console.log(sequence.nom);
  var json={"username":username, "nom" : sequence.nom, "sequence" : sequence.content};
  console.log(json);
  let url = "http://localhost:3000/account/uploadSeq";
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, json, options);

  }
}
