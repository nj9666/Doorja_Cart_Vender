import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../Shared/SystemService';

@Component({
  selector: 'kt-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.scss']
})
export class GrowthComponent implements OnInit {
  seleInRupee:any;
  seleInUnit:any;
  returnUint:any;
  avgrating:any;
  cday:number;
  cdate:Date = new Date();
  ldate:Date = new Date();

  constructor(public service: SystemService) { }

  ngOnInit() {
    this.loadgrowth(7);
  }
  loadgrowth(day){
    this.cday = day;
    this.ldate = new Date();
    this.ldate.setDate( this.ldate.getDate() - day );
    this.service.Data.ExecuteAPI_Get<any>("Vender/GetGrowth/"+day).then((data:any) =>
		{
      if (data.success)
      {
        this.seleInRupee = data.data.seleInRupee;
        this.seleInUnit = data.data.seleInUnint;
        this.returnUint = data.data.returnUint;
        this.avgrating = data.data.avgrating;
        
      }
		});
  }
}
