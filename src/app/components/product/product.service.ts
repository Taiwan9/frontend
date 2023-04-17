import { Product } from './product.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { EMPTY, catchError, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    baseUrl =" http://localhost:3001/products"

  constructor(private Snackbar: MatSnackBar,
    private http: HttpClient) {

   }

  showMessage(msg:string, isError: boolean =false):void{
    this.Snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition:'right',
      verticalPosition: 'top',
      panelClass: isError? ['msg-error']:['msg-success']
    })
  }

  create(product:Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e:any):Observable<any>{
    this.showMessage('Ocorreu um error !', true)
    return EMPTY
  }

  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: string| any):Observable<Product>{
    const url =`${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(product: Product): Observable<Product>{
    const url =`${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string):Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
}
