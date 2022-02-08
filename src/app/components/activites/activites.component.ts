import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/Activity';
import { Notification_ } from 'src/app/models/Notification';
import { Video } from 'src/app/models/Video';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.scss'],
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = []
  isModalOpen = false
  isModal2Open = false
  activityDetails: Activity = new Activity(0,0,0,"","","")
  index = 0
  selectedVideo: File = null
  form = new FormGroup({})

  constructor(private api: ApiService, private builder: FormBuilder) { }

  ngOnInit() {
    this.getActivities()
    this.initForm()
  }

  ionViewWillEnter(){
    this.getActivities()
  }

  getActivities(){
    this.api.getActivities(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.activities = data
    })
  }

  closeModal(){
    this.isModalOpen = false
  }

  openModal(event){
    this.index = event.currentTarget.id
    this.activityDetails = this.activities[event.currentTarget.id]
    this.isModalOpen = true
  }

  openModal2(){
    this.isModal2Open = true
  }

  closeModal2(){
    this.isModal2Open = false
  }

  accept(){
    if(this.activityDetails.type == "video")
      this.openModal2()
  }

  cancel(){
    this.activities.splice(this.index,1)
    this.api.deleteActivity(this.activityDetails.id).subscribe()
    this.closeModal()
  }

  upload(event){
    this.selectedVideo = event.target.files[0]
  }

  private initForm(){
    this.form = this.builder.group({
      title: ["", Validators.required],
      video: ["",Validators.required]
    })
  }

  uploadVideo(){
    let formData = new FormData()
    formData.append("title", this.form.value["title"])
    formData.append("video", this.selectedVideo, this.selectedVideo.name)
    formData.append("talent", String(this.activityDetails.receiver))
    formData.append("user", String(this.activityDetails.emitter))
    this.api.addVideo(formData).subscribe(data => {
      console.log(data)
    })

    this.api.sendNotification(
      new Notification_(
        0,
        localStorage.getItem("name") + " uploaded a video for you",
        false,
        this.activityDetails.emitter,
        this.activityDetails.receiver,
        ""
      ),
      0
    ).subscribe()
  }

}
