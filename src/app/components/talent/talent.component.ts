import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Notification_ } from 'src/app/models/Notification';
import { Review, Reviews } from 'src/app/models/Review';
import { Service } from 'src/app/models/Service';
import { Talent } from 'src/app/models/Talent';
import { ApiService } from 'src/app/services/api/api.service';
import { VideoPlayer } from "@awesome-cordova-plugins/video-player/ngx"
import { Video } from 'src/app/models/Video';

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
  isModal3Open = false
  isModal4Open = false
  form: FormGroup = new FormGroup({})
  ratingForm: FormGroup = new FormGroup({})
  canRate = false
  @ViewChild('video') video: ElementRef
  videos= []
  stars = [
    "star-outline",
    "star-outline",
    "star-outline",
    "star-outline",
    "star-outline"
  ]

  state = "pause"
  volume = "volume-mute"
  src = "http://127.0.0.1:8000/media/videos/video/sample_1280x720_surfing_with_audio.mp4"

  config = {
    slidesPerView: 2.5,
    speed: 800,
    spaceBetween: 80
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
    
  }

  ionViewWillEnter(){
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
      this.seeCanRate()
      localStorage.setItem("talent_id", data.id)
      this.getVideos()
    })
  }

  private seeCanRate(){
    for(let i=0; i<this.reviews.content.length; i++){
      if(
        this.reviews.content[i].user == parseInt(localStorage.getItem("id"))
      ){
        this.canRate = false
        return
      }
    }
    this.canRate = true
    return
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

  openModal3(){
    this.isModal3Open = true
  }

  closeModal3(){
    this.isModal3Open = false
  }

  openModal4(){
    this.isModal4Open = true
  }

  closeModal4(){
    this.isModal4Open = false
  }

  private initForm(){
    this.form = this.build.group({
      occasion: ["", Validators.required],
      description: ["", [Validators.required, Validators.minLength(10)]]
    })

    this.ratingForm = this.build.group({
      rating: [null, Validators.required],
      comment: ["", Validators.required]
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
        parseInt(localStorage.getItem("talent_id")),
        false
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
      message: "An error occurred please try again later",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  setRating(event){
    this.ratingForm.controls.rating.setValue(parseInt(event.currentTarget.id))
    this.fill(this.ratingForm.value["rating"])
  }

  fill(rating: number){
    for(let i=0; i<rating; i++)
      this.stars[i] = "star"
    for(let i=rating; i<5; i++)
      this.stars[i] = "star-outline"

  }

  submitReview(){
    this.api.postReview(
      new Review(
        this.ratingForm.value["comment"],
        this.ratingForm.value["rating"],
        parseInt(localStorage.getItem("id")),
        parseInt(localStorage.getItem("talent_id"))
      ),

      new Notification_(
        0,
        localStorage.getItem("name") + " posted a new review",
        false,
        parseInt(localStorage.getItem("talent_id")),
        parseInt(localStorage.getItem("id")),
        ""
      )
    ).subscribe(data => {
      if(data.message){
        this.reviewPosted()
        this.closeModal3()
        this.getTalentDetails()
      }else{
        this.reviewFail()
      }
    })
  }

  async reviewPosted(){
    await this.alert.create({
      header: "Your review was submitted",
      cssClass: "content-dialogue",
      message: "Your review was successfully submitted",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  async reviewFail(){
    await this.alert.create({
      header: "Review was not submitted",
      cssClass: "content-dialogue",
      message: "An error occurred please try again later",
      buttons: [
        { 
          cssClass: "exit-dialogue",
          text: "OK"
        }
      ]
    }).then(box => box.present())
    this.form.reset({})
  }

  fullScreen(video){
    this.videos[parseInt(video.id)].controls = true
    //let elem = this.video.nativeElement as HTMLVideoElement
    if(video.requestFullscreen)
      video.requestFullscreen()
  }

  stopOrPlay(video){
    if(video.paused || video.ended){
      video.play()
      this.videos[parseInt(video.id)].state = "pause"
    }else{
      video.pause()
      this.videos[parseInt(video.id)].state = "play"
    }
  }

  muteOrEnable(video){
    if(video.muted){
      video.muted = false 
      video.volume = 0.5
      this.videos[parseInt(video.id)].volume = "volume-high"
    }else{
      video.muted = true 
      this.videos[parseInt(video.id)].volume = "volume-mute"
    }
  }

  getVideos(){
    this.api.getVideos(parseInt(localStorage.getItem("talent_id"))).subscribe(data => {
       this.videos = data
    })
  }

  canBookService(){
    return localStorage.getItem("id") != localStorage.getItem("talent_id")
  }


}
