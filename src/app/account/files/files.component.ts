import { Component, OnInit } from '@angular/core';
import {GetFilesService } from '../../_services/get-files.service'
import {ResearchService } from '../../_services/research.service'

import{ User } from '../../_models/index'; 
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
private files=[];
private user: User;
private datafile: Object[];
private fileclicked="";
  constructor(private getfiles : GetFilesService, private research: ResearchService) { }

  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem("currentUser"));
    console.log(this.user.username);
    this.getfiles.get_files(this.user.username).subscribe(res => { console.log("OK "+res); this.files=res; });
  }

  getseqs(file:string){
    console.log(file);
    this.fileclicked=file;
    this.research.getSeqsFromFile(file).subscribe(res =>{ console.log("OK "+res); this.datafile=res; console.log(this.datafile); });

  }
}
