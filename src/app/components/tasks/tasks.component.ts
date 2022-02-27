import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { Activity, PaymentActivity } from 'src/app/models/Activity';
import { Notification_ } from 'src/app/models/Notification';
import { PaymentDetails } from 'src/app/models/PaymentDetails';
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
  taskDetails: Task = new Task(new Service(0,"","","",0,0, false), new ServiceEmitter("",""))
  form: FormGroup = new FormGroup({})
  token = ""

  constructor(private api: ApiService, private builder: FormBuilder, private browser: InAppBrowser, private alert: AlertController) { }

  ngOnInit() {
    this.initForm()
    this.getTasks()
  }

  ionViewWillEnter(){
    this.getTasks()
    this.initForm()
    this.getToken()
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
      this.tasks = data.services
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
      wallet: [],
      cost: []
    })
  }

  valid(){
    return this.form.value["free"] || (!this.form.value["free"] && this.form.value["wallet"] != null && this.form.value["cost"] != null && this.form.value["cost"] >= 100)
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
    
      this.api.sendActivity2(
        new Activity(
          0,
          this.taskDetails.service.user,
          this.taskDetails.service.talent,
          "you need to make a(n) "+ this.taskDetails.service.occasion + " video for " + this.taskDetails.user.name,
          "",
          "video",
        ),
        this.taskDetails.service.id
      ).subscribe()

      
    }else{
      this.createPaymentLink()
    }
    this.tasks.splice(this.index,1)
    this.closeModal2()
  }

  KonnectSignUp(){
    const browser = this.browser.create("https://konnect.network/admin/register")
    browser.on("exit").subscribe(event => {
      browser.close()
    })
  }

  private createPaymentLink(){
    this.api.createPaymentLink(new PaymentDetails(
      this.form.value["wallet"],
      this.form.value["cost"],
      this.token
    )).subscribe(
      data => {
        this.success()
        this.api.sendActivity(
          new PaymentActivity(
            0,
            this.taskDetails.service.talent,
            this.taskDetails.service.user,
            "you need to pay " + this.form.value["cost"] + " " + this.token + " for your " + this.taskDetails.service.occasion + " video",
            "",
            "payment",
            data.paymentLink.link
          ),
          new Notification_(
            0,
            localStorage.getItem("name") + " will make you a(n) " + this.taskDetails.service.occasion + " video for " + this.form.value["cost"] + " " + this.token,
            false,
            this.taskDetails.service.user,
            this.taskDetails.service.talent,
            ""
          ),
          this.taskDetails.service.id
        ).subscribe()
      },
      error => this.failure()
    )
  }

  private getToken(){
    fetch("assets/countries_currency.json")
      .then(response => {
        return response.json()
      })
      .then(countryData => {
        this.api.getTalentData(localStorage.getItem("name")).subscribe(data => {
          for(let i=0; i<countryData.length; i++){
            if(countryData[i].country == data.country){
              this.token = countryData[i].currency_iso_3_char_code
              return
            }
          }
        })
      })
  }

  async success(){
    await this.alert.create({
      header: "Completed",
      cssClass: "content-dialogue",
      message: "a notification is sent to your client",
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
      header: "Failure",
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

}
