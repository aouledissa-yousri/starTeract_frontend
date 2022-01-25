import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { User } from 'src/app/models/User';

const URL = "http://127.0.0.1:8000"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { } 

  signUp(user: User): Observable<any>{
    return this.http.post(URL+"/api/signUp/", user)
  }
}
