import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { sha1 } from 'src/app/extra';
import { Credentials } from 'src/app/models/Credentials';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form = new FormGroup({})

  constructor(private router: Router, private build: FormBuilder, private api: ApiService, private alert: AlertController) { }

  ngOnInit(){
    this.initForm()
  }

  back(){
    this.router.navigate(["land"])
  }

  private initForm(){
    this.form = this.build.group({
      user: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
    })
  }

  login(){
    let credentials = new Credentials(
      this.form.value["user"],
      this.form.value["user"],
      sha1.hash(this.form.value["password"])
    )

    this.api.login(credentials).subscribe(data => {
      switch(data.message){
        case "success":
          localStorage.setItem("token", data.token)
          this.router.navigate(["home"])
          break
        case "password is wrong":
          this.wrongPassword()
          break
        case "your account is temporarily blocked please try again later!":
          this.accountBlocked()
          break
        case "your account is not verified yet":
          this.accountNotVerified()
          break
        default:
          this.userDoesNotExist()
      }
    })
  }

  async wrongPassword(){
    await this.alert.create({
      header: "Password is wrong",
      cssClass: "content-dialogue",
      message: "Your password is wrong please try again",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  async accountNotVerified(){
    await this.alert.create({
      header: "Your account is not verified",
      cssClass: "content-dialogue",
      message: "We will notify you as soon as your account becomes verified",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  async userDoesNotExist(){
    await this.alert.create({
      header: "Wrong credentials",
      cssClass: "content-dialogue",
      message: "User not found ",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  async accountBlocked(){
    await this.alert.create({
      header: "Account temporarily blocked",
      cssClass: "content-dialogue",
      message: "your account is temporarily blocked please try again later! ",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

}
