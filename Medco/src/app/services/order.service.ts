import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Iorder } from 'src/app/IOrder';
import { catchError, map } from 'rxjs/operators';
import {  Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private base_url = "https://localhost:44373/api";

  httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })

 };
  constructor(private httpClient:HttpClient) { }

  //get all objects
  public getOrders(): Observable <Iorder[] >
  {
     return this.httpClient.get<Iorder[]>(this.base_url+"/Orders");
  }

  addOrder(orderObject: any) {
    return this.httpClient.post(
      this.base_url + '/Orders/AddOrder',
      orderObject
    );
  }
  public updateOrder(id:any, prodObj:any):Observable<Iorder>{
    // console.log(categoryObj)
    return this.httpClient.put<Iorder>(this.base_url + '/Orders/Update/'+id,prodObj)
  }

   //get single item
   public getOrderById(id:any): Observable<any> {
    return this.httpClient
      .get<Iorder[]>(`${this.base_url}/Orders/${id}`)
      .pipe(catchError(this.handleError));
  }
    // Delete
    deleteOrder(id: any) {
      return this.httpClient.delete(this.base_url + '/Orders/Delete/' + id);
    }

  // public getUser(id: any): Observable <Iuser[] >
  // {
  //   let api = `${this.base_url}/user/${id}`;
  //    return this.httpClient.get<Iuser[]>(api)  //{ headers: this.httpHeaders })
  //    .pipe(map((res: any) => {
  //        return res || {}
  //      }),
  //      catchError(this.handleError)
  //    )
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
