// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  lowstock_a: inventoryTbl[];
  outofstock_a: inventoryTbl[];
  allstock:number;
  displayedColumns: string[] = ['Sku','Name','ColorId', 'SizeId', 'Qty', 'actions'];
  dataSource_inventory = new MatTableDataSource<inventoryTbl>(ELEMENT_DATA_inventory);
  @ViewChild('mat_pag_inventory', {read: MatPaginator, static: true}) paginator_inventory: MatPaginator;
  @ViewChild('mattbl_inventory', {read: MatSort, static: true}) sort_inventory: MatSort;
  applyFilter_inventory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_inventory.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource_inventory.paginator = this.paginator_inventory;
    this.dataSource_inventory.sort = this.sort_inventory;
    
    this.lowstock_a = ELEMENT_DATA_inventory.filter(lowstock);
    this.outofstock_a = ELEMENT_DATA_inventory.filter(outofstock);
    this.allstock = ELEMENT_DATA_inventory.length;
  }

  applyFilter_outof(){
    console.log(this.dataSource_inventory.data)
    this.dataSource_inventory.data = ELEMENT_DATA_inventory.filter(outofstock);
    console.log(this.dataSource_inventory.data)
  }
  applyFilter_lowstock(){
    this.dataSource_inventory.data = ELEMENT_DATA_inventory.filter(lowstock);
  }
  applyFilter_allstock(){
    this.dataSource_inventory.data = ELEMENT_DATA_inventory;
  }
  editelement(el){
    console.log(el);
    const dialogRef = this.dialog.open(stockDialog, {
      width: '250px',
      data: {dialogtext: "Edit this", obj:el}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result.addStock != null){
        el.Qty += parseInt(result.addStock);
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
    public dialogRef: MatDialogRef<stockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
function lowstock(element, index, array) { 
  return (element.Qty <= 20 && element.Qty > 0); 
}
function outofstock(element, index, array) { 
  return (element.Qty == 0); 
}
export class inventoryTbl {
  Id: number;
  Sku: number;
  Name: string;
  Qty: number;
  ColorId: string;
  SizeId: string;
}
const ELEMENT_DATA_inventory: inventoryTbl[] = [
  {Id:1, Sku:46, Name:"Wine - Ej Gallo Sonoma", Qty:27, ColorId:"#664d1f", SizeId:"S"},
  {Id:2, Sku:71, Name:"Liqueur Banana, Ramazzotti", Qty:20, ColorId:"#63f1b3", SizeId:"L"},
  {Id:3, Sku:87, Name:"Juice - Orange, 341 Ml", Qty:98, ColorId:"#f39d6e", SizeId:"3XL"},
  {Id:4, Sku:79, Name:"Bread - Sticks, Thin, Plain", Qty:31, ColorId:"#435874", SizeId:"2XL"},
  {Id:5, Sku:34, Name:"Longos - Grilled Chicken With", Qty:49, ColorId:"#489524", SizeId:"S"},
  {Id:6, Sku:73, Name:"Wine - Cousino Macul Antiguas", Qty:48, ColorId:"#fbb0e0", SizeId:"2XL"},
  {Id:7, Sku:73, Name:"Wine - Rosso Del Veronese Igt", Qty:29, ColorId:"#d61996", SizeId:"2XL"},
  {Id:8, Sku:50, Name:"Squash - Sunburst", Qty:89, ColorId:"#786e89", SizeId:"XL"},
  {Id:9, Sku:44, Name:"Oil - Macadamia", Qty:87, ColorId:"#deaa2b", SizeId:"L"},
  {Id:10, Sku:64, Name:"Wiberg Cure", Qty:3, ColorId:"#633e85", SizeId:"L"},
  {Id:11, Sku:11, Name:"Wine - Ruffino Chianti Classico", Qty:0, ColorId:"#29e1a2", SizeId:"S"},
  {Id:12, Sku:90, Name:"Cookie Dough - Peanut Butter", Qty:26, ColorId:"#8dc143", SizeId:"L"},
  {Id:13, Sku:28, Name:"Wine - Cave Springs Dry Riesling", Qty:4, ColorId:"#02c125", SizeId:"L"},
  {Id:14, Sku:10, Name:"Lamb Shoulder Boneless Nz", Qty:0, ColorId:"#d5fd1e", SizeId:"S"},
  {Id:15, Sku:93, Name:"Spice - Peppercorn Melange", Qty:40, ColorId:"#ab964a", SizeId:"L"},
  {Id:16, Sku:15, Name:"Pork - Bacon, Sliced", Qty:79, ColorId:"#035b82", SizeId:"M"},
  {Id:17, Sku:88, Name:"Chicken - Wings, Tip Off", Qty:36, ColorId:"#9819fa", SizeId:"XS"},
  {Id:18, Sku:52, Name:"Versatainer Nc - 888", Qty:36, ColorId:"#a3737f", SizeId:"S"},
  {Id:19, Sku:48, Name:"Pastry - Choclate Baked", Qty:9, ColorId:"#e6ac3e", SizeId:"S"},
  {Id:20, Sku:96, Name:"Scallops - U - 10", Qty:28, ColorId:"#f5797e", SizeId:"3XL"},
];
