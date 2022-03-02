import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup = new FormGroup({});
  loggedin: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: UserServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  Login(){
    this.dataService.login(this.loginform.value).subscribe((res:any)=>{
     console.log(res[0]);
     let id = res[0].uid;
     localStorage.setItem('userid',id);
     const role = res[0].role;

     if(role == 'Admin'){
      this.loginform.reset();
      this._snackBar.open(`Login Successful!! Welcome Admin:${res[0].firstname}!`)._dismissAfter(2000);
      let admin = res[0].firstname;
      localStorage.setItem('Admin',admin);
      this.router.navigate(['adminhome/dashboard']);
    }
    else{
      this.loginform.reset();
      this._snackBar.open(`Login Successful!! Welcome User:${res[0].firstname}!`)._dismissAfter(2000);
      let user = res[0].firstname;
      localStorage.setItem('User',user);
      this.loggedin = true;
      localStorage.setItem('Logged',this.loggedin);
      this.router.navigate(['home/products']);
    }
    }, err =>{
      this._snackBar.open("Authentication failed!!")._dismissAfter(2000);
     });

  }



  // login() {
  //   this.dataService.login(this.loginform.value).subscribe((res) => {
  //     const data = res.find((a: any) => {
  //       return (
  //         a.email === this.loginform.value.email &&
  //         a.password === this.loginform.value.password
  //       );
  //     });
  //     if (data) {
  //       alert('login is successfull');
  //       this.loginform.reset();
  //       this.router.navigate(['userprofile']);
  //     } else {
  //       alert('user not found !!');
  //     }
  //   });
  // }
}
