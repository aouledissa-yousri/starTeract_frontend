import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { User } from 'src/app/models/User';
import { Category } from 'src/app/models/Category';
import { Talent } from 'src/app/models/Talent';
import { Credentials } from 'src/app/models/Credentials';
import { Service } from 'src/app/models/Service';
import { Notification_ } from 'src/app/models/Notification';

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

  getTalentData(name: string): Observable<any>{
    return this.http.post(URL+"/api/talent/", {"name": name})
  }

  requestService(service: Service, notification: Notification_): Observable<any>{
    return this.http.post(URL+"/api/requestService/", {"service": service, "notification": notification})
  }

  getNotifications(id :number): Observable<any>{
    return this.http.get<Notification_[]>(URL+"/api/notifications/"+id)
  }

  checkNotifications(id: number){
    return this.http.get(URL+"/api/checkNotifications/"+id)
  }
}
