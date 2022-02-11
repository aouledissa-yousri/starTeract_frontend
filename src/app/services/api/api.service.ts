import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { User } from 'src/app/models/User';
import { Category } from 'src/app/models/Category';
import { Talent } from 'src/app/models/Talent';
import { Credentials } from 'src/app/models/Credentials';
import { Service } from 'src/app/models/Service';
import { Notification_ } from 'src/app/models/Notification';
import { Task } from 'src/app/models/Task';
import { Activity } from 'src/app/models/Activity';
import { Video } from 'src/app/models/Video';
import { Review } from 'src/app/models/Review';

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

  getTalents(id: number): Observable<any>{
    return this.http.post<any>(URL+"/api/talents/", {"id": id})
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

  getServices(id: number): Observable<Task[]>{
    return this.http.get<Task[]>(URL+"/api/getServices/"+id)
  }

  refuseService(notification: Notification_, id: number): Observable<any>{
    return this.http.post(URL+"/api/refuseService/"+id+"/", {"notification": notification})
  }

  sendNotification(notification: Notification_, id: number){
    return this.http.post(URL+"/api/sendNotification/", {"notification": notification, "serviceId": id})
  }

  sendActivity(activity: Activity, notification: Notification_, id: number){
    return this.http.post(URL+"/api/saveActivity/", {"notification": notification, "activity": activity, "serviceId": id})
  }

  sendActivity2(activity: Activity, id: number){
    return this.http.post(URL+"/api/saveActivity2/", { "activity": activity, "serviceId": id})
  }


  getActivities(id: number): Observable<Activity[]>{
    return this.http.get<Activity[]>(URL+"/api/getActivities/"+id)
  }

  deleteActivity(id: number): Observable<any>{
    return this.http.post(URL+"/api/deleteActivity/",{"id": id})
  }

  addVideo(video: FormData): Observable<any>{
    return this.http.post(URL+"/api/addVideo/", video)
  }

  uploadImage(image: FormData, id: number): Observable<any>{
    return this.http.post(URL+"/api/uploadImage/"+id+"/", image)
  }

  postReview(review: Review): Observable<any>{
    return this.http.post(URL+"/api/addReview/", review)
  }

  getVideos(id: number): Observable<Video[]>{
    return this.http.get<Video[]>(URL+"/api/getVideos/"+id+"/")
  }

}
