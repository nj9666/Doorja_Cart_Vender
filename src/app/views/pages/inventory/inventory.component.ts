// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SystemService } from '../../../Shared/SystemService';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'kt-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  lowstock_a: inventoryTbl[] = [];
  outofstock_a: inventoryTbl[] = [];
  allstock:number;
  displayedColumns: string[] = ['sku','pname','cname', 'sname', 'qty', 'actions'];
  dataSource_inventory = new MatTableDataSource<inventoryTbl>(ELEMENT_DATA_inventory);
  @ViewChild('mat_pag_inventory', {read: MatPaginator, static: true}) paginator_inventory: MatPaginator;
  @ViewChild('mattbl_inventory', {read: MatSort, static: true}) sort_inventory: MatSort;
  applyFilter_inventory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_inventory.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog,public service: SystemService) { 
    isdataChange = true;
  }

  ngOnInit() {
    this.dataSource_inventory.paginator = this.paginator_inventory;
    this.dataSource_inventory.sort = this.sort_inventory;
    
    
    this.loadInventory();
  }

  applyFilter_outof(){
    this.dataSource_inventory.data = ELEMENT_DATA_inventory.filter(outofstock);
  }
  applyFilter_lowstock(){
    this.dataSource_inventory.data = ELEMENT_DATA_inventory.filter(lowstock);
  }
  applyFilter_allstock(){
    this.dataSource_inventory.data = ELEMENT_DATA_inventory;
  }
  editelement(el){
    const dialogRef = this.dialog.open(stockDialog, {
      width: '250px',
      data: {dialogtext: "Add New", obj:el,id:el.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      console.log(isdataChange);
      if(isdataChange){
        this.loadInventory();
      }
    });
  }
  loadInventory(){
    this.service.Data.ExecuteAPI_Get<any>("Vender/Inventory").then((data:any) =>
		{
      this.dataSource_inventory = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_inventory.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_inventory.push(element); });
        this.dataSource_inventory = new MatTableDataSource<inventoryTbl>(ELEMENT_DATA_inventory);
        this.dataSource_inventory.paginator = this.paginator_inventory;
        this.dataSource_inventory.sort = this.sort_inventory;
        this.lowstock_a = ELEMENT_DATA_inventory.filter(lowstock);
        this.outofstock_a = ELEMENT_DATA_inventory.filter(outofstock);
        this.allstock = ELEMENT_DATA_inventory.length;
      }
		});
  }
  
}

@Component({
  selector: 'stockDialog',
  templateUrl: 'stockDialog.html',
})
export class  stockDialog {
  constructor(
    public fb: FormBuilder,
    public service: SystemService,
    public dialogRef: MatDialogRef<stockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }
  stockForm:FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(){
    this.stockForm = this.fb.group({
      newStock:["",Validators.required]
    });
  }

  AddStock(){
     var spid = this.data.id;
     var addstock = this.stockForm.value.newStock
    this.service.Data.ExecuteAPI<any>("Vender/AddStock/"+spid,addstock).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
        isdataChange = true;
        this.service.success(data.message);
      }else{
        this.service.error(data.message);
      }
      this.dialogRef.close();
    });
  }
}
function lowstock(element, index, array) { 
  return (element.qty <= 20 && element.qty > 0); 
}
function outofstock(element, index, array) { 
  return (element.qty < 1); 
}
export class inventoryTbl {
  id: number;
  sku: number;
  pname: string;
  qty: number;
  cname: string;
  sname: string;
}
const ELEMENT_DATA_inventory: inventoryTbl[] = [];

var isdataChange = false;