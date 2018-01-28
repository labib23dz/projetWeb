import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ResearchService} from '../../_services/research.service';


@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  private seqs : Object[];
  private crit : String="";
  private val_crit : String="";

  constructor(private research : ResearchService, private route : ActivatedRoute) 
  { 
  }

	ngOnInit(){
                this.route.params.subscribe((params:Params)=>{
                     console.log(params["critere"]);
                     this.crit=params["critere"];
                     this.val_crit=params["val_critere"];
                     this.research.getSeqs("GetSeq/"+params["critere"]+"/"+params["val_critere"]).subscribe(res => { console.log("OK avec "+res); this.seqs = res;});
                }); 
     }
}
    