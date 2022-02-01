import { Component, OnInit } from '@angular/core';
import { Notification_ } from 'src/app/models/Notification';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  notifications: Notification_[] = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getNotifications()
    this.checkNotifications()
  }

  getNotifications(){
    this.api.getNotifications(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.notifications = data.notifications
    })
  }

  checkNotifications(){
    this.api.checkNotifications(parseInt(localStorage.getItem("id"))).subscribe()
  }

}
