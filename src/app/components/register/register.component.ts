import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({})

  constructor(private build: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.form = this.build.group({
      name: [""],
      email: [""],
      password: [""],
      country: [""],
      phone: []
    })
  }

  signUp(){
    let user = new User(
      this.form.value["name"],
      this.form.value["email"],
      this.form.value["password"],
      this.form.value["country"],
      this.form.value["phone"]
    )
  }

}
