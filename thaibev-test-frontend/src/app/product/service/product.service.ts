import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productResponse } from '../model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<productResponse> {
    console.log(environment.serverUrl + 'GetAllProduct');
    
    return this.http.get<productResponse>(environment.serverUrl + 'GetAllProduct');
  }
}
