import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { sha1 } from 'src/app/extra';
import { Category } from 'src/app/models/Category';
import { Country } from 'src/app/models/Country';
import { Talent } from 'src/app/models/Talent';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register-talent',
  templateUrl: './register-talent.component.html',
  styleUrls: ['./register-talent.component.scss'],
})
export class RegisterTalentComponent implements OnInit {

  form = new FormGroup({})
  link = "../../../assets/countries.json"
  countryListOpen = false
  countries: Country[] = []
  selectedCountry: Country = new Country(0,"","","","")
  categories: Category[] = []
  country: string

  constructor(private build: FormBuilder, private router: Router, private api: ApiService, private alert: AlertController) { }

  ngOnInit() {
    this.fetchCountryData()
    this.initForm()
    this.fetchCategories()
  }

  private initForm(){
    this.form = this.build.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      phone: [0, [Validators.required, Validators.min(0)]],
      rulingSocialNetwork: ["", Validators.required],
      nickname: ["", Validators.required],
      followers: [0, Validators.required],
      description: ["", Validators.required],
      categories: ["", Validators.required]
    })
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

  private fetchCategories(){
    this.api.getCategories().subscribe(data => {
      this.categories = data
    })
  }

  selectCountry(id: number){
    this.selectedCountry = this.countries[id]
    this.closeCountryList() 
  }

  openCountryList(){
    this.countryListOpen = true
  }

  closeCountryList(){
    this.countryListOpen = false
  }

  back(){
    this.router.navigate(["land"])
  }

  signUpAsTalent(){
    let talent = new Talent(
      this.form.value["name"],
      this.form.value["email"],
      sha1.hash(this.form.value["password"]),
      this.selectedCountry.name,
      this.selectedCountry.dial+this.form.value["phone"],
      this.form.value["rulingSocialNetwork"],
      this.form.value["nickname"],
      this.form.value["followers"],
      this.form.value["description"],
      "",
      this.validateCategories(this.form.value["categories"]),
      0
    )
    
    this.api.signUpAsTalent(talent).subscribe(data => {
      if(data.success)
        this.signUpSuccess()
      else
        this.signUpFailed()
    })
  }

  private validateCategories(categories: string[]){
    let result: Category[] = []
    for(let i=0; i<categories.length; i++){
      for(let j=0; j<this.categories.length; j++){
        if(categories[i] == this.categories[j].name){
          result.push(new Category(this.categories[j].id, categories[i]))
          break
        }
      }
    }
    return result
  }

  async signUpSuccess(){
    await this.alert.create({
      header: "Sign up successful",
      cssClass: "content-dialogue",
      message: "Your account will be open soon after we contact you",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  async signUpFailed(){
    await this.alert.create({
      header: "User already exists",
      cssClass: "content-dialogue",
      message: "The phone number, email or username you provided already belongs to another user",
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
