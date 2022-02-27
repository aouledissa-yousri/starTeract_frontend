import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
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
import { PaymentDetails } from 'src/app/models/PaymentDetails';

//const URL = "http://127.0.0.1:8000"
const URL = "https://star-teract.herokuapp.com"
let Wallet = ""

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

  getServices(id: number): Observable<any>{
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

  postReview(review: Review, notification: Notification_): Observable<any>{
    return this.http.post(URL+"/api/addReview/", {"review": review, "notification": notification})
  }

  getVideos(id: number): Observable<Video[]>{
    return this.http.get<Video[]>(URL+"/api/getVideos/"+id+"/")
  }

  createPaymentLink(paymentDetails: PaymentDetails): Observable<any>{
    let payload = {
      "options":"1",
      "amount": paymentDetails.cost,
      "selectedPaymentMethod":"gateway",
      "acceptedMethods":["bank_card","wallet","e-DINAR","flouci"],
      "isThanksMessageEnabled":true,
      "receiverWalletId": paymentDetails.wallet,
      "acceptedPaymentMethods":["bank_card","wallet","e-DINAR","flouci"],
      "type":"immediate",
      "token": paymentDetails.token
    }

    const headerDict = {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjA1ZmUzZDYwNzE0MzU5ZDQxNmNiNTMiLCJlbWFpbCI6ImFvdWxlZGlzc2F5b3VzcmlAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiWW91c3JpIiwibGFzdE5hbWUiOiJBb3VsZWRpc3NhICIsInBob25lTnVtYmVyIjoiKzIxNjkyNDU5NTIyIiwicm9sZSI6ImNsaWVudCIsInB1c2hUb2tlbiI6bnVsbCwib3JpZ2luIjoxLCJpYXQiOjE2NDQ2NjYwOTJ9.0Hb94IPxojKPDod_YwzqQdnBoRtBef7B2Egp57p9zDs"
    }

    return this.http.post("https://api.konnect.network/api/v2/payments/links/", payload, {headers: new HttpHeaders(headerDict)})
  }

  getPaymentLink(id: number): Observable<any>{
    return this.http.post(URL + "/api/payment-link/", {"id": id})
  }

  /*initPayment(link: string){
    let payload = {
        "receiverWalletId": "62065e0e60714359d416cd66",
        "amount": 3350,
        "token": "TND",
        "firstName": "Mon prenom",
        "lastName": "Mon nom",
        "phoneNumber": "24563609",
        "email": "mon.email@mail.com",
        "orderId": "1234657",
        "link": link,
        "webhook": "https://merchant.tech/api/notification_payment?payment_ref=6138da44...",
        "successUrl": "https://dev.konnect.network/gateway/payment-success?payment_ref=6138da44...",
        "failUrl": "https://dev.konnect.network/gateway/payment-failure?payment_ref=6138da44...",
        "acceptedPaymentMethods": [
          "bank_card",
          "wallet",
          "e-DINAR",
          "flouci"
        ]
    }

    const headerDict = {
      "x-api-key": "62065e0e60714359d416cd66:KQcCoUVi06lYJ6QOBB2w"
    }


    return this.http.post("https://api.konnect.network/api/v2/payments/init-payment/", payload, {headers: new HttpHeaders(headerDict)})
  }*/

}
