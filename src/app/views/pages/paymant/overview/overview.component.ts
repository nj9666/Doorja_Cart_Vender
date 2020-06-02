import { Component, OnInit,AfterViewInit } from '@angular/core';
import { SystemService } from '../../../../Shared/SystemService';
@Component({
  selector: 'kt-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  
  ntotal:any;
  ltotal:any;
  nextPay_date:any;
  lastPay_date:any;
  constructor(public service: SystemService) { 
    this.service.Data.ExecuteAPI_Get<any>("Vender/PayOverView").then((data:any) =>
		{
      if (data.success)
      {
        this.ntotal = data.data.ntotal;
        this.nextPay_date = data.data.nextPay_date;
        this.ltotal = data.data.ltotal;
        this.lastPay_date = data.data.lastPay_date;
      }
		});
  }
  ngOnInit() {
  }  
}
