// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'kt-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  displayedColumns: string[] = ['select','Sku', 'Name','CatId','CurrentRating','ColorId','SizeId','Price','OfferPrice','UserListing','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  pcats: PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
		private activatedRoute: ActivatedRoute,
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pcats = ELEMENT_DATA.filter(ispcat)
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
}
function ispcat(element, index, array) { 
  return (element.pid == 0); 
}
export interface PeriodicElement {
  id:number;
  Sku: number;
  CatId: number;
  Name: string;
  CurrentRating:number;
  UserListing:boolean;
  ColorId:string;
  SizeId:string;
  Price:number;
  OfferPrice:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,Sku:130, CatId:86, Name:"Milk 2% 500 Ml", CurrentRating:2.2, UserListing:true, ColorId:"Fuscia", SizeId:"3XL", Price:142, OfferPrice:691},
{id:1,Sku:145, CatId:48, Name:"Cherries - Fresh", CurrentRating:2.1, UserListing:false, ColorId:"Goldenrod", SizeId:"L", Price:440, OfferPrice:897},
{id:1,Sku:908, CatId:28, Name:"Absolut Citron", CurrentRating:3.2, UserListing:false, ColorId:"Aquamarine", SizeId:"2XL", Price:167, OfferPrice:949},
{id:1,Sku:247, CatId:67, Name:"Chicken - Tenderloin", CurrentRating:3.4, UserListing:true, ColorId:"Indigo", SizeId:"M", Price:170, OfferPrice:697},
{id:1,Sku:653, CatId:83, Name:"Walkers Special Old Whiskey", CurrentRating:4.0, UserListing:false, ColorId:"Turquoise", SizeId:"M", Price:146, OfferPrice:940},
{id:1,Sku:701, CatId:93, Name:"Lemon Grass", CurrentRating:4.1, UserListing:false, ColorId:"Goldenrod", SizeId:"L", Price:355, OfferPrice:813},
{id:1,Sku:752, CatId:28, Name:"Cheese - Cheddar, Mild", CurrentRating:1.8, UserListing:true, ColorId:"Mauv", SizeId:"XS", Price:109, OfferPrice:776},
{id:1,Sku:292, CatId:19, Name:"Cookie Choc", CurrentRating:3.2, UserListing:false, ColorId:"Fuscia", SizeId:"XL", Price:497, OfferPrice:713},
{id:1,Sku:692, CatId:18, Name:"Sobe - Green Tea", CurrentRating:4.1, UserListing:true, ColorId:"Turquoise", SizeId:"S", Price:129, OfferPrice:673},
{id:1,Sku:659, CatId:40, Name:"Plate Foam Laminated 9in Blk", CurrentRating:2.3, UserListing:true, ColorId:"Indigo", SizeId:"XS", Price:434, OfferPrice:531},
{id:1,Sku:54, CatId:24, Name:"Jack Daniels", CurrentRating:3.1, UserListing:false, ColorId:"Aquamarine", SizeId:"3XL", Price:145, OfferPrice:816},
{id:1,Sku:431, CatId:47, Name:"Lamb - Racks, Frenched", CurrentRating:1.5, UserListing:true, ColorId:"Turquoise", SizeId:"S", Price:276, OfferPrice:775},
{id:1,Sku:584, CatId:30, Name:"Lettuce - Lambs Mash", CurrentRating:1.5, UserListing:true, ColorId:"Turquoise", SizeId:"S", Price:400, OfferPrice:752},
{id:1,Sku:196, CatId:72, Name:"Wine - Sake", CurrentRating:2.9, UserListing:true, ColorId:"Turquoise", SizeId:"S", Price:172, OfferPrice:803},
{id:1,Sku:381, CatId:21, Name:"Puree - Pear", CurrentRating:4.4, UserListing:false, ColorId:"Puce", SizeId:"M", Price:297, OfferPrice:824},
{id:1,Sku:615, CatId:94, Name:"Glass Clear 8 Oz", CurrentRating:1.5, UserListing:true, ColorId:"Purple", SizeId:"XS", Price:224, OfferPrice:769},
{id:1,Sku:478, CatId:26, Name:"Bread - Roll, Italian", CurrentRating:1.2, UserListing:false, ColorId:"Orange", SizeId:"2XL", Price:14, OfferPrice:634},
{id:1,Sku:977, CatId:35, Name:"Wine - Bouchard La Vignee Pinot", CurrentRating:1.3, UserListing:true, ColorId:"Puce", SizeId:"XL", Price:343, OfferPrice:716},
{id:1,Sku:473, CatId:44, Name:"Glass Clear 8 Oz", CurrentRating:4.2, UserListing:false, ColorId:"Purple", SizeId:"S", Price:405, OfferPrice:615},
{id:1,Sku:384, CatId:4, Name:"Lamb - Rack", CurrentRating:4.7, UserListing:false, ColorId:"Khaki", SizeId:"S", Price:404, OfferPrice:861},

];
