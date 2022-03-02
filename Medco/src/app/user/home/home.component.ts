import { Component, OnInit } from '@angular/core';
import { Ihome } from 'src/app/IHome';
import* as $ from 'jquery'
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Icategory } from 'src/app/ICategory';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products : Ihome [] = [];
  productList: any;
  id:any;
  term :any;
  categories: Icategory[] = [];
title : any;
  constructor(private homeService: HomeService,private router:Router,private cartService : CartService,private productService:ProductService) { }


  ngOnInit(): void {
    this.getCategories();

//     this.id= localStorage.getItem('Category');
//     if(this.id != null){

//     console.log(this.id);
//     localStorage.clear();
//   this.homeService.getProductsByCatId(this.id).subscribe(res=>{
//     this.productList = res;
//     this.productList.forEach((a:any)=>{
//       Object.assign(a,{quantity:1,total:a.price})
//     });
//   })
// }
//  else{
   // this.getProducts();
  this.homeService.getProducts().subscribe(res=>{
    this.productList = res;
    this.productList.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.price})
    });
  })
// }

  }

// getProducts(){
//   this.homeService.getProducts().subscribe(allProducts => this.products = allProducts   );
// }

getCategories() {
  this.productService
    .getCategories()
    .subscribe((allCategories) => (this.categories = allCategories));
}



  myFunc(){
    this.router.navigate((['/home/product']))
  }

  addtoCart(item:any){
    this.cartService.addToCart(item);
  }

  onOptionsSelected(value:string){
    // console.log("the selected value is " + value);
    // localStorage.setItem("Category",value);
    console.log(value);
    this.homeService.getProductsByCatId(value).subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price})
        console.log(this.productList);
      });
    })
}

}


