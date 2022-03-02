import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Iproduct } from '../IProduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css']
})
export class ProductgridComponent implements OnInit {
  // title = "Product Details";
 products : Iproduct [] = [];
  constructor(private productService: ProductService,private router:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(allProducts => this.products = allProducts );

  }
  add(){
    this.router.navigate(['/adminhome/addproduct']);
  }
  editProduct(product: any) {
    let id = product.pid;
    localStorage.setItem('pid',id);
   console.log(id);
   this.router.navigate(['/adminhome/editProduct']);
 }

 //Delete Selected product
 deleteProduct(product: any) {

  let id = product.pid;

  if (id) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this._snackBar.open(
          `Product No. ${product.pid} deleted successfully!`
        )._dismissAfter(2000);
        console.log(data);
      },
      (err) => {
        this._snackBar.open('Unable to delete category')._dismissAfter(2000);
      }
    );
  }
}
}
