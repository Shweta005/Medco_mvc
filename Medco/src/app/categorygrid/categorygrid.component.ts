import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';


import { Icategory } from '../ICategory';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-categorygrid',
  templateUrl: './categorygrid.component.html',
  styleUrls: ['./categorygrid.component.css'],
})
export class CategorygridComponent implements OnInit {
  title = 'Category List';
  categories: Icategory[] = [];
  categoryDetails:any;
   editForm: FormGroup= new FormGroup({});
   id:any;

   addCategoryForm : FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private formBuilder : FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.addCategoryForm = this.formBuilder.group({
      'catid': new FormControl(''),
     'catname' : new FormControl(''),
   })

  }

  //Get all categories
  getCategories() {
    this.productService
      .getCategories()
      .subscribe((allCategories) => (this.categories = allCategories));

  }

  addCategory(){
    return this.productService.addCategory(this.addCategoryForm.value).subscribe(data=>{
     this._snackBar.open("Category added successfully!");
     console.log(data);
    }, err =>{
     this._snackBar.open("Unable to create category");
    });


  }

  //Delete Selected category
  deleteCategory(category: any) {
    let id = category.catid;
    if (id) {
      this.productService.deleteCategory(id).subscribe(
        (data) => {
          this._snackBar.open(
            `Category ${category.catname} deleted successfully!`
          );
          console.log(data);
        },
        (err) => {
          this._snackBar.open('Unable to delete category');
        }
      );
    }
  }

 editCategory(category: any) {
     let id = category.catid;
     localStorage.setItem('catid',id);
    console.log(id);
    this.router.navigate(['/adminhome/edit']);
  }




    }

