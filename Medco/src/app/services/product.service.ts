import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Iproduct } from 'src/app/IProduct';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Icategory } from '../ICategory';
import { data } from 'jquery';
import { Icoupen } from '../ICoupen';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base_url = 'https://localhost:44373/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  id: string ='';
  constructor(private httpClient: HttpClient) {}

  //get all objects
  public getProducts(): Observable<Iproduct[]> {
    return this.httpClient.get<Iproduct[]>(this.base_url + '/Products');
  }
  //get all objects
  public getCategories(): Observable<Icategory[]> {
    return this.httpClient.get<Icategory[]>(this.base_url + '/Categories');
  }
   //get all objects
   public getCoupens(): Observable<Icoupen[]> {
    return this.httpClient.get<Icoupen[]>(this.base_url + '/Coupens').pipe(catchError(this.handleError));;
  }



  //get single item
  public getCategoryById(id :any)  {
    return this.httpClient
      .get(this.base_url + '/Categories/'+id)
      .pipe(catchError(this.handleError));
  }
  //get single item
  public getProductById(id:any): Observable<any> {
    return this.httpClient
      .get<Iproduct[]>(`${this.base_url}/Products/${id}`)
      .pipe(catchError(this.handleError));
  }

    //get single item
    public getCoupenById(id:any): Observable<any> {
      return this.httpClient
        .get<Icoupen[]>(`${this.base_url}/Coupens/${id}`)
        .pipe(catchError(this.handleError));
    }


  //create new
  addCategory(categoryObject: any) {
    return this.httpClient.post(this.base_url + '/Categories/AddCategory',categoryObject);
  }
   //create new
   addProduct(productObject: any) {
    return this.httpClient.post(
      this.base_url + '/Products/AddProduct',
      productObject
    );
  }

  //create new coupen
  addCoupen(coupenObject: any) {
    return this.httpClient.post(
      this.base_url + '/Coupens/AddCoupen',
      coupenObject
    );
  }
    //redeem coupen
    redeemCoupen(coupenObject: any) {
      return this.httpClient.post(
        this.base_url + '/Coupens/Redeem',
        coupenObject
      );
    }

  public updateCategory(id:any, categoryObj:any):Observable<Icategory>{
    // console.log(categoryObj)
    return this.httpClient.put<Icategory>(this.base_url + '/Categories/Update/'+id,categoryObj)
  }

  public updateProduct(id:any, prodObj:any):Observable<Iproduct>{
    // console.log(categoryObj)
    return this.httpClient.put<Iproduct>(this.base_url + '/Products/Update/'+id,prodObj)
  }

  public updateCoupen(id:any, coupenObj:any):Observable<Icoupen>{
    // console.log(categoryObj)
    return this.httpClient.put<Icoupen>(this.base_url + '/Coupens/Update/'+id,coupenObj)
  }
  // // Edit/ Update
  // updateCategory(id: any, data: any): Observable<any> {
  //   return this.httpClient
  //     .put(`${this.base_url}/${id}`, data)
  //     .pipe(catchError(this.handleError));
  // }

  // Delete
  deleteCategory(id: any) {
    return this.httpClient.delete(this.base_url + '/Categories/Delete/' + id);
  }
 // Delete
 deleteProduct(id: any) {
  return this.httpClient.delete(this.base_url + '/Products/Delete/' + id);
}
 // Delete
 deleteCoupen(id: any) {
  return this.httpClient.delete(this.base_url + '/Coupens/Delete/' + id);
}


  // Search By Name
  filterByTitle(title: any): Observable<any> {
    return this.httpClient
      .get(`${this.base_url}?title_like=${title}`)
      .pipe(catchError(this.handleError));
  }


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
