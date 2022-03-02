import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Iorder } from '../IOrder';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-ordergrid',
  templateUrl: './ordergrid.component.html',
  styleUrls: ['./ordergrid.component.css']
})
export class OrdergridComponent implements OnInit {
 title ="Order Details";
 orders : Iorder [] = [];
  constructor(private orderService: OrderService,private _snackBar: MatSnackBar,private router :Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(allOrders => this.orders = allOrders );
  }
//Edit
  updateOrder(order: any) {
    let id = order.oid;
    localStorage.setItem('oid',id);
   console.log(id);
   this.router.navigate(['/adminhome/editOrder']);
 }





 //Delete Selected category
 deleteOrder(order: any) {

  let id = order.oid;

  if (id) {
    this.orderService.deleteOrder(id).subscribe(
      (data) => {
        this._snackBar.open(
          `Order No. ${order.oid} deleted successfully!`
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
