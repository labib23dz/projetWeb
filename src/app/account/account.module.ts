import { CommonModule } from '@angular/common'
//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ResearchComponent } from './research/research.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from '../_services/upload.service';
import { ResearchService } from '../_services/research.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FilesComponent } from './files/files.component';
import {GetFilesService } from '../_services/get-files.service'
@NgModule({
  imports: [
    NgbModule,
  CommonModule,  
  //BrowserModule,
  FormsModule,
  AccountRoutingModule
  ],
  declarations: [AccountComponent, ResearchComponent, UploadComponent, FilesComponent],
  providers: [UploadService, ResearchService, GetFilesService]
})
export class AccountModule { }
