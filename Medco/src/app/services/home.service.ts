import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Ihome } from '../IHome';
import { Iproduct } from '../IProduct';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private base_url = 'https://localhost:44373/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

   //get all objects
  //  public getProducts(): Observable<any> {
  //   return this.httpClient.get<Ihome[]>(this.base_url + '/products').pipe(map((res:any)=>{
  //     return res;
  //   }));
  // }
  public getProducts():Observable<Ihome[]> {
    return this.httpClient.get<Ihome[]>(this.base_url + '/Products').pipe(map((res:any)=>{
      return res;
    }));
  }

  //get single item
  public getProductsByCatId(id:any): Observable<any> {
    return this.httpClient.get<Iproduct[]>(`${this.base_url}/Products/Category/${id}`).pipe(map((res:any)=>{
      return res;
    }));
  }

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
