// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'kt-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['select','OrderId', 'Sku', 'ProName', 'User', 'Qty', 'Price', 'Status', 'actions'];
  dataSource_order = new MatTableDataSource<orderTbl>(ELEMENT_DATA_order);
  selection = new SelectionModel<orderTbl>(true, []);
  @ViewChild('mat_pag_order', {read: MatPaginator, static: true}) paginator_order: MatPaginator;
  @ViewChild('mattbl_order', {read: MatSort, static: true}) sort_order: MatSort;
  applyFilter_order(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_order.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource_order.paginator = this.paginator_order;
    this.dataSource_order.sort = this.sort_order;
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


}
export class orderTbl {
  Id: number;
  OrderId: number;
  Sku: number;
  ProName: string;
  User:string;
  Qty: number;
  Price:number;
  Status:number;
}
const ELEMENT_DATA_order: orderTbl[] = [
  {Id:1, OrderId:3342751, Sku:40, ProName:"Longos - Burritos", User:"Thomasina Done", Qty:13, Price:271, Status:4},
{Id:2, OrderId:9597247, Sku:14, ProName:"Wine - Magnotta - Cab Sauv", User:"Kele Forber", Qty:68, Price:589, Status:2},
{Id:3, OrderId:9252788, Sku:4, ProName:"Pepper - Gypsy Pepper", User:"Malvin Rilston", Qty:29, Price:161, Status:3},
{Id:4, OrderId:1942592, Sku:52, ProName:"Mikes Hard Lemonade", User:"Seymour Gruczka", Qty:54, Price:630, Status:4},
{Id:5, OrderId:4954835, Sku:1, ProName:"Bread - Multigrain", User:"Florencia McBain", Qty:26, Price:303, Status:1},
{Id:6, OrderId:6934181, Sku:36, ProName:"Wheat - Soft Kernal Of Wheat", User:"Fielding Dandy", Qty:18, Price:758, Status:4},
{Id:7, OrderId:5547923, Sku:86, ProName:"Wine - Cahors Ac 2000, Clos", User:"Rollins Nevin", Qty:64, Price:455, Status:2},
{Id:8, OrderId:8006304, Sku:48, ProName:"Shrimp - Baby, Warm Water", User:"Andrea Bricklebank", Qty:81, Price:259, Status:5},
{Id:9, OrderId:6000630, Sku:86, ProName:"Ecolab - Medallion", User:"Wallas Dinis", Qty:54, Price:868, Status:2},
{Id:10, OrderId:4704063, Sku:48, ProName:"Bok Choy - Baby", User:"Amitie Mirando", Qty:31, Price:509, Status:5},
{Id:11, OrderId:7527809, Sku:68, ProName:"Yogurt - Banana, 175 Gr", User:"Benoit Balas", Qty:100, Price:227, Status:3},
{Id:12, OrderId:3330160, Sku:48, ProName:"Crab - Dungeness, Whole, live", User:"Saba Mordecai", Qty:37, Price:515, Status:3},
{Id:13, OrderId:1055284, Sku:3, ProName:"Phyllo Dough", User:"Wiley Jorg", Qty:66, Price:240, Status:1},
{Id:14, OrderId:1435831, Sku:33, ProName:"Tray - 12in Rnd Blk", User:"Sheri LLelweln", Qty:76, Price:333, Status:2},
{Id:15, OrderId:7668874, Sku:49, ProName:"Lentils - Green Le Puy", User:"Siobhan Menault", Qty:99, Price:702, Status:3},
{Id:16, OrderId:1465555, Sku:93, ProName:"Stock - Veal, Brown", User:"Melody Hurich", Qty:9, Price:271, Status:1},
{Id:17, OrderId:4499330, Sku:65, ProName:"Beer - Sleemans Honey Brown", User:"Thia Khomich", Qty:84, Price:705, Status:2},
{Id:18, OrderId:4087384, Sku:97, ProName:"Beans - Wax", User:"Warner Iban", Qty:75, Price:169, Status:4},
{Id:19, OrderId:4272420, Sku:36, ProName:"Shortbread - Cookie Crumbs", User:"Marnie Doggerell", Qty:71, Price:224, Status:1},
{Id:20, OrderId:1533116, Sku:81, ProName:"Steam Pan Full Lid", User:"Raquela Triplett", Qty:75, Price:970, Status:5},
];
