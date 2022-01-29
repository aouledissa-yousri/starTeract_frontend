import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  image = "assets/starTeract.png"
  loading = true
  isModalOpen = false
  modal = {
    header: "",
    button1: "",
    button2: "",
    button3: ""
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.stopLoading()
  }

  ionViewDidEnter() {
    this.stopLoading()
  }

  ionViewDidLeave(){
    this.removeBackground()
  }

  openModal(event){
    this.isModalOpen = true
    this.generateModalContent(event)
  }

  private generateModalContent(event){

    switch(event.target.innerText){

      case "Login":
        this.LoginContent()
        return

      case "Sign up":
        this.SignUpContent()
        return
    }

  }

  private LoginContent(){
    this.modal.header = "Login with"
    this.modal.button1 = "Login with Facebook"
    this.modal.button2 = "Login with Google"
    this.modal.button3 = "Login with Email"
  }

  private SignUpContent(){
    this.modal.header = "Sign up with"
    this.modal.button1 = "Sign up with Facebook"
    this.modal.button2 = "Sign up with Google"
    this.modal.button3 = "Sign up with Email"
  }

  action(){
    if(this.modal.button3 == "Sign up with Email")
      this.normalSignUp()
    else
      this.login()
  }


  normalSignUp(){
    this.closeModal()
    let self = this
    setTimeout(function(){
      self.router.navigate(["signUp"])
    }, 1)
  }

  login(){
    this.closeModal()
    let self = this
    setTimeout(function(){
      self.router.navigate(["login"])
    }, 1)
  }

  private stopLoading(){
    let self = this
    setTimeout(function(){
      self.loading = false
      self.setBackground()
    }, 2000)
  }

  private setBackground(){
    document.getElementsByTagName("body")[0].classList.add("background")
  }

  private removeBackground(){
    document.getElementsByTagName("body")[0].classList.remove("background")
  }

  closeModal(){
    this.isModalOpen = false
  }

  

}
