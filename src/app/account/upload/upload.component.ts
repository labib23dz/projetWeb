import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  private sequence : any={};
  
    constructor( private uploadService: UploadService) { 
  }
  
    ngOnInit() {
    }
  upload_sequence(){
      console.log("begin test");
      this.uploadService.upload(this.sequence).subscribe(res=>{console.log("upload exécuté avec succès !")});
      console.log("end test");
    }
  }