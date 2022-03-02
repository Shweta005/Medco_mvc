import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Iuser } from 'src/app/IUser';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private base_url = 'https://localhost:44373/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}

  //get all objects
  public getUsers(): Observable<Iuser[]> {
    return this.httpClient.get<Iuser[]>(this.base_url + '/Users');
  }
   // getbyid
   getByIdUser(id: any) {
    return this.httpClient.get(this.base_url + '/Users/' + id);
  }
//signup component
  signup(userObject: any) {
    return this.httpClient.post(this.base_url + '/Login/signup', userObject);
  }

  // login(userObject:any):Observable<any>{
  //   return this.httpClient.get(this.base_url+'/Users',userObject);
  // }
  login(userObject:any){
    return this.httpClient.post(this.base_url+'/Login/login',userObject);
  }

   // Delete
   deleteUser(id: any) {
    return this.httpClient.delete(this.base_url + '/Users/Delete/' + id);
  }

  //login api
  // login(email: any,password: any):Observable<any>{
  //   return this.httpClient.get(`${this.base_url}/${email}&${password}`);
  //   // /users/:email&:password
  // }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
