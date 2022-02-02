import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Notification_ } from 'src/app/models/Notification';
import { Reviews } from 'src/app/models/Review';
import { Service } from 'src/app/models/Service';
import { Talent } from 'src/app/models/Talent';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss'],
})
export class TalentComponent implements OnInit {

  talentDetails: Talent = new Talent("","","","","","","",0,"","",[],0)
  reviews: Reviews = new Reviews(0,[])
  isModalOpen = false
  isModal2Open = false
  form: FormGroup = new FormGroup({})

  config = {
    slidesPerView: 2.5,
    speed: 800
  }

  service = {
    personal: true,
    advertisement: false
  }

  constructor(
    private api: ApiService, 
    private active: ActivatedRoute, 
    private router: Router, 
    private build: FormBuilder,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.getTalentDetails()
    this.initForm()
  }

  private getTalentDetails(){
    this.api.getTalentData(this.active.snapshot.params["name"]).subscribe(data => {
      this.talentDetails = new Talent(
        data.name, 
        data.email, 
        data.password, 
        data.country, 
        "",
        data.socialNetwork,
        data.nickname,
        data.followers,
        data.description,
        data.image,
        data.categories,
        data.rating
      )
      this.reviews = data.reviews
      localStorage.setItem("talent_id", data.id)
    })
  }

  back(){
    this.router.navigate(["main/home"])
  }

  closeModal(){
    this.isModalOpen = false
  }

  openModal(){
    this.isModalOpen = true
  }

  select(event){
    if(event.target.id == "personal"){
      this.service.personal = true 
      this.service.advertisement = false 
    }else{
      this.service.personal = false 
      this.service.advertisement = true 
    }
  }

  openModal2(){
    this.closeModal()
    this.isModal2Open = true
  }

  closeModal2(){
    this.isModal2Open = false
  }

  private initForm(){
    this.form = this.build.group({
      occasion: ["", Validators.required],
      description: ["", [Validators.required, Validators.minLength(10)]]
    })
  }

  submit(){
    let type = ""
    if(this.service.personal)
      type = "Personal Video"
    else
      type = "Advertisement"
    this.api.requestService(
      new Service(
        0,
        this.form.value["description"],
        this.form.value["occasion"],
        type,
        parseInt(localStorage.getItem("id")),
        parseInt(localStorage.getItem("talent_id"))
      ),
      new Notification_(
        0,
        localStorage.getItem("name") + " requested a service"
        ,false,
        parseInt(localStorage.getItem("talent_id")),
        parseInt(localStorage.getItem("id")),
        ""
      )
    ).subscribe(data => {
      if(data.result)
        this.success()
      else
        this.failure()
    })
  }

  async success(){
    await this.alert.create({
      header: "Service request was submitted",
      cssClass: "content-dialogue",
      message: "We will notify you as soos as "+ this.talentDetails.name + " responds to your request",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  async failure(){
    await this.alert.create({
      header: "Service request was not submitted",
      cssClass: "content-dialogue",
      message: "An error occured please try again later",
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
