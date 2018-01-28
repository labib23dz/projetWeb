import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import {AuthenticateService} from '../_services/index';


@Component({
  //moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl : string;
  //loading = false;  
  //private result : object[];
  constructor(private authenticateService:AuthenticateService, 
              private route : ActivatedRoute, 
              private router:Router
              /*private alertService: AlertService*/  
            ) { }

  ngOnInit() {
    // reset login status
    this.authenticateService.logout();
    // get return url from route parameters or default to '/'    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/' ;    
  }
  
  login(){
    //this.loading=true;
    this.authenticateService.login(this.model.username, this.model.password)
        .subscribe(
          data=>{               
            this.router.navigate(['/account']);
          },
          error=> {
            //this.alertService.error(error);
            //this.loading= false;            
            console.log("erreur dans le log");
          });
  }
/*
  authenticate(){    
    this.authenticateService.authenticate(this.model.username, this.model.password).subscribe(res => {console.log(res[0]["username"])});   
    //console.log(this.result);           
  } */
}

//.subscribe(res => { console.log("OK avec "+res); this.products = res;});