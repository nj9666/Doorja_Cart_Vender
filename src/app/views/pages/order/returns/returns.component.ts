// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {
  displayedColumns: string[] = ['sku','productName','qty', 'color', 'size', 'price', 'username'];
  dataSource_return = new MatTableDataSource<returnTbl>(ELEMENT_DATA_return);
  @ViewChild('mat_pag_return', {read: MatPaginator, static: true}) paginator_return: MatPaginator;
  @ViewChild('mattbl_return', {read: MatSort, static: true}) sort_return: MatSort;
  applyFilter_return(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_return.filter = filterValue.trim().toLowerCase();
  }
  constructor(public service: SystemService) { }

  ngOnInit() {
    this.dataSource_return.paginator = this.paginator_return;
    this.dataSource_return.sort = this.sort_return;
    this.loadreturn();
  }
  loadreturn(){
   
    this.service.Data.ExecuteAPI_Get<any>("Vender/MyReturn").then((data:any) =>
		{
      this.dataSource_return = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_return.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_return.push(element); });
        this.dataSource_return = new MatTableDataSource<returnTbl>(ELEMENT_DATA_return);
        this.dataSource_return.paginator = this.paginator_return;
        this.dataSource_return.sort = this.sort_return;
      }
		});
  }

}
export class returnTbl {
  id: number;
  sku: number;
  productName: string;
  qty: number;
  color: string;
  size: string;
  price: number;
  username:string;
}
const ELEMENT_DATA_return: returnTbl[] = [];
