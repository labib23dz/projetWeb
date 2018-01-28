import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
//import { routing } from './app.routing';

import { Routes, RouterModule } from '@angular/router';
import { AuthenticateService, UserService } from './_services/index';
import { RegisterComponent } from './register/index';
import { LoginComponent } from './login/index';
//import { AccountComponent } from './account/account.component';
import { AuthGuard } from './_guards/index';

import { AccountModule } from './account/account.module';



//import { RegisterService } from './_services/register.service';
 
const appRoutes: Routes = [
    { path: '', component: LoginComponent},       
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'account', loadChildren:'./account/account.module#AccountModule', canActivate: [AuthGuard] },       
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    
    //AccountComponent,   
  ],
  imports: [
    MaterializeModule,
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    AccountModule,
    //routing
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    //RegisterService,
    AuthenticateService,
    UserService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
