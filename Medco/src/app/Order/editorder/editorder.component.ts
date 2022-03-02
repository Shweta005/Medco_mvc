import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {

  editOrderForm = new FormGroup({
    'oid':new FormControl(''),
    'pid':new FormControl(''),
    'uid':new FormControl(''),
    'totalprice':new FormControl(''),
    'quantity':new FormControl(''),
    'address':new FormControl(''),
    'ordereddate':new FormControl(''),
    'deliverydate':new FormControl(''),
    'coupen':new FormControl(''),
    'orderstatus':new FormControl('')
  });

  id:any;
  dataLoaded: boolean = false;
  constructor(private dataService: OrderService,private _snackBar: MatSnackBar,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.id =localStorage.getItem('oid');
    console.log("editorder"+this.id);
    localStorage.clear();
    this.dataLoaded = false;
   if(this.id !==''){
     //view user details
     this.dataService.getOrderById(this.id)
     .toPromise()
     .then((data: any) =>{
       console.log(data);
      //  this.categoryDetails = data;
      //  Object.assign(this.categoryDetails,data);
      //  console.log(this.categoryDetails.catname);
       //Build edit form
       this.editOrderForm = new FormGroup({
        'oid':new FormControl(data['oid']),
        'pid':new FormControl(data['pid']),
        'uid':new FormControl(data['uid']),
        'totalprice':new FormControl(data['totalprice']),
        'quantity':new FormControl(data['quantity']),
        'address':new FormControl(data['address']),
        'ordereddate':new FormControl(data['ordereddate']),
        'deliverydate':new FormControl(data['deliverydate']),
        'coupen':new FormControl(data['coupen']),
        'orderstatus':new FormControl(data['orderstatus'])
         });

         this.dataLoaded = true;
     })
     .catch(err =>{
       console.log(err);
     })
   }
 }

 updateOrder(){
   console.log(this.id)
   console.log("update:"+this.editOrderForm.value.uid);
  this.dataService.updateOrder(this.id,this.editOrderForm.value).subscribe(data=>{

    this._snackBar.open("Order updated successfully!");
    console.log(data);
   }, err =>{
    this._snackBar.open("Unable to update Order!");
   });
 }
}
