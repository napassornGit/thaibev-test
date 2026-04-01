import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { PersonResponse } from "../Models/PersonResponse";
import { IPersonInfo } from "../Models/IPersonInfo";

@Injectable({
  providedIn: 'root'
})
export class PersonInfoService {
  private apiUrl = `${environment.apiUrl}/PersonInfo`;

  constructor(private http: HttpClient) {}

  GetAllPersonInfo(): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.apiUrl}/GetAllPersonInfo`);
  }

  CreatePersonInfo(data: IPersonInfo): Observable<PersonResponse> {
    return this.http.post<PersonResponse>(`${this.apiUrl}/CreatePersonInfo`, data);
  }
}