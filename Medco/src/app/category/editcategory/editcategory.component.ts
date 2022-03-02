import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Icategory } from 'src/app/ICategory';
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  editCategoryForm = new FormGroup({
    'catid': new FormControl(''),
    'catname' : new FormControl('')
  });

  // categoryDetails :any;
  id:any;
  dataLoaded: boolean = false;
  constructor(private dataService: ProductService,private _snackBar: MatSnackBar,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.id =localStorage.getItem('catid');
    console.log("editcat"+this.id);
    localStorage.clear();
    this.dataLoaded = false;
     if(this.id !==''){
       //view user details
       this.dataService.getCategoryById(this.id)
       .toPromise()
       .then((data: any) =>{
         console.log(data);
        //  this.categoryDetails = data;
        //  Object.assign(this.categoryDetails,data);
        //  console.log(this.categoryDetails.catname);
         //Build edit form
         this.editCategoryForm = new FormGroup({
           'catid': new FormControl(data['catid']),
          'catname' : new FormControl(data['catname'])

            //  'catName' : new FormControl(this.categoryDetails.catName),
           });

           this.dataLoaded = true;
       })
       .catch(err =>{
         console.log(err);
       })
     }
   }

   updateCategory(){
     console.log(this.id)
     console.log("update:"+this.editCategoryForm.value.catname);
    this.dataService.updateCategory(this.id,this.editCategoryForm.value).subscribe(data=>{

      this._snackBar.open("Category updated successfully!");
      console.log(data);
     }, err =>{
      this._snackBar.open("Unable to create category");
     });
   }
}

