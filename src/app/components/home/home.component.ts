import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Classification } from 'src/app/models/Classification';
import { Container } from 'src/app/models/Container';
import { Talent } from 'src/app/models/Talent';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  containers: Container[] = []
  config = {
    slidesPerView: 2.5,
    speed: 800
  }
  

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.fetchCategories()
  }

  fetchTalents(){
    this.api.getTalents().subscribe(data => {
      let classifications: Classification[] = data.classifications
      for(let i=0; i<classifications.length; i++){
        for(let j=0; j<this.containers.length; j++){
          if(classifications[i].idCategory == this.containers[j].header.id){
            this.containers[j].talents.push(this.findElementById(classifications[i].idTalent, data.talents))
          }
        }
      }
    })
  }

  fetchCategories(){
    this.api.getCategories().subscribe(data => {
      for(let i=0; i<data.length; i++){
        this.containers.push(new Container(data[i], []))
      }
      this.fetchTalents()
    })
  }

  private findElementById(id: number, array: any){
    for(let i=0; i<array.length; i++)
      if(array[i].id == id)
        return new Talent(
          array[i].name,
          array[i].email,
          array[i].password,
          array[i].country,
          array[i].phone,
          array[i].socialNetwork,
          array[i].nickname,
          array[i].followers,
          array[i].description,
          array[i].image,
          array[i].categories,
          array[i].rating
        )
    
  }

  talentDetails(name: string){
    this.router.navigate(["main/talent", name])
  }

}
