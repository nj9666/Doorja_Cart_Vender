// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  new_order_a:orderTbl[] = [];
  panLab_a:orderTbl[] = [];
  RTD_a:orderTbl[] = [];
  Dispa_a:orderTbl[] = [];
  Comp_a:orderTbl[] = [];
  send_list:orderTbl[] = [];
  ConfirmOrder:boolean;
  pending_lable:boolean;

  displayedColumns: string[] = ['select','orderIdV', 'sku', 'name', 'qty', 'price', 'userName', 'orderSubStatus', 'actions'];
  dataSource_order = new MatTableDataSource<orderTbl>(ELEMENT_DATA_order);
  selection = new SelectionModel<orderTbl>(true, []);
  @ViewChild('mat_pag_order', {read: MatPaginator, static: true}) paginator_order: MatPaginator;
  @ViewChild('mattbl_order', {read: MatSort, static: true}) sort_order: MatSort;
  applyFilter_order(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_order.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog,public service: SystemService) { }
  ngOnInit() {
    this.dataSource_order.paginator = this.paginator_order;
    this.dataSource_order.sort = this.sort_order;
    this.loadOrder();
    
  }
  getselected(){
    console.log(this.selection.selected);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource_order.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource_order.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: orderTbl): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  Upgrade_status(){
    this.send_list.length = 0;
    this.send_list = this.selection.selected;
    this.changeCall(this.send_list);
    
  }
  changeStatus(element,fl:boolean){
    this.send_list.length = 0;
    this.send_list.push(element);
    if (fl) {
      this.changeCall(this.send_list);
    }else{
    this.rejectCall(this.send_list);
    }
    this.new_order_a=ELEMENT_DATA_order.filter(new_order);
    this.panLab_a=ELEMENT_DATA_order.filter(panLab);
    this.RTD_a=ELEMENT_DATA_order.filter(RTD);
    this.Dispa_a=ELEMENT_DATA_order.filter(Dispa);
    this.Comp_a=ELEMENT_DATA_order.filter(Comp);
    this.applyFilter_All();
    this.selection.clear();
  }
  ConfirmAll(){
    this.dataSource_order.data.forEach(element => {
      if(element.orderSubStatus == 1){
        element.orderSubStatus += 1;
      }
    });
    this.new_order_a=ELEMENT_DATA_order.filter(new_order);
    this.panLab_a=ELEMENT_DATA_order.filter(panLab);
    this.applyFilter_All();
    this.selection.clear();
  }
  PrintAll(){
    
    this.panLab_a.forEach(element => {
      console.log(element);
    });
  }


  clear_select(){
    this.selection.clear();
  }
  applyFilter_new_order(){
    this.dataSource_order.data = this.new_order_a;
    this.ConfirmOrder = true;
    this.pending_lable = false;
  }
  applyFilter_panLab(){
    this.dataSource_order.data = this.panLab_a;
    this.ConfirmOrder = false;
    this.pending_lable = true;
  }
  applyFilter_RTD(){
    this.dataSource_order.data = this.RTD_a;
    this.ConfirmOrder = false;
    this.pending_lable = false;
  }
  applyFilter_Dispa(){
    this.dataSource_order.data = this.Dispa_a;
    this.ConfirmOrder = false;
    this.pending_lable = false;
  }
  applyFilter_Comp(){
    this.dataSource_order.data = this.Comp_a;
    this.ConfirmOrder = false;
    this.pending_lable = false;
  }
  applyFilter_All(){
    this.dataSource_order.data = ELEMENT_DATA_order;
    this.ConfirmOrder = false;
    this.pending_lable = false;
  }
  loadOrder(){
    this.service.Data.ExecuteAPI_Get<any>("Vender/MyOrder").then((data:any) =>
		{
      this.dataSource_order = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_order.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_order.push(element); });
        this.dataSource_order = new MatTableDataSource<orderTbl>(ELEMENT_DATA_order);
        this.dataSource_order.paginator = this.paginator_order;
        this.dataSource_order.sort = this.sort_order;

        this.new_order_a=ELEMENT_DATA_order.filter(new_order);
        this.panLab_a=ELEMENT_DATA_order.filter(panLab);
        this.RTD_a=ELEMENT_DATA_order.filter(RTD);
        this.Dispa_a=ELEMENT_DATA_order.filter(Dispa);
        this.Comp_a=ELEMENT_DATA_order.filter(Comp);
      }
		});
  }
  changeCall(sendobj){
    this.service.Data.ExecuteAPI<any>("Vender/ChangeStatusOrder",sendobj).then((data:any) =>
    {
    console.log("Recive--->>");
    console.log(data);
      if (data.success)
      {
        this.loadOrder();
        // sendobj.forEach(element => {
        //   if(element.orderSubStatus < 5 && element.orderSubStatus != 1){
        //     element.orderSubStatus += 1;
        //   }
        //   this.new_order_a=ELEMENT_DATA_order.filter(new_order);
        //   this.panLab_a=ELEMENT_DATA_order.filter(panLab);
        //   this.RTD_a=ELEMENT_DATA_order.filter(RTD);
        //   this.Dispa_a=ELEMENT_DATA_order.filter(Dispa);
        //   this.Comp_a=ELEMENT_DATA_order.filter(Comp);
        // //   this.applyFilter_All();
        // //   this.selection.clear();
        // });
        this.service.success(data.message);
      }else{
        this.service.error(data.message);
      }
    });
  }
  rejectCall(sendobj){
    this.service.Data.ExecuteAPI<any>("Vender/RejectOrder",sendobj).then((data:any) =>
    {
    console.log("Recive--->>");
    console.log(data);
      if (data.success)
      {
        this.loadOrder();
        // sendobj.forEach(element => {
        //   if(element.orderSubStatus == 1){
        //     element.orderSubStatus = 6;
        //   }
        //   this.new_order_a=ELEMENT_DATA_order.filter(new_order);
        //   this.panLab_a=ELEMENT_DATA_order.filter(panLab);
        //   this.RTD_a=ELEMENT_DATA_order.filter(RTD);
        //   this.Dispa_a=ELEMENT_DATA_order.filter(Dispa);
        //   this.Comp_a=ELEMENT_DATA_order.filter(Comp);
        // //   this.applyFilter_All();
        // //   this.selection.clear();
        // });
        this.service.success(data.message);
      }else{
        this.service.error(data.message);
      }
    });
  }
}
function new_order(element, index, array) { 
  return (element.orderSubStatus == 1); 
}
function panLab(element, index, array) { 
  return (element.orderSubStatus == 2); 
}
function RTD(element, index, array) { 
  return (element.orderSubStatus == 3); 
}
function Dispa(element, index, array) { 
  return (element.orderSubStatus == 4); 
}
function Comp(element, index, array) { 
  return (element.orderSubStatus == 5); 
}



export class orderTbl {
  id: number;
  orderIdV: number;
  sku: number;
  name: string;
  userName:string;
  qty: number;
  price:number;
  orderSubStatus:number;
  UpdateDt:string;
}
const ELEMENT_DATA_order: orderTbl[] = [];
