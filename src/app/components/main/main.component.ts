import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  unchecked = 0
  unchecked_services = 0
  isTalent = false

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUnchecked()
    this.isTalent = (localStorage.getItem("isTalent") == "true")
  }

  ionViewWillEnter(){
    this.getUnchecked()
    this.isTalent = (localStorage.getItem("isTalent") == "true")
  }

  getUnchecked(){
    this.api.getNotifications(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.unchecked = data.unread
    })

    this.api.getServices(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.unchecked_services = data.unread
      console.log(data)
    })
  }

  checkNotifications(){
    this.unchecked = 0
  }


}
