import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  isModalOpen = false
  form = new FormGroup({})
  image: File = null

  closeModal(){
    this.isModalOpen = false
  }

  openModal(){
    this.isModalOpen = true
  }

  constructor(private api: ApiService, private router: Router, private builder: FormBuilder, private alert: AlertController) { }

  ngOnInit() {
    this.getUserData()
    this.initForm()
  }

  ionViewWillEnter(){
    this.getUserData()
    this.initForm()
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

  private initForm(){
    this.form = this.builder.group({
      title: [localStorage.getItem("name")],
    })
  }

  upload(event){
    this.image = event.target.files[0]
  }

  uploadImage(){
    let image = new FormData()
    image.append("title", this.form.value["title"])
    image.append("image", this.image, this.image.name)
    this.api.uploadImage(
      image,
      parseInt(localStorage.getItem("id"))
    ).subscribe(data => {
      if(data.message){
        this.uploadSuccess()
        this.getUserData()
      }else{
        this.failure()
      }
    })
  }

  async uploadSuccess(){
    await this.alert.create({
      header: "Image uploaded successfully",
      cssClass: "content-dialogue",
      message: "Your profile picture has been changed",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.image = null
  }

  async failure(){
    await this.alert.create({
      header: "Error",
      cssClass: "content-dialogue",
      message: "Your Image has not been uploaded please try again",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.image = null
  }

}
