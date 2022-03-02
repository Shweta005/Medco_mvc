import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public products :any = [];
  public orders :any = [];
  public Total !: number;
  productIds :any = [];
  promocode : any ='Promocode';
  discount:any =0;
  useraddress :any ;
   ccode:any;
   total:any;
   orderid:any =0;
   CheckoutForm : FormGroup = new FormGroup({});
  RedeemForm : FormGroup = new FormGroup({});
  UserForm : FormGroup = new FormGroup({});
  dataLoaded: boolean = false;
  constructor(
    private cartService:CartService,
    private router:Router,
    private userService:UserServiceService,
    private formBuilder : FormBuilder,
    private dataService:OrderService,
    private _snackBar: MatSnackBar,
    private productService:ProductService,
    public datePipe: DatePipe) { }

  ngOnInit(): void {

    var date = new Date();
    var today =this.datePipe.transform(date,"yyyy-MM-dd");
    const delay = new Date(date);
    delay.setDate(delay.getDate() + 2);
    var delivery = this.datePipe.transform(delay,"yyyy-MM-dd");
    console.log(today);
    console.log(delivery);


    this.dataService.getOrders().subscribe(res => {
      this.orders = res.length;
      console.log(this.orders);
    } );


    this.cartService.getProductData().subscribe(res=>{
      this.products = res;
      //created a array for pid
      for (var _i = 0; _i < res.length; _i++) {
        var num = res[_i].pid;
        this.productIds.push(num);
          }
        this.Total=this.cartService.getTotalAmount();
        })

        this.total = this.Total;

     //getting users data
     let id = localStorage.getItem('userid');
     this.userService.getByIdUser(id)
    .toPromise()
    .then((data: any) =>{

      console.log(data);
      //Build edit form
      this.UserForm = new FormGroup({
          'firstname':new FormControl(data['firstname']),
          'lastname' : new FormControl(data['lastname']),
          'email': new FormControl(data['email']),
          'address': new FormControl(data['address'])
        });
        this.useraddress = data.address;
        this.dataLoaded = true;
    })
    .catch(err =>{
      console.log(err);
    })

    //redeem form
    this.RedeemForm = this.formBuilder.group({
      'coupencode': new FormControl(''),
    });




        // getting today's date
        //  let today = new Date();

        //    console.log(today)
        // initializing tomorrow with today's date


      this.CheckoutForm = this.formBuilder.group({
        'oid':[this.orders+1],
        'pid':[this.productIds],
        'uid':[id],
        'totalprice':[this.Total],
        'quantity':[this.productIds.length] ,
        'address':[this.useraddress],
        'ordereddate':[today] ,
        'deliverydate':[delivery],
        'coupen':[null],
        'orderstatus':['Order Placed']
        });


  }


  //Redeem coupen
  Redeem(){
    this.productService.redeemCoupen(this.RedeemForm.value).subscribe((res:any)=>{
     let coupen = this.RedeemForm.value.coupencode;
     localStorage.setItem('Coupen',this.RedeemForm.value.coupencode);
     if(coupen == res[0].coupencode || res[0].availability ==true){
      this._snackBar.open(`Coupon applied!! Congrats!! You got ${res[0].discount }Rs off`)._dismissAfter(2000);
      this.discount = res[0].discount;
      this.Total -= this.discount;
      this.promocode = res[0].coupenname;
      this.ccode = res[0].coupencode;
      // console.log(this.Total);
     }
     else{
      this._snackBar.open(`Sorry this coupon is expired!`)._dismissAfter(2000);
     }
    }, err =>{
      this._snackBar.open("Code is Invalid!!")._dismissAfter(2000);
     });
  }


 //Add order
  Checkout(){
    this.total -= this.discount;
    this.CheckoutForm.value.totalprice = this.total;
    this.CheckoutForm.value.address = this.useraddress;
    this.CheckoutForm.value.coupen = this.ccode;

    console.log(this.CheckoutForm.value);
    return this.dataService.addOrder(this.CheckoutForm.value).subscribe(data=>{
      console.log(data)
      this._snackBar.open("Order Placed !")._dismissAfter(2000);
      console.log(data);
     }, err =>{
      this._snackBar.open("Not valid data!!")._dismissAfter(2000);
      console.log(err);
     });


    // console.log(
    //   this.CheckoutForm.value.pid,
    //   this.CheckoutForm.value.uid,
    //   this.CheckoutForm.value.totalprice,
    //   this.CheckoutForm.value.quantity,
    //   this.CheckoutForm.value.address,
    //   this.CheckoutForm.value.ordereddate,
    //   this.CheckoutForm.value.deliverydate,
    //   this.CheckoutForm.value.coupen,
    //   this.CheckoutForm.value.orderstatus
    //  )

 }



  }
