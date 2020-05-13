// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {

  product: productModel;
  selectedTab: number = 0;
  productForm: FormGroup;
  colors=[
    {id:1,name:"red"},
    {id:2,name:"#d3fc45"},
    {id:3,name:"green"},
    {id:4,name:"blue"},
    {id:5,name:"#ff0"},
    {id:6,name:"#fff"},
  ];
  sizes=[
    {id:1,name:"XS"},
    {id:2,name:"S"},
    {id:3,name:"M"},
    {id:4,name:"L"},
    {id:5,name:"XL"},
    {id:6,name:"XXL"},
  ];
  pro_imgs=[
    {id:1,name:"product2.jpg"},
    {id:2,name:"product3.jpg"},
    {id:3,name:"product4.jpg"},
    {id:4,name:"product5.jpg"},
    {id:5,name:"product6.jpg"},
    {id:6,name:"product10.jpg"},
    {id:7,name:"product12.jpg"},
    {id:8,name:"product11.jpg"},
    {id:9,name:"product8.jpg"},
  ];


  constructor(
    private router: Router,
		private productFB: FormBuilder,
  ) { }

  ngOnInit() {
  }

  getComponentTitle() {
		let result = 'Create product';
		if (!this.product || !this.product.Id) {
			return result;
		}
		result = `Edit product - ${this.product.Name} - ${this.product.Sku}`;
		return result;
  }
  goBackWithoutId	() {
		this.router.navigateByUrl('/product/listing');
	}

	/**
	 * Create form
	 */



  createForm() {
		this.productForm = this.productFB.group({
      Sku: [this.product.Sku, Validators.required],
      CatId: [this.product.CatId, Validators.required],
      Name: [this.product.Name, Validators.required],
      UserListing: [this.product.UserListing, Validators.required],
      Description: [this.product.Description, Validators.required],
      Tags: [this.product.Tags],

      IsReturnable: [this.product.IsReturnable, Validators.required],
      ReturnDays: [this.product.ReturnDays, Validators.required],
      Policy: [this.product.Policy, Validators.required],

      PackWeight: [this.product.PackWeight, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      PackLenght: [this.product.PackLenght, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      PackBreadth: [this.product.PackBreadth, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      PackHeight: [this.product.PackHeight, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
		});
	}

}
export class productModel {
  Id:number;
  CatId:number;
  VenderId:number;
  Sku:string;
  Name:string;
  Description:string;
  Tags:string;
  IsReturnable:boolean;
  ReturnDays:number;
  Policy:string;
  CurrentRating:number;
  RatingCount:number;
  ReviewCount:number;
  UserListing:boolean;
  PackWeight:number;
  PackLenght:number;
  PackBreadth:number;
  PackHeight:number;
  
  SubProductTbl:SubProductTbl[] 
}
export class SubProductTbl{
  Id:number;
  ProductId:number;
  SizeId:number;
  ColorId:number;
  Price:number;
  OfferPrice:number;
  Qty:number;
  ProductImg:ProductImg[];
}
export class ProductImg{
  Id:number;
  SubProducatId:number;
  Path:string;
}