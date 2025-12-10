import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product, productResponse } from '../model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<productResponse> {
    return this.http.get<productResponse>(environment.serverUrl + 'GetAllProduct');
  }

  addProduct(data: product) : Observable<productResponse> {
    return this.http.post<productResponse>(environment.serverUrl + 'CreateProduct', data);
  }

  deleteProduct(productId: number) : Observable<productResponse> {
    return this.http.post<productResponse>(environment.serverUrl + 'DeleteProduct?productId=' + productId, {});
  }
}
