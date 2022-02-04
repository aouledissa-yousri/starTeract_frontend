import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.scss'],
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = []
  isModalOpen = false
  activityDetails: Activity = new Activity(0,0,0,"","")
  index = 0

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getActivities()
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

  cancel(){
    this.activities.splice(this.index,1)
    this.api.deleteActivity(this.activityDetails.id).subscribe()
    this.closeModal()
  }

}
