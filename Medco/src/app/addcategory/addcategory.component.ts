
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service'
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  title="Add Category"
   id:string = ''
   addCategoryForm : FormGroup = new FormGroup({});

  constructor(private formBuilder : FormBuilder,private dataService: ProductService,private _snackBar: MatSnackBar,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.addCategoryForm = this.formBuilder.group({
       'catid': new FormControl(''),
      'catname' : new FormControl(''),
    })



  }

   addCategory(){
     return this.dataService.addCategory(this.addCategoryForm.value).subscribe(data=>{
      this._snackBar.open("Category added successfully!");
      console.log(data);
     }, err =>{
      this._snackBar.open("Unable to create category");
     });


   }


}
