import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/Country';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({})
  link = "../../../assets/countries.json"
  countryListOpen = false
  countries: Country[] = []
  selectedCountry: Country = new Country(0,"","","","")

  constructor(private build: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.initForm()
    this.fetchCountryData()
  }

  private initForm(){
    this.form = this.build.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      phone: [0, [Validators.required, Validators.min(0)]]
    })
  }

  signUp(){
    let user = new User(
      this.form.value["name"],
      this.form.value["email"],
      this.form.value["password"],
      this.selectedCountry.name,
      this.selectedCountry.dial+this.form.value["phone"]
    )
    this.api.signUp(user).subscribe(data => {
      console.log(data.success)
    })
  }

  back(){
    this.router.navigate(["land"])
  }

  openCountryList(){
    this.countryListOpen = true
  }

  closeCountryList(){
    this.countryListOpen = false
  }

  private fetchCountryData(){
    let countries = null 
    fetch(this.link)
    .then(response => {
      return response.json()
    })
    .then(data => {
      countries = data
      countries.forEach((country, id) =>{
        this.countries.push(new Country(
          id,
          country.name,
          country.flag,
          country.code,
          country.dial_code
        ))
      })
      this.selectedCountry = this.countries[0]
    })
  }

  selectCountry(id: number){
    this.selectedCountry = this.countries[id]
    this.closeCountryList() 
  }

  joinAsTalent(){
    this.router.navigate(["joinAsTalent"])
  }

  

}
