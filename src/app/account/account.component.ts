import { Component, OnInit } from '@angular/core';
import{ User } from '../_models/index'; 

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
currentUser: User;
private val_critere: string="";

private critere : string="";

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    
  }

}
