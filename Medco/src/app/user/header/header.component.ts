import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHandHoldingMedical, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import { Icategory } from 'src/app/ICategory';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';


import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
falogo = faHandHoldingMedical;
facart = faShoppingCart
totalItemNumber : number = 0;
categories: Icategory[] = [];
title : any ="";
log : any= false;

  constructor(private router : Router,private productService:ProductService,private cartService :CartService,private homeService: HomeService) { }
  login() : void{
    this.router.navigate(['/userlogin']);
    }


    register() : void{
      this.router.navigate(['/signup']);
      }


  ngOnInit(): void {

    this.title= localStorage.getItem('User');
    // localStorage.clear();
       let a = localStorage.getItem('Logged');

       if(a != null){
         this.log = true;
       console.log(this.log);
       }
       else{
         this.log= false;
       }

this.cartService.getProductData().subscribe(res =>{
  this.totalItemNumber = res.length;
})
    this.getCategories();
  }
  getCategories() {
    this.productService
      .getCategories()
      .subscribe((allCategories) => (this.categories = allCategories));
  }

  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
    localStorage.setItem("Category",value);
}
logout() : void{
  localStorage.getItem('userid');
  localStorage.clear();
  localStorage.getItem('Logged');
  localStorage.getItem('User');

  this.log = false;
  this.router.navigate(['/userlogin']);
  }

}
