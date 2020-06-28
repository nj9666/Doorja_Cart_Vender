// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../../Shared/SystemService';
import { element } from 'protractor';


@Component({
  selector: 'kt-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  displayedColumns: string[] = ['select','pic','sku', 'name','catname','currentRating','coloursList','userListing','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  pcats: PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: SystemService
    ) { }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnInit() {
    this.loadProduct();
    this.pcats = ELEMENT_DATA.filter(ispcat);
  }
  getselected(){
    console.log(this.selection.selected);
  }
  editProduct(id) {
		this.router.navigate(['/product/addnew', id], { relativeTo: this.activatedRoute });
	}
	createProduct() {
		this.router.navigateByUrl('/product/addnew');
  }
  loadProduct(){
   
    this.service.Data.ExecuteAPI_Get<any>("Product/GetAll/Vender").then((data:any) =>
		{
      this.dataSource = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA.length = 0;
        data.data.forEach(element => { ELEMENT_DATA.push(element); });
        
        console.log(ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
      }
		});
  }

}
function ispcat(element, index, array) { 
  return (element.pid == 0); 
}
export interface PeriodicElement {
  pic: string;
  id:number;
  sku: string;
  catname: string;
  name: string;
  currentRating:number;
  userListing:boolean;
  coloursList:any;
}

const ELEMENT_DATA: PeriodicElement[] = [];
