import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
fasync = faSync
fatrash =faTrash
public products :any = [];

public Total !: number;
  constructor(private cartService:CartService,private router:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getProductData().subscribe(res=>{
      this.products = res;
      this.Total=this.cartService.getTotalAmount();
    })

  }

   removeProduct(item:any){
     this.cartService.removeCartData(item);
   }
   removeAllProduct(){
     this.cartService.removeAllCart();
   }
   checkout(){
       let logged = localStorage.getItem('Logged');
       if(logged == 'true'){
      this.router.navigate(['/home/checkout']);
    }else{
      this._snackBar.open("Please Login!!")._dismissAfter(2000);
      this.router.navigate(['/userlogin']);
    }
   }
}
