// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {
  displayedColumns: string[] = ['Sku','Name','ColorId', 'SizeId', 'Price'];
  dataSource_return = new MatTableDataSource<returnTbl>(ELEMENT_DATA_return);
  @ViewChild('mat_pag_return', {read: MatPaginator, static: true}) paginator_return: MatPaginator;
  @ViewChild('mattbl_return', {read: MatSort, static: true}) sort_return: MatSort;
  applyFilter_return(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_return.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource_return.paginator = this.paginator_return;
    this.dataSource_return.sort = this.sort_return;
    
  }

}
export class returnTbl {
  Id: number;
  Sku: number;
  Name: string;
  Qty: number;
  ColorId: string;
  SizeId: string;
  Price: number;
}
const ELEMENT_DATA_return: returnTbl[] = [
  {Id:1, Sku:46, Name:"Wine - Ej Gallo Sonoma", Qty:27, ColorId:"#664d1f", SizeId:"S", Price:200},
  {Id:2, Sku:71, Name:"Liqueur Banana, Ramazzotti", Qty:20, ColorId:"#63f1b3", SizeId:"L", Price:200},
  {Id:3, Sku:87, Name:"Juice - Orange, 341 Ml", Qty:98, ColorId:"#f39d6e", SizeId:"3XL", Price:200},
  {Id:4, Sku:79, Name:"Bread - Sticks, Thin, Plain", Qty:31, ColorId:"#435874", SizeId:"2XL", Price:200},
  {Id:5, Sku:34, Name:"Longos - Grilled Chicken With", Qty:49, ColorId:"#489524", SizeId:"S", Price:200},
  {Id:6, Sku:73, Name:"Wine - Cousino Macul Antiguas", Qty:48, ColorId:"#fbb0e0", SizeId:"2XL", Price:200},
  {Id:7, Sku:73, Name:"Wine - Rosso Del Veronese Igt", Qty:29, ColorId:"#d61996", SizeId:"2XL", Price:200},
  {Id:8, Sku:50, Name:"Squash - Sunburst", Qty:89, ColorId:"#786e89", SizeId:"XL", Price:200},
  {Id:9, Sku:44, Name:"Oil - Macadamia", Qty:87, ColorId:"#deaa2b", SizeId:"L", Price:200},
  {Id:10, Sku:64, Name:"Wiberg Cure", Qty:3, ColorId:"#633e85", SizeId:"L", Price:200},
  {Id:11, Sku:11, Name:"Wine - Ruffino Chianti Classico", Qty:0, ColorId:"#29e1a2", SizeId:"S", Price:200},
  {Id:12, Sku:90, Name:"Cookie Dough - Peanut Butter", Qty:26, ColorId:"#8dc143", SizeId:"L", Price:200},
  {Id:13, Sku:28, Name:"Wine - Cave Springs Dry Riesling", Qty:4, ColorId:"#02c125", SizeId:"L", Price:200},
  {Id:14, Sku:10, Name:"Lamb Shoulder Boneless Nz", Qty:0, ColorId:"#d5fd1e", SizeId:"S", Price:200},
  {Id:15, Sku:93, Name:"Spice - Peppercorn Melange", Qty:40, ColorId:"#ab964a", SizeId:"L", Price:200},
  {Id:16, Sku:15, Name:"Pork - Bacon, Sliced", Qty:79, ColorId:"#035b82", SizeId:"M", Price:200},
  {Id:17, Sku:88, Name:"Chicken - Wings, Tip Off", Qty:36, ColorId:"#9819fa", SizeId:"XS", Price:200},
  {Id:18, Sku:52, Name:"Versatainer Nc - 888", Qty:36, ColorId:"#a3737f", SizeId:"S", Price:200},
  {Id:19, Sku:48, Name:"Pastry - Choclate Baked", Qty:9, ColorId:"#e6ac3e", SizeId:"S", Price:200},
  {Id:20, Sku:96, Name:"Scallops - U - 10", Qty:28, ColorId:"#f5797e", SizeId:"3XL", Price:200},
];
