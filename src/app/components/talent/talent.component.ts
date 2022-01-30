import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reviews } from 'src/app/models/Review';
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

  config = {
    slidesPerView: 2.5,
    speed: 800
  }

  service = {
    personal: true,
    advertisement: false
  }

  constructor(private api: ApiService, private active: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getTalentDetails()
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
      console.log(this.reviews)
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

}
