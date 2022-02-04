import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from 'src/app/models/Activity';
import { Notification_ } from 'src/app/models/Notification';
import { Service } from 'src/app/models/Service';
import { ServiceEmitter, Task } from 'src/app/models/Task';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  tasks: Task[] = []
  isModalOpen = false
  isModal2Open = false
  index = 0
  taskDetails: Task = new Task(new Service(0,"","","",0,0), new ServiceEmitter("",""))
  form: FormGroup = new FormGroup({})

  constructor(private api: ApiService, private builder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
    this.getTasks()
  }

  ionViewWillEnter(){
    this.getTasks()
    this.initForm()
  }

  getTasks(){
    this.api.getServices(parseInt(localStorage.getItem("id"))).subscribe(data => {
      /*for(let i=0; i<data.length; i++){
        this.tasks.push(new Task(
          new Service(
            data[i].service.id,
            data[i].service.description,
            data[i].service.occasion,
            data[i].service.type,
            data[i].service.user,
            data[i].service.talent
          ),
          new ServiceEmitter(
            data[i].user.name,
            data[i].user.image
          )
        ))
      }*/
      this.tasks = data
    })
  }

  openModal(event){
    this.index = event.currentTarget.id
    this.taskDetails = this.tasks[event.currentTarget.id]
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }

  refuse(){
    this.tasks.splice(this.index,1)
    this.api.refuseService(
      new Notification_(
        0,
        localStorage.getItem("name") + " refused your service",
        false,
        this.taskDetails.service.user,
        this.taskDetails.service.talent,
        ""
      ), 
      this.taskDetails.service.id
    ).subscribe()
    this.closeModal()
  }

  accept(){
    this.closeModal()
    this.openModal2()
  }

  openModal2(){
    this.isModal2Open = true
  }

  closeModal2(){
    this.isModal2Open = false
  }

  private initForm(){
    this.form = this.builder.group({
      free: [false],
      card: [],
      cost: []
    })
  }

  valid(){
    return this.form.value["free"] || (!this.form.value["free"] && this.form.value["card"] != null && this.form.value["cost"] != null)
  }

  submit(){
    if(this.form.value["free"]){
      this.api.sendNotification(
        new Notification_(
          0,
          localStorage.getItem("name") + " Accepted your service request for free",
          false,
          this.taskDetails.service.user,
          this.taskDetails.service.talent,
          ""
        ),
        this.taskDetails.service.id
      ).subscribe()
    }else{
      this.api.sendActivity(
        new Activity(
          0,
          this.taskDetails.service.user,
          this.taskDetails.service.talent,
          "tou need to pay " + this.form.value["cost"] + "$ for your " + this.taskDetails.service.occasion + " video my credit card number is " + this.form.value["card"],
          ""
        ),
        new Notification_(
          0,
          localStorage.getItem("name") + " will make you a(n) " + this.taskDetails.service.occasion + " video for " + this.form.value["cost"] + "$",
          false,
          this.taskDetails.service.user,
          this.taskDetails.service.talent,
          ""
        ),
        this.taskDetails.service.id
      ).subscribe()
    }
    this.tasks.splice(this.index,1)
    this.closeModal2()
  }

}
