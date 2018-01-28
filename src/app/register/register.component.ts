import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService } from '../_services/index';

//import {RegisterService} from '../_services/register.service';
//import {User} from '../_models/user';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  model: any = {};
  //loading = false;
   
  constructor(
    private router: Router,
    private userService:UserService) { }

  ngOnInit() {
  }
  
  register() {
    //this.loading = true;
    this.userService.create(this.model)
        .subscribe(
            data => {
                //this.alertService.success('Registration successful', true);
                console.log('Enregistrement éffectué avec succès.');
                this.router.navigate(['/login']);
            },
            error => {
                //this.alertService.error(error);
                //this.loading = false;                
                console.log("erreur dans l'enregistrement");
            });
}
}



