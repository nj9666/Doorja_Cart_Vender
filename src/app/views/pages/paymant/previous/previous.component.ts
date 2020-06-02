// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.scss']
})
export class PreviousComponent implements OnInit {
  displayedColumns: string[] = ['paymantDate','bankAccount','transactionId', 'amount'];
  dataSource_prevPaymant = new MatTableDataSource<prevPaymantTbl>(ELEMENT_DATA_prevPaymant);
  @ViewChild('mat_pag_prevPaymant', {read: MatPaginator, static: true}) paginator_prevPaymant: MatPaginator;
  @ViewChild('mattbl_prevPaymant', {read: MatSort, static: true}) sort_prevPaymant: MatSort;
  applyFilter_prevPaymant(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_prevPaymant.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog,public service: SystemService) { }

  ngOnInit() {
    this.dataSource_prevPaymant.paginator = this.paginator_prevPaymant;
    this.dataSource_prevPaymant.sort = this.sort_prevPaymant;
    this.loadPaymant();
  }
  loadPaymant(){
    this.service.Data.ExecuteAPI_Get<any>("Vender/PayGetAll/ForMe").then((data:any) =>
		{
      this.dataSource_prevPaymant = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_prevPaymant.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_prevPaymant.push(element); });
        this.dataSource_prevPaymant = new MatTableDataSource<prevPaymantTbl>(ELEMENT_DATA_prevPaymant);
        this.dataSource_prevPaymant.paginator = this.paginator_prevPaymant;
        this.dataSource_prevPaymant.sort = this.sort_prevPaymant;
      }
		});
  }

}
export class prevPaymantTbl {
  id: number;
  paymantDate: string;
  bankAccount: number;
  transactionId: number;
  amount: number;
}
const ELEMENT_DATA_prevPaymant: prevPaymantTbl[] = [];
