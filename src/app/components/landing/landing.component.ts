import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  image = "assets/starzly.png"
  isModalOpen = false
  modal = {
    header: "",
    button1: "",
    button2: "",
    button3: ""
  }

  constructor(private router: Router) { }

  ngOnInit() {}

  openModal(event){
    this.isModalOpen = true
    this.generateModalContent(event)
  }

  closeModal(state: boolean){
    this.isModalOpen = state
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


  normalSignUp(state: boolean){
    this.closeModal(state)
    this.router.navigate(["signUp"])
  }

}
