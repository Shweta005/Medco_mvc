import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Icategory } from 'src/app/ICategory';
import { Icoupen } from 'src/app/ICoupen';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-addcoupen',
  templateUrl: './addcoupen.component.html',
  styleUrls: ['./addcoupen.component.css']
})
export class AddcoupenComponent implements OnInit {
title = "Coupen";
faEdit = faEdit;
faDelete = faTrash;
public coupens: Icoupen[] = [];
public categories: Icategory[] = [];
if:any;
addCoupenForm : FormGroup = new FormGroup({

});
editCoupenForm = new FormGroup({
  "cid"          :new FormControl(''),
  "coupencode"   :new FormControl(''),
  "coupenname"   :new FormControl(''),
  "appliesto"    :new FormControl(''),
  "createddate"  :new FormControl(''),
  "expirydate"   :new FormControl(''),
  "closeddate"   :new FormControl(''),
  "availability" :new FormControl(''),
  "discount"     :new FormControl('')

});
dataLoaded: boolean = false;
  constructor(private dataService: ProductService,
    private _snackBar: MatSnackBar,
    private formBuilder : FormBuilder,
    private router : Router ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCoupens();

    this.addCoupenForm = this.formBuilder.group({
      "cid"          :new FormControl(''),
      "coupencode"   :new FormControl(''),
      "coupenname"   :new FormControl(''),
      "appliesto"    :new FormControl(''),
      "createddate"  :new FormControl(''),
      "expirydate"   :new FormControl(''),
      "closeddate"   :new FormControl(''),
      "availability" :new FormControl(''),
      "discount"     :new FormControl('')
  });
}

    //Get all categories
    getCategories() {
      this.dataService
        .getCategories()
        .subscribe((allCategories) => (this.categories = allCategories));
    }

     //Get all categories
    getCoupens() {
    this.dataService.getCoupens().subscribe((allcoupens)=>(
      this.coupens= allcoupens));
      console.log(this.coupens);
  }
    addCoupen(){
      console.log(this.addCoupenForm.value.appliesto);
    return this.dataService.addCoupen(this.addCoupenForm.value).subscribe(data=>{
     this._snackBar.open("Coupen added successfully!");
     console.log(data);
    }, err =>{
      console.log(err);
     this._snackBar.open("Unable to create coupen");
    });
  }
//Update coupen
// updateCoupen(){
//   // console.log(this.id)
//   console.log("update:"+this.addCoupenForm.value.catname);
//  this.dataService.updateCategory(this.id,this.addCoupenForm.value).subscribe(data=>{

//    this._snackBar.open("Category updated successfully!");
//    console.log(data);
//   }, err =>{
//    this._snackBar.open("Unable to create category");
//   });
// }

  //Delete Selected coupen
  deleteCoupen(coupen: any) {
    let id = coupen.cid;
    if (id) {
      this.dataService.deleteCoupen(id).subscribe(
        (data) => {
          this._snackBar.open(
            `Coupen ${coupen.coupenname} deleted successfully!`
          );
          console.log(data);
        },
        (err) => {
          this._snackBar.open('Unable to delete category');
        }
      );
    }
  }
  editCoupen(coupen:any){
    this.dataLoaded = false;
    let id = coupen.cid;
    localStorage.setItem('Coupen',id);
    if (id) {
       //view user details
       this.dataService.getCoupenById(id)
       .toPromise()
       .then((data: any) =>{
         console.log(data);
        //  this.categoryDetails = data;
        //  Object.assign(this.categoryDetails,data);
        //  console.log(this.categoryDetails.catname);
         //Build edit form
         this.addCoupenForm = new FormGroup({
          "cid"          :new FormControl(data['cid']),
          "coupencode"   :new FormControl(data['coupencode']),
          "coupenname"   :new FormControl(data['coupenname']),
          "appliesto"    :new FormControl(data['appliesto']),
          "createddate"  :new FormControl(data['createddate']),
          "expirydate"   :new FormControl(data['expirydate']),
          "availability" :new FormControl(data['availability']),
          "discount"     :new FormControl(data['discount'])
           });

           this.dataLoaded = true;
       })
       .catch(err =>{
         console.log(err);
       })
     }
  }
  //Update coupen
  updateCoupen(){
    let id = localStorage.getItem('Coupen');
    localStorage.clear();
    console.log(id);
    console.log("update:"+this.editCoupenForm.value);
   this.dataService.updateCoupen(id,this.editCoupenForm.value).subscribe(data=>{

     this._snackBar.open("Coupen updated successfully!");
     console.log(data);
    }, err =>{
     this._snackBar.open("Unable to create coupen");
    });
  }

}
