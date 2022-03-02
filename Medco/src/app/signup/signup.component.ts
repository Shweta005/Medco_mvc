import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';

import { Router } from '@angular/router';
import { Iuser } from '../IUser';

import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupform: FormGroup = new FormGroup({});
  users :Iuser[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private dataService:  UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
         this.getUsers();



    this.signupform = this.formBuilder.group({

      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      mbleno: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),

      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmpassword:new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      role:'User'
    });






  }
  getUsers() {
    this.dataService.getUsers().subscribe(allUsers=> this.users = allUsers);

  }

  get firstName() {
    return this.signupform.get('firstName');
  }
  get lastName() {
    return this.signupform.get('lastName');
  }
  get email() {
    return this.signupform.get('email');
  }
  get mbleNo() {
    return this.signupform.get('mbleNo');
  }
  get password() {
    return this.signupform.get('password');
  }
  get address() {
    return this.signupform.get('address');
  }
  get confirmpassword() {
    return this.signupform.get('confirmpassword');
  }

  add() {
    if(this.signupform.value.password != this.signupform.value.confirmpassword){
         alert('Password is not same');
    }
    else{
    this.dataService.signup(this.signupform.value).subscribe(
      (data: any) => {
        alert('signup is successful');
        console.log(data);
        this.signupform.reset();
        this.router.navigate(['userlogin']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }


}

}
