import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  user = {
    id: 0,
    name: "",
    email: "",
    country: "",
    phone: "",
    image: ""

  }

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getUserData()
  }

  getUserData(){
    this.api.getUserData(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.user= data
    })
  }

  logOut(){
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    this.router.navigate(["land"])
  }

}
