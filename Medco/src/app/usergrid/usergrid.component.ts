import { Component, OnInit } from '@angular/core';
import { Iuser } from '../IUser';
import{UserServiceService} from 'src/app/services/user-service.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {
users : Iuser [] = [];
title = "Registered User List";

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userService.getUsers().subscribe(allUsers => this.users = allUsers );
  }





}
