import { Component, OnInit } from '@angular/core';
import { Icoupen } from 'src/app/ICoupen';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.css']
})
export class CoupensComponent implements OnInit {
  coupens : Icoupen[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   this.getCoupens();
  }
  getCoupens(){
    this.productService.getCoupens().subscribe(allOrders => this.coupens = allOrders );
  }

}
