import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { User } from './user';
import {AbstractControl} from "@angular/forms";
import { InteriorUser } from './interior-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:4200/api/finance/";
  private baseUrl2 = "http://localhost:4200/api/interior/";

  constructor(private http: HttpClient) { }

  getUsers(term: AbstractControl | null): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}${term}`);
  }
  getInteriorUsers(term: AbstractControl | null): Observable<InteriorUser>{
    return this.http.get<InteriorUser>(`${this.baseUrl2}${term}`);
  }
}
