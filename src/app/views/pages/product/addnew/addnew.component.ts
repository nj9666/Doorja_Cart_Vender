// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {
  subProNo:Boolean = true; 
  MCategories:any = [];
  productid:number = 21;
  yoursize:any = [];
  adminsize:any = [];
  yourcolors:any = [];
  admincolors:any = [];
  venderid = JSON.parse( localStorage.getItem('user_Data')).id;
  product: productModel;
  selectedTab: number = 0;
  productForm: FormGroup;
  subproductForm: FormGroup;
  SubProductTbl:SubProductTbl[] = [];
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
    private fb: FormBuilder,
    public dialog: MatDialog,
    public service: SystemService,
  ) { 
    isdataChange = true;
    this.loadSize();
    this.loadColour();
    this.createForm();
    this.createsubForm();
  }

  openDialog(f:number): void {
    if (f == 1) {
      const dialogRef = this.dialog.open(SizeDialog, {
        width: '250px',
        data: {dialogtext: "Add New",id:-1}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ++');
        console.log(result);
        console.log(isdataChange);
        if(isdataChange){
          this.loadSize();
        }
      }); 
    }else{
      const dialogRef = this.dialog.open(colourDialog, {
        width: '250px',
        data: {dialogtext: "Add New",id:-1}
      }); 
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if(isdataChange){
          this.loadColour();
        }
      });
    }
    
  }

  ngOnInit() {
    this.loadCat();
    this.loadSubPro();
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
  resetsub(){
    this.subproductForm.reset();
  }
  createsubForm() {
		this.subproductForm = this.fb.group({
      ColorId: ["", Validators.required],
      SizeId: ["", Validators.required],
      Qty: ["", Validators.required],
      Price: ["", Validators.required],
      OfferPrice: ["", Validators.required],
		});
  }

  createForm() {
		this.productForm = this.fb.group({
      Sku: ["", Validators.required],
      CatId: ["", Validators.required],
      Name: ["", Validators.required],
      UserListing: [""],
      Description: ["", Validators.required],
      Tags: ["", Validators.required],

      
      PackWeight: ["", Validators.required],
      PackLenght: ["", Validators.required],
      PackBreadth: ["", Validators.required],
      PackHeight: ["", Validators.required],

      IsReturnable: [""],
      ReturnDays: [""],
      Policy: [""],

		});
  }
  loadCat(){
    this.service.Data.ExecuteAPI_Get<any>("Category/GetAll").then((data:any) =>
		{
      if (data.success)
      {
        this.MCategories.length = 0;
        data.data.forEach(element => { this.MCategories.push(element); });
       
      }
		});
  }
  loadSize(){
    this.service.Data.ExecuteAPI_Get<any>("Sizes/GetAll").then((data:any) =>
		{
      if (data.success)
      {
        this.yoursize.length = 0;
        this.adminsize.length = 0;
        data.data.forEach(element => {
          if (element.venderId == this.venderid) {
            this.yoursize.push(element);
          } else if(element.venderId == null){
            this.adminsize.push(element);
          }
        });
        
        isdataChange = false;
      }
		});
  }
  loadColour(){
    this.service.Data.ExecuteAPI_Get<any>("Colours/GetAll").then((data:any) =>
		{
      if (data.success)
      {
        this.yourcolors.length = 0;
        this.admincolors.length = 0;
        data.data.forEach(element => {
          if (element.venderId == this.venderid) {
            this.yourcolors.push(element);
          } else if(element.venderId == null){
            this.admincolors.push(element);
          }
        });
       
        isdataChange = false;
      }
		});
  }
  loadSubPro(){
    this.service.Data.ExecuteAPI_Get<any>("subProduct/GetAll/"+this.productid).then((data:any) =>
		{
      if (data.success)
      {
        this.SubProductTbl.length = 0;
        data.data.forEach(element => {
            var sp = {

            };
            this.SubProductTbl.push(element);
        });
       
        isdataChange = false;
      }
		});
  }
  AddProduct(){
    console.log(this.productForm.value);
    this.service.Data.ExecuteAPI<any>("Product/Insert",this.productForm.value).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
        this.subProNo = true; 
        this.selectedTab = 2;
        this.productid = data.data.id
        this.service.success(data.message);
      }else{
        this.service.error(data.message);
      }
    });
  }
  AddsubProduct(){
    this.service.Data.ExecuteAPI<any>("subProduct/Insert/"+this.productid,this.subproductForm.value).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
        this.subProNo = true; 
        this.selectedTab = 2;
        this.loadSubPro();
        this.service.success(data.message);
      }else{
        this.service.error(data.message);
      }
    });
  }
}


@Component({
  selector: 'SizeDialog',
  templateUrl: 'SizeDialog.html',
})
export class  SizeDialog {
  SizeForm:FormGroup;
  venderid = JSON.parse( localStorage.getItem('user_Data')).id;

  constructor(
    public fb: FormBuilder,
    public service: SystemService,
  public dialogRef: MatDialogRef<SizeDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm(dt){
    if(dt.id == -1){
      this.SizeForm = this.fb.group({
        SizeName:["",Validators.required]
      });
    }else{
      this.SizeForm = this.fb.group({
        SizeName:[dt.catname,Validators.required]
      });
    }
    
  }
  
  Addsize(){
      console.log('The dialog was closed------------------------');
      console.log(this.SizeForm.value.SizeName);
      var _name = this.SizeForm.value.SizeName;
      let Size = {
        VenderId : this.venderid,
        name : _name,
      }; 
      
      if(this.data.id == -1){
        this.service.Data.ExecuteAPI<any>("Sizes/Insert/",Size).then((data:any) =>
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
      }else{
        this.service.Data.ExecuteAPI<any>("Sizes/Edit/"+this.data.id,Size).then((data:any) =>
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



  

}
@Component({
  selector: 'colourDialog',
  templateUrl: 'colourDialog.html',
})
export class  colourDialog {
  ColorForm:FormGroup;
  venderid = JSON.parse( localStorage.getItem('user_Data')).id;

  constructor(
    public fb: FormBuilder,
    public service: SystemService,
    public dialogRef: MatDialogRef<colourDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.initForm(this.data);
    }
    initForm(dt){
      if(dt.id == -1){
        this.ColorForm = this.fb.group({
          ColorName:["",Validators.required]
        });
      }else{
        this.ColorForm = this.fb.group({
          ColorName:[dt.catname,Validators.required]
        });
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  AddColor(){
    console.log('The dialog was closed------------------------');
    console.log(this.ColorForm.value.ColorName);
    var _name = this.ColorForm.value.ColorName;
    let Size = {
      VenderId : this.venderid,
      name : _name,
    };
    
    if(this.data.id == -1){
      this.service.Data.ExecuteAPI<any>("Colours/Insert/",Size).then((data:any) =>
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
    }else{
      this.service.Data.ExecuteAPI<any>("Colours/Edit/"+this.data.id,Size).then((data:any) =>
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
  color:any;
  size:any;
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
var isdataChange = false;