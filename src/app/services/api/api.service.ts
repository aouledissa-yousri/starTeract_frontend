import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { User } from 'src/app/models/User';
import { Category } from 'src/app/models/Category';
import { Talent } from 'src/app/models/Talent';
import { Credentials } from 'src/app/models/Credentials';

const URL = "http://127.0.0.1:8000"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { } 

  signUp(user: User): Observable<any>{
    return this.http.post(URL+"/api/signUp/", user)
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(URL+"/api/categories/")
  }

  signUpAsTalent(talent: Talent): Observable<any>{
    return this.http.post(URL+"/api/joinAsTalent/", talent)
  }

  login(credentials: Credentials): Observable<any>{
    return this.http.post(URL+"/api/login/", credentials)
  }

  auth(token: any): Observable<any>{
    return this.http.post(URL+"/api/auth/", token)
  }

  getTalents(): Observable<any>{
    return this.http.get<any>(URL+"/api/talents/")
  }

  getUserData(id: number): Observable<any>{
    return this.http.post(URL+"/api/users/", {"id": id})
  }
}
