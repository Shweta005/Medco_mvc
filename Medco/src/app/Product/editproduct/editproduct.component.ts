import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Icategory } from 'src/app/ICategory';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  title="Update Product"
  public categories: Icategory[] = [];
  editProductForm  = new FormGroup({
    'pid':new FormControl(''),
        'imgurl':new FormControl(''),
        'productname':new FormControl(''),
        'productdesc': new FormControl(''),
        'quantity':new FormControl(''),
        'price':new FormControl(''),
        'catid':new FormControl(''),
        'mfgname':new FormControl(''),
        'categoryname':new FormControl('')
  });
  id:any;
  dataLoaded: boolean = false;

    constructor(private formBuilder : FormBuilder,private dataService: ProductService,private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.getCategories();
       this.editProductForm = this.formBuilder.group({
        'categoryName': [null]   // will use the property in html page
        })

       //logic for getting data in updateform
        this.id =localStorage.getItem('pid');
        console.log("editprod"+this.id);
        localStorage.clear();
        this.dataLoaded = false;
         if(this.id !==''){
           //view user details
           this.dataService.getProductById(this.id)
           .toPromise()
           .then((data: any) =>{
             console.log(data);

             //Build edit form
             this.editProductForm = new FormGroup({
              'pid':new FormControl(data['pid']),
              'imgurl':new FormControl(data['imgurl']),
              'productname':new FormControl(data['productname']),
              'productdesc': new FormControl(data['productdesc']),
              'quantity':new FormControl(data['quantity']),
              'price':new FormControl(data['price']),
              'catid':new FormControl(data['catid']),
              'mfgname':new FormControl(data['mfgname']),
              'categoryname':new FormControl(data['categoryname'])

                //  'catName' : new FormControl(this.categoryDetails.catName),
               });

               this.dataLoaded = true;
           })
           .catch(err =>{
             console.log(err);
           })
         }


      this.editProductForm = this.formBuilder.group({
        'pid':[''],
        'imgurl':['',[Validators.required,  Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
        'productname': ['',[Validators.required,   Validators.pattern("^[0-9a-zA-Z]+$")]],
        'productdesc': ['',[Validators.required,  Validators.pattern("^[0-9a-zA-Z]+$")]],
        'quantity':['',[Validators.required]],
        'price':['',[Validators.required]],
        'catid':[''],
        'mfgname':['',[Validators.required,  Validators.pattern("^[a-z](pvt ltd)")]],
        'categoryname':['',[Validators.required,  Validators.pattern("^[a-z]")]]
      })
    }







     //Get all categories
       getCategories() {
      this.dataService
        .getCategories()
        .subscribe((allCategories) => (this.categories = allCategories));
    }


   updateProduct(){
    console.log(this.id)
    console.log("update:"+this.editProductForm.value.productname);
   this.dataService.updateProduct(this.id,this.editProductForm.value).subscribe(data=>{

     this._snackBar.open("Product updated successfully!")._dismissAfter(2000);
     console.log(data);
    }, err =>{
     this._snackBar.open("Unable to update product")._dismissAfter(2000);
    });
  }





  }
