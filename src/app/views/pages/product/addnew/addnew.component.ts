// Angular
import { Component, OnInit,  ViewChild, Inject, Input, Output, EventEmitter} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../../../../Shared/SystemService';
import { HttpClient, HttpResponse, HttpRequest, 
  HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'kt-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {
  subProNo:Boolean = false;
  editdatas: any; 
  MCategories:any = [];
  productid:number;
  yoursize:any = [];
  adminsize:any = [];
  yourcolors:any = [];
  admincolors:any = [];
  venderid = JSON.parse( localStorage.getItem('user_Data')).id;
  productname: any;
  productsku: any;
  selectedTab: number = 0;
  productForm: FormGroup;
  subproductForm: FormGroup;
  SubProductTbl:SubProductTbl[] = [];
  pro_imgs=[];
  qpid: any=0;
subProIdEdit:number = 0;
productIdEdit:number = 0;
  isEdit:Boolean = false;

  
 @Input() text_header_banner = 'Upload Banner'; @Input() accept_header_banner = 'image/*'; @Input() param_header_banner = 'file';
 @Output() complete_header_banner = new EventEmitter<string>(); files_header_banner: Array<FileUploadModel> = [];

  constructor(
    private _Activatedroute:ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _http: HttpClient,
    public dialog: MatDialog,
    public service: SystemService,
  ) { 
    isdataChange = true;
    this._Activatedroute.paramMap.subscribe(params => { 
      this.qpid = params.get('id') == null ? -1 : params.get('id');
      if(this.qpid > 0){
        this.isEdit = true;
      }
    });

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

    if(this.qpid > 0)
    {
      this.geteditdata()
    }
  }

  geteditdata()
  {
    this.service.Data.ExecuteAPI_Get<any>("Product/Get/"+this.qpid).then((data:any) =>
		{
      if (data.success)
      {
        this.editdatas = data.data;
        console.log(this.editdatas);
        this.productname = this.editdatas.name;
        this.productsku = this.editdatas.sku;
        this.productForm = this.fb.group({
          Sku: [{value:this.editdatas.sku,disabled: true}, Validators.required],
          CatId: [this.editdatas.catId, Validators.required],
          Name: [this.editdatas.name, Validators.required],
          UserListing: [this.editdatas.userListing],
          Description: [this.editdatas.description, Validators.required],
          Tags: [this.editdatas.tags, Validators.required],
    
          
          PackWeight: [this.editdatas.packWeight, Validators.required],
          PackLenght: [this.editdatas.packLenght, Validators.required],
          PackBreadth: [this.editdatas.packBreadth, Validators.required],
          PackHeight: [this.editdatas.packHeight, Validators.required],
    
          IsReturnable: [this.editdatas.isReturnable],
          ReturnDays: [this.editdatas.returnDays],
          Policy: [this.editdatas.policy],
    
        });

        this.isEdit = true;
        this.subProNo = true; 
        this.productid = this.qpid;
        this.loadSubPro();
      }
		});
  }

  getComponentTitle() {
		let result = 'Create product';
		if (!this.isEdit) {
			return result;
		}
		result = `Edit product - ${this.productname} - ${this.productsku}`;
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
            console.log(element);
            this.SubProductTbl.push(element);
        });
       
        isdataChange = false;
      }
		});
  }
  AddProduct(isEdit){
    if (isEdit) {
      console.log(this.productForm.value);
      this.service.Data.ExecuteAPI<any>("Product/Edit/"+this.qpid,this.productForm.value).then((data:any) =>
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
    }else{
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
  }
  AddsubProduct(isEdit){
    if (isEdit) {
      var sendsubProEdit = {
        ProductId: this.productid,
        SizeId:this.subproductForm.value.SizeId,
        ColorId:this.subproductForm.value.ColorId,
        Price:this.subproductForm.value.Price,
        OfferPrice:this.subproductForm.value.OfferPrice,
        Qty:this.subproductForm.value.Qty,
        ProductImg:this.pro_imgs
      }
      console.log(sendsubPro);
      this.service.Data.ExecuteAPI<any>("subProduct/Edit/"+this.subProIdEdit,sendsubProEdit).then((data:any) =>
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
    }else{
      var sendsubPro = {
        SizeId:this.subproductForm.value.SizeId,
        ColorId:this.subproductForm.value.ColorId,
        Price:this.subproductForm.value.Price,
        OfferPrice:this.subproductForm.value.OfferPrice,
        Qty:this.subproductForm.value.Qty,
        ProductImg:this.pro_imgs
      }
      console.log(sendsubPro);
      this.service.Data.ExecuteAPI<any>("subProduct/Insert/"+this.productid,sendsubPro).then((data:any) =>
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
  editsubprod(spid)
  {
    this.subProIdEdit = spid;
    let subpdt = this.SubProductTbl.find(f => f.id == spid);
    this.subproductForm = this.fb.group({
      ColorId: [subpdt['colorId'], Validators.required],
      SizeId: [subpdt['sizeId'], Validators.required],
      Qty: [subpdt['qty'], Validators.required],
      Price: [subpdt['price'], Validators.required],
      OfferPrice: [subpdt['offerPrice'], Validators.required],
    });
    
    this.pro_imgs = [];
    subpdt['productImg'].forEach(element => {
      var img = {
        "Path": "subproduct/"+element.path,
      }
      this.pro_imgs.push(img);
    });
  }


  uploadFile_header_banner(file: FileUploadModel)
  {
    const fd = new FormData(); fd.append(this.param_header_banner, file.data);
    const req = new HttpRequest('POST', 'https://localhost:44336/api/ShopAPI/Upload_Image', fd, { reportProgress: true });
    file.inProgress = true;
    file.sub = this._http.request(req).pipe( map(event => { switch (event.type) {
      case HttpEventType.UploadProgress:
        file.progress = Math.round(event.loaded * 100 / event.total);
        break;
      case HttpEventType.Response:
        return event; }}),
    tap(message => { }), last(),
    catchError((error: HttpErrorResponse) => { file.inProgress = false; file.canRetry = true; return of(`${file.data.name} upload failed.`); }))
    .subscribe( (event: any) => {
      if(event.body.success)
      {
        var img_name = event.body.data;
        var img = {
          "Path":img_name,
        }
        this.pro_imgs.push(img);
        console.log(this.pro_imgs);
      }else{
        this.service.error(event.body.message);
      }
      if (typeof (event) === 'object')
      {
        this.removeFileFromArray(file, "header_banner");
        this.complete_header_banner.emit(event.body);
      }
    });
  }

  removeFileFromArray(file: FileUploadModel, inputof) {
    
    if(inputof == "header_banner") { const index = this.files_header_banner.indexOf(file); if (index > -1) { this.files_header_banner.splice(index, 1); }}
  }
  
  uploadedimgs :any = "";
    uploadFiles(inputof) {
    this.uploadedimgs = ""; let i = 0;
    const fileUpload = document.getElementById('fileUpload_'+inputof) as HTMLInputElement;
    if(inputof == "header_banner")
      fileUpload.value = ''; this.files_header_banner.forEach(file => { this.uploadFile_header_banner(file); });
    
  }
  
  
    retryFile(file: FileUploadModel, inputof) {
    let files; files.push(file);
    this.uploadedimgs = "";
    if(inputof == "header_banner") { this.uploadFile_header_banner(file); file.canRetry = false; }
  }


  onClick(inputof)
  {
    if((inputof == "potfolio_tag_video") || inputof != "potfolio_tag_video")
    {
      const fileUpload = document.getElementById('fileUpload_' + inputof) as HTMLInputElement;

      fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index];

          if(inputof == "header_banner")
            this.files_header_banner.push({ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true });

        }
        this.uploadFiles(inputof);
      };
      fileUpload.click();
    }
    else
    {
      this.service.error("Please select any category first!!!");
    }
  }

  removeImg(pt){
    var Rimg = {
      Path:pt
    }
    var spId = 0
    if(this.subProIdEdit > 0){
      spId = this.subProIdEdit;
    }
    console.log(Rimg);
    this.service.Data.ExecuteAPI<any>("subProduct/productImg/Remove/"+spId,Rimg).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
        for( var i = 0; i < this.pro_imgs.length; i++)
        {
          if ( this.pro_imgs[i].Path === pt)
          {
            this.pro_imgs.splice(i, 1); i--;
          }
        }
        console.log(this.pro_imgs);
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
  id:number;
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

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}