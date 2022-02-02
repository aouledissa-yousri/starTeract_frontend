import { Component, OnInit } from '@angular/core';
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
  index = 0
  taskDetails: Task = new Task(new Service(0,"","","",0,0), new ServiceEmitter("",""))

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getTasks()
  }

  getTasks(){
    this.api.getServices(parseInt(localStorage.getItem("id"))).subscribe(data => {
      for(let i=0; i<data.length; i++){
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
      }
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
    this.tasks = this.tasks.splice(this.index,1)
    this.api.refuseService(
      new Notification_(
        0,
        this.taskDetails + " refused your service",
        false,
        this.taskDetails.service.user,
        this.taskDetails.service.talent,
        ""
      ), 
      this.taskDetails.service.id
    ).subscribe()
    this.closeModal()
  }

}
